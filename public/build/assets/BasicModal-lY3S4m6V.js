import{q as n,M as i,o as r,c,k as d,d as t,F as h}from"./app--JSNtfaf.js";import{U as m}from"./SpiningLoader-J1-nNIfa.js";import{_ as u}from"./_plugin-vue_export-helper-DlAUqK2U.js";const p={mixins:[m],props:{placement:{type:String,default:"center",validator:e=>["top-left","top-center","top-right","center-left","center","center-right","bottom-left","bottom-center","bottom-right"].includes(e)},backdrop:{type:String,default:"dynamic",validator:e=>["static","dynamic"].includes(e)},backdropClasses:{type:String,default:""},onToggle:{type:Function,default:()=>{}},onShow:{type:Function,default:()=>{}},onHide:{type:Function,default:()=>{}}},data(){return{modal:null,modalUniqueId:this.generateUniqueId("modal")}},methods:{showModal(){this.modal.show()},hideModal(){this.modal.hide()}},mounted(){n();const e=document.getElementById(this.modalUniqueId),s={placement:this.placement,backdrop:this.backdrop,onToggle:this.onToggle,onShow:this.onShow,onHide:this.onHide};this.backdropClasses&&(s.backdropClasses=this.backdropClasses),e&&(this.modal=new i(e,s))}},f=["id"],g={class:"relative p-4 w-full max-w-md max-h-full"},w={class:"relative bg-white rounded-lg shadow"},_=t("svg",{class:"w-3 h-3","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 14 14"},[t("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"})],-1),b=t("span",{class:"sr-only"},"Close modal",-1),M=[_,b],y={class:"p-4 md:p-5"};function k(e,s,v,x,a,o){return r(),c(h,null,[d(e.$slots,"trigger",{showModal:o.showModal,hideModal:o.hideModal}),t("div",{id:a.modalUniqueId,tabindex:"-1",class:"hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"},[t("div",g,[t("div",w,[t("button",{onClick:s[0]||(s[0]=(...l)=>o.hideModal&&o.hideModal(...l)),type:"button",class:"absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"},M),t("div",y,[d(e.$slots,"content",{showModal:o.showModal,hideModal:o.hideModal})])])])],8,f)],64)}const F=u(p,[["render",k]]);export{F as B};