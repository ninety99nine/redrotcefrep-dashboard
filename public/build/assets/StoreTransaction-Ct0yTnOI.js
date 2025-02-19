import{c as T,i as W}from"./cloneDeep-BSUglKOW.js";import{r as d,$ as G,q as J,o as s,e as m,w as c,c as i,b as e,f as p,y as K,d as n,t as u,F as g,u as Q,s as X,n as Y,h as _}from"./app-DGr24LlD.js";import{A as $}from"./Alert-BznNy-Vr.js";import{F as tt}from"./FormMixin-DjJxif50.js";import{U as et}from"./UtilsMixin-CBwmyCNB.js";import{u as P}from"./store-store-DY5zIoy1.js";import{T as st}from"./TextHeader-Dr4HM96M.js";import{B as nt}from"./BackButton-5qWHb4hC.js";import{P as b}from"./PrimaryButton-Bke-6sJ-.js";import{_ as k}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{C as ot}from"./Countdown-DXiDrgpC.js";import{E as at}from"./ExternalLink-BlnCcabM.js";import{C as it}from"./ConfirmModal-CAHqsteQ.js";import{S as C}from"./ShineEffect-BJj7S1ch.js";import{L}from"./LineSkeleton-DjmhLoqA.js";import{R as V}from"./RoundSkeleton-BccxBZmE.js";import{B as rt}from"./ButtonSkeleton-BKrI3_Zg.js";import{M as E}from"./MoreInfoPopover-MomTL1G-.js";import{B as F}from"./BadgeIndicator-Dnot3AN7.js";import{F as lt}from"./FormErrorMessages-H2z_xV0j.js";import{g as M,p as ct,d as dt}from"./api-repository-BpNKEdKW.js";import{T as mt}from"./TransactionPaymentStatus-DoYd1fls.js";import"./form-store-fTlv55Ng.js";import"./SpinningLoader-C59uW44G.js";import"./Button--o-lsGOQ.js";const ut={components:{PrimaryButton:b},props:{action:{type:Function},disabled:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},size:{type:String,default:"base",options:["xs","sm","base","lg"]},type:{type:String,default:"dark",options:["dark","success","light","primary","warning","danger"]},content:{type:String,default:""}},data(){return{showText:!1,copyTimeout:null}},methods:{copyToClipboard(){this.showText=!0,this.copyTimeout==null&&clearInterval(this.copyTimeout),this.copyTimeout=setTimeout(()=>{this.showText=!1,clearInterval(this.copyTimeout)},1e3),this.action&&this.action()}}},ht={key:0,class:"w-4 h-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},pt={key:1};function ft(o,t,h,x,r,a){const w=d("PrimaryButton"),l=G("clipboard");return J((s(),m(w,{action:a.copyToClipboard,disabled:h.disabled,loading:h.loading,size:h.size,type:h.type},{default:c(()=>[r.showText?p("",!0):(s(),i("svg",ht,t[0]||(t[0]=[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"},null,-1)]))),r.showText?(s(),i("span",pt,"Copied!")):K(o.$slots,"default",{key:2})]),_:3},8,["action","disabled","loading","size","type"])),[[l,h.content]])}const wt=k(ut,[["render",ft]]),yt={components:{ShineEffect:C,LineSkeleton:L,PrimaryButton:b,RoundSkeleton:V},props:{transaction:{type:Object},isLoadingTransaction:{type:Boolean}},data(){return{storeState:P()}},computed:{store(){return this.storeState.store},owner(){return((this.transaction||{})._relationships||{}).owner||null},transactionForOrder(){return((this.transaction||{}).ownerType||"").toLowerCase()=="order"},transactionForPricingPlan(){return((this.transaction||{}).ownerType||"").toLowerCase()=="pricing plan"}},methods:{onViewOrder(){this.$router.push({name:"show-store-order",params:{store_href:this.store._links.showStore,order_href:this.owner._links.showOrder}}).then(()=>{window.scrollTo(0,0)})}}},gt={class:"bg-white shadow-lg rounded-lg border space-y-3 p-4"},_t={class:"flex items-center space-x-2"},kt={key:1,class:"p-1.5 bg-gray-100 rounded-full border border-gray-200"},xt={key:0,class:"w-4 h-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},vt={key:1,class:"w-4 h-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},Tt={key:3,class:"font-bold text-lg"},bt={key:4,class:"font-bold text-lg"},Ct={key:5,class:"font-bold text-lg"},Lt={key:0,class:"text-xs"},St={key:1,class:"flex justify-end"};function Bt(o,t,h,x,r,a){const w=d("RoundSkeleton"),l=d("ShineEffect"),f=d("LineSkeleton"),S=d("PrimaryButton");return s(),i("div",gt,[e("div",_t,[h.isLoadingTransaction?(s(),m(l,{key:0},{default:c(()=>[n(w,{size:"w-6 h-6"})]),_:1})):(s(),i("div",kt,[a.transactionForOrder?(s(),i("svg",xt,t[0]||(t[0]=[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"},null,-1)]))):(s(),i("svg",vt,t[1]||(t[1]=[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"},null,-1)])))])),h.isLoadingTransaction?(s(),m(l,{key:2},{default:c(()=>[n(f,{width:"w-32"})]),_:1})):a.transactionForOrder?(s(),i("span",Tt,"Order #"+u(a.owner._attributes.number),1)):a.transactionForPricingPlan?(s(),i("span",bt,u(a.owner.name),1)):(s(),i("span",Ct,"..."))]),a.transactionForPricingPlan?(s(),i("span",Lt,u(a.owner.description),1)):p("",!0),a.transactionForOrder?(s(),i("div",St,[n(S,{size:"xs",type:"primary",iconClass:"w-4 h-4",action:()=>a.onViewOrder()},{default:c(()=>t[2]||(t[2]=[e("span",null,"View Order",-1)])),_:1},8,["action"])])):p("",!0)])}const Pt=k(yt,[["render",Bt]]),Mt={components:{ShineEffect:C,LineSkeleton:L,PrimaryButton:b},props:{transaction:{type:Object},isLoadingTransaction:{type:Boolean}},data(){return{storeState:P()}},computed:{store(){return this.storeState.store},hasCustomer(){return this.transaction._relationships.customer!=null},customer(){return this.transaction._relationships.customer}},methods:{onViewCustomer(){this.$router.push({name:"show-store-customer",params:{store_href:this.store._links.showStore,customer_href:this.customer._links.showCustomer}}).then(()=>{window.scrollTo(0,0)})}}},Vt={class:"bg-white shadow-lg rounded-lg border space-y-3 p-4"},Et={class:"flex items-center space-x-2"},Ft={key:1,class:"font-bold"},At={key:2,class:"font-bold text-lg"},jt={class:"space-y-2"},Dt={key:0,class:"flex items-center space-x-2 text-sm"},It={key:1,class:"font-bold"},Nt={key:1,class:"flex items-center space-x-2 text-sm"},Rt={key:1,class:"font-bold"},Ht={key:1,class:"text-xs"},Ot={key:0,class:"flex justify-end"};function Ut(o,t,h,x,r,a){const w=d("LineSkeleton"),l=d("ShineEffect"),f=d("PrimaryButton");return s(),i("div",Vt,[e("div",Et,[t[0]||(t[0]=e("div",{class:"p-1.5 bg-gray-100 rounded-full border border-gray-200"},[e("svg",{class:"w-4 h-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"})])],-1)),h.isLoadingTransaction?(s(),m(l,{key:0},{default:c(()=>[n(w,{width:"w-32"})]),_:1})):a.hasCustomer?(s(),i("span",Ft,u(a.customer._attributes.name),1)):(s(),i("span",At,"Customer"))]),e("div",jt,[h.isLoadingTransaction||a.hasCustomer&&(a.customer.mobileNumber||a.customer.email)?(s(),i(g,{key:0},[h.isLoadingTransaction||a.customer.mobileNumber?(s(),i("div",Dt,[t[1]||(t[1]=e("svg",{class:"w-4 h-4 text-gray-500",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"})],-1)),h.isLoadingTransaction?(s(),m(l,{key:0},{default:c(()=>[n(w,{width:"w-32"})]),_:1})):(s(),i("span",It,u(a.customer.mobileNumber.national),1))])):p("",!0),h.isLoadingTransaction||a.customer.email?(s(),i("div",Nt,[t[2]||(t[2]=e("svg",{class:"w-4 h-4 text-gray-500",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"})],-1)),h.isLoadingTransaction?(s(),m(l,{key:0},{default:c(()=>[n(w,{width:"w-32"})]),_:1})):(s(),i("span",Rt,u(a.customer.email),1))])):p("",!0)],64)):(s(),i("span",Ht,"No information"))]),!h.isLoadingTransaction&&a.hasCustomer?(s(),i("div",Ot,[n(f,{size:"xs",type:"primary",iconClass:"w-4 h-4",action:()=>a.onViewCustomer()},{default:c(()=>t[3]||(t[3]=[e("span",null,"View Customer",-1)])),_:1},8,["action"])])):p("",!0)])}const zt=k(Mt,[["render",Ut]]),Zt={components:{ShineEffect:C,LineSkeleton:L,MoreInfoPopover:E,BadgeIndicator:F},props:{transaction:{type:Object}}},qt={class:"flex space-x-1 items-center"};function Wt(o,t,h,x,r,a){const w=d("BadgeIndicator"),l=d("MoreInfoPopover");return s(),i("div",qt,[n(w,{type:"danger",text:h.transaction.failureType,showDot:!1},null,8,["text"]),n(l,{description:h.transaction.failureReason,placement:"top"},null,8,["description"])])}const Gt=k(Zt,[["render",Wt]]),Jt={mixins:[et,tt],components:{Alert:$,TextHeader:st,BackButton:nt,CopyButton:wt,Countdown:ot,ExternalLink:at,ConfirmModal:it,ShineEffect:C,LineSkeleton:L,PrimaryButton:b,RoundSkeleton:V,ButtonSkeleton:rt,MoreInfoPopover:E,BadgeIndicator:F,TransactionOwner:Pt,FormErrorMessages:lt,TransactionFailureType:Gt,TransactionCustomer:zt,TransactionPaymentStatus:mt},data(){return{form:{paymentMethodId:null,description:null,amount:null},transaction:null,isDeleting:!1,isSubmitting:!1,apiState:Q(),appName:X.appName,storeState:P(),isRenewingPaymentLink:!1}},watch:{"$route.params.transaction_href"(o,t){window.scrollTo(0,0),this.getTransaction()}},computed:{store(){return this.storeState.store},isPaid(){return((this.transaction||{})._attributes||{}).isPaid},isPendingPayment(){return((this.transaction||{})._attributes||{}).isPendingPayment},hasCustomer(){return this.customer!=null},hasTransaction(){return this.transaction!=null},customer(){return((this.transaction||{})._relationships||{}).customer},paymentMethod(){return((this.transaction||{})._relationships||{}).paymentMethod||null},requestedByUser(){return((this.transaction||{})._relationships||{}).requestedByUser||null},manuallyVerifiedByUser(){return((this.transaction||{})._relationships||{}).manuallyVerifiedByUser||null},isCreating(){return this.$route.name==="create-store-transaction"},isEditting(){return this.$route.name==="show-store-transaction"},formHasChanged(){var o=T(this.form),t=T(this.originalForm);return!W(o,t)},mustSaveChanges(){return this.isEditting&&this.formHasChanged&&!this.isLoadingTransaction&&!this.isSubmitting},mustCreate(){return this.isCreating&&this.formHasChanged&&!this.isLoadingTransaction&&!this.isSubmitting}},methods:{goBack(){this.$router.replace({name:"show-store-transactions",params:{store_href:this.store._links.showStore}})},openPaymentLinkInNewTab(){window.open(this.transaction.metadata.dpoPaymentUrl,"_blank")},getTransaction(){this.isLoadingTransaction=!0;const o={_relationships:"customer,requestedByUser,manuallyVerifiedByUser,paymentMethod,owner"};M(this.$route.params.transaction_href,o).then(t=>{t.status==200&&(this.transaction=t.data.transaction),this.isLoadingTransaction=!1}).catch(t=>{this.isLoadingTransaction=!1,this.setServerFormErrors(t)})},renewTransactionPaymentLink(){this.isRenewingPaymentLink=!0,ct(this.transaction._links.renewTransactionPaymentLink).then(o=>{o.status==200&&(this.showSuccessfulNotification("Transaction renewed"),this.getTransaction()),this.isRenewingPaymentLink=!1}).catch(o=>{this.isRenewingPaymentLink=!1,this.setServerFormErrors(o)})},updateTransaction(){this.isSubmitting=!0;const o={};M(this.transaction._links.updateTransaction,o).then(t=>{t.status==200&&(this.originalForm=T(this.form),this.showSuccessfulNotification("Transaction updated")),this.isSubmitting=!1}).catch(t=>{this.isSubmitting=!1,this.setServerFormErrors(t)})},deleteTransaction(){this.isDeleting=!0,dt(this.transaction._links.deleteTransaction).then(o=>{o.status==200&&(o.data.deleted?(this.showSuccessfulNotification("Transaction deleted"),this.$router.push({name:"show-store-transactions",params:{store_href:this.store._links.showStore}}),window.scrollTo(0,0)):(this.setFormError("general",o.data.message),this.showUnsuccessfulNotification(o.data.message))),this.isDeleting=!1}).catch(o=>{this.isDeleting=!1,this.setServerFormErrors(o)})}},created(){this.originalForm=T(this.form),this.isEditting&&this.getTransaction()}},Kt={class:"flex justify-between items-center border-dashed py-6"},Qt={class:"flex justify-start"},Xt={key:0,class:"flex items-center space-x-2"},Yt={key:1,class:"flex items-center"},$t={key:0,class:"flex space-x-1 items-center"},te={class:"font-bold"},ee={class:"relative",action:"#",method:"POST"},se={class:"flex items-center space-x-2"},ne={class:"grid grid-cols-12 gap-4 mb-8"},oe={class:"col-span-8"},ae={class:"bg-white shadow-lg rounded-lg border space-y-4 p-4 mb-4"},ie={class:"flex items-center space-x-8"},re={class:"flex items-center space-x-2"},le={key:1,class:"flex items-center space-x-2"},ce={key:1,class:"flex space-x-1 items-center"},de={class:"text-xs font-bold"},me={class:"w-full space-y-2"},ue={key:1},he={key:0,class:"flex items-center space-x-2 border-b border-dashed pb-4 mb-4"},pe={class:"flex space-x-1 items-center"},fe={class:"text-xs font-bold"},we={class:"flex items-center space-x-2 text-sm"},ye={class:"flex items-center bg-white shadow-lg rounded-lg border space-y-4 p-4 mb-4"},ge={class:"w-full space-y-4"},_e={class:"flex items-end space-x-2"},ke={class:"text-4xl font-bold"},xe={key:0,class:"text-2xl text-gray-400"},ve={key:0,class:"flex items-center space-x-2 text-sm"},Te={class:"flex items-center space-x-2"},be={class:"font-bold"},Ce={key:1,class:"flex items-center justify-between"},Le={key:1,class:"flex items-center space-x-2"},Se={key:1,class:"flex space-x-2"},Be={key:2,class:"flex justify-end"},Pe={key:0,class:"border rounded-full bg-gray-50"},Me={class:"col-span-4 space-y-4"},Ve={class:"flex flex-col justify-between bg-white shadow-lg rounded-lg border space-y-2 p-4"},Ee={class:"flex items-center space-x-2 text-sm"},Fe={class:"font-bold"},Ae={class:"flex items-center space-x-2 text-sm"},je={key:0,class:"font-bold"},De={key:1,class:"font-bold"},Ie={class:"flex items-center space-x-2 text-sm"},Ne={class:"flex items-center whitespace-pre"},Re={key:1,class:"font-bold text-black"},He={class:"flex justify-end"},Oe={class:"mb-8"},Ue={class:"font-bold text-black"};function ze(o,t,h,x,r,a){const w=d("BackButton"),l=d("LineSkeleton"),f=d("ShineEffect"),S=d("TextHeader"),y=d("MoreInfoPopover"),v=d("PrimaryButton"),A=d("Alert"),j=d("FormErrorMessages"),D=d("TransactionPaymentStatus"),I=d("TransactionFailureType"),N=d("RoundSkeleton"),R=d("Countdown"),B=d("ButtonSkeleton"),H=d("CopyButton"),O=d("TransactionOwner"),U=d("TransactionCustomer"),z=d("BadgeIndicator"),Z=d("ConfirmModal");return s(),i("div",null,[e("div",Kt,[e("div",Qt,[n(w,{class:"w-16 mr-4",action:a.goBack},null,8,["action"]),o.isLoadingTransaction?(s(),i("div",Xt,[t[0]||(t[0]=e("span",{class:"text-2xl font-bold tracking-tight text-gray-300 animate-pulse"},"Transaction #",-1)),n(f,{class:"flex space-x-2"},{default:c(()=>[n(l,{width:"w-12 mt-2"}),n(l,{width:"w-4 mt-2"})]),_:1})])):(s(),i("div",Yt,[n(S,null,{default:c(()=>[_(u(a.isCreating?"Add Transaction":"Transaction #"+r.transaction._attributes.number),1)]),_:1}),n(y,{class:"ml-2 mt-1",title:"What Is This?",description:"Transactions are detailed records of payments made by customers for purchasing products or services from your store.",placement:"top"})]))]),a.isEditting?(s(),i("div",$t,[o.isLoadingTransaction?(s(),m(f,{key:0,class:"flex space-x-2"},{default:c(()=>[n(l,{width:"w-20"}),n(l,{width:"w-32"}),n(l,{width:"w-4"})]),_:1})):(s(),i(g,{key:1},[t[1]||(t[1]=e("span",null,"Created:",-1)),e("span",te,u(o.formattedDatetime(r.transaction.createdAt)),1),n(y,{title:o.formattedRelativeDate(r.transaction.createdAt),placement:"top"},null,8,["title"])],64))])):p("",!0)]),e("form",ee,[a.mustCreate||a.mustSaveChanges?(s(),m(A,{key:0,type:"warning",class:"flex justify-between items-center mb-2"},{default:c(()=>[e("div",se,[t[2]||(t[2]=e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"})],-1)),e("span",null,u(a.isCreating?"Create your transaction":"Please save your changes"),1)]),n(v,{action:a.isCreating?o.createTransaction:a.updateTransaction,loading:r.isSubmitting},{default:c(()=>[_(u(a.isCreating?"Create Transaction":"Save Changes"),1)]),_:1},8,["action","loading"])]),_:1})):p("",!0),e("div",ne,[e("div",oe,[n(j),e("div",ae,[e("div",ie,[e("div",re,[t[3]||(t[3]=e("span",{class:"text-xs"},"Status:",-1)),o.isLoadingTransaction?(s(),m(f,{key:0,class:"flex items-center space-x-2"},{default:c(()=>[n(l,{width:"w-24"}),n(l,{width:"w-4"})]),_:1})):(s(),m(D,{key:1,transaction:r.transaction},null,8,["transaction"]))]),a.hasTransaction&&r.transaction.failureReason?(s(),m(I,{key:0,transaction:r.transaction},null,8,["transaction"])):p("",!0),o.isLoadingTransaction||!r.transaction.failureReason?(s(),i("div",le,[t[4]||(t[4]=e("span",{class:"text-xs"},"Payment Method:",-1)),o.isLoadingTransaction?(s(),m(f,{key:0,class:"flex items-center space-x-2"},{default:c(()=>[n(l,{width:"w-24"}),n(l,{width:"w-4"})]),_:1})):(s(),i("div",ce,[e("span",de,u(a.paymentMethod.name),1),n(y,{title:"What Is This?",description:"This is the payment method used for this transaction",placement:"top"})]))])):p("",!0)]),e("div",null,[o.isLoadingTransaction?(s(),m(f,{key:0,class:"flex items-center space-x-2 w-full"},{default:c(()=>[n(N,{size:"w-8 h-8 flex-shrink-0"}),e("div",me,[n(l,{width:"w-2/3"}),n(l,{width:"w-1/3"})])]),_:1})):(s(),i("div",ue,[r.transaction.failureReason?(s(),i("div",he,[t[5]||(t[5]=e("span",{class:"text-xs"},"Payment Method:",-1)),e("div",pe,[e("span",fe,u(a.paymentMethod.name),1),n(y,{title:"What Is This?",description:"This is the payment method used for this transaction",placement:"top"})])])):p("",!0),e("div",we,[t[6]||(t[6]=e("svg",{class:"w-6 h-6",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"})],-1)),e("span",null,u(r.transaction.description),1)])]))])]),e("div",ye,[e("div",ge,[e("div",_e,[o.isLoadingTransaction?(s(),m(f,{key:0,class:"flex items-center space-x-2"},{default:c(()=>[n(l,{width:"w-40 h-8"}),n(l,{width:"w-12 h-6"})]),_:1})):(s(),i(g,{key:1},[e("span",ke,u(r.transaction.amount.amountWithCurrency),1),r.transaction.percentage.value!=100?(s(),i("span",xe,"("+u(r.transaction.percentage.valueSymbol)+")",1)):p("",!0)],64))]),a.isPaid?(s(),i("div",ve,[t[7]||(t[7]=e("span",{class:"whitespace-nowrap"},"Date Paid: ",-1)),e("span",Te,[e("span",be,u(o.formattedDatetime(r.transaction.updatedAt)),1),n(y,{title:o.formattedRelativeDate(r.transaction.updatedAt),placement:"top"},null,8,["title"])])])):p("",!0),o.isLoadingTransaction||r.transaction.metadata&&r.transaction.metadata.canPayUsingDpo?(s(),i("div",Ce,[e("div",null,[o.isLoadingTransaction?(s(),m(f,{key:0,class:"flex items-center space-x-2"},{default:c(()=>[n(l,{width:"w-40"}),n(l,{width:"w-20"}),n(l,{width:"w-4"})]),_:1})):(s(),i("div",Le,[t[8]||(t[8]=e("span",null,"Payment Link Expires In: ",-1)),n(R,{showMoreInfoPopover:!1,time:r.transaction.metadata.dpoPaymentUrlExpiresAt,textClass:"text-yellow-500 font-bold underline decoration-dashed underline-offset-4"},null,8,["time"]),n(y,{title:"This is the time left before the payment link expires",placement:"top"})]))]),o.isLoadingTransaction||r.transaction.metadata.canPayUsingDpo?(s(),i(g,{key:0},[o.isLoadingTransaction?(s(),m(f,{key:0,class:"flex space-x-2"},{default:c(()=>[n(B,{size:"sm"},{default:c(()=>t[9]||(t[9]=[e("svg",{class:"w-4 h-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"})],-1),e("span",{class:"ml-1"},"Copy Payment Link",-1)])),_:1}),n(B,{size:"sm"},{default:c(()=>t[10]||(t[10]=[e("svg",{class:"w-4 h-4 mr-2",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"})],-1),e("span",null,"Pay Now",-1)])),_:1})]),_:1})):(s(),i("div",Se,[n(H,{type:"light",size:"sm",content:r.transaction.metadata.dpoPaymentUrl},{default:c(()=>t[11]||(t[11]=[e("span",{class:"ml-1"},"Copy Payment Link",-1)])),_:1},8,["content"]),n(v,{action:a.openPaymentLinkInNewTab(),type:"primary",size:"sm"},{default:c(()=>t[12]||(t[12]=[e("svg",{class:"w-4 h-4 mr-2",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"})],-1),e("span",null,"Pay Now",-1)])),_:1},8,["action"])]))],64)):p("",!0)])):r.transaction.metadata&&r.transaction.metadata.dpoPaymentLinkHasExpired?(s(),i("div",Be,[n(v,{action:a.renewTransactionPaymentLink(),type:"primary",size:"sm",loading:r.isRenewingPaymentLink},{default:c(()=>t[13]||(t[13]=[e("svg",{class:"w-4 h-4 mr-2",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"})],-1),e("span",null,"Renew Payment Link",-1)])),_:1},8,["action","loading"])])):p("",!0)]),a.isPaid?(s(),i("span",Pe,t[14]||(t[14]=[e("svg",{class:"w-20 h-20 text-green-500",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor"},[e("path",{"fill-rule":"evenodd",d:"M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z","clip-rule":"evenodd"})],-1)]))):p("",!0)])]),e("div",Me,[n(O,{transaction:r.transaction,isLoadingTransaction:o.isLoadingTransaction},null,8,["transaction","isLoadingTransaction"]),n(U,{transaction:r.transaction,isLoadingTransaction:o.isLoadingTransaction},null,8,["transaction","isLoadingTransaction"]),e("div",Ve,[e("div",Ee,[t[15]||(t[15]=e("span",{class:"whitespace-nowrap"},"Requester: ",-1)),o.isLoadingTransaction?(s(),m(f,{key:0,class:"flex items-center space-x-2"},{default:c(()=>[n(l,{width:"w-20"}),n(l,{width:"w-4"})]),_:1})):(s(),i(g,{key:1},[e("span",Fe,u(a.requestedByUser._attributes.name),1),n(y,{title:"What Is This?",description:"This is the person that requested this transaction",placement:"top"})],64))]),e("div",Ae,[t[16]||(t[16]=e("span",{class:"whitespace-nowrap"},"Verifyer: ",-1)),o.isLoadingTransaction?(s(),m(f,{key:0,class:"flex items-center space-x-2"},{default:c(()=>[n(l,{width:"w-32"}),n(l,{width:"w-4"})]),_:1})):(s(),i(g,{key:1},[a.manuallyVerifiedByUser?(s(),i("span",je,u(a.manuallyVerifiedByUser._attributes.name),1)):(s(),i("span",De,u(r.appName),1)),n(y,{title:"What Is This?",description:a.manuallyVerifiedByUser?"This is the person that verified this transaction":"This is the application that verified this transaction",placement:"top"},null,8,["description"])],64))]),e("div",Ie,[t[17]||(t[17]=e("span",{class:"whitespace-nowrap"},"Verification Method: ",-1)),o.isLoadingTransaction?(s(),m(f,{key:0,class:"flex items-center space-x-2"},{default:c(()=>[n(l,{width:"w-20"}),n(l,{width:"w-4"})]),_:1})):(s(),i(g,{key:1},[n(z,{type:r.transaction.verificationType.toLowerCase()=="automatic"?"success":"info",text:r.transaction.verificationType,showDot:!1},null,8,["type","text"]),n(y,{title:"What Is This?",description:"This indicates whether the transaction was verified manually by a person or automatically by the application",placement:"top"})],64))])])])]),r.transaction?(s(),i("div",{key:1,class:Y(["space-y-4 shadow-lg rounded-lg border p-4",o.isLoadingTransaction?"bg-gray-50":"border-red-300 bg-red-50"])},[e("div",Ne,[t[18]||(t[18]=e("span",null,"Do you want to permanently delete",-1)),o.isLoadingTransaction?(s(),m(f,{key:0},{default:c(()=>[n(l,{width:"w-20 mx-2"})]),_:1})):(s(),i("span",Re," Transaction #"+u(r.transaction._attributes.number),1)),t[19]||(t[19]=e("span",null,"? Once this transaction is deleted you will not be able to recover it.",-1))]),e("div",He,[a.isEditting&&o.isLoadingTransaction?(s(),m(B,{key:0},{default:c(()=>t[20]||(t[20]=[_("Delete Transaction")])),_:1})):(s(),m(Z,{key:1,approveText:"Delete Order",approveAction:a.deleteTransaction,isLoading:r.isDeleting},{content:c(()=>[t[23]||(t[23]=e("p",{class:"text-lg font-bold border-b border-dashed pb-4 mb-4"},"Confirm Delete",-1)),e("p",Oe,[t[21]||(t[21]=_("Are you sure you want to permanently delete ")),e("span",Ue,"Transaction #"+u(r.transaction._attributes.number),1),t[22]||(t[22]=_("?"))])]),trigger:c(q=>[n(v,{action:q.showModal,loading:r.isDeleting,type:"danger"},{default:c(()=>t[24]||(t[24]=[_(" Delete Transaction ")])),_:2},1032,["action","loading"])]),_:1},8,["approveAction","isLoading"]))])],2)):p("",!0)])])}const fs=k(Jt,[["render",ze]]);export{fs as default};
