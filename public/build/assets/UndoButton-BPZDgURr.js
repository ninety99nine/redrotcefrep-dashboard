import{P as n}from"./PrimaryButton-BY_y1Rjt.js";import{o,e as i,w as l,b as r,n as d,A as c,r as p}from"./app-grlxYGJ_.js";import{_ as u}from"./_plugin-vue_export-helper-DlAUqK2U.js";const f={components:{PrimaryButton:n},props:{action:{type:Function},disabled:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},size:{type:String,default:"base",options:["xs","sm","base","lg"]},type:{type:String,default:"dark",options:["dark","success","light","primary","warning","danger"]}},computed:{iconClass(){let e=["leading-none -mt-1"];return this.size=="xs"||this.size=="sm"?e.push("text-xl"):(this.size=="base"||this.size=="lg")&&e.push("text-2xl"),e}}};function m(e,x,t,y,g,s){const a=p("PrimaryButton");return o(),i(a,{action:t.action,disabled:t.disabled,loading:t.loading,size:t.size,type:t.type},{default:l(()=>[r("span",{class:d(s.iconClass)},"⟲",2),c(e.$slots,"default")]),_:3},8,["action","disabled","loading","size","type"])}const B=u(f,[["render",m]]);export{B as U};
