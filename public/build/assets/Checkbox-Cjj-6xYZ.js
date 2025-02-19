import{U as b}from"./UtilsMixin-CBwmyCNB.js";import{M as f}from"./MoreInfoPopover-MomTL1G-.js";import{b as g}from"./InputErrorMessage-xckJoMbN.js";import{r as a,o as s,c as i,b as o,q as x,V as h,n,t as y,f as d,y as _,e as v,d as k}from"./app-DGr24LlD.js";import{_ as M}from"./_plugin-vue_export-helper-DlAUqK2U.js";const V={mixins:[b],components:{MoreInfoPopover:f,InputErrorMessage:g},props:{modelValue:{type:Boolean},label:{type:String,default:""},size:{type:String,default:"base",options:["xs","sm","base","lg"]},disabled:{type:Boolean,default:!1},labelPopoverTitle:{type:String},labelPopoverDescription:{type:String},errorText:{type:String}},data(){return{localModelValue:this.modelValue,uniqueId:this.generateUniqueId("number")}},watch:{modelValue(e){this.localModelValue=e},localModelValue(e){this.$emit("update:modelValue",e)}},computed:{textClass(){let e=["font-medium text-gray-900 dark:text-gray-300"];return this.size==="xs"?e.push("text-xs"):this.size==="sm"?e.push("text-sm"):this.size==="base"?e.push("text-base"):this.size==="lg"&&e.push("text-lg"),e.join(" ")}}},I={class:"w-full inline-flex items-start cursor-pointer"},P={class:"flex w-full gap-2"},C=["id","name","disabled"],S=["for"];function T(e,r,t,q,l,u){const c=a("MoreInfoPopover"),m=a("InputErrorMessage");return s(),i("div",null,[o("label",I,[o("div",P,[x(o("input",{id:l.uniqueId,name:l.uniqueId,"onUpdate:modelValue":r[0]||(r[0]=p=>l.localModelValue=p),type:"checkbox",disabled:t.disabled,class:n([{"cursor-not-allowed opacity-50":t.disabled},"w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"])},null,10,C),[[h,l.localModelValue]]),o("div",null,[t.label?(s(),i("label",{key:0,for:l.uniqueId,class:n(u.textClass)},y(t.label),11,S)):d("",!0),_(e.$slots,"default")])]),t.labelPopoverTitle||t.labelPopoverDescription?(s(),v(c,{key:0,title:t.labelPopoverTitle,description:t.labelPopoverDescription,placement:"top",class:"ml-1 mt-1"},null,8,["title","description"])):d("",!0)]),k(m,{errorText:t.errorText,class:"block mt-1"},null,8,["errorText"])])}const U=M(V,[["render",T]]);export{U as C};
