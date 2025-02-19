import{u as p}from"./store-store-DY5zIoy1.js";import{B as M}from"./BadgeIndicator-Dnot3AN7.js";import{F as g}from"./FormMixin-DjJxif50.js";import{I as D}from"./InputTags-ChQkPBE2.js";import{r as n,o as m,e as h,w as S,h as T,c as _,b as i,d as u,F as b,f as F,k as P,n as N,q as C,af as V}from"./app-DGr24LlD.js";import{_ as l}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{T as w}from"./ToogleSwitch-Bb0NbskL.js";import{T as $}from"./TextInput-D_8GVWar.js";import{C as k}from"./Checkbox-Cjj-6xYZ.js";import"./cloneDeep-BSUglKOW.js";import"./UtilsMixin-CBwmyCNB.js";import"./form-store-fTlv55Ng.js";import"./api-repository-BpNKEdKW.js";import"./vue3-tags-input.esm-DgZg8QI3.js";import"./InputErrorMessage-xckJoMbN.js";import"./MoreInfoPopover-MomTL1G-.js";const O={mixins:[g],components:{InputTags:D},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function U(s,e,c,d,a,t){const o=n("InputTags");return m(),h(o,{label:"Tips (%)",key:t.storeForm.tips,tags:t.storeForm.tips,labelPopoverTitle:"What Is This?",errorText:s.getFormError("tips"),onOnTagsChanged:e[0]||(e[0]=r=>t.storeForm.tips=r),labelPopoverDescription:"Specify the percentage tips, e.g., 10, 20 and 30"},null,8,["tags","errorText"])}const Z=l(O,[["render",U]]),z={mixins:[g],components:{ToogleSwitch:w},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function j(s,e,c,d,a,t){const o=n("ToogleSwitch");return m(),h(o,{size:"md",modelValue:t.storeForm.online,"onUpdate:modelValue":e[0]||(e[0]=r=>t.storeForm.online=r),errorText:s.getFormError("online")},{default:S(()=>e[1]||(e[1]=[T(" Show tips ")])),_:1},8,["modelValue","errorText"])}const L=l(z,[["render",j]]),A={mixins:[g],components:{ToogleSwitch:w},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function W(s,e,c,d,a,t){const o=n("ToogleSwitch");return m(),h(o,{size:"md",modelValue:t.storeForm.online,"onUpdate:modelValue":e[0]||(e[0]=r=>t.storeForm.online=r),errorText:s.getFormError("online")},{default:S(()=>e[1]||(e[1]=[T(" Show specify tip ")])),_:1},8,["modelValue","errorText"])}const q=l(A,[["render",W]]),G={mixins:[g],components:{TextInput:$},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function J(s,e,c,d,a,t){const o=n("TextInput");return m(),h(o,{label:"Section heading",modelValue:t.storeForm.name,"onUpdate:modelValue":e[0]||(e[0]=r=>t.storeForm.name=r),placeholder:"Baby Cakes 🧁",errorText:s.getFormError("name"),labelPopoverTitle:"What Is This?",labelPopoverDescription:"The heading of the tips section"},null,8,["modelValue","errorText"])}const K=l(G,[["render",J]]),Q={components:{TipsSelectInput:Z,ShowTipsToggleSwitch:L,ShowSpecifyTipToggleSwitch:q,TipsSectionHeadingTextInput:K},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}},R={class:"bg-white shadow-lg border rounded-lg space-y-4 p-8 mb-4"},X={class:"bg-gray-50 p-4 rounded-lg space-y-4"};function Y(s,e,c,d,a,t){const o=n("TipsSectionHeadingTextInput"),r=n("ShowTipsToggleSwitch"),x=n("ShowSpecifyTipToggleSwitch"),f=n("TipsSelectInput");return m(),_("div",R,[e[0]||(e[0]=i("h1",{class:"flex items-center font-lg font-bold"},[i("svg",{class:"w-6 h-6 mr-2 flex-shrink-0",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[i("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"})]),i("span",null,"Tips")],-1)),e[1]||(e[1]=i("p",{class:"text-sm text-gray-500"},"This section allows customers to give tips",-1)),u(o),i("div",X,[u(r),t.storeForm.online?(m(),_(b,{key:0},[u(x),u(f)],64)):F("",!0)])])}const ee=l(Q,[["render",Y]]),te={mixins:[g],components:{ToogleSwitch:w},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function oe(s,e,c,d,a,t){const o=n("ToogleSwitch");return m(),h(o,{size:"md",modelValue:t.storeForm.online,"onUpdate:modelValue":e[0]||(e[0]=r=>t.storeForm.online=r),errorText:s.getFormError("online")},{default:S(()=>e[1]||(e[1]=[T(" Show items ")])),_:1},8,["modelValue","errorText"])}const re=l(te,[["render",oe]]),ne={mixins:[g],components:{TextInput:$},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function se(s,e,c,d,a,t){const o=n("TextInput");return m(),h(o,{label:"Section heading",modelValue:t.storeForm.name,"onUpdate:modelValue":e[0]||(e[0]=r=>t.storeForm.name=r),placeholder:"Baby Cakes 🧁",errorText:s.getFormError("name"),labelPopoverTitle:"What Is This?",labelPopoverDescription:"The heading of the items section"},null,8,["modelValue","errorText"])}const I=l(ne,[["render",se]]),ie={components:{ShowItemsToggleSwitch:re,ItemsSectionHeadingTextInput:I}},ae={class:"bg-white shadow-lg border rounded-lg space-y-4 p-8 mb-4"},me={class:"bg-gray-50 p-4 rounded-lg space-y-4"};function le(s,e,c,d,a,t){const o=n("ItemsSectionHeadingTextInput"),r=n("ShowItemsToggleSwitch");return m(),_("div",ae,[e[0]||(e[0]=i("h1",{class:"flex items-center font-lg font-bold"},[i("svg",{class:"w-6 h-6 mr-2 flex-shrink-0",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[i("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"})]),i("span",null,"Items")],-1)),e[1]||(e[1]=i("p",{class:"text-sm text-gray-500"},"This section shows customers the selected products",-1)),u(o),i("div",me,[u(r)])])}const ce=l(ie,[["render",le]]),de={mixins:[g],components:{Checkbox:k},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function pe(s,e,c,d,a,t){const o=n("Checkbox");return m(),h(o,{size:"xs",modelValue:a.storeState.online,"onUpdate:modelValue":e[0]||(e[0]=r=>a.storeState.online=r),errorText:s.getFormError("online")},{default:S(()=>e[1]||(e[1]=[i("div",{class:"text-sm mt-0.5"},"Optional",-1)])),_:1},8,["modelValue","errorText"])}const ue=l(de,[["render",pe]]),he={mixins:[g],components:{ToogleSwitch:w},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function ge(s,e,c,d,a,t){const o=n("ToogleSwitch");return m(),h(o,{size:"md",modelValue:t.storeForm.online,"onUpdate:modelValue":e[0]||(e[0]=r=>t.storeForm.online=r),errorText:s.getFormError("online")},{default:S(()=>e[1]||(e[1]=[T(" Show email ")])),_:1},8,["modelValue","errorText"])}const _e=l(he,[["render",ge]]),Se={components:{CustomerEmailOptionalCheckbox:ue,ShowCustomerEmailToggleSwitch:_e},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}},Te={class:"grid grid-cols-2"};function we(s,e,c,d,a,t){const o=n("ShowCustomerEmailToggleSwitch"),r=n("CustomerEmailOptionalCheckbox");return m(),_("div",Te,[u(o),t.storeForm.online?(m(),h(r,{key:0})):F("",!0)])}const xe=l(Se,[["render",we]]),fe={mixins:[g],components:{Checkbox:k},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function $e(s,e,c,d,a,t){const o=n("Checkbox");return m(),h(o,{size:"xs",modelValue:a.storeState.online,"onUpdate:modelValue":e[0]||(e[0]=r=>a.storeState.online=r),errorText:s.getFormError("online")},{default:S(()=>e[1]||(e[1]=[i("div",{class:"text-sm mt-0.5"},"Optional",-1)])),_:1},8,["modelValue","errorText"])}const Fe=l(fe,[["render",$e]]),ve={mixins:[g],components:{ToogleSwitch:w},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function be(s,e,c,d,a,t){const o=n("ToogleSwitch");return m(),h(o,{size:"md",modelValue:t.storeForm.online,"onUpdate:modelValue":e[0]||(e[0]=r=>t.storeForm.online=r),errorText:s.getFormError("online")},{default:S(()=>e[1]||(e[1]=[T(" Show last name ")])),_:1},8,["modelValue","errorText"])}const ke=l(ve,[["render",be]]),Ce={components:{CustomerLastNameOptionalCheckbox:Fe,ShowCustomerLastNameToggleSwitch:ke},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}},Ve={class:"grid grid-cols-2"};function Ie(s,e,c,d,a,t){const o=n("ShowCustomerLastNameToggleSwitch"),r=n("CustomerLastNameOptionalCheckbox");return m(),_("div",Ve,[u(o),t.storeForm.online?(m(),h(r,{key:0})):F("",!0)])}const ye=l(Ce,[["render",Ie]]),He={mixins:[g],components:{Checkbox:k},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function Ee(s,e,c,d,a,t){const o=n("Checkbox");return m(),h(o,{size:"xs",modelValue:a.storeState.online,"onUpdate:modelValue":e[0]||(e[0]=r=>a.storeState.online=r),errorText:s.getFormError("online")},{default:S(()=>e[1]||(e[1]=[i("div",{class:"text-sm mt-0.5"},"Optional",-1)])),_:1},8,["modelValue","errorText"])}const Be=l(He,[["render",Ee]]),Me={mixins:[g],components:{ToogleSwitch:w},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function De(s,e,c,d,a,t){const o=n("ToogleSwitch");return m(),h(o,{size:"md",modelValue:t.storeForm.online,"onUpdate:modelValue":e[0]||(e[0]=r=>t.storeForm.online=r),errorText:s.getFormError("online")},{default:S(()=>e[1]||(e[1]=[T(" Show first name ")])),_:1},8,["modelValue","errorText"])}const Pe=l(Me,[["render",De]]),Ne={components:{CustomerFirstNameOptionalCheckbox:Be,ShowCustomerFirstNameToggleSwitch:Pe},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}},Oe={class:"grid grid-cols-2"};function Ue(s,e,c,d,a,t){const o=n("ShowCustomerFirstNameToggleSwitch"),r=n("CustomerFirstNameOptionalCheckbox");return m(),_("div",Oe,[u(o),t.storeForm.online?(m(),h(r,{key:0})):F("",!0)])}const Ze=l(Ne,[["render",Ue]]),ze={mixins:[g],components:{TextInput:$},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function je(s,e,c,d,a,t){const o=n("TextInput");return m(),h(o,{label:"Section heading",modelValue:t.storeForm.name,"onUpdate:modelValue":e[0]||(e[0]=r=>t.storeForm.name=r),placeholder:"Baby Cakes 🧁",errorText:s.getFormError("name"),labelPopoverTitle:"What Is This?",labelPopoverDescription:"The heading of the customer section"},null,8,["modelValue","errorText"])}const Le=l(ze,[["render",je]]),Ae={components:{ShowCustomerEmailOptions:xe,ShowCustomerLastNameOptions:ye,ShowCustomerFirstNameOptions:Ze,CustomerSectionHeadingTextInput:Le}},We={class:"bg-white shadow-lg border rounded-lg space-y-4 p-8 mb-4"},qe={class:"bg-gray-50 p-4 rounded-lg space-y-4"};function Ge(s,e,c,d,a,t){const o=n("CustomerSectionHeadingTextInput"),r=n("ShowCustomerFirstNameOptions"),x=n("ShowCustomerLastNameOptions"),f=n("ShowCustomerEmailOptions");return m(),_("div",We,[e[0]||(e[0]=i("h1",{class:"flex items-center font-lg font-bold"},[i("svg",{class:"w-6 h-6 mr-2 flex-shrink-0",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[i("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"})]),i("span",null,"Customer")],-1)),e[1]||(e[1]=i("p",{class:"text-sm text-gray-500"},"This section allows customers to profile themselves",-1)),u(o),i("div",qe,[u(r),u(x),u(f)])])}const Je=l(Ae,[["render",Ge]]),Ke={mixins:[g],components:{ToogleSwitch:w},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function Qe(s,e,c,d,a,t){const o=n("ToogleSwitch");return m(),h(o,{size:"md",modelValue:t.storeForm.online,"onUpdate:modelValue":e[0]||(e[0]=r=>t.storeForm.online=r),errorText:s.getFormError("online")},{default:S(()=>e[1]||(e[1]=[T(" Show promotions ")])),_:1},8,["modelValue","errorText"])}const Re=l(Ke,[["render",Qe]]),Xe={mixins:[g],components:{TextInput:$},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function Ye(s,e,c,d,a,t){const o=n("TextInput");return m(),h(o,{label:"Section heading",modelValue:t.storeForm.name,"onUpdate:modelValue":e[0]||(e[0]=r=>t.storeForm.name=r),placeholder:"Baby Cakes 🧁",errorText:s.getFormError("name"),labelPopoverTitle:"What Is This?",labelPopoverDescription:"The heading of the promotions section"},null,8,["modelValue","errorText"])}const et=l(Xe,[["render",Ye]]),tt={components:{ShowPromotionsToggleSwitch:Re,PromotionsSectionHeadingTextInput:et},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}},ot={class:"bg-white shadow-lg border rounded-lg space-y-4 p-8 mb-4"},rt={class:"bg-gray-50 p-4 rounded-lg space-y-4"};function nt(s,e,c,d,a,t){const o=n("PromotionsSectionHeadingTextInput"),r=n("ShowPromotionsToggleSwitch");return m(),_("div",ot,[e[0]||(e[0]=i("h1",{class:"flex items-center font-lg font-bold"},[i("svg",{class:"w-6 h-6 mr-2 flex-shrink-0",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[i("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m8.99 14.993 6-6m6 3.001c0 1.268-.63 2.39-1.593 3.069a3.746 3.746 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043 3.745 3.745 0 0 1-3.068 1.593c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 0 1-3.296-1.043 3.746 3.746 0 0 1-1.043-3.297 3.746 3.746 0 0 1-1.593-3.068c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 0 1 1.043-3.297 3.745 3.745 0 0 1 3.296-1.042 3.745 3.745 0 0 1 3.068-1.594c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.297 3.746 3.746 0 0 1 1.593 3.068ZM9.74 9.743h.008v.007H9.74v-.007Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"})]),i("span",null,"Promotions")],-1)),e[1]||(e[1]=i("p",{class:"text-sm text-gray-500"},"This section allows customers to claim promotional offers",-1)),u(o),i("div",rt,[u(r)])])}const st=l(tt,[["render",nt]]),it={mixins:[g],components:{ToogleSwitch:w},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function at(s,e,c,d,a,t){const o=n("ToogleSwitch");return m(),h(o,{size:"md",modelValue:t.storeForm.online,"onUpdate:modelValue":e[0]||(e[0]=r=>t.storeForm.online=r),errorText:s.getFormError("online")},{default:S(()=>e[1]||(e[1]=[T(" Combine fees into one amount ")])),_:1},8,["modelValue","errorText"])}const mt=l(it,[["render",at]]),lt={mixins:[g],components:{ToogleSwitch:w},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function ct(s,e,c,d,a,t){const o=n("ToogleSwitch");return m(),h(o,{size:"md",modelValue:t.storeForm.online,"onUpdate:modelValue":e[0]||(e[0]=r=>t.storeForm.online=r),errorText:s.getFormError("online")},{default:S(()=>e[1]||(e[1]=[T(" Combine discounts into one amount ")])),_:1},8,["modelValue","errorText"])}const dt=l(lt,[["render",ct]]),pt={mixins:[g],components:{TextInput:$},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function ut(s,e,c,d,a,t){const o=n("TextInput");return m(),h(o,{label:"Section heading",modelValue:t.storeForm.name,"onUpdate:modelValue":e[0]||(e[0]=r=>t.storeForm.name=r),placeholder:"Baby Cakes 🧁",errorText:s.getFormError("name"),labelPopoverTitle:"What Is This?",labelPopoverDescription:"The heading of the tips section"},null,8,["modelValue","errorText"])}const ht=l(pt,[["render",ut]]),gt={components:{CombineFeesToggleSwitch:mt,CombineDiscountsToggleSwitch:dt,CostBreakdownSectionHeadingTextInput:ht},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}},_t={class:"bg-white shadow-lg border rounded-lg space-y-4 p-8 mb-4"},St={class:"bg-gray-50 p-4 rounded-lg space-y-4"};function Tt(s,e,c,d,a,t){const o=n("CostBreakdownSectionHeadingTextInput"),r=n("CombineFeesToggleSwitch"),x=n("CombineDiscountsToggleSwitch");return m(),_("div",_t,[e[0]||(e[0]=i("h1",{class:"flex items-center font-lg font-bold"},[i("svg",{class:"w-6 h-6 mr-2 flex-shrink-0",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[i("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"})]),i("span",null,"Cost Breakdown")],-1)),e[1]||(e[1]=i("p",{class:"text-sm text-gray-500"},"This section allows customers to see the cost breakdown",-1)),u(o),i("div",St,[u(r),u(x)])])}const wt=l(gt,[["render",Tt]]),xt={mixins:[g],components:{ToogleSwitch:w},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function ft(s,e,c,d,a,t){const o=n("ToogleSwitch");return m(),h(o,{size:"md",modelValue:t.storeForm.online,"onUpdate:modelValue":e[0]||(e[0]=r=>t.storeForm.online=r),errorText:s.getFormError("online")},{default:S(()=>e[1]||(e[1]=[T(" Show delivery methods ")])),_:1},8,["modelValue","errorText"])}const $t=l(xt,[["render",ft]]),Ft={mixins:[g],components:{TextInput:$},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function vt(s,e,c,d,a,t){const o=n("TextInput");return m(),h(o,{label:"Address heading",modelValue:t.storeForm.name,"onUpdate:modelValue":e[0]||(e[0]=r=>t.storeForm.name=r),placeholder:"Baby Cakes 🧁",errorText:s.getFormError("name"),labelPopoverTitle:"What Is This?",labelPopoverDescription:"The heading of the address section"},null,8,["modelValue","errorText"])}const bt=l(Ft,[["render",vt]]),kt={mixins:[g],components:{TextInput:$},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function Ct(s,e,c,d,a,t){const o=n("TextInput");return m(),h(o,{label:"Schedule heading",modelValue:t.storeForm.name,"onUpdate:modelValue":e[0]||(e[0]=r=>t.storeForm.name=r),placeholder:"Baby Cakes 🧁",errorText:s.getFormError("name"),labelPopoverTitle:"What Is This?",labelPopoverDescription:"The heading of the schedule section"},null,8,["modelValue","errorText"])}const Vt=l(kt,[["render",Ct]]),It={components:{ItemsSectionHeadingTextInput:I,ShowDeliveryMethodsToggleSwitch:$t,DeliveryAddressHeadingTextInput:bt,DeliveryScheduleHeadingTextInput:Vt},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}},yt={class:"bg-white shadow-lg border rounded-lg space-y-4 p-8 mb-4"},Ht={class:"bg-gray-50 p-4 rounded-lg space-y-4"};function Et(s,e,c,d,a,t){const o=n("ItemsSectionHeadingTextInput"),r=n("ShowDeliveryMethodsToggleSwitch"),x=n("DeliveryScheduleHeadingTextInput"),f=n("DeliveryAddressHeadingTextInput");return m(),_("div",yt,[e[0]||(e[0]=i("h1",{class:"flex items-center font-lg font-bold"},[i("svg",{class:"w-6 h-6 mr-2 flex-shrink-0",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[i("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"})]),i("span",null,"Delivery Methods")],-1)),e[1]||(e[1]=i("p",{class:"text-sm text-gray-500"},"This section allows customers to select their preffered delivery method",-1)),u(o),i("div",Ht,[u(r),t.storeForm.online?(m(),_(b,{key:0},[u(x),u(f)],64)):F("",!0)])])}const Bt=l(It,[["render",Et]]),Mt={components:{BadgeIndicator:M,TipsSection:ee,ItemsSection:ce,CustomerSection:Je,PromotionsSection:st,CostBreakdownSection:wt,DeliveryMethodsSection:Bt},data(){return{selectedTab:"settings",storeState:p(),tabs:["settings","preview"]}},computed:{store(){return this.storeState.store}},methods:{setStoreForm(){this.storeState.setStoreForm(this.store)}},created(){this.setStoreForm()}},Dt={key:0,class:"w-4 h-4 mr-1",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},Pt={key:1,class:"w-4 h-4 mr-1",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},Nt=["src"];function Ot(s,e,c,d,a,t){const o=n("BadgeIndicator"),r=n("CustomerSection"),x=n("ItemsSection"),f=n("DeliveryMethodsSection"),y=n("TipsSection"),H=n("PromotionsSection"),E=n("CostBreakdownSection");return m(),_("div",null,[i("div",{class:N(["flex flex-wrap gap-2 justify-center bg-blue-50 py-4",a.selectedTab=="settings"?"rounded-lg mb-4":"rounded-t-lg"])},[(m(!0),_(b,null,P(a.tabs,(v,B)=>(m(),h(o,{text:v,key:B,size:"px-4 py-2",showDot:!1,clickable:!0,action:()=>a.selectedTab=v,type:a.selectedTab==v?"primary":"info"},{default:S(()=>[v=="settings"?(m(),_("svg",Dt,e[0]||(e[0]=[i("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"},null,-1),i("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"},null,-1)]))):(m(),_("svg",Pt,e[1]||(e[1]=[i("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"},null,-1),i("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"},null,-1)])))]),_:2},1032,["text","action","type"]))),128))],2),C(i("div",null,[u(r),u(x),u(f),u(y),u(H),u(E)],512),[[V,a.selectedTab=="settings"]]),C(i("div",null,[i("iframe",{src:"/"+t.store.alias+"/checkout",class:"w-full h-screen rounded-b-lg"},null,8,Nt)],512),[[V,a.selectedTab=="preview"]])])}const to=l(Mt,[["render",Ot]]);export{to as default};
