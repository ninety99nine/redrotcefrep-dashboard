import{M as u}from"./MoreInfoPopover-CikMcfV_.js";import{I as p}from"./InputErrorMessage-MOiSGfLL.js";import{o as t,c as o,a as l,p as b,K as g,i as n,n as h,k as m,h as k,b as x,r as c}from"./app-DgwDG0oL.js";import{_ as y}from"./_plugin-vue_export-helper-DlAUqK2U.js";const v={props:{modelValue:{type:Boolean},size:{type:String,default:"lg",options:["lg","md","sm"]},labelPopoverTitle:{type:String},labelPopoverDescription:{type:String},errorText:{type:String}},components:{MoreInfoPopover:u,InputErrorMessage:p},data(){return{localModelValue:this.modelValue}},watch:{modelValue(r,a){this.updateValue(r)},localModelValue(r,a){this.$emit("update:modelValue",r)}},methods:{updateValue(r){this.localModelValue=r}}},_={class:"inline-flex items-center cursor-pointer"},V={key:0,class:"relative w-11 h-6 after:h-5 after:w-5 after:top-[2px] after:start-[2px] bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"},w={key:1,class:"relative w-9 h-5 after:h-4 after:w-4 after:top-[2px] after:start-[2px] bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"},M={key:2,class:"relative w-7 h-4 after:h-3 after:w-3 after:top-[2px] after:start-[2px] bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"};function P(r,a,e,T,s,I){const d=c("MoreInfoPopover"),i=c("InputErrorMessage");return t(),o("div",null,[l("label",_,[b(l("input",{"onUpdate:modelValue":a[0]||(a[0]=f=>s.localModelValue=f),type:"checkbox",value:"",class:"sr-only peer"},null,512),[[g,s.localModelValue]]),e.size=="lg"?(t(),o("div",V)):e.size=="md"?(t(),o("div",w)):e.size=="sm"?(t(),o("div",M)):n("",!0),l("span",{class:h([e.size=="sm"?"text-xs ml-1":"text-sm ml-3","font-medium text-gray-900 dark:text-gray-300"])},[m(r.$slots,"default")],2),e.labelPopoverTitle||e.labelPopoverDescription?(t(),k(d,{key:3,title:e.labelPopoverTitle,description:e.labelPopoverDescription,placement:"top",class:"ml-1"},null,8,["title","description"])):n("",!0)]),x(i,{errorText:e.errorText,class:"block"},null,8,["errorText"])])}const D=y(v,[["render",P]]);export{D as T};
