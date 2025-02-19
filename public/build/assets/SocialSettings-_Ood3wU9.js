import{s as _,u as I,c as l,b as e,d as r,F as u,k as f,e as S,w as c,f as h,r as m,o as i,t as V,h as B,y as A}from"./app-DGr24LlD.js";import{F as C}from"./FormMixin-DjJxif50.js";import{U as E}from"./UtilsMixin-CBwmyCNB.js";import{V as U}from"./vue-draggable-next.esm-bundler-DHn93z4r.js";import{u as T}from"./store-store-DY5zIoy1.js";import{T as N}from"./TextInput-D_8GVWar.js";import{A as j}from"./AddButton-nZlgoy6b.js";import{B as P}from"./BasicModal-Q2ql1QJ_.js";import{g as z}from"./api-repository-BpNKEdKW.js";import{S as D}from"./ShineEffect-BJj7S1ch.js";import{L as H}from"./LineSkeleton-DjmhLoqA.js";import{P as G}from"./PrimaryButton-Bke-6sJ-.js";import{F as q}from"./FormErrorMessages-H2z_xV0j.js";import{S as J}from"./SaveChangesAlert-C8Zpgx9-.js";import{_ as K}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./form-store-fTlv55Ng.js";import"./cloneDeep-BSUglKOW.js";import"./InputErrorMessage-xckJoMbN.js";import"./MoreInfoPopover-MomTL1G-.js";import"./SpinningLoader-C59uW44G.js";import"./SaveChanges-Ddg3nlZi.js";import"./Alert-BznNy-Vr.js";import"./UndoButton-DV6fzJWX.js";const O={mixins:[C,E],components:{draggable:U,TextInput:N,AddButton:j,BasicModal:P,ShineEffect:D,LineSkeleton:H,PrimaryButton:G,FormErrorMessages:q,SaveChangesAlert:J},data(){return{socialLink:{name:"",link:""},settings:_,socialMediaIcons:[],apiState:I(),storeState:T(),isLoadingSocialMediaIcons:!1}},computed:{store(){return this.storeState.store},storeForm(){return this.storeState.storeForm},canAddSocialLink(){return this.socialLink.name.length&&this.socialLink.link.length}},methods:{hasMatchingSocialMediaIcon(s){return this.socialMediaIcons.some(o=>o.name.toLowerCase()===s.toLowerCase())},addSocialLink(s){this.storeForm.socialLinks.some(g=>g.name===name)||this.storeForm.socialLinks.push({name:this.socialLink.name,link:this.socialLink.link}),this.socialLink.name="",this.socialLink.link="",s()},removeSocialLink(s){this.storeForm.socialLinks=this.storeForm.socialLinks.filter(o=>o.name!==s)},showSocialMediaIcons(){this.socialMediaIcons.length||(this.isLoadingSocialMediaIcons=!0,z(this.apiState.apiHome._links.showSocialMediaIcons).then(s=>{s.status==200&&(this.socialMediaIcons=s.data,this.setStoreForm()),this.isLoadingSocialMediaIcons=!1}).catch(s=>{this.isLoadingSocialMediaIcons=!1,this.setServerFormErrors(s)}))},setStoreForm(){this.storeState.setStoreForm(this.store)}},created(){this.showSocialMediaIcons()}},Q={class:"bg-white shadow-lg border p-8 rounded-lg mb-4"},R={class:"space-y-4 mt-4"},W={key:0,class:"space-y-2"},X={class:"w-full"},Y={class:"flex items-center py-1.5 pl-4 pr-4 rounded-l-md bg-gray-50 text-gray-500 border-r whitespace-nowrap"},Z=["src"],$=["onClick"],oo={key:2,class:"flex justify-end"},eo={class:"space-y-4"};function so(s,o,g,to,d,n){const w=m("FormErrorMessages"),L=m("SaveChangesAlert"),k=m("LineSkeleton"),y=m("ShineEffect"),p=m("TextInput"),M=m("draggable"),v=m("PrimaryButton"),x=m("AddButton"),F=m("BasicModal");return i(),l("div",Q,[o[10]||(o[10]=e("h1",{class:"text-lg font-bold mb-2"},"Social Links",-1)),o[11]||(o[11]=e("p",{class:"text-sm text-gray-500"}," Connect with your customers! ",-1)),o[12]||(o[12]=e("p",{class:"text-sm text-gray-500"}," Share your store’s social pages, groups, channels, or profiles to showcase your online community. ",-1)),e("div",R,[r(w),r(L),d.isLoadingSocialMediaIcons?(i(),l("div",W,[(i(),l(u,null,f([1,2,3],(t,a)=>e("div",{key:a,class:"border shadow-sm rounded-lg p-4 bg-gray-50"},[r(y,{class:"w-full flex items-center space-x-2"},{default:c(()=>[r(k,{width:"w-8"}),r(k,{width:"w-40"})]),_:1})])),64))])):(i(),S(M,{key:1,class:"space-y-2",modelValue:n.storeForm.socialLinks,"onUpdate:modelValue":o[0]||(o[0]=t=>n.storeForm.socialLinks=t),handle:".draggable-handle","ghost-class":"bg-yellow-50"},{default:c(()=>[(i(!0),l(u,null,f(n.storeForm.socialLinks,(t,a)=>(i(),l("div",{key:a,class:"flex items-center justify-between space-x-4"},[e("div",X,[r(p,{placeholder:"https://",modelValue:n.storeForm.socialLinks[a].link,"onUpdate:modelValue":b=>n.storeForm.socialLinks[a].link=b,errorText:s.getFormError("socialLinks"+a+"Name")||s.getFormError("socialLinks"+a+"Link")},{prepend:c(()=>[e("div",Y,[n.hasMatchingSocialMediaIcon(t.name)?(i(),l("img",{key:0,class:"w-8",src:d.settings.appApiUrl+"/images/social-icons/"+t.name.toLowerCase()+".png"},null,8,Z)):(i(),l(u,{key:1},[o[3]||(o[3]=e("svg",{class:"w-4 h-4 mr-2",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"})],-1)),e("span",null,V(t.name),1)],64))])]),_:2},1032,["modelValue","onUpdate:modelValue","errorText"])]),this.hasMatchingSocialMediaIcon(t.name)?h("",!0):(i(),l("svg",{key:0,onClick:()=>n.removeSocialLink(t.name),class:"w-4 h-4 cursor-pointer hover:text-red-500",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},o[4]||(o[4]=[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"},null,-1)]),8,$)),o[5]||(o[5]=e("svg",{class:"draggable-handle w-4 h-4 cursor-grab hover:text-yellow-500 active:cursor-grabbing",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"})],-1))]))),128))]),_:1},8,["modelValue"])),d.isLoadingSocialMediaIcons?h("",!0):(i(),l("div",oo,[r(F,null,{content:c(t=>[o[7]||(o[7]=e("h1",{class:"font-lg font-bold mb-2"},"Add Social Link",-1)),o[8]||(o[8]=e("p",{class:"text-sm text-gray-500 mb-4"},"Give us the name of the social media platform and your store link",-1)),e("div",eo,[r(p,{placeholder:"MySpace",modelValue:d.socialLink.name,"onUpdate:modelValue":o[1]||(o[1]=a=>d.socialLink.name=a)},null,8,["modelValue"]),r(p,{modelValue:d.socialLink.link,"onUpdate:modelValue":o[2]||(o[2]=a=>d.socialLink.link=a),placeholder:"https://"},null,8,["modelValue"])]),n.canAddSocialLink?(i(),S(v,{key:0,action:()=>n.addSocialLink(t.hideModal),size:"sm",type:"success",class:"mt-4"},{default:c(()=>o[6]||(o[6]=[B(" Add ")])),_:2},1032,["action"])):h("",!0)]),trigger:c(t=>[A(s.$slots,"trigger",{showModal:t.showModal},()=>[r(x,{action:t.showModal,size:"sm"},{default:c(()=>o[9]||(o[9]=[e("span",{class:"ml-2"},"Add",-1)])),_:2},1032,["action"])])]),_:3})]))])])}const Io=K(O,[["render",so]]);export{Io as default};
