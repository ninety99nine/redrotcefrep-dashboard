import{U as f}from"./SpiningLoader-CsPmXxst.js";import{I as x}from"./InputLabel-B11U1-WT.js";import{I as v}from"./InputErrorMessage-B1NpEu7u.js";import{o as l,c as n,d as t,e as i,w,F as p,i as a,t as h,g as P,q as d,v as k,x as y,r as u}from"./app-Kf0mCOXy.js";import{_ as b}from"./_plugin-vue_export-helper-DlAUqK2U.js";const V={props:{modelValue:{type:String},label:{type:String,default:""},showForgotPassword:{type:Boolean,default:!0},labelPopoverTitle:{type:String},labelPopoverDescription:{type:String},placeholder:{type:String,default:""},required:{type:Boolean,default:!0},errorText:{type:String}},mixins:[f],components:{InputLabel:x,InputErrorMessage:v},data(){return{showPassword:!1,localModelValue:this.modelValue,uniqueId:this.generateUniqueId("password")}},watch:{modelValue(s,r){this.updateValue(s)},localModelValue(s,r){this.$emit("update:modelValue",s)}},methods:{updateValue(s){this.localModelValue=s}}},I={key:0,class:"text-sm"},M={class:"mt-2 relative"},q=["id","name","type","required","placeholder"],T={class:"absolute inset-y-0 right-0 flex items-center pr-3"},B=["xmlns"],C=t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M10 12a2 2 0 100-4 2 2 0 000 4z"},null,-1),D=t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M18 10a8.001 8.001 0 11-16 0 8.001 8.001 0 0116 0z"},null,-1),F=[C,D],S=["xmlns"],j=t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"},null,-1),z=t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 12a7.5 7.5 0 1114.999-1.5L19.5 12H5z"},null,-1),N=[j,z];function E(s,r,o,L,e,U){const m=u("InputLabel"),_=u("router-link"),g=u("InputErrorMessage");return l(),n("div",null,[t("div",{class:d({"flex items-center justify-between":o.showForgotPassword})},[i(m,{_for:e.uniqueId,labelPopoverTitle:o.labelPopoverTitle,labelPopoverDescription:o.labelPopoverDescription},{default:w(()=>[o.label==""?(l(),n(p,{key:0},[a(h(o.showForgotPassword?"Password":"New Password"),1)],64)):(l(),n(p,{key:1},[a(h(o.label),1)],64))]),_:1},8,["_for","labelPopoverTitle","labelPopoverDescription"]),o.showForgotPassword?(l(),n("div",I,[i(_,{to:{name:"register"}},{default:w(()=>[a("Forgot password?")]),_:1})])):P("",!0)],2),t("div",M,[k(t("input",{"onUpdate:modelValue":r[0]||(r[0]=c=>e.localModelValue=c),id:e.uniqueId,name:e.uniqueId,type:e.showPassword?"text":"password",autocomplete:"current-password",required:o.required,placeholder:o.placeholder,class:"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6 px-3"},null,8,q),[[y,e.localModelValue]]),t("div",T,[t("button",{onClick:r[1]||(r[1]=c=>e.showPassword=!e.showPassword),type:"button",class:"text-gray-400 hover:text-gray-700 focus:outline-none focus:text-gray-700"},[(l(),n("svg",{class:d(["h-5 w-5",{hidden:!e.showPassword,block:e.showPassword}]),fill:"none",xmlns:e.showPassword?"http://www.w3.org/2000/svg":"",viewBox:"0 0 20 20",stroke:"currentColor"},F,10,B)),(l(),n("svg",{class:d(["h-5 w-5",{block:!e.showPassword,hidden:e.showPassword}]),fill:"none",xmlns:e.showPassword?"":"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",stroke:"currentColor"},N,10,S))])])]),i(g,{errorText:o.errorText},null,8,["errorText"])])}const O=b(V,[["render",E]]);export{O as P};
