import{M as c}from"./MoreInfoPopover-MomTL1G-.js";import{B as i}from"./BadgeIndicator-Dnot3AN7.js";import{r,o as p,c as d,d as s,n as l}from"./app-DGr24LlD.js";import{_ as m}from"./_plugin-vue_export-helper-DlAUqK2U.js";const y={components:{MoreInfoPopover:c,BadgeIndicator:i},props:{order:{type:Object},moreInfoPopoverClasses:{type:String}},computed:{description(){return this.order._attributes.isCancelled&&this.order.cancellationReason!=null?this.order.cancellationReason:this.order.status.description},type(){const e=this.order.status.name.toLowerCase();if(e==="completed")return"success";if(e==="waiting")return"info";if(e==="on its way"||e==="ready for pickup")return"primary";if(e==="cancelled")return"warning"}}},I={class:"flex space-x-1 items-center"};function h(e,u,t,f,_,o){const n=r("BadgeIndicator"),a=r("MoreInfoPopover");return p(),d("div",I,[s(n,{type:o.type,text:t.order.status.name,showDot:!1},null,8,["type","text"]),s(a,{class:l(t.moreInfoPopoverClasses),description:o.description,placement:"top"},null,8,["class","description"])])}const S=m(y,[["render",h]]),v={components:{MoreInfoPopover:c,BadgeIndicator:i},props:{order:{type:Object},moreInfoPopoverClasses:{type:String}},computed:{type(){const e=this.order.paymentStatus.name.toLowerCase();if(e==="paid")return"success";if(e==="unpaid")return"info";if(e==="partially paid")return"primary";if(e==="pending payment")return"warning"}}},x={class:"flex space-x-1 items-center"};function g(e,u,t,f,_,o){const n=r("BadgeIndicator"),a=r("MoreInfoPopover");return p(),d("div",x,[s(n,{type:o.type,text:t.order.paymentStatus.name,showDot:!1},null,8,["type","text"]),s(a,{class:l(t.moreInfoPopoverClasses),description:t.order.paymentStatus.description,placement:"top"},null,8,["class","description"])])}const M=m(v,[["render",g]]);export{S as O,M as a};
