import{c as C,i as J}from"./cloneDeep-Cj89CU0d.js";import{v as K,o as e,f as m,w as c,c as a,g as p,k as F,r as l,G as Q,d as t,q as E,e as s,t as u,F as y,u as X,s as Y,i as g}from"./app-Kf0mCOXy.js";import{A as $}from"./Alert-BHnqwbfj.js";import{F as tt}from"./FormMixin-CYiBG1ca.js";import{U as et}from"./SpiningLoader-CsPmXxst.js";import{u as M}from"./store-store-C2_eLuQh.js";import{T as st}from"./TextHeader-Cdgnrugi.js";import{B as nt}from"./BackButton-CDDlBeJF.js";import{P as x}from"./PrimaryButton-DULDYb5e.js";import{_ as k}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{C as ot}from"./Countdown-DUZ8UJo6.js";import{E as at}from"./ExternalLink-B9g8l3Kp.js";import{C as it}from"./ConfirmModal-DrJlS0Sa.js";import{S as L,L as S}from"./LineSkeleton-Ckj2823e.js";import{R as j}from"./RoundSkeleton-iGOJ3AXy.js";import{B as rt}from"./ButtonSkeleton-D19HL1xt.js";import{M as A}from"./MoreInfoPopover-gLIaCQca.js";import{B as D}from"./BadgeIndicator-BRfv_GU4.js";import{F as ct}from"./FormErrorMessages-Bdf-el1D.js";import{g as V,p as lt,d as dt}from"./api-repository-C4cDgx_E.js";import{T as ht}from"./TransactionPaymentStatus-B3cQRMNh.js";import"./StatusDot-B0b3cfnt.js";const mt={components:{PrimaryButton:x},props:{action:{type:Function},disabled:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},size:{type:String,default:"base",options:["xs","sm","base","lg"]},type:{type:String,default:"dark",options:["dark","success","light","primary","warning","danger"]},content:{type:String,default:""}},data(){return{showText:!1,copyTimeout:null}},methods:{copyToClipboard(){this.showText=!0,this.copyTimeout==null&&clearInterval(this.copyTimeout),this.copyTimeout=setTimeout(()=>{this.showText=!1,clearInterval(this.copyTimeout)},1e3),this.action&&this.action()}}},ut={key:0,class:"w-4 h-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},pt=t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"},null,-1),_t=[pt],ft={key:1};function wt(n,h,d,v,i,o){const f=l("PrimaryButton"),r=Q("clipboard");return K((e(),m(f,{action:o.copyToClipboard,disabled:d.disabled,loading:d.loading,size:d.size,type:d.type},{default:c(()=>[i.showText?p("",!0):(e(),a("svg",ut,_t)),i.showText?(e(),a("span",ft,"Copied!")):F(n.$slots,"default",{key:2})]),_:3},8,["action","disabled","loading","size","type"])),[[r,d.content]])}const yt=k(mt,[["render",wt]]),gt={components:{PrimaryButton:x},props:{action:{type:Function},disabled:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},size:{type:String,default:"base",options:["xs","sm","base","lg"]},type:{type:String,default:"light",options:["dark","success","light","primary","warning","danger"]}},computed:{iconClass(){let n=["leading-none -mt-1"];return this.size=="base"||this.size=="lg"?n.push("w-6 h-6 mt-0.5"):(this.size=="sm",n.push("w-4 h-4 mt-0.5")),n}}},kt=t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"},null,-1),vt=[kt];function xt(n,h,d,v,i,o){const f=l("PrimaryButton");return e(),m(f,{action:d.action,disabled:d.disabled,loading:d.loading,size:d.size,type:d.type},{default:c(()=>[F(n.$slots,"default"),(e(),a("svg",{class:E(o.iconClass),xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},vt,2))]),_:3},8,["action","disabled","loading","size","type"])}const Tt=k(gt,[["render",xt]]),bt={components:{ShineEffect:L,LineSkeleton:S,PrimaryButton:x,RoundSkeleton:j},props:{transaction:{type:Object},isLoadingTransaction:{type:Boolean}},data(){return{storeState:M()}},computed:{store(){return this.storeState.store},owner(){return((this.transaction||{})._relationships||{}).owner||null},transactionForOrder(){return((this.transaction||{}).ownerType||"").toLowerCase()=="order"},transactionForPricingPlan(){return((this.transaction||{}).ownerType||"").toLowerCase()=="pricing plan"}},methods:{onViewOrder(){this.$router.push({name:"show-store-order",params:{store_href:this.store._links.showStore,order_href:this.owner._links.showOrder}}).then(()=>{window.scrollTo(0,0)})}}},Ct={class:"bg-white shadow-lg rounded-lg border space-y-3 p-4"},Lt={class:"flex items-center space-x-2"},St={key:1,class:"p-1.5 bg-gray-100 rounded-full border border-gray-200"},Bt={key:0,class:"w-4 h-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},Pt=t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"},null,-1),Mt=[Pt],Vt={key:1,class:"w-4 h-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},Ft=t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"},null,-1),Et=[Ft],jt={key:3,class:"font-bold text-lg"},At={key:4,class:"font-bold text-lg"},Dt={key:5,class:"font-bold text-lg"},It={key:0,class:"text-xs"},zt={key:1,class:"flex justify-end"},Ht=t("span",null,"View Order",-1);function Nt(n,h,d,v,i,o){const f=l("RoundSkeleton"),r=l("ShineEffect"),_=l("LineSkeleton"),T=l("PrimaryButton");return e(),a("div",Ct,[t("div",Lt,[d.isLoadingTransaction?(e(),m(r,{key:0},{default:c(()=>[s(f,{size:"w-6 h-6"})]),_:1})):(e(),a("div",St,[o.transactionForOrder?(e(),a("svg",Bt,Mt)):(e(),a("svg",Vt,Et))])),d.isLoadingTransaction?(e(),m(r,{key:2},{default:c(()=>[s(_,{width:"w-32"})]),_:1})):o.transactionForOrder?(e(),a("span",jt,"Order #"+u(o.owner._attributes.number),1)):o.transactionForPricingPlan?(e(),a("span",At,u(o.owner.name),1)):(e(),a("span",Dt,"..."))]),o.transactionForPricingPlan?(e(),a("span",It,u(o.owner.description),1)):p("",!0),o.transactionForOrder?(e(),a("div",zt,[s(T,{size:"xs",type:"primary",iconClass:"w-4 h-4",onClick:h[0]||(h[0]=w=>o.onViewOrder())},{default:c(()=>[Ht]),_:1})])):p("",!0)])}const Rt=k(bt,[["render",Nt]]),Ot={components:{ShineEffect:L,LineSkeleton:S,PrimaryButton:x},props:{transaction:{type:Object},isLoadingTransaction:{type:Boolean}},data(){return{storeState:M()}},computed:{store(){return this.storeState.store},hasCustomer(){return this.transaction._relationships.customer!=null},customer(){return this.transaction._relationships.customer}},methods:{onViewCustomer(){this.$router.push({name:"show-store-customer",params:{store_href:this.store._links.showStore,customer_href:this.customer._links.showCustomer}}).then(()=>{window.scrollTo(0,0)})}}},Ut={class:"bg-white shadow-lg rounded-lg border space-y-3 p-4"},Zt={class:"flex items-center space-x-2"},qt=t("div",{class:"p-1.5 bg-gray-100 rounded-full border border-gray-200"},[t("svg",{class:"w-4 h-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"})])],-1),Wt={key:1,class:"font-bold"},Gt={key:2,class:"font-bold text-lg"},Jt={class:"space-y-2"},Kt={key:0,class:"flex items-center space-x-2 text-sm"},Qt=t("svg",{class:"w-4 h-4 text-gray-500",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"})],-1),Xt={key:1,class:"font-bold"},Yt={key:1,class:"flex items-center space-x-2 text-sm"},$t=t("svg",{class:"w-4 h-4 text-gray-500",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"})],-1),te={key:1,class:"font-bold"},ee={key:1,class:"text-xs"},se={key:0,class:"flex justify-end"},ne=t("span",null,"View Customer",-1);function oe(n,h,d,v,i,o){const f=l("LineSkeleton"),r=l("ShineEffect"),_=l("PrimaryButton");return e(),a("div",Ut,[t("div",Zt,[qt,d.isLoadingTransaction?(e(),m(r,{key:0},{default:c(()=>[s(f,{width:"w-32"})]),_:1})):o.hasCustomer?(e(),a("span",Wt,u(o.customer._attributes.name),1)):(e(),a("span",Gt,"Customer"))]),t("div",Jt,[d.isLoadingTransaction||o.hasCustomer&&(o.customer.mobileNumber||o.customer.email)?(e(),a(y,{key:0},[d.isLoadingTransaction||o.customer.mobileNumber?(e(),a("div",Kt,[Qt,d.isLoadingTransaction?(e(),m(r,{key:0},{default:c(()=>[s(f,{width:"w-32"})]),_:1})):(e(),a("span",Xt,u(o.customer.mobileNumber.national),1))])):p("",!0),d.isLoadingTransaction||o.customer.email?(e(),a("div",Yt,[$t,d.isLoadingTransaction?(e(),m(r,{key:0},{default:c(()=>[s(f,{width:"w-32"})]),_:1})):(e(),a("span",te,u(o.customer.email),1))])):p("",!0)],64)):(e(),a("span",ee,"No information"))]),!d.isLoadingTransaction&&o.hasCustomer?(e(),a("div",se,[s(_,{size:"xs",type:"primary",iconClass:"w-4 h-4",onClick:h[0]||(h[0]=T=>o.onViewCustomer())},{default:c(()=>[ne]),_:1})])):p("",!0)])}const ae=k(Ot,[["render",oe]]),ie={components:{ShineEffect:L,LineSkeleton:S,MoreInfoPopover:A,BadgeIndicator:D},props:{transaction:{type:Object}}},re={class:"flex space-x-1 items-center"};function ce(n,h,d,v,i,o){const f=l("BadgeIndicator"),r=l("MoreInfoPopover");return e(),a("div",re,[s(f,{type:"danger",text:d.transaction.failureType,showDot:!1},null,8,["text"]),s(r,{description:d.transaction.failureReason,placement:"top"},null,8,["description"])])}const le=k(ie,[["render",ce]]),de={mixins:[et,tt],components:{Alert:$,TextHeader:st,BackButton:nt,CopyButton:yt,Countdown:ot,ExternalLink:at,ConfirmModal:it,ShineEffect:L,LineSkeleton:S,PrimaryButton:x,ProceedButton:Tt,RoundSkeleton:j,ButtonSkeleton:rt,MoreInfoPopover:A,BadgeIndicator:D,TransactionOwner:Rt,FormErrorMessages:ct,TransactionFailureType:le,TransactionCustomer:ae,TransactionPaymentStatus:ht},data(){return{form:{paymentMethodId:null,description:null,amount:null},transaction:null,isDeleting:!1,isSubmitting:!1,apiState:X(),appName:Y.appName,storeState:M(),isRenewingPaymentLink:!1}},watch:{"$route.params.transaction_href"(n,h){window.scrollTo(0,0),this.getTransaction()}},computed:{store(){return this.storeState.store},isPaid(){return((this.transaction||{})._attributes||{}).isPaid},isPendingPayment(){return((this.transaction||{})._attributes||{}).isPendingPayment},hasCustomer(){return this.customer!=null},hasTransaction(){return this.transaction!=null},customer(){return((this.transaction||{})._relationships||{}).customer},paymentMethod(){return((this.transaction||{})._relationships||{}).paymentMethod||null},requestedByUser(){return((this.transaction||{})._relationships||{}).requestedByUser||null},manuallyVerifiedByUser(){return((this.transaction||{})._relationships||{}).manuallyVerifiedByUser||null},isCreating(){return this.$route.name==="create-store-transaction"},isEditting(){return this.$route.name==="show-store-transaction"},formHasChanged(){var n=C(this.form),h=C(this.originalForm);return!J(n,h)},mustSaveChanges(){return this.isEditting&&this.formHasChanged&&!this.isLoadingTransaction&&!this.isSubmitting},mustCreate(){return this.isCreating&&this.formHasChanged&&!this.isLoadingTransaction&&!this.isSubmitting}},methods:{goBack(){this.$router.replace({name:"show-store-transactions",params:{store_href:this.store._links.showStore}})},openPaymentLinkInNewTab(){window.open(this.transaction.metadata.dpoPaymentUrl,"_blank")},getTransaction(){this.isLoadingTransaction=!0;const n={_relationships:"customer,requestedByUser,manuallyVerifiedByUser,paymentMethod,owner"};V(this.$route.params.transaction_href,n).then(h=>{h.status==200&&(this.transaction=h.data.transaction),this.isLoadingTransaction=!1}).catch(h=>{this.isLoadingTransaction=!1,this.setServerFormErrors(h)})},renewTransactionPaymentLink(){this.isRenewingPaymentLink=!0,lt(this.transaction._links.renewTransactionPaymentLink).then(n=>{n.status==200&&(this.showSuccessfulNotification("Transaction renewed"),this.getTransaction()),this.isRenewingPaymentLink=!1}).catch(n=>{this.isRenewingPaymentLink=!1,this.setServerFormErrors(n)})},updateTransaction(){this.isSubmitting=!0;const n={};V(this.transaction._links.updateTransaction,n).then(h=>{h.status==200&&(this.originalForm=C(this.form),this.showSuccessfulNotification("Transaction updated")),this.isSubmitting=!1}).catch(h=>{this.isSubmitting=!1,this.setServerFormErrors(h)})},deleteTransaction(){this.isDeleting=!0,dt(this.transaction._links.deleteTransaction).then(n=>{n.status==200&&(n.data.deleted?(this.showSuccessfulNotification("Transaction deleted"),this.$router.push({name:"show-store-transactions",params:{store_href:this.store._links.showStore}}),window.scrollTo(0,0)):(this.setFormError("general",n.data.message),this.showUnsuccessfulNotification(n.data.message))),this.isDeleting=!1}).catch(n=>{this.isDeleting=!1,this.setServerFormErrors(n)})}},created(){this.originalForm=C(this.form),this.isEditting&&this.getTransaction()}},he={class:"flex justify-between items-center border-dashed py-6"},me={class:"flex justify-start"},ue={key:0,class:"flex items-center space-x-2"},pe=t("span",{class:"text-2xl font-bold tracking-tight text-gray-300 animate-pulse"},"Transaction #",-1),_e={key:1,class:"flex items-center"},fe={key:0,class:"flex space-x-1 items-center"},we=t("span",null,"Created:",-1),ye={class:"font-bold"},ge={class:"relative",action:"#",method:"POST"},ke={class:"flex items-center space-x-2"},ve=t("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"})],-1),xe={class:"grid grid-cols-12 gap-4 mb-8"},Te={class:"col-span-8"},be={class:"bg-white shadow-lg rounded-lg border space-y-4 p-4 mb-4"},Ce={class:"flex items-center space-x-8"},Le={class:"flex items-center space-x-2"},Se=t("span",{class:"text-xs"},"Status:",-1),Be={key:1,class:"flex items-center space-x-2"},Pe=t("span",{class:"text-xs"},"Payment Method:",-1),Me={key:1,class:"flex space-x-1 items-center"},Ve={class:"text-xs font-bold"},Fe={class:"w-full space-y-2"},Ee={key:1},je={key:0,class:"flex items-center space-x-2 border-b border-dashed pb-4 mb-4"},Ae=t("span",{class:"text-xs"},"Payment Method:",-1),De={class:"flex space-x-1 items-center"},Ie={class:"text-xs font-bold"},ze={class:"flex items-center space-x-2 text-sm"},He=t("svg",{class:"w-6 h-6",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"})],-1),Ne={class:"flex items-center bg-white shadow-lg rounded-lg border space-y-4 p-4 mb-4"},Re={class:"w-full space-y-4"},Oe={class:"flex items-end space-x-2"},Ue={class:"text-4xl font-bold"},Ze={key:0,class:"text-2xl text-gray-400"},qe={key:0,class:"flex items-center space-x-2 text-sm"},We=t("span",{class:"whitespace-nowrap"},"Date Paid: ",-1),Ge={class:"flex items-center space-x-2"},Je={class:"font-bold"},Ke={key:1,class:"flex items-center justify-between"},Qe={key:1,class:"flex items-center space-x-2"},Xe=t("span",null,"Payment Link Expires In: ",-1),Ye=t("svg",{class:"w-4 h-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"})],-1),$e=t("span",{class:"ml-1"},"Copy Payment Link",-1),ts=t("svg",{class:"w-4 h-4 mr-2",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"})],-1),es=t("span",null,"Pay Now",-1),ss={key:1,class:"flex space-x-2"},ns=t("span",{class:"ml-1"},"Copy Payment Link",-1),os=t("svg",{class:"w-4 h-4 mr-2",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"})],-1),as=t("span",null,"Pay Now",-1),is={key:2,class:"flex justify-end"},rs=t("svg",{class:"w-4 h-4 mr-2",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"})],-1),cs=t("span",null,"Renew Payment Link",-1),ls={key:0,class:"border rounded-full bg-gray-50"},ds=t("svg",{class:"w-20 h-20 text-green-500",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor"},[t("path",{"fill-rule":"evenodd",d:"M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z","clip-rule":"evenodd"})],-1),hs=[ds],ms={class:"col-span-4 space-y-4"},us={class:"flex flex-col justify-between bg-white shadow-lg rounded-lg border space-y-2 p-4"},ps={class:"flex items-center space-x-2 text-sm"},_s=t("span",{class:"whitespace-nowrap"},"Requester: ",-1),fs={class:"font-bold"},ws={class:"flex items-center space-x-2 text-sm"},ys=t("span",{class:"whitespace-nowrap"},"Verifyer: ",-1),gs={key:0,class:"font-bold"},ks={key:1,class:"font-bold"},vs={class:"flex items-center space-x-2 text-sm"},xs=t("span",{class:"whitespace-nowrap"},"Verification Method: ",-1),Ts={class:"flex items-center whitespace-pre"},bs=t("span",null,"Do you want to permanently delete",-1),Cs={key:1,class:"font-bold text-black"},Ls=t("span",null,"? Once this transaction is deleted you will not be able to recover it.",-1),Ss={class:"flex justify-end"},Bs=t("p",{class:"text-lg font-bold border-b border-dashed pb-4 mb-4"},"Confirm Delete",-1),Ps={class:"mb-8"},Ms={class:"font-bold text-black"};function Vs(n,h,d,v,i,o){const f=l("BackButton"),r=l("LineSkeleton"),_=l("ShineEffect"),T=l("TextHeader"),w=l("MoreInfoPopover"),b=l("PrimaryButton"),I=l("Alert"),z=l("FormErrorMessages"),H=l("TransactionPaymentStatus"),N=l("TransactionFailureType"),R=l("RoundSkeleton"),O=l("Countdown"),B=l("ButtonSkeleton"),U=l("CopyButton"),Z=l("TransactionOwner"),q=l("TransactionCustomer"),W=l("BadgeIndicator"),G=l("ConfirmModal");return e(),a("div",null,[t("div",he,[t("div",me,[s(f,{class:"w-16 mr-4",action:o.goBack},null,8,["action"]),n.isLoadingTransaction?(e(),a("div",ue,[pe,s(_,{class:"flex space-x-2"},{default:c(()=>[s(r,{width:"w-12 mt-2"}),s(r,{width:"w-4 mt-2"})]),_:1})])):(e(),a("div",_e,[s(T,null,{default:c(()=>[g(u(o.isCreating?"Add Transaction":"Transaction #"+i.transaction._attributes.number),1)]),_:1}),s(w,{class:"ml-2 mt-1",title:"What Is This?",description:"Transactions are detailed records of payments made by customers for purchasing products or services from your store.",placement:"top"})]))]),o.isEditting?(e(),a("div",fe,[n.isLoadingTransaction?(e(),m(_,{key:0,class:"flex space-x-2"},{default:c(()=>[s(r,{width:"w-20"}),s(r,{width:"w-32"}),s(r,{width:"w-4"})]),_:1})):(e(),a(y,{key:1},[we,t("span",ye,u(n.formattedDatetime(i.transaction.createdAt)),1),s(w,{title:n.formattedRelativeDate(i.transaction.createdAt),placement:"top"},null,8,["title"])],64))])):p("",!0)]),t("form",ge,[o.mustCreate||o.mustSaveChanges?(e(),m(I,{key:0,type:"warning",class:"flex justify-between items-center mb-2"},{default:c(()=>[t("div",ke,[ve,t("span",null,u(o.isCreating?"Create your transaction":"Please save your changes"),1)]),s(b,{action:o.isCreating?n.createTransaction:o.updateTransaction,loading:i.isSubmitting},{default:c(()=>[g(u(o.isCreating?"Create Transaction":"Save Changes"),1)]),_:1},8,["action","loading"])]),_:1})):p("",!0),t("div",xe,[t("div",Te,[s(z),t("div",be,[t("div",Ce,[t("div",Le,[Se,n.isLoadingTransaction?(e(),m(_,{key:0,class:"flex items-center space-x-2"},{default:c(()=>[s(r,{width:"w-24"}),s(r,{width:"w-4"})]),_:1})):(e(),m(H,{key:1,transaction:i.transaction},null,8,["transaction"]))]),o.hasTransaction&&i.transaction.failureReason?(e(),m(N,{key:0,transaction:i.transaction},null,8,["transaction"])):p("",!0),n.isLoadingTransaction||!i.transaction.failureReason?(e(),a("div",Be,[Pe,n.isLoadingTransaction?(e(),m(_,{key:0,class:"flex items-center space-x-2"},{default:c(()=>[s(r,{width:"w-24"}),s(r,{width:"w-4"})]),_:1})):(e(),a("div",Me,[t("span",Ve,u(o.paymentMethod.name),1),s(w,{title:"What Is This?",description:"This is the payment method used for this transaction",placement:"top"})]))])):p("",!0)]),t("div",null,[n.isLoadingTransaction?(e(),m(_,{key:0,class:"flex items-center space-x-2 w-full"},{default:c(()=>[s(R,{size:"w-8 h-8 flex-shrink-0"}),t("div",Fe,[s(r,{width:"w-2/3"}),s(r,{width:"w-1/3"})])]),_:1})):(e(),a("div",Ee,[i.transaction.failureReason?(e(),a("div",je,[Ae,t("div",De,[t("span",Ie,u(o.paymentMethod.name),1),s(w,{title:"What Is This?",description:"This is the payment method used for this transaction",placement:"top"})])])):p("",!0),t("div",ze,[He,t("span",null,u(i.transaction.description),1)])]))])]),t("div",Ne,[t("div",Re,[t("div",Oe,[n.isLoadingTransaction?(e(),m(_,{key:0,class:"flex items-center space-x-2"},{default:c(()=>[s(r,{width:"w-40 h-8"}),s(r,{width:"w-12 h-6"})]),_:1})):(e(),a(y,{key:1},[t("span",Ue,u(i.transaction.amount.amountWithCurrency),1),i.transaction.percentage.value!=100?(e(),a("span",Ze,"("+u(i.transaction.percentage.valueSymbol)+")",1)):p("",!0)],64))]),o.isPaid?(e(),a("div",qe,[We,t("span",Ge,[t("span",Je,u(n.formattedDatetime(i.transaction.updatedAt)),1),s(w,{title:n.formattedRelativeDate(i.transaction.updatedAt),placement:"top"},null,8,["title"])])])):p("",!0),n.isLoadingTransaction||i.transaction.metadata&&i.transaction.metadata.canPayUsingDpo?(e(),a("div",Ke,[t("div",null,[n.isLoadingTransaction?(e(),m(_,{key:0,class:"flex items-center space-x-2"},{default:c(()=>[s(r,{width:"w-40"}),s(r,{width:"w-20"}),s(r,{width:"w-4"})]),_:1})):(e(),a("div",Qe,[Xe,s(O,{showMoreInfoPopover:!1,time:i.transaction.metadata.dpoPaymentUrlExpiresAt,textClass:"text-yellow-500 font-bold underline decoration-dashed underline-offset-4"},null,8,["time"]),s(w,{title:"This is the time left before the payment link expires",placement:"top"})]))]),n.isLoadingTransaction||i.transaction.metadata.canPayUsingDpo?(e(),a(y,{key:0},[n.isLoadingTransaction?(e(),m(_,{key:0,class:"flex space-x-2"},{default:c(()=>[s(B,{size:"sm"},{default:c(()=>[Ye,$e]),_:1}),s(B,{size:"sm"},{default:c(()=>[ts,es]),_:1})]),_:1})):(e(),a("div",ss,[s(U,{type:"light",size:"sm",content:i.transaction.metadata.dpoPaymentUrl},{default:c(()=>[ns]),_:1},8,["content"]),s(b,{onClick:h[0]||(h[0]=P=>o.openPaymentLinkInNewTab()),type:"primary",size:"sm"},{default:c(()=>[os,as]),_:1})]))],64)):p("",!0)])):i.transaction.metadata&&i.transaction.metadata.dpoPaymentLinkHasExpired?(e(),a("div",is,[s(b,{onClick:h[1]||(h[1]=P=>o.renewTransactionPaymentLink()),type:"primary",size:"sm",loading:i.isRenewingPaymentLink},{default:c(()=>[rs,cs]),_:1},8,["loading"])])):p("",!0)]),o.isPaid?(e(),a("span",ls,hs)):p("",!0)])]),t("div",ms,[s(Z,{transaction:i.transaction,isLoadingTransaction:n.isLoadingTransaction},null,8,["transaction","isLoadingTransaction"]),s(q,{transaction:i.transaction,isLoadingTransaction:n.isLoadingTransaction},null,8,["transaction","isLoadingTransaction"]),t("div",us,[t("div",ps,[_s,n.isLoadingTransaction?(e(),m(_,{key:0,class:"flex items-center space-x-2"},{default:c(()=>[s(r,{width:"w-20"}),s(r,{width:"w-4"})]),_:1})):(e(),a(y,{key:1},[t("span",fs,u(o.requestedByUser._attributes.name),1),s(w,{title:"What Is This?",description:"This is the person that requested this transaction",placement:"top"})],64))]),t("div",ws,[ys,n.isLoadingTransaction?(e(),m(_,{key:0,class:"flex items-center space-x-2"},{default:c(()=>[s(r,{width:"w-32"}),s(r,{width:"w-4"})]),_:1})):(e(),a(y,{key:1},[o.manuallyVerifiedByUser?(e(),a("span",gs,u(o.manuallyVerifiedByUser._attributes.name),1)):(e(),a("span",ks,u(i.appName),1)),s(w,{title:"What Is This?",description:o.manuallyVerifiedByUser?"This is the person that verified this transaction":"This is the application that verified this transaction",placement:"top"},null,8,["description"])],64))]),t("div",vs,[xs,n.isLoadingTransaction?(e(),m(_,{key:0,class:"flex items-center space-x-2"},{default:c(()=>[s(r,{width:"w-20"}),s(r,{width:"w-4"})]),_:1})):(e(),a(y,{key:1},[s(W,{type:i.transaction.verificationType.toLowerCase()=="automatic"?"success":"info",text:i.transaction.verificationType,showDot:!1},null,8,["type","text"]),s(w,{title:"What Is This?",description:"This indicates whether the transaction was verified manually by a person or automatically by the application",placement:"top"})],64))])])])]),i.transaction?(e(),a("div",{key:1,class:E(["space-y-4 shadow-lg rounded-lg border p-4",n.isLoadingTransaction?"bg-gray-50":"border-red-300 bg-red-50"])},[t("div",Ts,[bs,n.isLoadingTransaction?(e(),m(_,{key:0},{default:c(()=>[s(r,{width:"w-20 mx-2"})]),_:1})):(e(),a("span",Cs," Transaction #"+u(i.transaction._attributes.number),1)),Ls]),t("div",Ss,[o.isEditting&&n.isLoadingTransaction?(e(),m(B,{key:0},{default:c(()=>[g("Delete Transaction")]),_:1})):(e(),m(G,{key:1,approveText:"Delete Order",approveAction:o.deleteTransaction,isLoading:i.isDeleting},{content:c(()=>[Bs,t("p",Ps,[g("Are you sure you want to permanently delete "),t("span",Ms,"Transaction #"+u(i.transaction._attributes.number),1),g("?")])]),trigger:c(P=>[s(b,{onClick:P.showModal,loading:i.isDeleting,type:"danger"},{default:c(()=>[g(" Delete Transaction ")]),_:2},1032,["onClick","loading"])]),_:1},8,["approveAction","isLoading"]))])],2)):p("",!0)])])}const tn=k(de,[["render",Vs]]);export{tn as default};
