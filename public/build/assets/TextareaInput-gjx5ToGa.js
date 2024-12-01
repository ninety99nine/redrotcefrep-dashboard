import{U as m}from"./SpiningLoader-J1-nNIfa.js";import{I as f}from"./InputLabel-qrcyrno7.js";import{M as b}from"./MoreInfoPopover-DQ5pfucY.js";import{I as g}from"./InputErrorMessage-Dr4dBLGL.js";import{o as r,c as v,g as n,w as x,i as _,t as V,h as s,d as a,p as h,y as I,e as y,n as P,r as i}from"./app--JSNtfaf.js";import{_ as M}from"./_plugin-vue_export-helper-DlAUqK2U.js";const T={props:{modelValue:{type:String},label:{type:String,default:""},labelPopoverTitle:{type:String},labelPopoverDescription:{type:String},errorText:{type:String},rows:{type:Number,default:4},placeholder:{type:String,default:""},required:{type:Boolean,default:!0}},mixins:[m],components:{InputLabel:f,MoreInfoPopover:b,InputErrorMessage:g},data(){return{localModelValue:this.modelValue,uniqueId:this.generateUniqueId("text")}},watch:{modelValue(o,t){this.updateValue(o)},localModelValue(o,t){this.$emit("update:modelValue",o)}},methods:{updateValue(o){this.localModelValue=o}}},w={class:"flex"},q=["id","name","required","rows","placeholder"];function D(o,t,e,S,l,k){const u=i("InputLabel"),d=i("MoreInfoPopover"),c=i("InputErrorMessage");return r(),v("div",null,[e.label!=""?(r(),n(u,{key:0,_for:l.uniqueId,labelPopoverTitle:e.labelPopoverTitle,labelPopoverDescription:e.labelPopoverDescription},{default:x(()=>[_(V(e.label),1)]),_:1},8,["_for","labelPopoverTitle","labelPopoverDescription"])):s("",!0),a("div",{class:P([{"mt-2":e.label!=""}])},[a("div",w,[h(a("textarea",{"onUpdate:modelValue":t[0]||(t[0]=p=>l.localModelValue=p),id:l.uniqueId,name:l.uniqueId,required:e.required,rows:e.rows,placeholder:e.placeholder,class:"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6 px-3"},null,8,q),[[I,l.localModelValue]]),e.label==""&&(e.labelPopoverTitle||e.labelPopoverDescription)?(r(),n(d,{key:0,title:e.labelPopoverTitle,description:e.labelPopoverDescription,placement:"top",class:"ml-2"},null,8,["title","description"])):s("",!0)]),y(c,{errorText:e.errorText},null,8,["errorText"])],2)])}const z=M(T,[["render",D]]);export{z as T};
