import{e as _}from"./vue3-tags-input.esm-DgZg8QI3.js";import{U as f}from"./UtilsMixin-CBwmyCNB.js";import{I as y,a as v,b as I}from"./InputErrorMessage-xckJoMbN.js";import{M as T}from"./MoreInfoPopover-MomTL1G-.js";import{r as o,o as n,c as h,e as a,w as L,h as M,t as P,f as i,b as s,d as c,n as k}from"./app-DGr24LlD.js";import{_ as x}from"./_plugin-vue_export-helper-DlAUqK2U.js";const S={props:{tags:{type:Array},showAsterisk:{type:Boolean,default:!1},label:{type:String,default:""},secondaryLabel:{type:[String,null],default:null},description:{type:String},learnMoreLabel:{type:[String,null]},learnMoreLink:{type:[String,null]},labelPopoverTitle:{type:String},labelPopoverDescription:{type:String},placeholder:{type:String,default:"Separate with comma , or press Enter ⏎"},required:{type:Boolean,default:!0},errorText:{type:String}},mixins:[f],components:{Vue3TagsInput:_,InputLabel:y,InputLabelDescription:v,MoreInfoPopover:T,InputErrorMessage:I},data(){return{localTags:this.tags,uniqueId:this.generateUniqueId("input_tags")}},watch:{modelValue(l,r){this.localTags=l},localTags(l,r){this.$emit("onTagsChanged",l)}}},D={class:"flex"};function q(l,r,e,w,t,V){const u=o("InputLabel"),p=o("InputLabelDescription"),d=o("vue3-tags-input"),m=o("MoreInfoPopover"),b=o("InputErrorMessage");return n(),h("div",null,[e.label!=""?(n(),a(u,{key:0,_for:t.uniqueId,showAsterisk:e.showAsterisk,secondaryLabel:e.secondaryLabel,labelPopoverTitle:e.labelPopoverTitle,labelPopoverDescription:e.labelPopoverDescription},{default:L(()=>[M(P(e.label),1)]),_:1},8,["_for","showAsterisk","secondaryLabel","labelPopoverTitle","labelPopoverDescription"])):i("",!0),e.description?(n(),a(p,{key:1,description:e.description,learnMoreLabel:e.learnMoreLabel,learnMoreLink:e.learnMoreLink},null,8,["description","learnMoreLabel","learnMoreLink"])):i("",!0),s("div",{class:k([{"mt-2":e.label!=""}])},[s("div",D,[c(d,{id:t.uniqueId,name:t.uniqueId,required:e.required,placeholder:e.placeholder,tags:t.localTags,onOnTagsChanged:r[0]||(r[0]=g=>t.localTags=g)},null,8,["id","name","required","placeholder","tags"]),e.label==""&&(e.labelPopoverTitle||e.labelPopoverDescription)?(n(),a(m,{key:0,title:e.labelPopoverTitle,description:e.labelPopoverDescription,placement:"top",class:"ml-2"},null,8,["title","description"])):i("",!0)]),c(b,{errorText:e.errorText},null,8,["errorText"])],2)])}const z=x(S,[["render",q]]);export{z as I};
