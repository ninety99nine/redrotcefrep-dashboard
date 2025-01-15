import{U as h}from"./UtilsMixin-CbFS-0FV.js";import{I as w}from"./InputLabel-BEeTToQ7.js";import{I as m}from"./InputErrorMessage-C99IOSXE.js";import{o as l,c as n,d as a,w as _,h as g,b as o,q as f,v as x,n as d,r as u}from"./app-grlxYGJ_.js";import{_ as v}from"./_plugin-vue_export-helper-DlAUqK2U.js";const b={props:{modelValue:{type:String},labelPopoverTitle:{type:String},labelPopoverDescription:{type:String},placeholder:{type:String,default:""},required:{type:Boolean,default:!0},errorText:{type:String}},mixins:[h],components:{InputLabel:w,InputErrorMessage:m},data(){return{showPassword:!1,localModelValue:this.modelValue,uniqueId:this.generateUniqueId("confirm_password")}},watch:{modelValue(s,t){this.updateValue(s)},localModelValue(s,t){this.$emit("update:modelValue",s)}},methods:{updateValue(s){this.localModelValue=s}}},k={class:"mt-2 relative"},P=["id","name","type","required","placeholder"],y={class:"absolute inset-y-0 right-0 flex items-center pr-3"},V=["xmlns"],I=o("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M10 12a2 2 0 100-4 2 2 0 000 4z"},null,-1),M=o("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M18 10a8.001 8.001 0 11-16 0 8.001 8.001 0 0116 0z"},null,-1),q=[I,M],C=["xmlns"],T=o("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"},null,-1),B=o("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 12a7.5 7.5 0 1114.999-1.5L19.5 12H5z"},null,-1),D=[T,B];function z(s,t,r,S,e,j){const c=u("InputLabel"),p=u("InputErrorMessage");return l(),n("div",null,[a(c,{_for:e.uniqueId,labelPopoverTitle:r.labelPopoverTitle,labelPopoverDescription:r.labelPopoverDescription},{default:_(()=>[g(" Confirm Password ")]),_:1},8,["_for","labelPopoverTitle","labelPopoverDescription"]),o("div",k,[f(o("input",{"onUpdate:modelValue":t[0]||(t[0]=i=>e.localModelValue=i),id:e.uniqueId,name:e.uniqueId,type:e.showPassword?"text":"password",autocomplete:"current-password",required:r.required,placeholder:r.placeholder,class:"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6 px-3"},null,8,P),[[x,e.localModelValue]]),o("div",y,[o("button",{onClick:t[1]||(t[1]=i=>e.showPassword=!e.showPassword),type:"button",class:"text-gray-400 hover:text-gray-700 focus:outline-none focus:text-gray-700"},[(l(),n("svg",{class:d(["h-5 w-5",{hidden:!e.showPassword,block:e.showPassword}]),fill:"none",xmlns:e.showPassword?"http://www.w3.org/2000/svg":"",viewBox:"0 0 20 20",stroke:"currentColor"},q,10,V)),(l(),n("svg",{class:d(["h-5 w-5",{block:!e.showPassword,hidden:e.showPassword}]),fill:"none",xmlns:e.showPassword?"":"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",stroke:"currentColor"},D,10,C))])])]),a(p,{errorText:r.errorText},null,8,["errorText"])])}const A=v(b,[["render",z]]);export{A as C};
