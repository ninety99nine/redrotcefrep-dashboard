import{M as r}from"./MoreInfoPopover-DQ5pfucY.js";import{B as i}from"./BadgeIndicator-C4cD2V52.js";import{o as c,c as p,e,r as n}from"./app--JSNtfaf.js";import{_ as m}from"./_plugin-vue_export-helper-DlAUqK2U.js";const d={components:{MoreInfoPopover:r,BadgeIndicator:i},props:{transaction:{type:Object}},computed:{type(){return this.transaction._attributes.isPaid?"success":this.transaction._attributes.isFailedPayment?"danger":this.transaction._attributes.isPendingPayment?"warning":"info"}}},_={class:"flex space-x-1 items-center"};function f(u,l,t,y,P,o){const a=n("BadgeIndicator"),s=n("MoreInfoPopover");return c(),p("div",_,[e(a,{type:o.type,text:t.transaction.paymentStatus.name,showDot:!1},null,8,["type","text"]),e(s,{description:t.transaction.paymentStatus.description,placement:"top"},null,8,["description"])])}const I=m(d,[["render",f]]);export{I as T};
