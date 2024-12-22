import{U as L,S as B,d as v}from"./SpiningLoader-CsPmXxst.js";import{c as p,i as N}from"./cloneDeep-Cj89CU0d.js";import{A as H}from"./Alert-BHnqwbfj.js";import{F as Q}from"./FormMixin-CYiBG1ca.js";import{u as R,c as f,d as i,e as r,w as n,F,f as m,g as l,q as w,l as z,i as d,t as g,r as u,o as a}from"./app-Kf0mCOXy.js";import{u as G}from"./store-store-C2_eLuQh.js";import{T as j}from"./TextInput-_gM6fl6u.js";import{I as q}from"./InputTags-Se_SBSRe.js";import{T as J}from"./TextHeader-Cdgnrugi.js";import{M as Z}from"./MoneyInput-Bzif-ERf.js";import{B as K}from"./BackButton-CDDlBeJF.js";import{N as X,B as $}from"./BackdropLoader-BVS-Fv1Y.js";import{S as ee}from"./SelectInput-BklpiaOv.js";import{D as te}from"./Datepicker-D8JGdZ5k.js";import{C as oe}from"./ConfirmModal-DrJlS0Sa.js";import{S as se,L as ie}from"./LineSkeleton-Ckj2823e.js";import{T as re}from"./TextareaInput-Cp6x4S0k.js";import{P as ae}from"./PrimaryButton-DULDYb5e.js";import{S as ne}from"./SelectInputTags-BRWqtVq0.js";import{M as le}from"./MoreInfoPopover-gLIaCQca.js";import{T as me}from"./ToogleSwitch-CDDQu6G0.js";import{B as ue}from"./BadgeIndicator-BRfv_GU4.js";import{F as ce}from"./FormErrorMessages-Bdf-el1D.js";import{g as de,p as he,a as fe,d as pe}from"./api-repository-C4cDgx_E.js";import{_ as ge}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./InputLabel-B11U1-WT.js";import"./InputErrorMessage-B1NpEu7u.js";import"./vue3-tags-input.esm-BEOsPq0u.js";import"./StatusDot-B0b3cfnt.js";const Te={mixins:[L,Q],components:{Alert:H,TextInput:j,TextHeader:J,MoneyInput:Z,InputTags:q,BackButton:K,NumberInput:X,SelectInput:ee,Datepicker:te,ConfirmModal:oe,ShineEffect:se,TextareaInput:re,PrimaryButton:ae,SpiningLoader:B,LineSkeleton:ie,SelectInputTags:ne,MoreInfoPopover:le,BackdropLoader:$,ToogleSwitch:me,BadgeIndicator:ue,FormErrorMessages:ce},data(){return{form:{name:"",active:!0,description:"",offerDiscount:!1,discountType:"Percentage",discountPercentageRate:"50",discountFixedRate:"50.00",offerFreeDelivery:!1,activateUsingCode:!1,code:this.generateRandomNumber(4),activateUsingMinimumGrandTotal:!1,minimumGrandTotal:"50.00",activateUsingMinimumTotalProducts:!1,minimumTotalProducts:"2",activateUsingMinimumTotalProductQuantities:!1,minimumTotalProductQuantities:"2",activateUsingStartDatetime:!1,startDatetime:v().format("DD MMM YYYY"),activateUsingEndDatetime:!1,endDatetime:v().add(14,"day").format("DD MMM YYYY"),activateUsingHoursOfDay:!1,hoursOfDay:[],activateUsingDaysOfTheWeek:!1,daysOfTheWeek:[],activateUsingDaysOfTheMonth:!1,daysOfTheMonth:[],activateUsingMonthsOfTheYear:!1,monthsOfTheYear:[],activateUsingUsageLimit:!1,remainingQuantity:"100",activateForExistingCustomer:!1,activateForNewCustomer:!1},coupon:null,isDeleting:!1,originalForm:null,isSubmitting:!1,isLoadingCoupon:!1,apiState:R(),storeState:G(),hoursOfDay:[],daysOfTheMonth:[],daysOfTheWeek:[{text:"Monday"},{text:"Tuesday"},{text:"Wednesday"},{text:"Thursday"},{text:"Friday"},{text:"Saturday"},{text:"Sunday"}],monthsOfTheYear:[{text:"January"},{text:"February"},{text:"March"},{text:"April"},{text:"May"},{text:"June"},{text:"July"},{text:"August"},{text:"September"},{text:"October"},{text:"November"},{text:"December"}]}},watch:{"$route.params.coupon_href"(t,o){window.scrollTo(0,0),this.getCoupon()}},computed:{store(){return this.storeState.store},isCreating(){return this.$route.name==="create-store-coupon"},isEditting(){return this.$route.name==="show-store-coupon"},instructions(){return((this.coupon||{})._attributes||{}).instructions||[]},hasInstructions(){return this.totalInstructions>0},totalInstructions(){return this.instructions.length},formHasChanged(){var t=p(this.form),o=p(this.originalForm);return!N(t,o)},mustSaveChanges(){return this.isEditting&&this.formHasChanged&&!this.isLoadingCoupon&&!this.isSubmitting},mustCreate(){return this.isCreating&&this.formHasChanged&&!this.isLoadingCoupon&&!this.isSubmitting}},methods:{goBack(){this.$router.replace({name:"show-store-coupons",params:{store_href:this.store._links.showStore}})},populateHoursOfTheDay(){for(let t=0;t<24;t++)this.hoursOfDay.push({text:`${t<10?"0":""}${t}:00`})},populateDaysOfTheMonth(){for(let t=1;t<=31;t++)this.daysOfTheMonth.push({text:`${t<10?"0":""}${t}`})},setCouponFields(){this.form.name=this.coupon.name,this.form.active=this.coupon.active.status,this.form.description=this.coupon.description,this.form.offerDiscount=this.coupon.offerDiscount.status,this.form.discountType=this.coupon.discountType,this.form.discountPercentageRate=this.coupon.discountPercentageRate.value.toString(),this.form.discountFixedRate=this.covertToValidMoney(this.coupon.discountFixedRate.amountWithoutCurrency),this.form.offerFreeDelivery=this.coupon.offerFreeDelivery.status,this.form.activateUsingCode=this.coupon.activateUsingCode.status,this.form.code=this.coupon.code,this.form.activateUsingMinimumGrandTotal=this.coupon.activateUsingMinimumGrandTotal.status,this.form.minimumGrandTotal=this.covertToValidMoney(this.coupon.minimumGrandTotal.amountWithoutCurrency),this.form.activateUsingMinimumTotalProducts=this.coupon.activateUsingMinimumTotalProducts.status,this.form.minimumTotalProducts=this.coupon.minimumTotalProducts.toString(),this.form.activateUsingMinimumTotalProductQuantities=this.coupon.activateUsingMinimumTotalProductQuantities.status,this.form.minimumTotalProductQuantities=this.coupon.minimumTotalProductQuantities.toString(),this.form.activateUsingStartDatetime=this.coupon.activateUsingStartDatetime.status,this.form.startDatetime=v(this.coupon.startDatetime).format("DD MMM YYYY"),this.form.activateUsingEndDatetime=this.coupon.activateUsingEndDatetime.status,this.form.endDatetime=v(this.coupon.endDatetime).format("DD MMM YYYY"),this.form.activateUsingHoursOfDay=this.coupon.activateUsingHoursOfDay.status,this.form.hoursOfDay=this.coupon.hoursOfDay.map(t=>({text:t})),this.form.activateUsingDaysOfTheWeek=this.coupon.activateUsingDaysOfTheWeek.status,this.form.daysOfTheWeek=this.coupon.daysOfTheWeek.map(t=>({text:t})),this.form.activateUsingDaysOfTheMonth=this.coupon.activateUsingDaysOfTheMonth.status,this.form.daysOfTheMonth=this.coupon.daysOfTheMonth.map(t=>({text:t})),this.form.activateUsingMonthsOfTheYear=this.coupon.activateUsingMonthsOfTheYear.status,this.form.monthsOfTheYear=this.coupon.monthsOfTheYear.map(t=>({text:t})),this.form.activateUsingUsageLimit=this.coupon.activateUsingUsageLimit.status,this.form.remainingQuantity=this.coupon.remainingQuantity.toString(),this.form.activateForExistingCustomer=this.coupon.activateForExistingCustomer.status,this.form.activateForNewCustomer=this.coupon.activateForNewCustomer.status,this.originalForm=p(this.form)},getCoupon(){this.isLoadingCoupon=!0,de(this.$route.params.coupon_href).then(t=>{t.status==200&&t.data.exists&&(this.coupon=t.data.coupon,this.setCouponFields()),this.isLoadingCoupon=!1}).catch(t=>{this.isLoadingCoupon=!1,this.setServerFormErrors(t)})},parseForm(){var t=p(this.form);return t.hoursOfDay=t.hoursOfDay.map(o=>o.text),t.daysOfTheWeek=t.daysOfTheWeek.map(o=>o.text),t.daysOfTheMonth=t.daysOfTheMonth.map(o=>o.text),t.monthsOfTheYear=t.monthsOfTheYear.map(o=>o.text),t},createCoupon(){if(this.form.offerDiscount==!1&&this.form.offerFreeDelivery==!1){this.setFormError("offerFreeDelivery","Specify an offer e.g discount or free delivery"),this.showUnsuccessfulNotification("Specify an offer e.g discount or free delivery");return}this.isSubmitting=!0,he(this.apiState.apiHome._links.createCoupon,this.parseForm()).then(t=>{t.status==200&&(this.showSuccessfulNotification("Coupon created"),this.$router.push({name:"show-store-coupons",params:{store_href:this.store._links.showStore}}),window.scrollTo(0,0)),this.isSubmitting=!1}).catch(t=>{this.isSubmitting=!1,this.setServerFormErrors(t)})},updateCoupon(){this.isSubmitting=!0,this.form.return=!0,fe(this.coupon._links.updateCoupon,this.parseForm()).then(t=>{t.status==200&&(t.data.updated?(this.originalForm=p(this.form),this.showSuccessfulNotification("Coupon updated"),this.editMode=!1):(this.form=p(this.originalForm),this.setFormError("general",t.data.message),this.showUnsuccessfulNotification(t.data.message))),this.isSubmitting=!1}).catch(t=>{this.isSubmitting=!1,this.setServerFormErrors(t)})},deleteCoupon(){this.isDeleting=!0,pe(this.coupon._links.deleteCoupon).then(t=>{t.status==200?t.data.deleted?(this.showSuccessfulNotification("Coupon deleted"),this.$router.push({name:"show-store-coupons",params:{store_href:this.store._links.showStore}}),window.scrollTo(0,0)):(this.setFormError("general",t.data.message),this.showUnsuccessfulNotification(t.data.message)):(this.setFormError("general",t.data.message),this.showUnsuccessfulNotification(t.data.message)),this.isDeleting=!1}).catch(t=>{this.isDeleting=!1,this.setServerFormErrors(t)})}},mounted(){this.populateHoursOfTheDay(),this.populateDaysOfTheMonth()},created(){this.form.storeId=this.store.id,this.originalForm=p(this.form),this.isEditting&&this.getCoupon()}},ve={class:"flex justify-start items-center border-dashed py-6"},ye={key:0,class:"flex items-center space-x-2"},be={class:"relative",action:"#",method:"POST"},xe={class:"flex items-center space-x-2"},De=i("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[i("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"})],-1),we={class:"grid grid-cols-12 gap-4 mb-8"},Ue={class:"col-span-8 relative"},Pe={class:"space-y-4 bg-white shadow-lg rounded-lg border p-4 mb-4"},Me={class:"bg-white shadow-lg rounded-lg border p-4 mb-4"},_e=i("p",{class:"font-bold text-sm"},"Offers",-1),Fe=i("p",{class:"text-sm text-gray-400"},"Set the offers that this coupon will apply",-1),Ve={key:0,class:"flex items-center space-x-8"},Ce=i("option",{value:"Percentage"},"Percentage",-1),Oe=i("option",{value:"Fixed"},"Fixed",-1),Se={class:"bg-white shadow-lg rounded-lg border p-4"},ke=i("p",{class:"font-bold text-sm"},"Activation Rules",-1),Ie=i("p",{class:"text-sm text-gray-400"},"Set how this coupon will be activated",-1),Ee={class:"flex items-end space-x-8"},We=i("span",{class:"whitespace-nowrap"},"Activate for new customer",-1),Ye=i("span",{class:"whitespace-nowrap"},"Activate for existing customer",-1),Ae={class:"flex items-end space-x-8"},Le=i("span",{class:"whitespace-nowrap"},"Activate on minimum grand total",-1),Be={class:"flex items-end space-x-8"},Ne=i("span",{class:"whitespace-nowrap"},"Activate on minimum total products",-1),He={class:"flex items-end space-x-8"},Qe=i("span",{class:"whitespace-nowrap"},"Activate on minimum total product quantities",-1),Re={class:"flex items-end space-x-8"},ze=i("span",{class:"whitespace-nowrap"},"Activate from start datetime",-1),Ge={class:"flex items-end space-x-8"},je=i("span",{class:"whitespace-nowrap"},"Activate from end datetime",-1),qe={class:"flex items-end space-x-8"},Je=i("span",{class:"whitespace-nowrap"},"Activate on hours of the day",-1),Ze={class:"flex items-end space-x-8"},Ke=i("span",{class:"whitespace-nowrap"},"Activate on days of the week",-1),Xe={class:"flex items-end space-x-8"},$e=i("span",{class:"whitespace-nowrap"},"Activate on days of the month",-1),et={class:"flex items-end space-x-8"},tt=i("span",{class:"whitespace-nowrap"},"Activate on months of the year",-1),ot={class:"flex items-end space-x-8"},st=i("span",{class:"whitespace-nowrap"},"Activate on usage limit",-1),it={class:"col-span-4"},rt={class:"flex flex-col justify-between bg-white shadow-lg rounded-lg border p-4 mb-4 relative"},at={class:"space-y-4"},nt=i("span",{class:"font-bold"},"hidden",-1),lt=i("hr",{class:"my-4"},null,-1),mt={key:0,class:"flex flex-col justify-between bg-white shadow-lg rounded-lg border p-4 relative"},ut={class:"flex items-center space-x-4 mb-2"},ct=i("div",{class:"flex items-center space-x-2"},[i("svg",{class:"w-4 h-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[i("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"})]),i("p",{class:"font-bold text-lg"},"Activation Rules")],-1),dt=i("p",{class:"text-sm text-gray-400 border-b border-dashed pb-2 mb-4"},"Learn how this coupon will be activated",-1),ht={key:2,class:"space-y-2"},ft={class:"text-xs"},pt={class:"font-bold text-black"},gt={class:"flex justify-end"},Tt=i("p",{class:"text-lg font-bold border-b border-dashed pb-4 mb-4"},"Confirm Delete",-1),vt={class:"mb-8"},yt={class:"font-bold text-black"};function bt(t,o,xt,Dt,e,h){const V=u("BackButton"),U=u("LineSkeleton"),C=u("ShineEffect"),O=u("TextHeader"),S=u("MoreInfoPopover"),P=u("PrimaryButton"),y=u("Alert"),b=u("BackdropLoader"),k=u("FormErrorMessages"),x=u("TextInput"),I=u("TextareaInput"),c=u("ToogleSwitch"),E=u("SelectInput"),M=u("MoneyInput"),D=u("NumberInput"),_=u("Datepicker"),T=u("SelectInputTags"),W=u("BadgeIndicator"),Y=u("ConfirmModal");return a(),f("div",null,[i("div",ve,[r(V,{class:"w-16 mr-4",action:h.goBack},null,8,["action"]),e.isLoadingCoupon?(a(),f("div",ye,[r(C,{class:"flex space-x-2"},{default:n(()=>[r(U,{width:"w-40 mt-2"}),r(U,{width:"w-4 mt-2"})]),_:1})])):(a(),f(F,{key:1},[r(O,null,{default:n(()=>[d(g(h.isCreating?"Add Coupon":e.form.name),1)]),_:1}),r(S,{class:"ml-2 mt-1",title:"What Is This?",description:"Coupons are promotional incentives that customers can claim while placing orders, such as discounts or free delivery. This encourages purchases and enhances the customer shopping experience.",placement:"top"})],64))]),i("form",be,[h.mustCreate||h.mustSaveChanges?(a(),m(y,{key:0,type:"warning",class:"flex justify-between items-center mb-2"},{default:n(()=>[i("div",xe,[De,i("span",null,g(h.isCreating?"Create your coupon":"Please save your changes"),1)]),r(P,{action:h.isCreating?h.createCoupon:h.updateCoupon,loading:e.isSubmitting,class:"w-40"},{default:n(()=>[d(g(h.isCreating?"Create Coupon":"Save Changes"),1)]),_:1},8,["action","loading"])]),_:1})):l("",!0),i("div",we,[i("div",Ue,[e.isLoadingCoupon||e.isSubmitting?(a(),m(b,{key:0,class:"rounded-lg"})):l("",!0),i("div",Pe,[r(k),r(x,{modelValue:e.form.name,"onUpdate:modelValue":o[0]||(o[0]=s=>e.form.name=s),errorText:t.getFormError("name"),labelPopoverTitle:"What Is This?",label:"Name",placeholder:"10% off",labelPopoverDescription:"The name of your coupon e.g 10% off"},null,8,["modelValue","errorText"]),r(I,{rows:2,modelValue:e.form.description,"onUpdate:modelValue":o[1]||(o[1]=s=>e.form.description=s),labelPopoverTitle:"What Is This?",errorText:t.getFormError("description"),label:"Description",placeholder:"Offer 10% discount",labelPopoverDescription:"Sweet and short description of your coupon (for internal use) e.g Offer 10% discount"},null,8,["modelValue","errorText"])]),i("div",Me,[i("div",{class:w(["space-y-4",e.form.offerDiscount?"mb-8":"mb-4"])},[_e,Fe,r(c,{labelPopoverTitle:"What Is This?",modelValue:e.form.offerDiscount,"onUpdate:modelValue":o[2]||(o[2]=s=>e.form.offerDiscount=s),size:"md",errorText:t.getFormError("offerDiscount"),labelPopoverDescription:"Turn on to offer a discount using this coupon"},{default:n(()=>[d(" Offer Discount ")]),_:1},8,["modelValue","errorText"]),e.form.offerDiscount?(a(),f("div",Ve,[r(E,{label:"Discount Type",modelValue:e.form.discountType,"onUpdate:modelValue":o[3]||(o[3]=s=>e.form.discountType=s),labelPopoverTitle:"What Is This?",errorText:t.getFormError("discountType"),labelPopoverDescription:"Select the discount type e.g Is this a fixed amount or an amount that is calculated based on a percetange of the total cart amount?"},{default:n(()=>[Ce,Oe]),_:1},8,["modelValue","errorText"]),e.form.discountType=="Percentage"?(a(),m(x,{key:0,placeholder:"100",label:"Percentage Rate",labelPopoverTitle:"What Is This?",modelValue:e.form.discountPercentageRate,"onUpdate:modelValue":o[4]||(o[4]=s=>e.form.discountPercentageRate=s),errorText:t.getFormError("discountPercentageRate"),labelPopoverDescription:"Set the percentage discount amount (This is the percentage amount of the entire order that will be applied as a discount e.g 50%)"},null,8,["modelValue","errorText"])):l("",!0),e.form.discountType=="Fixed"?(a(),m(M,{key:1,label:"Fixed Rate",modelValue:e.form.discountFixedRate,"onUpdate:modelValue":o[5]||(o[5]=s=>e.form.discountFixedRate=s),labelPopoverTitle:"What Is This?",errorText:t.getFormError("discountFixedRate"),labelPopoverDescription:"Set the fixed discount amount (This is the fixed amount that will be applied as a discount e.g P50.00)"},null,8,["modelValue","errorText"])):l("",!0)])):l("",!0)],2),r(c,{labelPopoverTitle:"What Is This?",modelValue:e.form.offerFreeDelivery,"onUpdate:modelValue":o[6]||(o[6]=s=>e.form.offerFreeDelivery=s),size:"md",errorText:t.getFormError("offerFreeDelivery"),labelPopoverDescription:"Turn on to offer free delivery using this coupon"},{default:n(()=>[d(" Offer Free Delivery ")]),_:1},8,["modelValue","errorText"])]),i("div",Se,[i("div",{class:w(["space-y-4",e.form.offerDiscount?"mb-8":"mb-4"])},[ke,Ie,i("div",Ee,[r(c,{labelPopoverTitle:"What Is This?",modelValue:e.form.activateUsingCode,"onUpdate:modelValue":o[7]||(o[7]=s=>e.form.activateUsingCode=s),size:"md",errorText:t.getFormError("activateUsingCode"),labelPopoverDescription:"Turn on if you want customers to provide a code to claim this coupon"},{default:n(()=>[d(" Activate on code ")]),_:1},8,["modelValue","errorText"]),e.form.activateUsingCode?(a(),m(x,{key:0,modelValue:e.form.code,"onUpdate:modelValue":o[8]||(o[8]=s=>e.form.code=s),errorText:t.getFormError("code"),labelPopoverTitle:"What Is This?",label:"Activation Code",placeholder:"1234",labelPopoverDescription:"The activation code of your coupon e.g 1234"},null,8,["modelValue","errorText"])):l("",!0)]),r(c,{labelPopoverTitle:"What Is This?",modelValue:e.form.activateForNewCustomer,"onUpdate:modelValue":o[9]||(o[9]=s=>e.form.activateForNewCustomer=s),size:"md",errorText:t.getFormError("activateForNewCustomer"),labelPopoverDescription:"Turn on if you want customers to claim this coupon only if they are a new customer (have never placed orders in the past)"},{default:n(()=>[We]),_:1},8,["modelValue","errorText"]),r(c,{labelPopoverTitle:"What Is This?",modelValue:e.form.activateForExistingCustomer,"onUpdate:modelValue":o[10]||(o[10]=s=>e.form.activateForExistingCustomer=s),size:"md",errorText:t.getFormError("activateForExistingCustomer"),labelPopoverDescription:"Turn on if you want customers to claim this coupon only if they are an existing customer (have placed orders in the past)"},{default:n(()=>[Ye]),_:1},8,["modelValue","errorText"]),i("div",Ae,[r(c,{labelPopoverTitle:"What Is This?",modelValue:e.form.activateUsingMinimumGrandTotal,"onUpdate:modelValue":o[11]||(o[11]=s=>e.form.activateUsingMinimumGrandTotal=s),size:"md",errorText:t.getFormError("activateUsingMinimumGrandTotal"),labelPopoverDescription:"Turn on if you want customers to claim this coupon only after reaching the specified grand total or more"},{default:n(()=>[Le]),_:1},8,["modelValue","errorText"]),e.form.activateUsingMinimumGrandTotal?(a(),m(M,{key:0,label:"Grand Total",modelValue:e.form.minimumGrandTotal,"onUpdate:modelValue":o[12]||(o[12]=s=>e.form.minimumGrandTotal=s),labelPopoverTitle:"What Is This?",errorText:t.getFormError("minimumGrandTotal"),labelPopoverDescription:"Set the minimum grand total amount e.g Must have selected items amounting to P50.00 or more"},null,8,["modelValue","errorText"])):l("",!0)]),i("div",Be,[r(c,{labelPopoverTitle:"What Is This?",modelValue:e.form.activateUsingMinimumTotalProducts,"onUpdate:modelValue":o[13]||(o[13]=s=>e.form.activateUsingMinimumTotalProducts=s),size:"md",errorText:t.getFormError("activateUsingMinimumTotalProducts"),labelPopoverDescription:"Turn on if you want customers to claim this coupon only after selecting the specified number of different products or more e.g Must have selected 2 different products or more"},{default:n(()=>[Ne]),_:1},8,["modelValue","errorText"]),e.form.activateUsingMinimumTotalProducts?(a(),m(D,{key:0,min:"1",placeholder:"100",label:"Minimum Products",labelPopoverTitle:"What Is This?",modelValue:e.form.minimumTotalProducts,"onUpdate:modelValue":o[14]||(o[14]=s=>e.form.minimumTotalProducts=s),errorText:t.getFormError("minimumTotalProducts"),labelPopoverDescription:"Set the minimum total products e.g Must have selected 2 different products or more"},null,8,["modelValue","errorText"])):l("",!0)]),i("div",He,[r(c,{labelPopoverTitle:"What Is This?",modelValue:e.form.activateUsingMinimumTotalProductQuantities,"onUpdate:modelValue":o[15]||(o[15]=s=>e.form.activateUsingMinimumTotalProductQuantities=s),size:"md",errorText:t.getFormError("activateUsingMinimumTotalProductQuantities"),labelPopoverDescription:"Turn on if you want customers to claim this coupon only after selecting the specified number of product quantities or more e.g Must have selected 10 quantities of all items combined or more"},{default:n(()=>[Qe]),_:1},8,["modelValue","errorText"]),e.form.activateUsingMinimumTotalProductQuantities?(a(),m(D,{key:0,min:"1",placeholder:"100",label:"Minimum Products",labelPopoverTitle:"What Is This?",modelValue:e.form.minimumTotalProductQuantities,"onUpdate:modelValue":o[16]||(o[16]=s=>e.form.minimumTotalProductQuantities=s),errorText:t.getFormError("minimumTotalProducts"),labelPopoverDescription:"Set the minimum total product quantities e.g Must have selected 10 quantities of all items combined or more"},{suffix:n(()=>[d("%")]),_:1},8,["modelValue","errorText"])):l("",!0)]),i("div",Re,[r(c,{labelPopoverTitle:"What Is This?",modelValue:e.form.activateUsingStartDatetime,"onUpdate:modelValue":o[17]||(o[17]=s=>e.form.activateUsingStartDatetime=s),size:"md",errorText:t.getFormError("activateUsingStartDatetime"),labelPopoverDescription:"Turn on if you want customers to claim this coupon only after the specified date has been reached e.g Must have reached 01 Jan 2024"},{default:n(()=>[ze]),_:1},8,["modelValue","errorText"]),e.form.activateUsingStartDatetime?(a(),m(_,{modelValue:e.form.startDatetime,"onUpdate:modelValue":o[18]||(o[18]=s=>e.form.startDatetime=s),key:e.form.startDatetime},null,8,["modelValue"])):l("",!0)]),i("div",Ge,[r(c,{labelPopoverTitle:"What Is This?",modelValue:e.form.activateUsingEndDatetime,"onUpdate:modelValue":o[19]||(o[19]=s=>e.form.activateUsingEndDatetime=s),size:"md",errorText:t.getFormError("activateUsingEndDatetime"),labelPopoverDescription:"Turn on if you want customers to claim this coupon only before the specified date has been reached e.g Must not have reached 01 Feb 2024"},{default:n(()=>[je]),_:1},8,["modelValue","errorText"]),e.form.activateUsingEndDatetime?(a(),m(_,{modelValue:e.form.endDatetime,"onUpdate:modelValue":o[20]||(o[20]=s=>e.form.endDatetime=s),key:e.form.endDatetime},null,8,["modelValue"])):l("",!0)]),i("div",qe,[r(c,{labelPopoverTitle:"What Is This?",modelValue:e.form.activateUsingHoursOfDay,"onUpdate:modelValue":o[21]||(o[21]=s=>e.form.activateUsingHoursOfDay=s),size:"md",errorText:t.getFormError("activateUsingHoursOfDay"),labelPopoverDescription:"Turn on if you want customers to claim this coupon only on the specified hours of the day e.g 08:00, 09:00, 10:00, etc"},{default:n(()=>[Je]),_:1},8,["modelValue","errorText"]),e.form.activateUsingHoursOfDay?(a(),m(T,{key:0,tags:e.form.hoursOfDay,selectableTags:e.hoursOfDay,onOnTagsChanged:o[22]||(o[22]=s=>e.form.hoursOfDay=s),label:"Hours Of Day",labelPopoverTitle:"What Is This?",errorText:t.getFormError("hoursOfDay"),labelPopoverDescription:"Set the hours of the day e.g 08:00, 09:00, 10:00, etc",class:"w-full"},null,8,["tags","selectableTags","errorText"])):l("",!0)]),i("div",Ze,[r(c,{labelPopoverTitle:"What Is This?",modelValue:e.form.activateUsingDaysOfTheWeek,"onUpdate:modelValue":o[23]||(o[23]=s=>e.form.activateUsingDaysOfTheWeek=s),size:"md",errorText:t.getFormError("activateUsingDaysOfTheWeek"),labelPopoverDescription:"Turn on if you want customers to claim this coupon only on the specified days of the week e.g Monday, Tuesday, Wednesday, etc"},{default:n(()=>[Ke]),_:1},8,["modelValue","errorText"]),e.form.activateUsingDaysOfTheWeek?(a(),m(T,{key:0,tags:e.form.daysOfTheWeek,selectableTags:e.daysOfTheWeek,onOnTagsChanged:o[24]||(o[24]=s=>e.form.daysOfTheWeek=s),label:"Days Of The Week",labelPopoverTitle:"What Is This?",errorText:t.getFormError("daysOfTheWeek"),labelPopoverDescription:"Set the days of the week e.g Monday, Tuesday, Wednesday, etc",class:"w-full"},null,8,["tags","selectableTags","errorText"])):l("",!0)]),i("div",Xe,[r(c,{labelPopoverTitle:"What Is This?",modelValue:e.form.activateUsingDaysOfTheMonth,"onUpdate:modelValue":o[25]||(o[25]=s=>e.form.activateUsingDaysOfTheMonth=s),size:"md",errorText:t.getFormError("activateUsingDaysOfTheMonth"),labelPopoverDescription:"Turn on if you want customers to claim this coupon only on the specified days of the month e.g 01, 02, 03, etc"},{default:n(()=>[$e]),_:1},8,["modelValue","errorText"]),e.form.activateUsingDaysOfTheMonth?(a(),m(T,{key:0,tags:e.form.daysOfTheMonth,selectableTags:e.daysOfTheMonth,onOnTagsChanged:o[26]||(o[26]=s=>e.form.daysOfTheMonth=s),label:"Days Of The Month",labelPopoverTitle:"What Is This?",errorText:t.getFormError("daysOfTheMonth"),labelPopoverDescription:"Set the days of the month e.g 01, 02, 03, etc",class:"w-full"},null,8,["tags","selectableTags","errorText"])):l("",!0)]),i("div",et,[r(c,{labelPopoverTitle:"What Is This?",modelValue:e.form.activateUsingMonthsOfTheYear,"onUpdate:modelValue":o[27]||(o[27]=s=>e.form.activateUsingMonthsOfTheYear=s),size:"md",errorText:t.getFormError("activateUsingMonthsOfTheYear"),labelPopoverDescription:"Turn on if you want customers to claim this coupon only on the specified months of the year e.g January, February, March, etc"},{default:n(()=>[tt]),_:1},8,["modelValue","errorText"]),e.form.activateUsingMonthsOfTheYear?(a(),m(T,{key:0,tags:e.form.monthsOfTheYear,selectableTags:e.monthsOfTheYear,onOnTagsChanged:o[28]||(o[28]=s=>e.form.monthsOfTheYear=s),label:"Months Of The Year",labelPopoverTitle:"What Is This?",errorText:t.getFormError("monthsOfTheYear"),labelPopoverDescription:"Set the months of the year e.g January, February, March, etc",class:"w-full"},null,8,["tags","selectableTags","errorText"])):l("",!0)]),i("div",ot,[r(c,{labelPopoverTitle:"What Is This?",modelValue:e.form.activateUsingUsageLimit,"onUpdate:modelValue":o[29]||(o[29]=s=>e.form.activateUsingUsageLimit=s),size:"md",errorText:t.getFormError("activateUsingUsageLimit"),labelPopoverDescription:"Turn on if you want to set a usage limit for how many times this coupon can be claimed e.g Must be claimed no more than 10 times"},{default:n(()=>[st]),_:1},8,["modelValue","errorText"]),e.form.activateUsingUsageLimit?(a(),m(D,{key:0,min:"1",placeholder:"100",label:"Remaining Quantity",labelPopoverTitle:"What Is This?",modelValue:e.form.remainingQuantity,"onUpdate:modelValue":o[30]||(o[30]=s=>e.form.remainingQuantity=s),errorText:t.getFormError("remainingQuantity"),labelPopoverDescription:"Set the remaining quantity e.g 10 means that this coupon can only be claimed 10 times"},null,8,["modelValue","errorText"])):l("",!0)])],2)])]),i("div",it,[i("div",rt,[e.isLoadingCoupon||e.isSubmitting?(a(),m(b,{key:0,showSpiningLoader:!1,class:"rounded-lg"})):l("",!0),i("div",at,[r(c,{modelValue:e.form.active,"onUpdate:modelValue":o[31]||(o[31]=s=>e.form.active=s),size:"md",labelPopoverTitle:"What Is This?",errorText:t.getFormError("active"),labelPopoverDescription:"Turn on if you want your coupon to be active (Made available to customers)"},{default:n(()=>[d(" Activate Coupon ")]),_:1},8,["modelValue","errorText"]),e.form.active?l("",!0):(a(),m(y,{key:0,type:"warning"},{default:n(()=>[d(" This coupon has been "),nt,d(" from customers visiting your store. "),lt,d("This means that customers will not be able to claim this coupon. ")]),_:1}))])]),e.coupon&&h.hasInstructions?(a(),f("div",mt,[e.isLoadingCoupon||e.isSubmitting?(a(),m(b,{key:0,showSpiningLoader:!1,class:"rounded-lg"})):l("",!0),i("div",ut,[ct,r(W,{type:"primary",text:h.totalInstructions,showDot:!1},null,8,["text"])]),dt,h.mustSaveChanges?(a(),m(y,{key:1,type:"info"},{default:n(()=>[d(" Save changes to apply activation rules ")]),_:1})):(a(),f("div",ht,[(a(!0),f(F,null,z(h.instructions,(s,A)=>(a(),f("div",{key:A,class:"flex space-x-2 px-2 border-l-4 border-green-300"},[i("p",ft,g(s),1)]))),128))]))])):l("",!0)])]),e.coupon?(a(),f("div",{key:1,class:w(["space-y-4 shadow-lg rounded-lg border p-4",e.isLoadingCoupon?"bg-gray-50":"border-red-300 bg-red-50"])},[i("p",null,[d("Do you want to permanently delete "),i("span",pt,g(e.form.name),1),d("? Once this coupon is deleted you will not be able to recover it.")]),i("div",gt,[r(Y,{approveText:"Delete Coupon",approveAction:h.deleteCoupon,isLoading:e.isDeleting},{content:n(()=>[Tt,i("p",vt,[d("Are you sure you want to permanently delete "),i("span",yt,g(e.form.name),1),d("?")])]),trigger:n(s=>[r(P,{onClick:s.showModal,loading:e.isDeleting,class:"w-40",type:"danger"},{default:n(()=>[d(" Delete Coupon ")]),_:2},1032,["onClick","loading"])]),_:1},8,["approveAction","isLoading"])])],2)):l("",!0)])])}const Xt=ge(Te,[["render",bt]]);export{Xt as default};
