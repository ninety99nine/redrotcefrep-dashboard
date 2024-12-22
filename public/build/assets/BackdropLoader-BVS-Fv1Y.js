import{U as v,S}from"./SpiningLoader-CsPmXxst.js";import{I}from"./InputLabel-B11U1-WT.js";import{M as V}from"./MoreInfoPopover-gLIaCQca.js";import{I as M}from"./InputErrorMessage-B1NpEu7u.js";import{o as l,c as i,f as m,w as q,i as P,t as k,g as n,d as c,v as p,A as g,q as a,k as T,e as f,r as s}from"./app-Kf0mCOXy.js";import{_ as x}from"./_plugin-vue_export-helper-DlAUqK2U.js";const w={mixins:[v],components:{InputLabel:I,MoreInfoPopover:V,InputErrorMessage:M},props:{modelValue:{type:String},min:{type:String,default:null},max:{type:String,default:null},label:{type:String,default:""},labelPopoverTitle:{type:String},labelPopoverDescription:{type:String},autocomplete:{type:String},placeholder:{type:String,default:""},required:{type:Boolean,default:!0},errorText:{type:String},size:{type:String,default:"lg",options:["lg","sm"]}},data(){return{localModelValue:this.modelValue,uniqueId:this.generateUniqueId("number")}},watch:{modelValue(t,r){this.updateValue(t)},localModelValue(t,r){this.$emit("update:modelValue",t.toString())}},methods:{updateValue(t){this.nonNegative&&t<0&&(t=0),this.localModelValue=t}}},B={class:"flex"},z=["id","name","min","max","autocomplete","required","placeholder"],L=["id","name","min","max","autocomplete","required","placeholder"],D={key:2,class:"flex items-center px-3 bg-gray-100 rounded-r-lg border text-xs"};function C(t,r,e,b,o,h){const u=s("InputLabel"),y=s("MoreInfoPopover"),_=s("InputErrorMessage");return l(),i("div",null,[e.label!=""?(l(),m(u,{key:0,_for:o.uniqueId,labelPopoverTitle:e.labelPopoverTitle,labelPopoverDescription:e.labelPopoverDescription},{default:q(()=>[P(k(e.label),1)]),_:1},8,["_for","labelPopoverTitle","labelPopoverDescription"])):n("",!0),c("div",{class:a([{"mt-2":e.label!=""}])},[c("div",B,[e.size=="lg"?p((l(),i("input",{key:0,"onUpdate:modelValue":r[0]||(r[0]=d=>o.localModelValue=d),id:o.uniqueId,name:o.uniqueId,type:"number",min:e.min,max:e.max,autocomplete:e.autocomplete,required:e.required,placeholder:e.placeholder,class:a([t.$slots.suffix?"rounded-l-md":"rounded-md","w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6 px-3"])},null,10,z)),[[g,o.localModelValue]]):e.size=="sm"?p((l(),i("input",{key:1,"onUpdate:modelValue":r[1]||(r[1]=d=>o.localModelValue=d),id:o.uniqueId,name:o.uniqueId,type:"number",min:e.min,max:e.max,autocomplete:e.autocomplete,required:e.required,placeholder:e.placeholder,class:a([t.$slots.suffix?"rounded-l-md":"rounded-md","w-full border-0 py-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-700 text-xs sm:leading-6 px-3"])},null,10,L)),[[g,o.localModelValue]]):n("",!0),t.$slots.suffix?(l(),i("div",D,[T(t.$slots,"suffix")])):n("",!0),e.label==""&&(e.labelPopoverTitle||e.labelPopoverDescription)?(l(),m(y,{key:3,title:e.labelPopoverTitle,description:e.labelPopoverDescription,placement:"top",class:"ml-2"},null,8,["title","description"])):n("",!0)]),f(_,{errorText:e.errorText},null,8,["errorText"])],2)])}const K=x(w,[["render",C]]),N={components:{SpiningLoader:S},props:{bgClass:{type:String,default:"bg-white/50"},showBorder:{type:Boolean,default:!0},showSpiningLoader:{type:Boolean,default:!0}},computed:{iconClass(){let t=["leading-none"];return this.size=="xs"||this.size=="sm"?t.push("text-sm"):(this.size=="base"||this.size=="lg")&&t.push("text-xl"),t}}},U={key:0,class:"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"};function E(t,r,e,b,o,h){const u=s("SpiningLoader");return l(),i("div",{class:a(["absolute top-0 left-0 right-0 bottom-0 z-10",e.bgClass,{"border border-black":e.showBorder}])},[e.showSpiningLoader?(l(),i("div",U,[f(u)])):n("",!0)],2)}const O=x(N,[["render",E]]);export{O as B,K as N};
