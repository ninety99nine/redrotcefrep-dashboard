import{u as p}from"./store-store-CxinBL3L.js";import{F as b}from"./FormMixin-D44Bj-el.js";import{T as y}from"./TextInput-CwB-G_mS.js";import{r as n,o as u,e as h,w as f,b as o,c as _,d as i,u as P,p as H,h as T,t as M,F,f as C,k as V,W as B,X as z}from"./app-DEkFCb1u.js";import{_ as d}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{S as $}from"./SelectInput-DXfLro8i.js";import{F as j}from"./FormErrorMessages-T64AgTW8.js";import{N as X,O as G,D as K,a as Z}from"./OfflineMessageTextarea-Ya3dm0h7.js";import{E as q}from"./EmailInput-CYL8CYZj.js";import{S as J}from"./SaveChangesAlert-B_UsUk9a.js";import{p as Q,a as Y,d as ee,g as te}from"./api-repository-CIJPUswr.js";import{B as oe}from"./BulkMobileNumberInput-GLJbzw4B.js";import{M as A}from"./MobileNumberInput-DB74IXOZ.js";import{P as re}from"./Pill-CD_3pjy5.js";import{P as se}from"./PrimaryButton-Cwf__Lsv.js";import{A as ne}from"./Alert-DEJps0rh.js";import{T as ae}from"./TimeInput-BMD6nxIk.js";import{C as le}from"./Checkbox-BOFyOk4h.js";import{T as D}from"./ToogleSwitch-CtY-gb5u.js";import{C as ie}from"./CountrySelectInput-hJ8dcCxk.js";import{C as ue}from"./CurrencySelectInput-Cqsc568F.js";import{A as ce}from"./AddressInput-DySv_o9F.js";import"./cloneDeep-BGE7Bmb-.js";import"./form-store-B_ZbhArT.js";import"./InputErrorMessage-lzTzq-uZ.js";import"./MoreInfoPopover-CrxGv8yo.js";import"./TextareaInput-CtY-WADI.js";import"./ShineEffect-CWpUJr6E.js";import"./SaveChanges-CYkT3WGE.js";import"./UndoButton-6P096GJ8.js";import"./AddButton-CqVfIWO7.js";import"./BasicModal-DyuUDblK.js";import"./DeleteButton-BPGn2bRk.js";import"./SpinningLoader-BnJGVf_7.js";/* empty css                                                                      */import"./GoogleMaps-BO2i0bSd.js";import"./BackButton-DMqpm81M.js";import"./LineSkeleton-DFWRI7XC.js";const me={mixins:[b],components:{TextInput:y},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function de(r,e,c,m,l,t){const s=n("TextInput");return u(),h(s,{label:"Tax ID",placeholder:"12-3456789",modelValue:t.storeForm.taxId,"onUpdate:modelValue":e[0]||(e[0]=a=>t.storeForm.taxId=a),errorText:r.getFormError("taxId"),labelPopoverTitle:"What Is This?",labelPopoverDescription:"Provide your tax identification number (e.g. EIN for US, VAT for UK)."},null,8,["modelValue","errorText"])}const pe=d(me,[["render",de]]),he={mixins:[b],components:{SelectInput:$},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function ge(r,e,c,m,l,t){const s=n("SelectInput");return u(),h(s,{width:"w-full",label:"Tax Method",modelValue:t.storeForm.taxMethod,"onUpdate:modelValue":e[0]||(e[0]=a=>t.storeForm.taxMethod=a),labelPopoverTitle:"What Is This?",errorText:r.getFormError("taxMethod"),labelPopoverDescription:"Choose whether taxes are included in your prices (inclusive) or added on top of prices (exclusive)."},{default:f(()=>e[1]||(e[1]=[o("option",{value:"inclusive"},"Inclusive (Prices include tax)",-1),o("option",{value:"exclusive"},"Exclusive (Prices exclude tax)",-1)])),_:1},8,["modelValue","errorText"])}const _e=d(he,[["render",ge]]),be={mixins:[b],components:{TextInput:y},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function fe(r,e,c,m,l,t){const s=n("TextInput");return u(),h(s,{placeholder:"10",label:"Tax Rate (%)",labelPopoverTitle:"What Is This?",modelValue:t.storeForm.taxPercentageRate,"onUpdate:modelValue":e[0]||(e[0]=a=>t.storeForm.taxPercentageRate=a),errorText:r.getFormError("taxPercentageRate"),labelPopoverDescription:"Enter the percentage rate for taxes applied to sales. For example, 15 for a 15% VAT or 7.5 for a 7.5% Sales Tax. This rate will be used to calculate taxes on transactions."},null,8,["modelValue","errorText"])}const xe=d(be,[["render",fe]]),Se={components:{TaxIdTextInput:pe,TaxMethodSelectInput:_e,TaxPercentageRateTextInput:xe},props:{form:{type:Object}}},we={class:"bg-white mb-4 p-8 rounded-lg space-y-4"},Te={class:"grid grid-cols-2 gap-4"},ve={class:"col-span-1"},Ie={class:"col-span-1"},ye={class:"col-span-2"};function Fe(r,e,c,m,l,t){const s=n("TaxMethodSelectInput"),a=n("TaxIdTextInput"),g=n("TaxPercentageRateTextInput");return u(),_("div",we,[e[0]||(e[0]=o("h1",{class:"flex items-center font-lg font-bold"},[o("svg",{class:"w-6 h-6 mr-2 flex-shrink-0",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[o("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M14.121 7.629A3 3 0 0 0 9.017 9.43c-.023.212-.002.425.028.636l.506 3.541a4.5 4.5 0 0 1-.43 2.65L9 16.5l1.539-.513a2.25 2.25 0 0 1 1.422 0l.655.218a2.25 2.25 0 0 0 1.718-.122L15 15.75M8.25 12H12m9 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"})]),o("span",null,"Tax")],-1)),e[1]||(e[1]=o("p",{class:"text-sm text-gray-500"},"Set your store's tax rate and method (Inclusive/Exclusive) to ensure accurate pricing and compliance with local tax regulations.",-1)),o("div",Te,[o("div",ve,[i(s)]),o("div",Ie,[i(a)]),o("div",ye,[i(g)])])])}const $e=d(Se,[["render",Fe]]),ke={mixins:[b],components:{TextInput:y},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}},methods:{formatAlias(){this.storeState.formatAlias(!0)}}};function Ne(r,e,c,m,l,t){const s=n("TextInput");return u(),h(s,{modelValue:t.storeForm.alias,"onUpdate:modelValue":e[0]||(e[0]=a=>t.storeForm.alias=a),onKeyup:t.formatAlias,label:"Store Website",placeholder:"Baby Cakes 🧁",labelPopoverTitle:"What Is This?",errorText:r.getFormError("alias"),labelPopoverDescription:"The website link that will be used by customers to visit your store, shop and place orders"},{prepend:f(()=>e[1]||(e[1]=[o("div",{class:"flex items-center space-x-1 py-1.5 pl-2 pr-4 rounded-l-md bg-gray-50 text-gray-500 border-r whitespace-nowrap"},[o("svg",{class:"w-5 h-5 mt-0.5",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[o("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525"})]),o("span",null,"perfectorder.me"),o("span",{class:"text-gray-400"}," / ")],-1)])),_:1},8,["modelValue","onKeyup","errorText"])}const U=d(ke,[["render",Ne]]),Ce={mixins:[b],components:{EmailInput:q},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function Ve(r,e,c,m,l,t){const s=n("EmailInput");return u(),h(s,{label:"Email",modelValue:t.storeForm.email,"onUpdate:modelValue":e[0]||(e[0]=a=>t.storeForm.email=a),labelPopoverTitle:"What Is This?",errorText:r.getFormError("email"),placeholder:"sales@"+(t.storeForm.alias||"example")+".com",labelPopoverDescription:"The store email address e.g sales@"+(t.storeForm.alias||"example")+".com"},null,8,["modelValue","errorText","placeholder","labelPopoverDescription"])}const L=d(Ce,[["render",Ve]]),Me={components:{BulkMobileNumberInput:oe},data(){return{isSubmitting:!1,apiState:P(),storeState:p()}},computed:{store(){return this.storeState.store},mobileNumbers(){return this.storeRollingNumbers.map(r=>r.mobileNumber.international)},storeRollingNumbers(){return this.store._relationships.storeRollingNumbers}},methods:{createStoreRollingNumber(r,e,c){this.isSubmitting=!0;let m={mobileNumber:r,storeId:this.store.id,return:"1"};Q(this.apiState.apiHome._links.createStoreRollingNumber,m).then(l=>{if(l.status==200){c(),e();var t=l.data.storeRollingNumber;p().store._relationships.storeRollingNumbers.push(t),this.notificationState.showSuccessNotification("Whatsapp number added")}this.isSubmitting=!1}).catch(l=>{this.isSubmitting=!1,this.formState.setServerFormErrors(l)})},updateStoreRollingNumber(r,e,c,m){this.isSubmitting=!0;let l={mobileNumber:r,return:"1"};const t=this.storeRollingNumbers[e];Y(t._links.updateStoreRollingNumber,l).then(s=>{if(s.status==200)if(s.data.updated){m(),c();var a=s.data.storeRollingNumber;p().store._relationships.storeRollingNumbers[e]=a,this.notificationState.showSuccessNotification("Whatsapp number updated")}else this.formState.setFormError("general",s.data.message),this.notificationState.showWarningNotification(s.data.message);this.isSubmitting=!1}).catch(s=>{this.isSubmitting=!1,this.formState.setServerFormErrors(s)})},deleteStoreRollingNumber(r,e,c){this.isSubmitting=!0;const m=this.storeRollingNumbers[r];ee(m._links.deleteStoreRollingNumber).then(l=>{l.status==200&&(l.data.deleted?(c(),e(),p().store._relationships.storeRollingNumbers.splice(this.storeRollingNumberIndex,1)):(this.formState.setFormError("general",l.data.message),this.notificationState.showWarningNotification(l.data.message))),this.isSubmitting=!1}).catch(l=>{this.isSubmitting=!1,this.formState.setServerFormErrors(l)})}}};function Pe(r,e,c,m,l,t){const s=n("BulkMobileNumberInput");return u(),h(s,{showWhatsappIcon:!0,isSubmitting:l.isSubmitting,mobileNumbers:t.mobileNumbers,createMobileNumber:t.createStoreRollingNumber,updateMobileNumber:t.updateStoreRollingNumber,deleteMobileNumber:t.deleteStoreRollingNumber,bodyClass:"space-y-4 p-4 border rounded-lg shadow-lg"},{content:f(()=>e[0]||(e[0]=[o("h1",{class:"flex items-center font-lg font-bold"},[o("svg",{class:"w-6 h-6 mr-4 flex-shrink-0",fill:"#44c152",version:"1.1",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 308 308","xml:space":"preserve"},[o("g",{id:"XMLID_468_"},[o("path",{id:"XMLID_469_",d:"M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458C233.168,179.508,230.845,178.393,227.904,176.981z"}),o("path",{id:"XMLID_470_",d:"M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0zM156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867C276.546,215.678,222.799,268.994,156.734,268.994z"})])]),o("span",null,"WhatsApp Order Distribution")],-1),o("p",{class:"text-sm text-gray-500"},"Distribute customer orders evenly among different WhatsApp numbers. Each number will receive one order message at a time, ensuring balanced order handling.",-1)])),_:1},8,["isSubmitting","mobileNumbers","createMobileNumber","updateMobileNumber","deleteMobileNumber"])}const E=d(Me,[["render",Pe]]),Ae={mixins:[b],components:{MobileNumberInput:A,Pill:re},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}},De={class:"space-y-4 p-4 border rounded-lg shadow-lg"},Ue={class:"text-sm text-gray-500"};function Le(r,e,c,m,l,t){const s=n("Pill"),a=n("MobileNumberInput");return u(),_("div",De,[e[3]||(e[3]=H('<h1 class="flex items-center font-lg font-bold"><svg class="w-6 h-6 mr-4 flex-shrink-0" fill="#44c152" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 308 308" xml:space="preserve"><g id="XMLID_468_"><path id="XMLID_469_" d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458C233.168,179.508,230.845,178.393,227.904,176.981z"></path><path id="XMLID_470_" d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0zM156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867C276.546,215.678,222.799,268.994,156.734,268.994z"></path></g></svg><span>WhatsApp Notifications</span></h1>',1)),o("p",Ue,[e[1]||(e[1]=T(" Set the primary WhatsApp number that your store will use to automatically send updates and notifications using ")),i(s,{type:"primary",text:"workflows",showDot:!1,clickable:!0,onAction:()=>{}}),e[2]||(e[2]=T(", ensuring clear and timely communication "))]),i(a,{label:"WhatsApp Number",labelPopoverTitle:"What Is This?",modelValue:t.storeForm.whatsappMobileNumber,"onUpdate:modelValue":e[0]||(e[0]=g=>t.storeForm.whatsappMobileNumber=g),errorText:r.getFormError("whatsappMobileNumber"),labelPopoverDescription:"The Whatsapp mobile number that will be used to send notifications via whatsapp to customers or team members"},null,8,["modelValue","errorText"])])}const O=d(Ae,[["render",Le]]),Ee={mixins:[b],components:{TextInput:y},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function Oe(r,e,c,m,l,t){const s=n("TextInput");return u(),h(s,{maxlength:"11",label:"SMS Sender Name",placeholder:"Baby Cakes",modelValue:t.storeForm.smsSenderName,"onUpdate:modelValue":e[0]||(e[0]=a=>t.storeForm.smsSenderName=a),labelPopoverTitle:"What Is This?",errorText:r.getFormError("smsSenderName"),labelPopoverDescription:"The name given to SMS messages sent to the customer by your store e.g Baby Cakes"},{prepend:f(()=>e[1]||(e[1]=[o("div",{class:"flex items-center space-x-1 py-1.5 px-4 rounded-l-md bg-gray-50 text-gray-500 border-r whitespace-nowrap"},[o("svg",{class:"w-5 h-5",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[o("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"})])],-1)])),_:1},8,["modelValue","errorText"])}const W=d(Ee,[["render",Oe]]),We={mixins:[b],components:{MobileNumberInput:A},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function Re(r,e,c,m,l,t){const s=n("MobileNumberInput");return u(),h(s,{label:"USSD Number",labelPopoverTitle:"What Is This?",modelValue:t.storeForm.ussdMobileNumber,"onUpdate:modelValue":e[0]||(e[0]=a=>t.storeForm.ussdMobileNumber=a),errorText:r.getFormError("ussdMobileNumber"),labelPopoverDescription:"The mobile number that will be used by customers to dial your store, shop and place orders"},null,8,["modelValue","errorText"])}const R=d(We,[["render",Re]]),He={components:{FormErrorMessages:j,NameTextInput:X,AliasTextInput:U,EmailTextInput:L,OnlineToggleSwitch:G,SaveChangesAlert:J,DescriptionTextarea:K,StoreRollingNumbers:E,WhatsAppNotifications:O,SmsSenderNameTextInput:W,OfflineMessageTextarea:Z,UssdMobileNumberTextInput:R}},Be={class:"bg-white shadow-lg border p-8 rounded-lg mb-4"},ze={class:"space-y-4"};function je(r,e,c,m,l,t){const s=n("FormErrorMessages"),a=n("SaveChangesAlert"),g=n("OnlineToggleSwitch"),S=n("OfflineMessageTextarea"),x=n("NameTextInput"),w=n("DescriptionTextarea");return u(),_("div",Be,[e[0]||(e[0]=o("h1",{class:"text-lg font-bold mb-8"},"General Settings",-1)),o("div",ze,[i(s),i(a),i(g),i(S),i(x),i(w)])])}const Xe=d(He,[["render",je]]),Ge={mixins:[b],components:{TextInput:y,PrimaryButton:se},data(){return{storeName:"",storeState:p()}},computed:{storeForm(){return this.storeState.storeForm},isDeletingStore(){return this.storeState.isDeletingStore}},methods:{deleteStore(){this.storeState.deleteStore()}}},Ke={class:"space-y-4 shadow-lg rounded-lg border p-4 border-red-300 bg-red-50"},Ze={class:"text-justify"},qe={class:"font-bold text-black"},Je={class:"flex justify-end"};function Qe(r,e,c,m,l,t){const s=n("TextInput"),a=n("PrimaryButton");return u(),_("div",Ke,[e[4]||(e[4]=o("h1",{class:"text-lg font-bold"},"Danger",-1)),o("p",Ze,[e[1]||(e[1]=T(" Do you want to permanently delete ")),o("span",qe,M(t.storeForm.name),1),e[2]||(e[2]=T("? Once this store is deleted you will not be able to recover it. All orders, products, customers, and store-related settings will be permanently deleted and cannot be recovered. Enter the store name to confirm this action. "))]),i(s,{class:"mb-8",label:"Confirm",modelValue:l.storeName,"onUpdate:modelValue":e[0]||(e[0]=g=>l.storeName=g),placeholder:t.storeForm.name,errorText:r.getFormError("name"),labelPopoverTitle:"What Is This?",labelPopoverDescription:"Type the store name ("+t.storeForm.name+") to confirm deleting this store"},null,8,["modelValue","placeholder","errorText","labelPopoverDescription"]),o("div",Je,[i(a,{action:t.deleteStore,loading:t.isDeletingStore,disabled:l.storeName!=t.storeForm.name||t.isDeletingStore,class:"w-40",type:"danger"},{default:f(()=>e[3]||(e[3]=[T(" Delete Store ")])),_:1},8,["action","loading","disabled"])])])}const Ye=d(Ge,[["render",Qe]]),et={mixins:[b],components:{ToogleSwitch:D},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function tt(r,e,c,m,l,t){const s=n("ToogleSwitch");return u(),h(s,{size:"md",labelPopoverTitle:"What Is This?",modelValue:t.storeForm.showOpeningHours,"onUpdate:modelValue":e[0]||(e[0]=a=>t.storeForm.showOpeningHours=a),errorText:r.getFormError("showOpeningHours"),labelPopoverDescription:"Turn on if you would like your store to showcase its open or closed hours"},{default:f(()=>e[1]||(e[1]=[T(" Show opening hours ")])),_:1},8,["modelValue","errorText"])}const ot=d(et,[["render",tt]]),rt={mixins:[b],components:{ToogleSwitch:D},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function st(r,e,c,m,l,t){const s=n("ToogleSwitch");return u(),h(s,{size:"md",labelPopoverTitle:"What Is This?",modelValue:t.storeForm.allowCheckoutOnClosedHours,"onUpdate:modelValue":e[0]||(e[0]=a=>t.storeForm.allowCheckoutOnClosedHours=a),errorText:r.getFormError("allowCheckoutOnClosedHours"),labelPopoverDescription:"Turn on to allow customers to place orders during closed hours"},{default:f(()=>e[1]||(e[1]=[T(" Allow checkout during closed hours ")])),_:1},8,["modelValue","errorText"])}const nt=d(rt,[["render",st]]),at={mixins:[b],components:{Alert:ne,TimeInput:ae,Checkbox:le,ShowOpeningHoursToggleSwitch:ot,AllowCheckoutOnClosedHoursToggleSwitch:nt},data(){return{storeState:p(),days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]}},computed:{storeForm(){return this.storeState.storeForm}},methods:{addOpeningHour(r){this.storeForm.openingHours[r].hours.push(["08:00","16:00"])},removeOpeningHour(r,e){this.storeForm.openingHours[r].hours.splice(e,1)}}},lt={class:"bg-white mb-4 p-8 rounded-lg space-y-4"},it={class:"col-span-1 flex items-center space-x-2"},ut={class:"col-span-1 space-y-2"},ct={class:"flex items-center space-x-2"},mt=["onClick"],dt=["onClick"];function pt(r,e,c,m,l,t){const s=n("ShowOpeningHoursToggleSwitch"),a=n("AllowCheckoutOnClosedHoursToggleSwitch"),g=n("Alert"),S=n("Checkbox"),x=n("TimeInput");return u(),_("div",lt,[e[4]||(e[4]=o("h1",{class:"flex items-center font-lg font-bold"},[o("svg",{class:"w-6 h-6 mr-2 flex-shrink-0",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[o("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"})]),o("span",null,"Opening Hours")],-1)),e[5]||(e[5]=o("p",{class:"text-sm text-gray-500"},"Set your store's operating hours, including availability and time slots for each day. Indicate if the store is open or closed on any specific day.",-1)),i(s),t.storeForm.showOpeningHours?(u(),_(F,{key:0},[i(a),t.storeForm.allowCheckoutOnClosedHours?C("",!0):(u(),h(g,{key:0,type:"warning",class:"flex items-center space-x-2"},{default:f(()=>e[0]||(e[0]=[o("svg",{class:"w-6 h-6 flex-shrink-0",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[o("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"})],-1),o("span",null,"Customers cannot place orders during closed hours",-1)])),_:1})),(u(!0),_(F,null,V(t.storeForm.openingHours,(w,v)=>(u(),_("div",{key:v,class:"border-t border-dashed pt-4 grid grid-cols-2 gap-4 items-start"},[o("div",it,[i(S,{modelValue:w.available,"onUpdate:modelValue":I=>w.available=I,size:"xs",class:"mt-1"},null,8,["modelValue","onUpdate:modelValue"]),o("span",null,M(l.days[v]),1)]),o("div",ut,[(u(!0),_(F,null,V(w.hours,(I,k)=>(u(),_("div",{key:k},[o("div",ct,[i(x,{modelValue:I[0],"onUpdate:modelValue":N=>I[0]=N,errorText:r.getFormError("openingHours"),class:"w-24"},null,8,["modelValue","onUpdate:modelValue","errorText"]),e[3]||(e[3]=o("span",null,"-",-1)),i(x,{modelValue:I[1],"onUpdate:modelValue":N=>I[1]=N,errorText:r.getFormError("openingHours"),class:"w-24"},null,8,["modelValue","onUpdate:modelValue","errorText"]),k==0?(u(),_("div",{key:0,onClick:()=>t.addOpeningHour(v),class:"flex-shrink-0 cursor-pointer rounded-md border p-1 hover:bg-blue-50 transition-all"},e[1]||(e[1]=[o("svg",{class:"w-4 h-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[o("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 4.5v15m7.5-7.5h-15"})],-1)]),8,mt)):(u(),_("div",{key:1,onClick:()=>t.removeOpeningHour(v,k),class:"flex-shrink-0 cursor-pointer rounded-md border p-1 bg-red-50 hover:bg-red-100 transition-all"},e[2]||(e[2]=[o("svg",{class:"w-4 h-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[o("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M5 12h14"})],-1)]),8,dt))])]))),128))])]))),128))],64)):C("",!0)])}const ht=d(at,[["render",pt]]),gt={mixins:[b],components:{CountrySelectInput:ie},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function _t(r,e,c,m,l,t){const s=n("CountrySelectInput",!0);return u(),h(s,{width:"w-full",label:"Country",modelValue:t.storeForm.country,"onUpdate:modelValue":e[0]||(e[0]=a=>t.storeForm.country=a),labelPopoverTitle:"What Is This?",labelPopoverDescription:"The country that your store is operating from"},null,8,["modelValue"])}const bt=d(gt,[["render",_t]]),ft={mixins:[b],components:{CurrencySelectInput:ue},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function xt(r,e,c,m,l,t){const s=n("CurrencySelectInput",!0);return u(),h(s,{width:"w-full",label:"Currency",modelValue:t.storeForm.currency,"onUpdate:modelValue":e[0]||(e[0]=a=>t.storeForm.currency=a),labelPopoverTitle:"What Is This?",labelPopoverDescription:"The currency accepted by your store"},null,8,["modelValue"])}const St=d(ft,[["render",xt]]),wt={components:{SelectInput:$},data(){return{languages:[],apiState:P(),isLoadingLanguages:!1}},methods:{showLanguages(){this.languages.length||(this.isLoadingLanguages=!0,te(this.apiState.apiHome._links.showLanguages).then(r=>{r.status==200&&(this.languages=r.data),this.isLoadingLanguages=!1}).catch(r=>{this.isLoadingLanguages=!1,this.formState.setServerFormErrors(r)}))}},created(){this.showLanguages()}},Tt=["value"];function vt(r,e,c,m,l,t){const s=n("SelectInput");return u(),h(s,B(z(r.$attrs)),{default:f(()=>[(u(!0),_(F,null,V(l.languages,(a,g)=>(u(),_("option",{key:g,value:a.code},M(a.name),9,Tt))),128))]),_:1},16)}const It=d(wt,[["render",vt]]),yt={mixins:[b],components:{LanguageSelectInput:It},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function Ft(r,e,c,m,l,t){const s=n("LanguageSelectInput",!0);return u(),h(s,{width:"w-full",label:"Currency",modelValue:t.storeForm.language,"onUpdate:modelValue":e[0]||(e[0]=a=>t.storeForm.language=a),labelPopoverTitle:"What Is This?",labelPopoverDescription:"The currency accepted by your store"},null,8,["modelValue"])}const $t=d(yt,[["render",Ft]]),kt={mixins:[b],components:{SelectInput:$},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function Nt(r,e,c,m,l,t){const s=n("SelectInput");return u(),h(s,{width:"w-full",label:"Weight Unit",modelValue:t.storeForm.weightUnit,"onUpdate:modelValue":e[0]||(e[0]=a=>t.storeForm.weightUnit=a),labelPopoverTitle:"What Is This?",errorText:r.getFormError("weightUnit"),labelPopoverDescription:"Choose the unit of measurement for weights used in your store. This setting is used for product weights and shipping calculations. Common units include kilograms (kg) for metric systems and pounds (lb) for imperial systems."},{default:f(()=>e[1]||(e[1]=[o("option",{value:"kg"},"Kilogram (kg)",-1),o("option",{value:"g"},"Gram (g)",-1),o("option",{value:"lb"},"Pound (lb)",-1),o("option",{value:"oz"},"Ounce (oz)",-1)])),_:1},8,["modelValue","errorText"])}const Ct=d(kt,[["render",Nt]]),Vt={mixins:[b],components:{SelectInput:$},data(){return{storeState:p()}},computed:{storeForm(){return this.storeState.storeForm}}};function Mt(r,e,c,m,l,t){const s=n("SelectInput");return u(),h(s,{width:"w-full",label:"Distance Unit",modelValue:t.storeForm.distanceUnit,"onUpdate:modelValue":e[0]||(e[0]=a=>t.storeForm.distanceUnit=a),labelPopoverTitle:"What Is This?",errorText:r.getFormError("distanceUnit"),labelPopoverDescription:"Choose the unit of measurement for distances used in your store. For example, kilometers (km) for metric systems or miles for imperial systems. This setting affects shipping calculations and location-based features."},{default:f(()=>e[1]||(e[1]=[o("option",{value:"km"},"Kilometer (km)",-1),o("option",{value:"mile"},"Mile",-1)])),_:1},8,["modelValue","errorText"])}const Pt=d(Vt,[["render",Mt]]),At={components:{CountrySelectInput:bt,CurrencySelectInput:St,LanguageSelectInput:$t,WeightUnitSelectInput:Ct,DistanceUnitSelectInput:Pt}},Dt={class:"bg-white mb-4 p-8 rounded-lg space-y-4"};function Ut(r,e,c,m,l,t){const s=n("CountrySelectInput"),a=n("CurrencySelectInput"),g=n("LanguageSelectInput"),S=n("DistanceUnitSelectInput"),x=n("WeightUnitSelectInput");return u(),_("div",Dt,[e[0]||(e[0]=o("h1",{class:"flex items-center font-lg font-bold"},[o("svg",{class:"w-6 h-6 mr-2 flex-shrink-0",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[o("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64"})]),o("span",null,"Localization")],-1)),e[1]||(e[1]=o("p",{class:"text-sm text-gray-500"},"Set your store's country, currency, language, and preferred distance unit (Km/Mile) to align with your local market and ensure a seamless shopping experience for your customers.",-1)),i(s),i(a),i(g),i(S),i(x)])}const Lt=d(At,[["render",Ut]]),Et={components:{AddressInput:ce},data(){return{storeState:p()}},computed:{store(){return this.storeState.store},address(){return this.store._relationships.address}},methods:{setAddress(r){this.store._relationships.address=r}}};function Ot(r,e,c,m,l,t){const s=n("AddressInput",!0);return u(),h(s,{address:t.address,storeId:t.store.id,onOnCreated:t.setAddress,onOnUpdated:t.setAddress,onOnDeleted:t.setAddress},null,8,["address","storeId","onOnCreated","onOnUpdated","onOnDeleted"])}const Wt=d(Et,[["render",Ot]]),Rt={components:{AddressInput:Wt,AliasTextInput:U,EmailTextInput:L,StoreRollingNumbers:E,WhatsAppNotifications:O,SmsSenderNameTextInput:W,UssdMobileNumberTextInput:R}},Ht={class:"bg-white mb-4 p-8 rounded-lg space-y-4"};function Bt(r,e,c,m,l,t){const s=n("AliasTextInput"),a=n("UssdMobileNumberTextInput"),g=n("EmailTextInput"),S=n("SmsSenderNameTextInput"),x=n("AddressInput"),w=n("WhatsAppNotifications"),v=n("StoreRollingNumbers");return u(),_("div",Ht,[i(s),i(a),i(g),i(S),i(x),i(w),i(v)])}const zt=d(Rt,[["render",Bt]]),jt={components:{Tax:$e,General:Xe,DeleteStore:Ye,OpeningHours:ht,Localization:Lt,Communication:zt},data(){return{storeState:p()}},computed:{store(){return this.storeState.store},isLoadingStore(){return this.storeState.isLoadingStore}},methods:{setStoreForm(){this.storeState.setStoreForm(this.store)}},created(){this.setStoreForm()}},Xt={key:0};function Gt(r,e,c,m,l,t){const s=n("General"),a=n("Communication"),g=n("Localization"),S=n("Tax"),x=n("OpeningHours"),w=n("DeleteStore");return t.isLoadingStore?C("",!0):(u(),_("div",Xt,[i(s),i(a),i(g),i(S),i(x),i(w)]))}const Po=d(jt,[["render",Gt]]);export{Po as default};
