import{P as i}from"./PrimaryButton-Bke-6sJ-.js";import{r as n,o,e as l,w as r,b as d,n as c,y as p}from"./app-DGr24LlD.js";import{_ as u}from"./_plugin-vue_export-helper-DlAUqK2U.js";const m={components:{PrimaryButton:i},props:{action:{type:Function},disabled:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},size:{type:String,default:"base",options:["xs","sm","base","lg"]},type:{type:String,default:"dark",options:["dark","success","light","primary","warning","danger"]}},computed:{iconClass(){let e=["leading-none"];return this.size=="xs"||this.size=="sm"?e.push("text-sm"):(this.size=="base"||this.size=="lg")&&e.push("text-xl"),e}}};function f(e,y,s,g,h,t){const a=n("PrimaryButton");return o(),l(a,{action:s.action,disabled:s.disabled,loading:s.loading,size:s.size,type:s.type},{default:r(()=>[d("span",{class:c(t.iconClass)},"＋",2),p(e.$slots,"default")]),_:3},8,["action","disabled","loading","size","type"])}const B=u(m,[["render",f]]);export{B as A};
