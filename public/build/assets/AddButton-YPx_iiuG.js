import{P as i}from"./PrimaryButton-DULDYb5e.js";import{o,f as n,w as l,d as r,q as d,k as c,r as p}from"./app-Kf0mCOXy.js";import{_ as u}from"./_plugin-vue_export-helper-DlAUqK2U.js";const f={components:{PrimaryButton:i},props:{action:{type:Function},disabled:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},size:{type:String,default:"base",options:["xs","sm","base","lg"]},type:{type:String,default:"dark",options:["dark","success","light","primary","warning","danger"]}},computed:{iconClass(){let e=["leading-none"];return this.size=="xs"||this.size=="sm"?e.push("text-sm"):(this.size=="base"||this.size=="lg")&&e.push("text-xl"),e}}};function m(e,y,s,g,h,t){const a=p("PrimaryButton");return o(),n(a,{action:s.action,disabled:s.disabled,loading:s.loading,size:s.size,type:s.type},{default:l(()=>[r("span",{class:d(t.iconClass)},"＋",2),c(e.$slots,"default")]),_:3},8,["action","disabled","loading","size","type"])}const B=u(f,[["render",m]]);export{B as A};
