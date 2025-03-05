import{S as h}from"./SpinningLoader-BdvFuScB.js";import{r as g,o as n,c as b,b as c,f as u,e as p,z as f,m,n as d,i as y}from"./app-jXH5QC3l.js";/* empty css                                                                      */import{_ as x}from"./_plugin-vue_export-helper-DlAUqK2U.js";const v={components:{SpinningLoader:h},props:{action:{type:Function},disabled:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},size:{type:String,default:"base",options:["xs","sm","base","lg"]},type:{type:String,default:"dark",options:["dark","success","light","primary","warning","danger","custom"]},bgColor:{type:String,default:"#000000"},textColor:{type:String,default:"#ffffff"},rounding:{type:String,default:"rounded-lg"}},computed:{btnClass(){let e=["w-full h-full flex justify-center items-center "+this.rounding+" shadow-sm font-semibold relative"];return e.push(this.disabled?"cursor-not-allowed":"cursor-pointer"),this.size==="xs"?e.push("px-3 py-1.5 text-xs"):this.size==="sm"?e.push("px-3 py-1.5 sm:text-sm text-xs"):this.size==="base"?e.push("px-3 py-1.5 sm:text-base text-xs"):this.size==="lg"&&e.push("px-3 py-2.5 sm:text-base text-xs"),this.type!="light"&&e.push("border border-white/20"),this.type==="dark"?e.push("text-white",this.disabled?"bg-black/50":"bg-black hover:bg-black/80 active:bg-black/60"):this.type==="success"?e.push("text-white",this.disabled?"bg-green-600/50":"bg-green-600 hover:bg-green-600/80 active:bg-green-600/60"):this.type==="light"?e.push("text-black border border-gray-300",this.disabled?"bg-gray-50":"bg-gray-100 hover:bg-gray-50 active:bg-white"):this.type==="primary"?e.push("text-white",this.disabled?"bg-blue-600/50":"bg-blue-600 hover:bg-blue-600/80 active:bg-blue-600/60"):this.type==="danger"?e.push("text-white",this.disabled?"bg-red-600/50":"bg-red-600 hover:bg-red-600/80 active:bg-red-600/60"):this.type==="warning"&&e.push("text-white",this.disabled?"bg-yellow-400/50":"bg-yellow-400 hover:bg-yellow-400/80 active:bg-yellow-400/60"),e},btnStyle(){if(this.type==="custom"){const e=this.bgColor,s=this.textColor,t=this.adjustColorBrightness(e,-20),i=this.adjustColorBrightness(e,-40);return this.disabled?{cursor:"not-allowed",color:"#aaaaaa",backgroundColor:"#eeeeee"}:{color:s,backgroundColor:e,"--hover-color":t,"--active-color":i}}return{}}},methods:{adjustColorBrightness(e,s){let t=e.replace("#","");t.length===3&&(t=t.split("").map(l=>l+l).join(""));const i=parseInt(t,16);let r=(i>>16)+s,o=(i>>8&255)+s,a=(i&255)+s;return r=Math.min(255,Math.max(0,r)),o=Math.min(255,Math.max(0,o)),a=Math.min(255,Math.max(0,a)),`#${((1<<24)+(r<<16)+(o<<8)+a).toString(16).slice(1)}`}}},w=["disabled"],C={key:0,class:d(["absolute top-0.5 left-0.5 right-0.5 bottom-1/4 bg-gradient-to-t from-transparent via-transparent to-white/30 rounded-md"])};function k(e,s,t,i,r,o){const a=g("SpinningLoader");return n(),b("div",{class:d(["shadow",t.rounding])},[c("button",{type:"submit",onClick:s[0]||(s[0]=m((...l)=>t.action&&t.action(...l),["stop","prevent"])),disabled:t.disabled,class:d([o.btnClass,{"hover-enabled":!t.disabled&&t.type==="custom"}]),style:y(o.btnStyle)},[t.disabled?u("",!0):(n(),b("div",C)),t.loading?(n(),p(a,{key:1,type:"light"})):f(e.$slots,"default",{key:2},void 0,!0)],14,w)],2)}const M=x(v,[["render",k],["__scopeId","data-v-1a989528"]]);export{M as P};
