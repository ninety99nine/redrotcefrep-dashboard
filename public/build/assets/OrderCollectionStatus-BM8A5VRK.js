import{M as s}from"./MoreInfoPopover-53ylBu8u.js";import{B as c}from"./BadgeIndicator-CLU9Zr1j.js";import{o as a,c as i,d as o,n as l,r as t}from"./app-grlxYGJ_.js";import{_ as d}from"./_plugin-vue_export-helper-DlAUqK2U.js";const p={components:{MoreInfoPopover:s,BadgeIndicator:c},props:{order:{type:Object},moreInfoPopoverClasses:{type:String}}},m={class:"flex space-x-1 items-center"};function f(_,u,e,I,v,x){const r=t("BadgeIndicator"),n=t("MoreInfoPopover");return a(),i("div",m,[o(r,{type:e.order.collectionVerified.status?"success":"warning",text:e.order.collectionVerified.name,showDot:!1},null,8,["type","text"]),o(n,{class:l(e.moreInfoPopoverClasses),description:e.order.collectionVerified.description,placement:"top"},null,8,["class","description"])])}const y=d(p,[["render",f]]);export{y as O};
