"use strict";(self.webpackChunkoptum_github_io=self.webpackChunkoptum_github_io||[]).push([[1218],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return g}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),u=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),h=u(n),g=r,d=h["".concat(s,".").concat(g)]||h[g]||p[g]||i;return n?a.createElement(d,o(o({ref:t},c),{},{components:n})):a.createElement(d,o({ref:t},c))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var u=2;u<i;u++)o[u]=n[u];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},6486:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return u},assets:function(){return c},toc:function(){return p},default:function(){return g}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),o=["components"],l={title:"Knative Channel Sans Kafka Admin Rights",author:"Murugappan Chetty",author_title:"Principal Software Engineer",author_url:"https://github.com/itsmurugappan",author_image_url:"https://github.com/itsmurugappan.png",tags:["engineering","knative","channel","broker","kafka","message","events","cloudevents"],hide_table_of_contents:!1},s=void 0,u={permalink:"/blog/2021/09/27/kn-kafka-topic-channel",source:"@site/blog/2021-09-27-kn-kafka-topic-channel.md",title:"Knative Channel Sans Kafka Admin Rights",description:"Knative",date:"2021-09-27T00:00:00.000Z",formattedDate:"September 27, 2021",tags:[{label:"engineering",permalink:"/blog/tags/engineering"},{label:"knative",permalink:"/blog/tags/knative"},{label:"channel",permalink:"/blog/tags/channel"},{label:"broker",permalink:"/blog/tags/broker"},{label:"kafka",permalink:"/blog/tags/kafka"},{label:"message",permalink:"/blog/tags/message"},{label:"events",permalink:"/blog/tags/events"},{label:"cloudevents",permalink:"/blog/tags/cloudevents"}],readingTime:2.035,truncated:!0,authors:[{name:"Murugappan Chetty",title:"Principal Software Engineer",url:"https://github.com/itsmurugappan",imageURL:"https://github.com/itsmurugappan.png"}],frontMatter:{title:"Knative Channel Sans Kafka Admin Rights",author:"Murugappan Chetty",author_title:"Principal Software Engineer",author_url:"https://github.com/itsmurugappan",author_image_url:"https://github.com/itsmurugappan.png",tags:["engineering","knative","channel","broker","kafka","message","events","cloudevents"],hide_table_of_contents:!1},prevItem:{title:"Copying data between AWS and Azure",permalink:"/blog/2021/10/21/s3-to-azure-copy"},nextItem:{title:"AI Racing League",permalink:"/blog/2021/09/08/AI Racing League"}},c={authorsImageUrls:[void 0]},p=[{value:"Knative",id:"knative",children:[],level:3},{value:"Event Source",id:"event-source",children:[],level:3},{value:"Brokers and Triggers",id:"brokers-and-triggers",children:[],level:3},{value:"What&#39;s a Knative Channel",id:"whats-a-knative-channel",children:[],level:3},{value:"Kafka Topic Channel",id:"kafka-topic-channel",children:[{value:"Related Resources",id:"related-resources",children:[],level:4}],level:3}],h={toc:p};function g(e){var t=e.components,l=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},h,l,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h3",{id:"knative"},"Knative"),(0,i.kt)("p",null,"Knative enables you to run a serverless platform on your own terms. It has 2 independent components, Serving and Eventing. Serving runs your application as a serverless container in a kubernetes cluster, while eventing provides the tooling to source and orchestate events to your application."),(0,i.kt)("p",null,"Once you get past the initial attraction of scale to 0 that serving provides, you will quickly take notice of knative eventing capabilities mentioned below"),(0,i.kt)("h3",{id:"event-source"},"Event Source"),(0,i.kt)("p",null,"Component provided by Knative Eventing to source events from a actual event producer like kafka/rabbit mq/github etc. and deliver it to a addressable resource (any resource which has a uri, can be knative service/kubernetes service or just an uri). There is an event source for almost all commonly used event producers. Either its community maintained or custom implementation."),(0,i.kt)("h3",{id:"brokers-and-triggers"},"Brokers and Triggers"),(0,i.kt)("p",null,"Source delivers events 1-1. A fan out model with filters would be great for orchestrating events. Thats what Brokers and Triggers provide. Broker as the name suggest is the event ingress and hub, triggers route the events based on filters."),(0,i.kt)("p",null,"For brokers, triggers and sources to work in harmony they need to speak the common language and that is provided by ",(0,i.kt)("a",{parentName:"p",href:"https://cloudevents.io"},"Cloud Events"),"."),(0,i.kt)("p",null,"Below image shows how the events are sourced and routed to different knative and kubernetes service."),(0,i.kt)("p",null,(0,i.kt)("img",{src:n(2691).Z,width:"955",height:"442"})),(0,i.kt)("h3",{id:"whats-a-knative-channel"},"What's a Knative Channel"),(0,i.kt)("p",null,"Brokers, as pointed above is the events hub, so it needs a state store, which is provided by ",(0,i.kt)("inlineCode",{parentName:"p"},"Channels"),". By default Brokers use InMemory Channels. In a production environment, you would need a more robust store, for which Knative provides ",(0,i.kt)("inlineCode",{parentName:"p"},"KafkaChannel")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"NatsChannel"),". Its worth mentioning here that there are broker implementations (kafka broker and rabbit mq broker) which dont require channels."),(0,i.kt)("h3",{id:"kafka-topic-channel"},"Kafka Topic Channel"),(0,i.kt)("p",null,"The kafka channel or kafka broker would need admin rights as topics are created for each resource. This would require the Knative operator to main a kafka cluster, which might be cumbersome. Hence we implemented a custom knative channel based on ",(0,i.kt)("inlineCode",{parentName:"p"},"kafka topic"),"."),(0,i.kt)("p",null,"Kafka Topic Channel or ktc conforms to the knative spec, hence brokers and triggers would work as is. It is a single tenant solution, each Broker resource would require separate kafka topic and subsequent kafka topic channel. The channel instance would be created in the user namespace."),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/Optum/kafka-topic-channel"},"Details with examples")),(0,i.kt)("p",null,"Bring your own kafka topic, get a knative channel!"),(0,i.kt)("h4",{id:"related-resources"},"Related Resources"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://www.youtube.com/watch?v=gXuW9mvj6xM&list=PLnPNqTSUj2hKH5W7GWOZ-mzcw4r3O4bHj&index=2&t=14s"},"Kubecon demo on cloud events, knative brokers and triggers")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://itsmurugappan.medium.com/writing-custom-knative-eventing-sources-92f6904131ad"},"Event Sources"))))}g.isMDXComponent=!0},2691:function(e,t,n){t.Z=n.p+"assets/images/brokertrigger-b4491535bdff9e7c778019e6d1d035a5.jpg"}}]);