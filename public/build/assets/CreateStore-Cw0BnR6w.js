import{F as y}from"./FormMixin-DjJxif50.js";import{u as x,a as v,c as n,b as t,t as k,m as C,d as i,w as c,r as a,o as m,h as S}from"./app-DGr24LlD.js";import{T as M}from"./TextInput-D_8GVWar.js";import{p as F}from"./api-repository-BpNKEdKW.js";import{P as I}from"./PrimaryButton-Bke-6sJ-.js";import{M as N}from"./MobileNumberInput-Db_2lVqD.js";import{C as V}from"./CountrySelectInput-DdW9vrGq.js";import{C as L}from"./CurrencySelectInput-9j6LAmxO.js";import{F as T}from"./FormErrorMessages-H2z_xV0j.js";import{_ as U}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./form-store-fTlv55Ng.js";import"./UtilsMixin-CBwmyCNB.js";import"./InputErrorMessage-xckJoMbN.js";import"./MoreInfoPopover-MomTL1G-.js";import"./SpinningLoader-C59uW44G.js";import"./SelectInput-CBVE5lGG.js";const _={mixins:[y],components:{TextInput:M,PrimaryButton:I,MobileNumberInput:N,CountrySelectInput:V,CurrencySelectInput:L,FormErrorMessages:T},data(){return{storeLogo:null,form:{name:"",alias:"",country:"BW",currency:"BWP",whatsappMobileNumber:""},aliasModified:!1,isCreatingStore:!1,apiState:x(),authState:v()}},methods:{syncWithAlias(){this.aliasModified==!1&&(this.form.alias=this.form.name,this.formatAlias())},formatAlias(s=!1){this.form.alias.length?(this.form.alias=this.form.alias.replace(/[^a-zA-Z0-9\s-]/g,"").replace(/\s+/g,"-").trim().toLowerCase(),this.aliasModified=s):this.aliasModified=!1},triggerFileUpload(){this.$refs.fileInput.click()},handleFileUpload(s){const e=s.target.files[0];e&&(this.storeLogo=URL.createObjectURL(e))},async createStore(){var e,p,u;if(this.isCreatingStore)return;if(this.hideFormErrors(),!((e=this.form.name)!=null&&e.trim())){this.setFormError("name","Enter store name");return}let s=new FormData;s.append("return",1),s.append("name",this.form.name),s.append("country",this.form.country),s.append("currency",this.form.currency),(p=this.form.alias)!=null&&p.trim()&&s.append("alias",this.form.alias.trim()),(u=this.form.whatsappMobileNumber)!=null&&u.trim()&&s.append("whatsappMobileNumber",this.form.whatsappMobileNumber.trim()),this.$refs.fileInput.files[0]&&s.append("store_logo",this.$refs.fileInput.files[0]),this.isCreatingStore=!0;try{const r=await F(this.apiState.apiHome._links.createStore,s,{headers:{"Content-Type":"multipart/form-data"}});r.status===200?(this.isCreatingStore=!1,this.showSuccessfulNotification("Store created!"),this.$router.push({name:"add-products",params:{store_href:r.data.store._links.showStore}})):(this.setGeneralFormError(r.data.message),this.showUnsuccessfulNotification(r.data.message))}catch(r){this.isCreatingStore=!1,this.setServerFormErrors(r)}}},created(){this.authState.user.mobileNumber&&(this.form.whatsappMobileNumber=this.authState.user.mobileNumber.international)}},B={class:"min-h-screen flex flex-col items-center justify-center"},A={class:"w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg"},E={class:"flex flex-col items-center mb-6"},j=["src"],P={class:"absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"},D={key:0,class:"w-4 h-4 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},W={key:1,class:"w-4 h-4 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},z={key:0,class:"w-4 h-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},Y={key:1,class:"w-4 h-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},K={class:"space-y-4 mb-4"};function X(s,e,p,u,r,l){const d=a("TextInput"),f=a("MobileNumberInput"),g=a("CountrySelectInput"),h=a("CurrencySelectInput"),w=a("FormErrorMessages"),b=a("PrimaryButton");return m(),n("div",B,[e[17]||(e[17]=t("div",{class:"w-full max-w-lg"},[t("h2",{class:"text-2xl font-semibold text-center"},"Start Your Store"),t("p",{class:"text-gray-500 text-center mb-6"},"Tell us a little about your store to get started")],-1)),t("div",A,[t("div",E,[t("div",{onClick:e[0]||(e[0]=(...o)=>l.triggerFileUpload&&l.triggerFileUpload(...o)),class:"w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition-all relative group"},[t("img",{src:r.storeLogo?r.storeLogo:"/images/logo-black-transparent.png",alt:"Store Logo",class:"w-full h-full rounded-full"},null,8,j),t("div",P,[r.storeLogo?(m(),n("svg",D,e[10]||(e[10]=[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"},null,-1)]))):(m(),n("svg",W,e[11]||(e[11]=[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 4.5v15m7.5-7.5h-15"},null,-1)])))])]),t("input",{type:"file",class:"hidden",ref:"fileInput",onChange:e[1]||(e[1]=(...o)=>l.handleFileUpload&&l.handleFileUpload(...o)),accept:"image/jpeg, image/jpg, image/png, image/gif"},null,544),t("button",{onClick:e[2]||(e[2]=(...o)=>l.triggerFileUpload&&l.triggerFileUpload(...o)),class:"flex items-center space-x-2 mt-4 text-xs border rounded-lg px-4 py-2 hover:bg-gray-100 active:scale-95 transition-all"},[r.storeLogo?(m(),n("svg",z,e[12]||(e[12]=[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"},null,-1)]))):(m(),n("svg",Y,e[13]||(e[13]=[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 4.5v15m7.5-7.5h-15"},null,-1)]))),t("span",null,k(r.storeLogo?"Add":"Change")+" store logo",1)])]),t("form",{onSubmit:e[9]||(e[9]=C((...o)=>l.createStore&&l.createStore(...o),["prevent"]))},[t("div",K,[i(d,{label:"Name",modelValue:r.form.name,"onUpdate:modelValue":e[3]||(e[3]=o=>r.form.name=o),showAsterisk:!0,onKeyup:l.syncWithAlias,placeholder:"Baby Cakes 🧁",autocomplete:"organization",errorText:s.getFormError("name")},null,8,["modelValue","onKeyup","errorText"]),i(f,{label:"WhatsApp Number",modelValue:r.form.whatsappMobileNumber,"onUpdate:modelValue":e[4]||(e[4]=o=>r.form.whatsappMobileNumber=o),errorText:s.getFormError("whatsappMobileNumber"),description:"Customers will send orders to this number after shopping"},{prepend:c(()=>e[14]||(e[14]=[t("svg",{class:"w-6 h-6 ml-2",fill:"#44c152",version:"1.1",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 308 308","xml:space":"preserve"},[t("g",{id:"XMLID_468_"},[t("path",{id:"XMLID_469_",d:"M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458C233.168,179.508,230.845,178.393,227.904,176.981z"}),t("path",{id:"XMLID_470_",d:"M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0zM156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867C276.546,215.678,222.799,268.994,156.734,268.994z"})])],-1)])),_:1},8,["modelValue","errorText"]),i(d,{modelValue:r.form.alias,"onUpdate:modelValue":e[5]||(e[5]=o=>r.form.alias=o),label:"Store Link",placeholder:"baby-cakes",onKeyup:e[6]||(e[6]=()=>l.formatAlias(!0)),errorText:s.getFormError("alias"),description:"Your store’s shopping link. Custom domains can be set later."},{prepend:c(()=>e[15]||(e[15]=[t("div",{class:"flex items-center space-x-1 py-1.5 pl-2 pr-4 rounded-l-md bg-gray-50 text-gray-500 border-r whitespace-nowrap"},[t("svg",{class:"w-5 h-5 mt-0.5",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525"})]),t("span",null,"perfectorder.me"),t("span",{class:"text-gray-400"}," / ")],-1)])),_:1},8,["modelValue","errorText"]),i(g,{width:"w-full",label:"Country",modelValue:r.form.country,"onUpdate:modelValue":e[7]||(e[7]=o=>r.form.country=o),labelPopoverTitle:"What Is This?",labelPopoverDescription:"Your store’s country of operation"},null,8,["modelValue"]),i(h,{width:"w-full",label:"Currency",modelValue:r.form.currency,"onUpdate:modelValue":e[8]||(e[8]=o=>r.form.currency=o),labelPopoverTitle:"What Is This?",labelPopoverDescription:"Your store’s currency"},null,8,["modelValue"]),i(w)]),i(b,{action:l.createStore,loading:r.isCreatingStore,class:"w-full"},{default:c(()=>e[16]||(e[16]=[S(" Create Store ")])),_:1},8,["action","loading"])],32)])])}const ae=U(_,[["render",X]]);export{ae as default};
