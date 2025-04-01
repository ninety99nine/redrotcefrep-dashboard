import{c as u,i as V}from"./cloneDeep-BGE7Bmb-.js";import{F as E}from"./FormMixin-D44Bj-el.js";import{B as T}from"./Button-CTlUNYLQ.js";import{U as I}from"./form-store-B_ZbhArT.js";import{u as C,c as r,b as s,d as l,F as S,k as p,h as A,t as c,f as k,n as F,w,T as B,r as m,o as a,e as b}from"./app-DEkFCb1u.js";import{u as z}from"./store-store-CxinBL3L.js";import{T as N}from"./TextInput-CwB-G_mS.js";import{S as j}from"./StoreLogo-B1ybiOu7.js";import{L as U}from"./LineSkeleton-DFWRI7XC.js";import{g as Z,a as H}from"./api-repository-CIJPUswr.js";import{T as R}from"./ToogleSwitch-CtY-gb5u.js";import{F as Y}from"./FormErrorMessages-T64AgTW8.js";import{_ as q}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./ShineEffect-CWpUJr6E.js";import"./SpinningLoader-BnJGVf_7.js";import"./InputErrorMessage-lzTzq-uZ.js";import"./MoreInfoPopover-CrxGv8yo.js";const D={mixins:[E,I],components:{Button:T,TextInput:N,StoreLogo:j,LineSkeleton:U,ToogleSwitch:R,FormErrorMessages:Y},data(){return{socialLinks:[],socialMediaIcons:[],originalSocialLinks:[],apiState:C(),isSubmittingStore:!1,storeState:z(),isLoadingSocialMediaIcons:!1}},computed:{store(){return this.storeState.store},hasSelectedSocialLinks(){return this.socialLinks.some(e=>e.active)},totalSelectedSocialLinks(){return this.socialLinks.filter(e=>e.active).length},socialLinksHaveChanged(){var e=u(this.socialLinks),t=u(this.originalSocialLinks);return!V(e,t)},socialLinkValidationErrors(){return this.socialLinks.filter(e=>e.active).map(e=>{const t=new RegExp("^(https?:\\/\\/)?([a-zA-Z0-9-]+\\.)?[a-zA-Z0-9-]+\\.[a-zA-Z]{2,6}(:[0-9]{1,5})?(\\/[^\\s]*)?$");let o="";return e.link.trim()===""?o=`The ${e.name} link is required`:t.test(e.link.trim())||(o=`The ${e.name} link is incorrect`),o?{name:e.name,message:o}:null}).filter(e=>e!==null)},hasSocialLinkValidationErrors(){return this.socialLinkValidationErrors.length>0}},methods:{hasMatchingSocialLinkError(e){return this.socialLinkValidationErrors.some(t=>t.name==e)},getMatchingSocialLinkError(e){const t=this.socialLinkValidationErrors.find(o=>o.name==e);return t?t.message:null},getMatchingSocialMediaIcon(e){return this.socialMediaIcons.find(t=>t.name.toLowerCase()===e.toLowerCase())},showSocialMediaIcons(){this.socialMediaIcons.length||(this.isLoadingSocialMediaIcons=!0,Z(this.apiState.apiHome._links.showSocialMediaIcons).then(e=>{e.status==200&&(this.socialMediaIcons=e.data,this.socialLinks=u(this.socialMediaIcons.map(t=>{const o=this.store.socialLinks.find(f=>f.name.toLowerCase()==t.name.toLowerCase());return o||{link:"",active:!1,name:t.name}})),this.originalSocialLinks=u(this.socialLinks)),this.isLoadingSocialMediaIcons=!1}).catch(e=>{this.isLoadingSocialMediaIcons=!1,this.formState.setServerFormErrors(e)}))},updateStore(){this.isSubmittingStore=!0;const t={return:"1",socialLinks:this.socialLinks.filter(o=>o.link!=null&&o.link.trim()!="")};H(this.store._links.updateStore,t).then(o=>{o.status==200&&o.data.updated==!0?(this.notificationState.showSuccessNotification("Social links updated"),this.originalSocialLinks=u(this.socialLinks),this.storeState.setStore(o.data.store),this.navigateToAddAdvancedFeatures()):(this.notificationState.showWarningNotification(o.data.message??"Social link update failed"),useNotificationState().showWarningNotification(o.data.message)),this.isSubmittingStore=!1}).catch(o=>{this.isSubmittingStore=!1,this.formState.setServerFormErrors(o)})},navigateToAddAdvancedFeatures(){this.$router.push({name:"advanced-features",params:{store_href:this.store._links.showStore}})}},beforeRouteLeave(e,t,o){if((this.isSubmittingStore||this.socialLinksHaveChanged)&&!window.confirm("You have unsaved changes. Are you sure you want to leave?"))return o(!1);o()},created(){this.showSocialMediaIcons()}},W={class:"min-h-screen flex flex-col items-center pt-20 pb-40"},G={class:"w-full max-w-lg"},J={class:"w-full max-w-lg"},K={class:"mb-4"},O={key:0,class:"space-y-2"},P={class:"w-full flex items-center space-x-2"},Q={key:1,class:"space-y-3 mb-4"},X={class:"flex justify-between items-center"},$={class:"flex items-center space-x-2 font-bold"},ee={class:"w-8 h-8 rounded-full overflow-hidden flex items-center justify-center"},te=["src"],se={class:"text-sm"},oe={key:0,class:"w-full mt-4"},ie={key:0,class:"flex space-x-1 text-xs text-yellow-600 font-semibold bg-yellow-100 border border-yellow-300 p-3 rounded-lg shadow-md mt-2"},ae={key:0,class:"list-disc text-xs text-yellow-600 bg-yellow-100 border border-yellow-300 py-3 px-4 rounded-lg shadow-md mb-4"},ne={class:"space-y-1"},re={key:1,class:"text-blue-600 bg-blue-100 border border-blue-300 p-3 rounded-lg shadow-md mb-4"},le={class:"flex items-center space-x-2"},ce={key:0,class:"text-sm font-semibold"},de={class:"font-bold"},me={class:"flex justify-end"};function ue(e,t,o,f,h,i){const x=m("StoreLogo"),v=m("LineSkeleton"),L=m("ToogleSwitch"),y=m("TextInput"),M=m("FormErrorMessages"),_=m("Button");return a(),r("div",W,[s("div",G,[l(x,{showButton:!1,class:"flex justify-center mb-4"}),t[0]||(t[0]=s("h2",{class:"text-2xl font-semibold text-center mb-2"},"Connect Your Socials",-1)),t[1]||(t[1]=s("p",{class:"text-gray-500 text-center mb-6"},"Make it easy for customers to find and follow you",-1))]),s("div",J,[s("div",K,[h.isLoadingSocialMediaIcons?(a(),r("div",O,[(a(),r(S,null,p([1,2,3],(n,d)=>s("div",{key:d,class:"border shadow-sm rounded-lg p-4 bg-gray-50"},[s("div",P,[l(v,{width:"w-8",shine:!0}),l(v,{width:"w-40",shine:!0})])])),64))])):(a(),r("div",Q,[(a(!0),r(S,null,p(h.socialLinks,(n,d)=>(a(),r("div",{key:d,class:"bg-white p-4 shadow-sm rounded-xl transition-all duration-300 border border-transparent hover:border-gray-300 hover:shadow-lg cursor-pointer"},[s("div",X,[s("div",$,[s("div",ee,[s("img",{alt:"Social Media Logo",class:"h-full object-contain",src:i.getMatchingSocialMediaIcon(n.name).icon.toLowerCase()},null,8,te)]),s("span",se,c(n.name),1)]),l(L,{size:"md",modelValue:n.active,"onUpdate:modelValue":g=>n.active=g},null,8,["modelValue","onUpdate:modelValue"])]),n.active?(a(),r("div",oe,[l(y,{placeholder:"https://",modelValue:n.link,"onUpdate:modelValue":g=>n.link=g,label:`${e.capitalize(n.name)} link`,errorText:e.getFormError("socialLinks"+d+"Link")},null,8,["modelValue","onUpdate:modelValue","label","errorText"]),i.hasMatchingSocialLinkError(n.name)?(a(),r("p",ie,[t[2]||(t[2]=s("svg",{class:"w-4 h-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[s("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"})],-1)),s("span",null,c(i.getMatchingSocialLinkError(n.name)),1)])):k("",!0)])):k("",!0)]))),128))]))]),i.hasSocialLinkValidationErrors?(a(),r("div",ae,[t[3]||(t[3]=s("p",{class:"text-lg font-semibold mb-2"},"Resolve these to continue",-1)),s("ul",ne,[(a(!0),r(S,null,p(i.socialLinkValidationErrors,(n,d)=>(a(),r("li",{key:d},c(n.message),1))),128))])])):(a(),r("div",re,[s("div",le,[t[4]||(t[4]=s("svg",{class:"w-8 h-8",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[s("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"})],-1)),s("div",null,[i.hasSelectedSocialLinks?(a(),r("p",ce,[A(c(i.store.name)+" supports ",1),s("span",de,c(i.totalSelectedSocialLinks)+" "+c(i.totalSelectedSocialLinks==1?"social platform":"social platforms"),1)])):k("",!0),s("p",{class:F([i.hasSelectedSocialLinks?"text-xs":"text-sm font-semibold"])},"You can always "+c(i.hasSelectedSocialLinks?"add more":"add")+" social links later! 😊",3)])])])),l(M,{class:"mb-4"}),s("div",me,[l(B,{name:"fade-1",mode:"out-in"},{default:w(()=>[i.socialLinksHaveChanged||i.hasSelectedSocialLinks?(a(),b(_,{key:0,size:"md",class:"w-full",type:"primary",action:i.updateStore,loading:h.isSubmittingStore,disabled:h.isSubmittingStore||i.hasSocialLinkValidationErrors},{default:w(()=>t[5]||(t[5]=[s("span",null,"Continue",-1)])),_:1},8,["action","loading","disabled"])):(a(),b(_,{key:1,size:"md",class:"w-40",type:"light",icon:"short-right-arrow",action:i.navigateToAddAdvancedFeatures},{default:w(()=>t[6]||(t[6]=[s("span",null,"Skip",-1)])),_:1},8,["action"]))]),_:1})])])])}const Ie=q(D,[["render",ue]]);export{Ie as default};
