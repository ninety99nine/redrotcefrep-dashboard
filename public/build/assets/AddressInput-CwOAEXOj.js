import{c as h,i as _}from"./cloneDeep-B1YGuKb7.js";import{F as I}from"./FormMixin-6JkaGLLr.js";import{u as x,r as n,o,e as f,w as a,b as r,t as g,c as u,F as v,d as l,n as b,f as m,h as O}from"./app-jXH5QC3l.js";import{T as F}from"./TextInput-CYg7QVrw.js";import{G as B}from"./GoogleMaps-CAZTA1nk.js";import{A as V}from"./AddButton-C27rg1QJ.js";import{B as T}from"./BasicModal-COtA-wOd.js";import{B as E}from"./BackButton-BwL1p-4a.js";import{D as q}from"./DeleteButton-BvyZ48Y_.js";import{P as D}from"./PrimaryButton-BXUz1ZHt.js";import{L as N}from"./LineSkeleton-3g5h70H3.js";import{C as U}from"./CountrySelectInput-Cx2zez3q.js";import{g as z,p as S,a as W,d as j}from"./api-repository--xE_j9dL.js";import{_ as H}from"./_plugin-vue_export-helper-DlAUqK2U.js";const R={mixins:[I],components:{TextInput:F,GoogleMaps:B,AddButton:V,BasicModal:T,BackButton:E,DeleteButton:q,PrimaryButton:D,LineSkeleton:N,CountrySelectInput:U},props:{address:{type:[Object,null],default:null},userId:{type:[String,null],default:null},storeId:{type:[String,null],default:null},customerId:{type:[String,null],default:null},deliveryMethodId:{type:[String,null],default:null},title:{type:String,default:"Address"},subtitle:{type:String,default:"Address used by customers to know your store location."},pinLocationOnMap:{type:Boolean,default:!0}},emits:["onValidated","onCreated","onUpdated","onDeleted"],data(){return{step:1,form:{city:null,state:null,country:"BW",placeId:null,latitude:null,longitude:null,postalCode:null,addressLine:null,addressLine2:null},originalForm:null,isSubmitting:!1,completeAddress:null,previewLatitude:null,previewLongitude:null,apiState:x(),countryAddressOptions:[],isLoadingCountryAddressOptions:!1}},watch:{address(e){this.setFields(e),this.completeAddress=e?e._attributes.completeAddress:null}},computed:{submitText(){return this.pinLocationOnMap&&this.step==1?"Next":this.completeAddress?"Save Address":"Add Address"},cityWrapperClass(){const e=this.countryAddressOption.state.required,t=this.countryAddressOption.postal_code.required;return e&&t||!e&&!t?"col-span-1":"col-span-2"},countryWrapperClass(){const e=this.countryAddressOption.city.required,t=this.countryAddressOption.state.required,p=this.countryAddressOption.postal_code.required;return e||t||p?"col-span-1":"col-span-2"},hasCountryAddressOption(){return Object.keys(this.countryAddressOptions).length>0},countryAddressOption(){return this.hasCountryAddressOption?this.countryAddressOptions[this.form.country]:null},googleMapsAddress(){var e=this.form.addressLine;return this.form.addressLine2&&this.form.addressLine2.trim()!==""&&(e+=", "+this.form.addressLine2),this.form.city&&this.form.city.trim()!==""&&(e+=", "+this.form.city),this.form.state&&this.form.state.trim()!==""&&(e+=", "+this.form.state),this.form.postalCode&&this.form.postalCode.trim()!==""&&(e+=", "+this.form.postalCode),this.form.country&&this.form.country.trim()!==""&&(e+=", "+this.form.country),e},hasAddress(){return this.address!=null},validate(){return this.address===null&&this.userId===null&&this.storeId===null&&this.customerId===null&&this.deliveryMethodId===null},formHasChanged(){var e=h(this.form),t=h(this.originalForm);return!_(e,t)},mustSaveChanges(){return this.formHasChanged&&!this.isSubmitting}},methods:{showModal(){this.step=1,this.copyOriginalForm(),this.$refs.modal.showModal()},hideModal(){this.$refs.modal.hideModal()},markerMoved(e){this.form.placeId=null,this.form.latitude=e.latitude,this.form.longitude=e.longitude},addedMarker(e){this.form.placeId=e.placeId,this.form.latitude=e.latitude,this.form.longitude=e.longitude},setFields(e){e?(this.form.city=e.city,this.form.state=e.state,this.form.placeId=e.placeId,this.form.country=e.country,this.form.postalCode=e.postalCode,this.form.addressLine=e.addressLine,this.form.addressLine2=e.addressLine2,this.form.latitude=e.latitude?parseFloat(e.latitude):null,this.form.longitude=e.longitude?parseFloat(e.longitude):null,this.previewLatitude=this.form.latitude,this.previewLongitude=this.form.longitude):(this.form.city=null,this.form.state=null,this.form.country="BW",this.form.placeId=null,this.form.latitude=null,this.form.longitude=null,this.form.postalCode=null,this.form.addressLine=null,this.form.addressLine2=null,this.previewLatitude=null,this.previewLongitude=null),this.originalForm=h(this.form)},copyOriginalForm(){this.form=h(this.originalForm)},submit(){this.pinLocationOnMap&&this.step==1?this.step=2:this.validate?this.validateAddress():this.hasAddress?this.updateAddress():this.createAddress()},showCountryAddressOptions(){this.isLoadingCountryAddressOptions=!0,z(this.apiState.apiHome._links.showCountryAddressOptions).then(e=>{e.status==200&&(this.countryAddressOptions=e.data),this.isLoadingCountryAddressOptions=!1}).catch(e=>{this.isLoadingCountryAddressOptions=!1,this.setServerFormErrors(e)})},validateAddress(){this.isSubmitting=!0,S(this.apiState.apiHome._links.validateAddAddress,this.form).then(e=>{e.status==200&&(this.completeAddress=e.data.completeAddress,this.$emit("onValidated",h(this.form)),this.previewLongitude=this.form.longitude,this.previewLatitude=this.form.latitude,this.originalForm=h(this.form),this.hideModal()),this.isSubmitting=!1}).catch(e=>{this.isSubmitting=!1,this.setServerFormErrors(e)})},createAddress(){this.isSubmitting=!0;let e={...this.form,return:"1"};this.userId?e.userId=this.userId:this.storeId?e.storeId=this.storeId:this.customerId?e.customerId=this.customerId:this.deliveryMethodId&&(e.deliveryMethodId=this.deliveryMethodId),S(this.apiState.apiHome._links.createAddress,e).then(t=>{t.status==200&&(this.showSuccessfulNotification("Address created"),this.$emit("onCreated",t.data.address),this.setFields(t.data.address),this.hideModal()),this.isSubmitting=!1}).catch(t=>{this.isSubmitting=!1,this.setServerFormErrors(t)})},updateAddress(){this.isSubmitting=!0;let e={...this.form,return:"1"};W(this.address._links.updateAddress,e).then(t=>{t.status==200&&(this.showSuccessfulNotification("Address updated"),this.$emit("onUpdated",t.data.address),this.setFields(t.data.address),this.hideModal()),this.isSubmitting=!1}).catch(t=>{this.isSubmitting=!1,this.setServerFormErrors(t)})},deleteAddress(){if(!this.hasAddress){this.$emit("onDeleted",this.form),this.completeAddress=null,this.setFields(null),this.hideModal();return}this.isSubmitting=!0,j(this.address._links.deleteAddress).then(e=>{e.status==200&&(e.data.deleted?(this.showSuccessfulNotification("Address deleted"),this.$emit("onDeleted",e.data.address),this.setFields(null),this.hideModal()):(this.setFormError("general",e.data.message),this.showUnsuccessfulNotification(e.data.message))),this.isSubmitting=!1}).catch(e=>{this.isSubmitting=!1,this.setServerFormErrors(e)})}},created(){this.setFields(this.address),this.showCountryAddressOptions(),this.completeAddress=this.address?this.address._attributes.completeAddress:null}},G={class:"grid grid-cols-2 gap-2"},P={class:"font-lg font-bold"},Z={class:"col-span-2 space-y-2"},J={key:1,class:"col-span-1"},K={key:2,class:"col-span-1"},Q={key:2,class:"col-span-2"},X={class:"col-span-2 flex space-x-2 mt-4"},Y={class:"space-y-4 p-4 border rounded-lg shadow-lg bg-white"},$={class:"flex items-center font-lg font-bold"},ee={class:"text-sm text-gray-500 mb-2 pb-4 border-b border-dashed"},te={key:0,class:"flex justify-between items-center space-x-20"},se={class:"text-sm"};function ie(e,t,p,re,s,i){const c=n("TextInput"),C=n("CountrySelectInput"),y=n("GoogleMaps"),M=n("DeleteButton"),k=n("BackButton"),A=n("PrimaryButton"),w=n("AddButton"),L=n("BasicModal");return o(),f(L,{ref:"modal"},{content:a(()=>[r("div",G,[r("h1",P,g(s.completeAddress?"Edit Address":"Add Address"),1),s.isLoadingCountryAddressOptions?(o(),u(v,{key:0},[],64)):s.step==1?(o(),u(v,{key:1},[r("div",Z,[l(c,{modelValue:s.form.addressLine,"onUpdate:modelValue":t[0]||(t[0]=d=>s.form.addressLine=d),placeholder:"Street address",errorText:e.getFormError("addressLine")},null,8,["modelValue","errorText"]),l(c,{modelValue:s.form.addressLine2,"onUpdate:modelValue":t[1]||(t[1]=d=>s.form.addressLine2=d),errorText:e.getFormError("addressLine2"),placeholder:"Apartment, unit number, suite, etc. (optional)"},null,8,["modelValue","errorText"])]),i.countryAddressOption.city.required?(o(),u("div",{key:0,class:b(i.cityWrapperClass)},[l(c,{modelValue:s.form.city,"onUpdate:modelValue":t[2]||(t[2]=d=>s.form.city=d),errorText:e.getFormError("city"),placeholder:i.countryAddressOption.city.label},null,8,["modelValue","errorText","placeholder"])],2)):m("",!0),i.countryAddressOption.state.required?(o(),u("div",J,[l(c,{modelValue:s.form.state,"onUpdate:modelValue":t[3]||(t[3]=d=>s.form.state=d),errorText:e.getFormError("state"),placeholder:i.countryAddressOption.state.label},null,8,["modelValue","errorText","placeholder"])])):m("",!0),i.countryAddressOption.postal_code.required?(o(),u("div",K,[l(c,{modelValue:s.form.postalCode,"onUpdate:modelValue":t[4]||(t[4]=d=>s.form.postalCode=d),errorText:e.getFormError("postalCode"),placeholder:i.countryAddressOption.postal_code.label},null,8,["modelValue","errorText","placeholder"])])):m("",!0),r("div",{class:b(i.countryWrapperClass)},[l(C,{width:"w-full",modelValue:s.form.country,"onUpdate:modelValue":t[5]||(t[5]=d=>s.form.country=d)},null,8,["modelValue"])],2)],64)):s.step==2?(o(),u("div",Q,[l(y,{height:"350px",onMarkerMoved:i.markerMoved,onAddedMarker:i.addedMarker,address:i.googleMapsAddress,placeId:i.mustSaveChanges?null:s.form.placeId,latitude:i.mustSaveChanges?null:s.form.latitude,longitude:i.mustSaveChanges?null:s.form.longitude},null,8,["onMarkerMoved","onAddedMarker","address","placeId","latitude","longitude"])])):m("",!0),r("div",X,[s.step==1&&s.completeAddress?(o(),f(M,{key:0,disabled:s.isSubmitting,action:i.deleteAddress,size:"xs",type:"danger"},{default:a(()=>t[6]||(t[6]=[r("span",{class:"ml-2"},"Delete",-1)])),_:1},8,["disabled","action"])):m("",!0),s.step==2?(o(),f(k,{key:1,size:"xs",type:"info",class:"w-24",action:()=>s.step=1},{default:a(()=>t[7]||(t[7]=[r("span",{class:"ml-1"},"Back",-1)])),_:1},8,["action"])):m("",!0),l(A,{action:i.submit,disabled:!p.pinLocationOnMap&&!i.mustSaveChanges,size:"xs",type:"success",class:"w-full"},{default:a(()=>[O(g(i.submitText),1)]),_:1},8,["action","disabled"])])])]),trigger:a(()=>[r("div",Y,[r("h1",$,[t[8]||(t[8]=r("svg",{class:"w-6 h-6 mr-2 flex-shrink-0",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[r("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"}),r("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"})],-1)),r("span",null,g(p.title),1)]),r("p",ee,g(p.subtitle),1),s.completeAddress?(o(),u("div",te,[r("span",se,g(s.completeAddress),1),l(A,{action:i.showModal,size:"xs",type:"light"},{default:a(()=>t[9]||(t[9]=[r("span",{class:"whitespace-nowrap"},"Edit Address",-1)])),_:1},8,["action"])])):(o(),f(w,{key:1,action:i.showModal,size:"sm",type:"light"},{default:a(()=>t[10]||(t[10]=[r("span",{class:"ml-2"},"Add Address",-1)])),_:1},8,["action"])),s.previewLatitude&&s.previewLongitude?(o(),f(y,{key:2,height:"350px",gmpDraggable:!1,latitude:s.previewLatitude,longitude:s.previewLongitude},null,8,["latitude","longitude"])):m("",!0)])]),_:1},512)}const ve=H(R,[["render",ie]]);export{ve as A};
