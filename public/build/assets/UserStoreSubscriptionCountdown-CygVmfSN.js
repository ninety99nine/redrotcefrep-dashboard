import{u as v}from"./store-store-mpyiI37o.js";import{S as C,L}from"./LineSkeleton-bH-zCpxp.js";import{o,c as r,h as S,w as s,a as e,b as i,t as d,r as n,n as j,d as _,F as g,l as M,i as f,k as q}from"./app-DgwDG0oL.js";import{_ as x}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{F as P}from"./FormMixin-Bl09yP4i.js";import{U as z}from"./SpiningLoader-CtP8XMxq.js";import{C as B}from"./Countdown-CxgmgTRi.js";import{M as $}from"./MoreInfoPopover-CikMcfV_.js";import{p as V}from"./api-repository-BMbX10ff.js";import{B as Z}from"./BasicModal-BFpgOTYn.js";import{P as A}from"./PrimaryButton-BwxTXQIn.js";const I={components:{ShineEffect:C,LineSkeleton:L},data(){return{storeState:v()}},computed:{quickStartGuide(){return this.storeState.quickStartGuide},isLoadingQuickStartGuide(){return this.storeState.isLoadingQuickStartGuide}}},N={class:"text-xs border rounded-lg shadow bg-gray-50 py-1 px-2 inline-block"},F={class:"flex items-center space-x-2"},Q=e("span",{class:"text-gray-300"},"/",-1),U={key:1};function H(c,y,p,w,a,t){const l=n("LineSkeleton"),h=n("ShineEffect");return o(),r("span",N,[t.isLoadingQuickStartGuide?(o(),S(h,{key:0},{default:s(()=>[e("span",F,[i(l,{width:"w-4"}),Q,i(l,{width:"w-20"})])]),_:1})):(o(),r("span",U,d(t.quickStartGuide.completedMilestones)+" / "+d(t.quickStartGuide.totalMilestones)+" completed",1))])}const Ze=x(I,[["render",H]]),T={props:{size:{type:String,default:"w-12 h-12"}}};function D(c,y,p,w,a,t){return o(),r("div",{class:j([p.size,"bg-gray-200 rounded-sm"])},null,2)}const R=x(T,[["render",D]]),Y={mixins:[P],components:{Countdown:B,BasicModal:Z,ShineEffect:C,PrimaryButton:A,SquareSkeleton:R,MoreInfoPopover:$},data(){return{paymentShortcode:null,storeState:v(),isGeneratingPaymentShortcode:!1}},computed:{store(){return this.storeState.store}},methods:{generatePaymentShortcode(){this.isGeneratingPaymentShortcode=!0,V(this.store._links.generatePaymentShortcode).then(c=>{c.status==200&&(this.paymentShortcode=c.data),this.isGeneratingPaymentShortcode=!1}).catch(c=>{this.isGeneratingPaymentShortcode=!1,this.setServerFormErrors(c)})}}},J=e("div",{class:"flex items-center space-x-2 border-b border-dashed pb-4 mb-4"},[e("svg",{class:"w-6 h-6",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor"},[e("path",{d:"M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"}),e("path",{"fill-rule":"evenodd",d:"M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z","clip-rule":"evenodd"})]),e("span",{class:"text-lg font-bold"},"Subscribe")],-1),K={class:"text-justify"},O={class:"font-bold"},W={key:0,class:"flex justify-center my-4"},X={class:"flex items-center space-x-2 mb-4"},ee=e("span",{class:"text-gray-300 text-4xl inline-block h-8"},"*",-1),te=e("span",{class:"text-gray-300 text-4xl inline-block h-8"},"*",-1),oe=e("span",{class:"text-gray-300 text-2xl inline-block"},"#",-1),se=e("div",{class:"text-center text-gray-500"},"creating shortcode",-1),ne={key:0,class:"font-bold text-4xl text-center mt-4 mb-8"},re={class:"flex justify-center"},ie={key:0,class:"text-sm mr-1"},ce={class:"space-y-4"},ae={class:"flex items-center space-x-2 text-yellow-500"},le=e("svg",{class:"w-6 h-6",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"})],-1),de=e("span",{class:"font-bold text-sm"},"Payment shortcode expired",-1),ue=e("hr",null,null,-1),he=e("p",{class:"mb-2"},"The Payment shortcode is used to subscribe to your store.",-1),pe={class:"font-bold underline decoration-dashed underline-offset-4"},me=e("svg",{class:"w-4 h-4 mr-2",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"})],-1),_e=e("span",null,"Renew Shortcode",-1);function fe(c,y,p,w,a,t){const l=n("SquareSkeleton"),h=n("ShineEffect"),b=n("MoreInfoPopover"),m=n("PrimaryButton"),G=n("Countdown"),E=n("BasicModal");return o(),S(E,{onShow:t.generatePaymentShortcode},{content:s(()=>[J,e("p",K,[_("Dial to subscribe for "),e("span",O,d(t.store.name),1),_(". This will reopen your store and allow customers to place orders")]),a.isGeneratingPaymentShortcode?(o(),r("div",W,[i(h,null,{default:s(()=>[e("div",X,[ee,(o(),r(g,null,M(3,(u,k)=>i(l,{key:k,size:"w-8 h-8"})),64)),te,(o(),r(g,null,M(3,(u,k)=>i(l,{key:k,size:"w-8 h-8"})),64)),oe]),se]),_:1})])):(o(),r(g,{key:1},[a.paymentShortcode?(o(),r("p",ne,d(a.paymentShortcode._attributes.dial.code),1)):f("",!0),e("div",re,[a.paymentShortcode?(o(),S(G,{key:0,time:a.paymentShortcode.expiresAt,textClass:"text-yellow-500 font-bold underline decoration-dashed underline-offset-4"},{suffix:s(u=>[u.hasExpired?f("",!0):(o(),r("span",ie,"Expires in"))]),default:s(()=>[e("div",ce,[e("div",ae,[le,de,i(b,{title:"Payment shortcode expired",placement:"top"},{description:s(()=>[ue,he,e("p",null,[_("In this case the shortcode has expired for security reasons, therefore you should generate a new payment shortcode to subscribe for "),e("span",pe,d(t.store.name),1)])]),_:1})]),i(m,{onClick:t.generatePaymentShortcode,loading:a.isGeneratingPaymentShortcode,type:"light",size:"sm"},{default:s(()=>[me,_e]),_:1},8,["onClick","loading"])])]),_:1},8,["time"])):f("",!0)])],64))]),trigger:s(u=>[q(c.$slots,"trigger",{showModal:u.showModal},()=>[i(m,{onClick:u.showModal,size:"xs",type:"success"},{default:s(()=>[_(" Subscribe ")]),_:2},1032,["onClick"])])]),_:3},8,["onShow"])}const Se=x(Y,[["render",fe]]),xe={mixins:[P,z],components:{Countdown:B,MoreInfoPopover:$,StoreSubscribeButton:Se},data(){return{storeState:v()}},computed:{store(){return this.storeState.store},time(){return(this.activeSubscription||{}).endAt||null},activeSubscription(){return this.store._relationships.activeSubscription},totalSubscriptions(){return this.store.subscriptionsCount}}},ye={key:0,class:"text-sm mr-1"},we={class:"w-full flex justify-between"},be={class:"flex items-center space-x-2 text-yellow-500"},ke=e("svg",{class:"w-6 h-6",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"})],-1),ge={class:"font-bold text-sm"},ve={class:"border-t pt-2 mt-2"};function Me(c,y,p,w,a,t){const l=n("MoreInfoPopover"),h=n("StoreSubscribeButton"),b=n("Countdown");return o(),S(b,{time:t.time,textClass:"text-yellow-500 font-bold underline decoration-dashed underline-offset-4"},{suffix:s(m=>[m.hasExpired?f("",!0):(o(),r("span",ye,"Subscription Expires in"))]),default:s(()=>[e("div",we,[e("div",be,[ke,e("span",ge,d(t.totalSubscriptions?"Your Subscription Expired":"No Subscription"),1),i(l,{title:t.totalSubscriptions?"Subscription Expired":"No Subscription",placement:"top"},{description:s(()=>[e("p",ve,d(t.totalSubscriptions?"Renew your subscription to reopen your store and allow customers to place orders":"Subscribe to open your store and allow customers to place orders"),1)]),_:1},8,["title"])]),i(h)])]),_:1},8,["time"])}const Ae=x(xe,[["render",Me]]);export{Ze as S,Ae as U,Se as a};
