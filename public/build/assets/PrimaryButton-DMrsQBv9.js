import{S as r}from"./SpiningLoader-J1-nNIfa.js";import{o as i,c as n,d,g as b,k as g,m as p,n as h,r as c}from"./app--JSNtfaf.js";import{_ as u}from"./_plugin-vue_export-helper-DlAUqK2U.js";const y={components:{SpiningLoader:r},props:{action:{type:Function},disabled:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},size:{type:String,default:"base",options:["xs","sm","base","lg"]},type:{type:String,default:"dark",options:["dark","success","light","primary","warning","danger"]}},computed:{btnClass(){let e=["w-full h-full flex justify-center items-center rounded-md shadow-sm font-semibold"];return e.push(this.disabled?"cursor-not-allowed":"cursor-pointer"),this.size=="xs"?e.push("px-3 py-1.5 text-xs"):this.size=="sm"?e.push("px-3 py-1.5 text-sm"):this.size=="base"?e.push("px-3 py-1.5 text-base"):this.size=="lg"&&e.push("px-3 py-2.5 text-base"),this.type=="dark"?e.push("text-white",this.disabled?"bg-black/50":"bg-black hover:bg-black/80 active:bg-black/60"):this.type=="success"?e.push(["text-white",this.disabled?"bg-green-500/50":"bg-green-500 hover:bg-green-500/80 active:bg-green-500/60"]):this.type=="light"?e.push(["text-black border border-gray-300",this.disabled?"bg-gray-50":"bg-gray-100 hover:bg-gray-50 active:bg-white"]):this.type=="primary"?e.push(["text-white",this.disabled?"bg-blue-600/50":"bg-blue-600 hover:bg-blue-600/80 active:bg-blue-600/60"]):this.type=="danger"?e.push(["text-white",this.disabled?"bg-red-600/50":"bg-red-600 hover:bg-red-600/80 active:bg-red-600/60"]):this.type=="warning"&&e.push(["text-white",this.disabled?"bg-yellow-400/50":"bg-yellow-400 hover:bg-yellow-400/80 active:bg-yellow-400/60"]),e}}},f={class:"shadow rounded-md"},m=["disabled"];function x(e,s,t,w,k,a){const l=c("SpiningLoader");return i(),n("div",f,[d("button",{type:"submit",onClick:s[0]||(s[0]=p((...o)=>t.action&&t.action(...o),["prevent"])),disabled:t.disabled,class:h(a.btnClass)},[t.loading?(i(),b(l,{key:0,type:"light"})):g(e.$slots,"default",{key:1})],10,m)])}const S=u(y,[["render",x]]);export{S as P};
