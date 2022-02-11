---
title: Migrating ETL to Spark - Refactoring
author: Bill Schneider
author_title: Sr. Principal Engineer
author_url: https://www.linkedin.com/in/wrschneider
author_image_url: https://avatars.githubusercontent.com/u/3975157?v=4
tags: [Spark, ETL, Engineering]
hide_table_of_contents: false
---

_Note: this is the second article in a multi-part series. The [first post](https://opensource.optum.com/blog/2022/01/14/spark-series-part-1) covered
getting started by copy-pasting SQL into Spark with some rewrites. Future installments will cover topics like performance optimization and validation._

### When SQL isn't enough

<!--truncate-->

First, the term "Spark SQL" can be confusing. ["Spark SQL"](https://spark.apache.org/docs/latest/sql-programming-guide.html) refers to the structured data processing module within Spark. You can interact with Spark SQL through SQL SELECT queries, and through the DataFrame/Dataset API. For the rest of this article, when I say "SQL" I am referring to SQL syntax.

At Optum, we often start migrating database-backed processes to Spark by copy-pasting SQL at first, then refactor to use the DataFrame or Dataset API when it makes sense.

The two main scenarios where it is useful to refactor SQL-based code:

- DRY for transforming query results. You can use the power of Scala and functional programming to apply "for each column" logic.
- Complex business rules that are hard to express in SQL. Spark can distribute computations that go beyond the SQL set operations, and a row in a dataframe can contain nested objects, not just values.

### Stay DRY with the DataFrame API

One simple example is, suppose your original SQL query from Oracle or SQL Server selected all the column names as upper-case and you want to ensure that the generated Parquet column names are all lower-case. Rather than trying to parse the SQL text and replace all the column names, you can apply this sort of logic on the DataFrame itself:

```scala
val result: DataFrame = spark.sql("SELECT ....")

result.schema.fieldNames.foldLeft(result) { (colName, df) => df.withColumnRenamed(colName, colName.toLowerCase()) }
```

There is an explanation of how `foldLeft` works on DataFrames [on this StackOverflow post](https://stackoverflow.com/a/52028279/836318). The above code is looping over the column names on the original DataFrame, and for each column, returns a new DataFrame that renames the original column to the lower-case name. The functional syntax abstracts away reassignment of the DataFrame for each column, keeping all variables immutable.

You can use the DataFrame API to replace SQL syntax altogether, which is especially useful when you have repeating patterns.

For example if you have a query like this

```sql
SELECT cost1 * factor_val, cost2 * factor_val, cost3 * factor_val, ...
FROM costs
JOIN lookup_factor on costs.factor_id = lookup_factor.factor_id
```

Where you have a series of identical, numbered columns all multiplied by some factor from a lookup table.

This can be rewritten as follows:

```scala
val costColumnRange = (1 to 10)

val joined = spark.table("costs")
  .join(spark.table("lookup_factor"), Seq("factor_id"))

val costColumnsMultiplied = costColumnRange.map(i => col(s"cost$i") * $"factor")
val final = joined.select(costColumnsMultiplied)
```

Here, we start with a DataFrame that represents the two tables, `costs` and `lookup_factor`, joined. No columns are specified at this point, so the `joined` DataFrame has all columns from the original tables available. This is equivalent to `select * from costs join lookup_factor`.

The `map` transforms the range of column suffixes in `costColumnRange` to a list of Spark `Column` objects, where each Column represents a single "costX \* factor" column that would appear in a `SELECT` statmeent.

The final result is produced by passing the list of `Column` objects to `select`.

This construct is useful for patterns that repeat with similar column names or column names with numeric indexes.

### Get complex business logic out of SQL

Sometimes complex analytics are calculated in SQL. For example, clinical quality measures typically follow a form like:

- Patient qualifies for inclusion in metric denominator, by looking at procedure codes for an eligible visit in some time range
- Patient is not excluded from the calculation for some reason; for example, if a patient can't get a flu shot because of an allergy, that patient is not included counted in the deonominator
- Patient satisfies the metric numerator; for example, the patient got their flu shot.

In SQL, a typical implementation is building temp tables for each measure. In this approach, each SQL query represents one component calculated for all patients:

```sql
create table eligible_patients as
select distinct patient_id
from patient
join patient_procedure using (patient_id)
where procedure_code in (codes for eligible visit)
and not exists (select 1
   from patient_diagnosis
   where patient_diagnosis.patient_id = patient_procedure.patient_id
   and diagnosis_code in (codes that indicate exclusion)
)

create table patient_numerators as
select distinct patient_id
from patients
join procedures using (patient_id)
where procedure_code in (codes that indicate numerator satisfied)

create table measure as
select count(numerator.patient_id)/count(denominator.patient_id) as measure
from eligible_patients denominator
left join patient_numerators as numerator
```

This is workable for one measure, but what happens when you need to calculate dozens of such measures? This kind of logic usually ends up requiring separate scans on tables like `patient_diagnosis` or `patient_procedure` for each measure, whether a separate temp table or a separate `[not] exists` subquery. So each scan ends up calcuating one measure or measure precursor for all patients at once.

In Spark, you are not limited to SQL set operations. You can treat rows in DataFrames like objects with nested collections (lists or sets), and use any procedural or functional logic on these objects. Then, you can take a completely different approach:

- fetch the all the related records for a patient at once, as a single Patient object
- for each patient, calculate all the measures for the patient in memory.

The first step in this approach is to retrieve the data into an object graph so it's easier to work with:

```scala
case class Diagnosis(diagnosis_code: String, ...)
case class Procedure(procedure_code: String, ...)
case class Patient(patient_id: Long, dx: Seq[Diagnosis], px: Seq[Procedure])

val groupedDx = spark.table("patient_diagnosis")
  .groupBy("patient_id")
  .agg(collect_list(struct("diagnosis_code", ... ).as("diagnosis_list")))

val groupedPx = spark.table("patient_procedure")
  .groupBy("patient_id")
  .agg(collect_list(struct("procedure_code", ... ).as("procedure_list")))

val patients = spark.table("patient")
  .join(groupedDx, Seq("patient_id"))
  .join(groupedPx, Seq("patient_id"))
  .as[Patient]
```

This code aggregates the records from `patient_procedure` and `patient_diagnosis` tables into temporary DataFrames with a single row for each patient. Each row has two fields: `patient_id`, and an embedded list of procedure or diagnosis codes.

Since each of these temporary DataFrames only contains one record per patient, they can be joined safely. We could never do a join like this in SQL because a join between `patient_procedure` and `patient_diagnosis` would be similar to a cartesian join (more precisely, a cartesian join within single patient, for the procedure and diagnosis codes that match our criteria).

The final call `.as[Patient]` turns the Spark DataFrame into a typed Dataset, where each row is a `Patient` _object_, defined by the case classes at the beginning. Fields and collections in these objects may then be accessed or iterated, as if they were plain Scala objects.

This code will take that set of Patients, and call `calculateQualityMeasures` on each one individually (in parallel, with different partitions of patients on different Spark executors), resulting in a Dataset of `QualityMeasure` objects:

```
case class QualityMeasure(eligible1: Boolean, satisfies1: Boolean, eligible2: Boolean, satisfies2: Boolean, ...)

def calculateQualityMeasures(p: Patient): QualityMeasure = {
  val eligible1 = !p.px.intersect(ELIGIBLE_VISIT_PX_CODES_1).empty && p.dx.intersect(EXCLUDE_VISIT_DX_CODES_1).empty
  val satisfies1 = !p.px.intersect(PX_CODES_1).empty

  val eligible2 = !p.px.intersect(ELIGIBLE_VISIT_PX_CODES_2).empty && p.dx.intersect(EXCLUDE_VISIT_DX_CODES_2).empty
  val satisfies2 = !p.px.intersect(PX_CODES_2).empty

  QualityMeasure(eligible1, satisfies1, eligible2, satisfies2)
}

val results = patients.map(calculateQualityMeasures)
```

The `map` method on the Dataset acts like `map` on any other Scala collection, where `calculateQualityMeasures` is a pure function that takes a Patient in and returns QualityMeasures out.

Note that `calculateQualityMeasures` has no Spark dependencies and can be unit-tested on Scala case class instances independently!

Because the Patient object has the full collection of procedure and diagnosis codes in memory, we can perform multiple iterations over the same procedure and diagnosis codes for the patient to calculate all quality measures at the same time. This is a big difference from SQL, where logic operations like `where exists` are coupled to storage operations to fetch data from disk.

### Coming up

The next article will discuss testing and validation strategies.
