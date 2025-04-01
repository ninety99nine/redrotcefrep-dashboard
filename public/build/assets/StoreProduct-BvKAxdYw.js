import{c as w,i as O}from"./cloneDeep-BGE7Bmb-.js";import{P as N}from"./Pill-CD_3pjy5.js";import{A as tt}from"./Alert-DEJps0rh.js";import{F as H}from"./FormMixin-D44Bj-el.js";import{U as W,u as et}from"./form-store-B_ZbhArT.js";import{r as g,o,c as s,b as e,h as l,t as f,f as m,d as u,e as c,w as p,F as v,k as E,m as rt,n as _,u as ot}from"./app-DEkFCb1u.js";import{u as z}from"./store-store-CxinBL3L.js";import{T as it}from"./TextInput-CwB-G_mS.js";import{I as st}from"./InputTags-Cvrz7IG0.js";import{T as at}from"./TextHeader-DRGBY_Ui.js";import{M as nt}from"./MoneyInput-C1qj8tqg.js";import{N as lt}from"./NumberInput-DlCNpvmN.js";import{S as ut}from"./SelectInput-DXfLro8i.js";import{C as dt}from"./ConfirmModal-CKYpWGJT.js";import{T as mt}from"./TextareaInput-CtY-WADI.js";import{L as pt}from"./LineSkeleton-DFWRI7XC.js";import{S as R}from"./SpinningLoader-BnJGVf_7.js";import{B as ct}from"./BackdropLoader-jo1Que9S.js";import{M as j}from"./MoreInfoPopover-CrxGv8yo.js";import{T as q}from"./ToogleSwitch-CtY-gb5u.js";import{F as ht}from"./FormErrorMessages-T64AgTW8.js";import{b as ft}from"./InputErrorMessage-lzTzq-uZ.js";import{g as Z,p as B,a as gt,d as vt}from"./api-repository-CIJPUswr.js";import{B as yt}from"./BasicTable-BCie5vLF.js";import{N as bt}from"./NoDataPlaceholder-L-PjtqdQ.js";import{_ as K}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./vue3-tags-input.esm-DL6THQw8.js";import"./Button-CTlUNYLQ.js";import"./ShineEffect-CWpUJr6E.js";import"./SearchInput-BKDyZ1Nd.js";import"./index-D14zHmA0.js";import"./Drawer-DoikbwU2.js";import"./Checkbox-BOFyOk4h.js";import"./Datepicker-HHxVzfmA.js";import"./vue-draggable-next.esm-bundler-C7oHOHQm.js";const wt={mixins:[H,W],components:{MoreInfoPopover:j,ToogleSwitch:q,BasicTable:yt,SpinningLoader:R,Pill:N,NoDataPlaceholder:bt},props:{product:{type:Object},isLoadingProduct:{type:Boolean},isCreatingVariations:{type:Boolean}},data(){return{pagination:null,searchTerm:null,showEverything:!1,sentFirstRequest:!1,storeState:z(),isLoadingProductVariations:!1}},watch:{isLoadingProduct(i,t){i==!1&&this.getProductVariations()},isCreatingVariations(i,t){i==!1&&this.getProductVariations()}},computed:{store(){return this.storeState.store},products(){return(this.pagination??{}).data??[]},hasVariations(){return this.totalVariations>0},totalVariations(){return(this.pagination??{}).total??0},tableHeaders(){return this.showEverything?["Name","Properties","Description","Visibility","Price","Stock","Variations","Quantity Per Order","Created Date"]:["Name","Properties","Visibility","Price","Stock","Variations"]}},methods:{onEdit(i){this.$router.push({name:"show-store-product",params:{store_href:this.store._links.showStore,product_href:i._links.showProduct}})},paginate(i){this.getProductVariations(i)},search(i){this.searchTerm=i,this.getProductVariations()},getProductVariations(i=null){this.isLoadingProductVariations=!0;const t={};this.searchTerm!=null&&this.searchTerm!=""&&(t.search=this.searchTerm),i=i??this.product._links.showProductVariations,Z(i,t).then(b=>{b.status==200&&(this.pagination=b.data),this.isLoadingProductVariations=!1,this.sentFirstRequest=!0}).catch(b=>{this.isLoadingProductVariations=!1,this.formState.setServerFormErrors(b)})}},mounted(){},created(){this.getProductVariations()}},kt={class:"flex items-center"},Vt={class:"font-bold text-lg"},Pt={key:0},Tt={key:0,class:"text-xs"},xt={key:1,class:"flex justify-center"},At={key:2,class:"mt-4"},_t=["onClick"],St={class:"whitespace-nowrap px-4 py-4"},Ct={class:"flex space-x-1 items-center w-40"},Ft={key:0,class:"text-black"},Et={key:0,class:"text-black"},Lt={class:"whitespace-nowrap px-4 py-4"},Dt={class:"flex space-x-1"},It={key:0,class:"px-4 py-4"},Mt={class:"flex space-x-1 items-center w-60"},Ut={class:"whitespace-nowrap px-4 py-4"},Qt={class:"flex space-x-1 items-center"},Ot={class:"whitespace-nowrap px-4 py-4"},Bt={key:1,class:"flex space-x-1 items-center"},Nt={key:0},Ht={key:2,class:"text-black"},Wt={class:"font-bold"},zt={class:"whitespace-nowrap px-4 py-4"},Rt={key:1,class:"flex space-x-1 items-center"},jt={class:"whitespace-normal"},qt={key:0},Zt={key:1},Kt={class:"whitespace-nowrap px-4 py-4"},Gt={class:"flex space-x-1 items-center"},Yt={class:"whitespace-normal"},Jt={class:"whitespace-nowrap px-4 py-4"},Xt={class:"flex space-x-1 items-center"},$t={class:"whitespace-normal"},te={class:"whitespace-nowrap px-4 py-4"},ee={class:"flex space-x-1 items-center"},re={key:1,class:"flex justify-between p-20 border rounded-lg bg-gray-50"},oe={key:1,class:"space-y-4"};function ie(i,t,b,S,r,n){const y=g("MoreInfoPopover"),C=g("SpinningLoader"),L=g("ToogleSwitch"),k=g("Pill"),T=g("NoDataPlaceholder"),A=g("BasicTable");return o(),s("div",null,[e("div",kt,[e("p",Vt,[t[1]||(t[1]=l("Variations ")),n.hasVariations?(o(),s("span",Pt,"("+f(n.totalVariations)+")",1)):m("",!0)]),u(y,{class:"ml-2 mt-1",title:"What Is This?",description:"Variations are different options of the same product e.g options for sizes, colors or materials.",placement:"top"})]),n.hasVariations?(o(),s("p",Tt,"Select any variations to make changes")):m("",!0),!r.sentFirstRequest&&r.isLoadingProductVariations?(o(),s("div",xt,[u(C,{class:"my-4"})])):(o(),s("div",At,[n.totalVariations>0?(o(),c(A,{key:0,pagination:r.pagination,isLoading:r.isLoadingProductVariations,onPaginate:n.paginate,onSearch:n.search,onRefresh:n.getProductVariations,totalHeaders:n.tableHeaders.length},{primaryFilters:p(()=>[u(L,{modelValue:r.showEverything,"onUpdate:modelValue":t[0]||(t[0]=a=>r.showEverything=a),size:"md",labelPopoverTitle:"What Is This?",labelPopoverDescription:"Turn on if you want to show more information about your product variations"},{default:p(()=>t[2]||(t[2]=[l(" Show Everything ")])),_:1},8,["modelValue"])]),head:p(()=>[e("tr",null,[(o(!0),s(v,null,E(n.tableHeaders,(a,F)=>(o(),s("th",{key:F,scope:"col",class:"whitespace-nowrap px-4 py-3"},f(a),1))),128))])]),body:p(()=>[(o(!0),s(v,null,E(n.products,(a,F)=>(o(),s("tr",{onClick:rt(P=>n.onEdit(a),["stop"]),key:F,class:"group cursor-pointer bg-white hover:bg-gray-50 border-b"},[e("td",St,[e("div",Ct,[e("span",null,f(a.name),1),u(y,{class:"opacity-0 group-hover:opacity-100",title:a.name,placement:"top"},{description:p(()=>[t[6]||(t[6]=e("hr",null,null,-1)),e("p",null,[t[3]||(t[3]=e("span",null,"SKU: ",-1)),a.sku?(o(),s("span",Ft)):(o(),c(k,{key:1,type:"info",text:"None",showDot:!1}))]),e("p",null,[t[4]||(t[4]=e("span",null,"Barcode: ",-1)),a.barcode?(o(),s("span",Et)):(o(),c(k,{key:1,type:"info",text:"None",showDot:!1}))]),a.showDescription.status&&a.description!=null?(o(),s(v,{key:0},[t[5]||(t[5]=e("hr",null,null,-1)),e("p",null,f(a.description),1)],64)):m("",!0)]),_:2},1032,["title"])])]),e("td",Lt,[e("div",Dt,[(o(!0),s(v,null,E(a._relationships.variables,(P,x)=>(o(),c(k,{key:x,type:"info",text:P.value,showDot:!1},null,8,["text"]))),128))])]),r.showEverything?(o(),s("td",It,[e("div",Mt,[a.description==null?(o(),c(T,{key:0})):(o(),s(v,{key:1},[e("span",{class:_({"line-through":a.showDescription.status==!1})},f(a.description),3),u(y,{class:"opacity-0 group-hover:opacity-100",description:a.showDescription.description,placement:"top"},null,8,["description"])],64))])])):m("",!0),e("td",Ut,[e("div",Qt,[u(k,{type:a.visible.status?"success":"warning",text:a.visible.name,showDot:!1},null,8,["type","text"]),u(y,{class:"opacity-0 group-hover:opacity-100",title:a.visible.name,description:a.visible.description,placement:"top"},null,8,["title","description"])])]),e("td",Ot,[a.allowVariations.status?(o(),c(T,{key:0})):(o(),s("div",Bt,[a.isFree.status?(o(),c(k,{key:0,type:"info",text:"Free",showDot:!1})):(o(),s(v,{key:1},[e("span",null,f(a.unitPrice.amountWithCurrency),1),a.onSale.status?(o(),c(k,{key:0,type:"success",text:"on sale",showDot:!1})):m("",!0)],64)),u(y,{class:"opacity-0 group-hover:opacity-100",title:"Pricing",placement:"top"},{description:p(()=>[a.hasPrice.status?(o(),s(v,{key:0},[t[9]||(t[9]=e("hr",null,null,-1)),e("p",null,[t[7]||(t[7]=l("Regular Price: ")),e("span",{class:_(["text-black",{"line-through":a.onSale.status||a.isFree.status}])},f(a.unitRegularPrice.amountWithCurrency),3)]),a.onSale.status?(o(),s("p",Nt,[t[8]||(t[8]=l("Sale Price: ")),e("span",{class:_(["text-black",{"line-through":a.isFree.status}])},f(a.unitSalePrice.amountWithCurrency),3)])):m("",!0)],64)):m("",!0),t[12]||(t[12]=e("hr",null,null,-1)),a.isFree.status?(o(),s(v,{key:1},[e("p",null,f(a.isFree.description),1),t[10]||(t[10]=e("p",{class:"font-bold text-black"},[l("Price: "),e("span",{class:"text-green-500"},"Free")],-1))],64)):(o(),s("p",Ht,[t[11]||(t[11]=l("Price: ")),e("span",Wt,f(a.unitPrice.amountWithCurrency),1)]))]),_:2},1024)]))]),e("td",zt,[a.allowVariations.status?(o(),c(T,{key:0})):(o(),s("div",Rt,[u(k,{type:a.hasStock.status?"info":"danger",text:a.hasStock.status?a.stockQuantityType.value.toLowerCase()=="unlimited"?"Unlimited":a.stockQuantity.description:a.hasStock.name,showDot:!1},null,8,["type","text"]),u(y,{class:"opacity-0 group-hover:opacity-100",title:"Stock",placement:"top"},{description:p(()=>[e("div",jt,[a.stockQuantityType.value.toLowerCase()=="unlimited"?(o(),s("p",qt,f(a.stockQuantityType.description),1)):(o(),s("p",Zt,f(a.stockQuantity.description),1))])]),_:2},1024)]))]),e("td",Kt,[e("div",Gt,[u(k,{type:"info",text:a.allowVariations.name.toLowerCase()=="yes"?a.totalVisibleVariations:"None",showDot:!1},null,8,["text"]),u(y,{class:"opacity-0 group-hover:opacity-100",title:"Allow Variations",placement:"top"},{description:p(()=>[e("div",Yt,[e("p",null,f(a.allowVariations.description),1),a.allowVariations.status?(o(),s(v,{key:0},[t[15]||(t[15]=e("hr",{class:"my-2"},null,-1)),e("p",null,[t[13]||(t[13]=l("Total Variations: ")),e("span",null,f(a.totalVariations??"..."),1)]),e("p",null,[t[14]||(t[14]=l("Total Visible Variations: ")),e("span",null,f(a.totalVisibleVariations??"..."),1)])],64)):m("",!0)])]),_:2},1024)])]),r.showEverything?(o(),s(v,{key:1},[e("td",Jt,[e("div",Xt,[u(k,{type:"info",text:a.allowedQuantityPerOrder.value.toLowerCase()=="unlimited"?"Unlimited":a.maximumAllowedQuantityPerOrder.value,showDot:!1},null,8,["text"]),u(y,{class:"opacity-0 group-hover:opacity-100",title:"Quantity Per Order",placement:"top"},{description:p(()=>[e("div",$t,[e("p",null,f(a.allowedQuantityPerOrder.description),1)])]),_:2},1024)])]),e("td",te,[e("div",ee,[e("span",null,f(i.formattedDatetime(a.createdAt)),1),u(y,{class:"opacity-0 group-hover:opacity-100",title:i.formattedRelativeDate(a.createdAt),placement:"top"},null,8,["title"])])])],64)):m("",!0)],8,_t))),128))]),_:1},8,["pagination","isLoading","onPaginate","onSearch","onRefresh","totalHeaders"])):(o(),s("div",re,[b.isCreatingVariations?(o(),c(C,{key:0},{default:p(()=>t[16]||(t[16]=[e("span",{class:"ml-2"},"Creating variations",-1)])),_:1})):(o(),s("div",oe,t[17]||(t[17]=[e("h1",{class:"text-2xl font-bold"},"No variations",-1),e("p",null,[l("Add your product options above ☝️ and then "),e("span",{class:"underline decoration-dashed underline-offset-4"},"create"),l(" the different variations of your product")],-1)]))),e("div",{class:_({"animate-bounce":b.isCreatingVariations})},t[18]||(t[18]=[e("span",{class:"text-8xl"},"🛍️",-1)]),2)]))]))])}const se=K(wt,[["render",ie]]),ae={mixins:[W,H],components:{Pill:N,Alert:tt,TextInput:it,TextHeader:at,MoneyInput:nt,InputTags:st,NumberInput:lt,SelectInput:ut,ConfirmModal:dt,TextareaInput:mt,SpinningLoader:R,PrimaryButton,LineSkeleton:pt,MoreInfoPopover:j,BackdropLoader:ct,ToogleSwitch:q,FormErrorMessages:ht,InputErrorMessage:ft,ProductVariations:se},data(){return{form:{sku:"",name:"",barcode:"",isFree:!1,visible:!0,storeId:null,description:"",stockQuantity:"100",unitSalePrice:"0.00",variantAttributes:[],allowVariations:!1,showDescription:!1,unitRegularPrice:"0.00",stockQuantityType:"Unlimited",maximumAllowedQuantityPerOrder:"1",allowedQuantityPerOrder:"Unlimited"},product:null,isDeleting:!1,originalForm:null,isSubmitting:!1,apiState:ot(),isLoadingProduct:!1,storeState:z(),isCreatingVariations:!1,originalVariantAttributes:[],notificationState:et()}},watch:{"$route.params.product_href"(i,t){window.scrollTo(0,0),this.getProduct()}},computed:{store(){return this.storeState.store},isCreating(){return this.$route.name==="create-store-product"},isEditting(){return this.$route.name==="show-store-product"},hasVariantAttributes(){return this.form.variantAttributes.length>0},hasOriginalVariantAttributes(){return this.originalVariantAttributes.length>0},variantAttributesHaveChanged(){var i=w(this.form.variantAttributes),t=w(this.originalVariantAttributes);return i.forEach(b=>delete b.isEditable),t.forEach(b=>delete b.isEditable),!O(i,t)},formHasChanged(){var i=w(this.form),t=w(this.originalForm);return!O(i,t)},mustSaveChanges(){return this.isEditting&&this.formHasChanged&&!this.isLoadingProduct&&!this.isSubmitting},mustCreate(){return this.isCreating&&this.formHasChanged&&!this.isLoadingProduct&&!this.isSubmitting}},methods:{setProductFields(){this.form.sku=this.product.sku,this.form.name=this.product.name,this.form.barcode=this.product.barcode,this.form.isFree=this.product.isFree.status,this.form.visible=this.product.visible.status,this.form.description=this.product.description,this.form.allowVariations=this.product.allowVariations.status,this.form.showDescription=this.product.showDescription.status,this.form.stockQuantityType=this.product.stockQuantityType.value,this.form.stockQuantity=this.product.stockQuantity.value.toString(),this.form.allowedQuantityPerOrder=this.product.allowedQuantityPerOrder.value,this.form.unitSalePrice=this.convertToValidMoney(this.product.unitSalePrice.amountWithoutCurrency),this.form.maximumAllowedQuantityPerOrder=this.product.maximumAllowedQuantityPerOrder.value.toString(),this.form.unitRegularPrice=this.convertToValidMoney(this.product.unitRegularPrice.amountWithoutCurrency),this.form.variantAttributes=this.product.variantAttributes.map(i=>(i.isEditable=!1,i)),this.originalVariantAttributes=w(this.form.variantAttributes),this.originalForm=w(this.form)},goBack(){this.product?this.product.parentProductId?this.$router.replace({name:"show-store-product",params:{store_href:this.store._links.showStore,product_href:this.product._links.showParentProduct}}):this.$router.replace({name:"show-store-products",params:{store_href:this.store._links.showStore}}):this.$router.replace({name:"show-store-products",params:{store_href:this.store._links.showStore}})},onAddVariantAttribute(){this.form.variantAttributes.some(i=>i.name.toLowerCase()==="size")?this.form.variantAttributes.some(i=>i.name.toLowerCase()==="colour")?this.form.variantAttributes.some(i=>i.name.toLowerCase()==="material")?this.form.variantAttributes.push({name:"",isEditable:!0,instruction:"",values:[]}):this.form.variantAttributes.push({name:"Material",isEditable:!0,instruction:"Select your material",values:["Cotton","Nylon"]}):this.form.variantAttributes.push({name:"Colour",isEditable:!0,instruction:"Select your colour",values:["Red","Blue","Green"]}):this.form.variantAttributes.push({name:"Size",isEditable:!0,instruction:"Select your size",values:["Small","Medium","Large"]})},onRemoveVariantAttribute(i){this.form.variantAttributes.splice(i,1)},onResetVariantAttributes(){this.form.variantAttributes=w(this.originalVariantAttributes)},getProduct(){this.isLoadingProduct=!0,Z(this.$route.params.product_href).then(i=>{i.status==200&&i.data.exists&&(this.product=i.data.product,this.setProductFields()),this.isLoadingProduct=!1}).catch(i=>{this.isLoadingProduct=!1,this.formState.setServerFormErrors(i)})},createProduct(){if(this.form.name.trim()==""){this.formState.setFormError("name","The product name is required"),this.notificationState.showWarningNotification("The product name is required"),window.scrollTo(0,0);return}if(this.form.allowVariations&&this.form.variantAttributes.length==0){this.formState.setFormError("allowVariations","Add variation options"),this.notificationState.showWarningNotification("Add variation options"),window.scrollTo(0,0);return}this.isSubmitting=!0,this.form.return=!0,B(this.apiState.apiHome._links.createProduct,this.form).then(i=>{if(i.status==200)if(this.notificationState.showSuccessNotification("Product created"),this.form.allowVariations){if(this.form.variantAttributes.length){var t=i.data.product;this.createProductVariations(t)}}else this.$router.push({name:"show-store-products",params:{store_href:this.store._links.showStore}}),window.scrollTo(0,0);this.isSubmitting=!1}).catch(i=>{this.isSubmitting=!1,this.formState.setServerFormErrors(i)})},createProductVariations(i=null){if(this.isCreatingVariations)return;this.isCreatingVariations=!0;let t={variantAttributes:this.form.variantAttributes};const b=i?i._links.createProductVariations:this.product._links.createProductVariations;B(b,t).then(S=>{S.status==200&&(i==null?(this.originalForm=w(this.form),this.form.variantAttributes=this.form.variantAttributes.map(r=>(r.isEditable=!1,r)),this.originalForm.variantAttributes=w(this.form.variantAttributes),this.originalVariantAttributes=w(this.form.variantAttributes)):this.$router.replace({name:"show-store-product",params:{store_href:this.store._links.showStore,product_href:i._links.showProduct}})),this.isCreatingVariations=!1}).catch(S=>{this.isCreatingVariations=!1,this.formState.setServerFormErrors(S)})},updateProduct(){if(this.form.name.trim()==""){this.formState.setFormError("name","The product name is required"),this.notificationState.showWarningNotification("The product name is required"),window.scrollTo(0,0);return}this.isSubmitting=!0,gt(this.product._links.updateProduct,this.form).then(i=>{i.status==200&&(this.originalForm=w(this.form),this.notificationState.showSuccessNotification("Product updated")),this.isSubmitting=!1}).catch(i=>{this.isSubmitting=!1,this.formState.setServerFormErrors(i)})},deleteProduct(){this.isDeleting=!0,vt(this.product._links.deleteProduct).then(i=>{i.status==200&&(i.data.deleted?(this.notificationState.showSuccessNotification("Product deleted"),this.product._attributes.isVariation?this.$router.replace({name:"show-store-product",params:{store_href:this.store._links.showStore,product_href:this.product._links.showParentProduct}}):(this.$router.replace({name:"show-store-products",params:{store_href:this.store._links.showStore}}),window.scrollTo(0,0))):(this.formState.setFormError("general",i.data.message),this.notificationState.showWarningNotification(i.data.message))),this.isDeleting=!1}).catch(i=>{this.isDeleting=!1,this.formState.setServerFormErrors(i)})}},mounted(){},created(){this.form.storeId=this.store.id,this.originalForm=w(this.form),this.isEditting&&this.getProduct()}},ne={class:"flex justify-start items-center border-dashed py-6"},le={key:0,class:"flex items-center space-x-2"},ue={action:"#",method:"POST"},de={class:"flex items-center space-x-2"},me={class:"grid grid-cols-12 gap-4 mb-8"},pe={class:"col-span-8 relative"},ce={class:"space-y-4 bg-white shadow-lg rounded-lg border p-4 mb-4"},he={class:"flex space-x-4"},fe={class:"flex space-x-4"},ge={class:"space-y-4 bg-white shadow-lg rounded-lg border p-4 mb-4"},ve={key:1},ye={class:"flex justify-between p-20 border rounded-lg bg-gray-50"},be={class:"space-y-4"},we={class:"text-2xl font-bold"},ke={key:0},Ve={key:1},Pe={key:2},Te={class:"absolute top-2 right-2 flex items-center space-x-2"},xe=["onClick"],Ae={key:0,"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"},_e={key:1,"stroke-linecap":"round","stroke-linejoin":"round",d:"m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"},Se={key:0,class:"space-y-4"},Ce=["onClick"],Fe={class:"text-black"},Ee={class:"text-xs text-black"},Le={class:"flex space-x-2"},De={class:"flex justify-end space-x-2"},Ie={class:"flex justify-end"},Me={class:"relative"},Ue={class:"absolute -bottom-12 left-1/2 transform -translate-x-1/2"},Qe={key:0,class:"animate-bounce text-4xl"},Oe={class:"ml-2"},Be={key:1,class:"relative"},Ne={class:"absolute -bottom-12 left-1/2 transform -translate-x-1/2"},He={key:0,class:"animate-bounce text-4xl"},We={class:"col-span-4"},ze={class:"flex flex-col justify-between bg-white shadow-lg rounded-lg border p-4 relative"},Re={class:"space-y-4"},je={class:"flex items-center space-x-4"},qe={class:"col-span-12"},Ze={key:0,class:"space-y-4 bg-white shadow-lg rounded-lg border p-4"},Ke={class:"font-bold text-black"},Ge={class:"flex justify-end"},Ye={class:"mb-8"},Je={class:"font-bold text-black"};function Xe(i,t,b,S,r,n){const y=g("Button"),C=g("LineSkeleton"),L=g("TextHeader"),k=g("MoreInfoPopover"),T=g("PrimaryButton"),A=g("Alert"),a=g("BackdropLoader"),F=g("FormErrorMessages"),P=g("TextInput"),x=g("ToogleSwitch"),M=g("MoneyInput"),G=g("TextareaInput"),U=g("SelectInput"),Q=g("NumberInput"),D=g("Pill"),Y=g("InputTags"),I=g("InputErrorMessage"),J=g("ProductVariations"),X=g("ConfirmModal");return o(),s("div",null,[e("div",ne,[u(y,{type:"light",size:"sm",class:"w-16 mr-4",action:n.goBack},null,8,["action"]),r.isLoadingProduct?(o(),s("div",le,[u(C,{width:"w-40"}),u(C,{width:"w-4"})])):(o(),s(v,{key:1},[u(L,null,{default:p(()=>[l(f(n.isCreating?"Add Product":r.form.name),1)]),_:1}),u(k,{class:"ml-2 mt-1",title:"What Is This?",description:"Products are physical or non physical items that customers can place orders and pay for using your preferred payment methods",placement:"top"})],64))]),e("form",ue,[n.mustCreate&&!(r.form.allowVariations&&!n.hasVariantAttributes)||n.mustSaveChanges?(o(),c(A,{key:0,type:"warning",class:"flex justify-between items-center mb-2"},{default:p(()=>[e("div",de,[t[19]||(t[19]=e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"})],-1)),e("span",null,[!r.product&&n.variantAttributesHaveChanged&&n.hasVariantAttributes?(o(),s(v,{key:0},[l("Create your product and variations")],64)):n.variantAttributesHaveChanged&&n.hasVariantAttributes?(o(),s(v,{key:1},[l("Create your product variations")],64)):(o(),s(v,{key:2},[l(f(n.isCreating?"Create your product":"Please save your changes"),1)],64))])]),n.variantAttributesHaveChanged&&n.hasVariantAttributes?(o(),c(T,{key:0,action:()=>r.product?n.createProductVariations():n.createProduct(),loading:r.isCreatingVariations,class:"w-48",type:"primary"},{default:p(()=>t[20]||(t[20]=[e("svg",{class:"w-3 h-3 mr-2",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"})],-1),l(" Create Variations ")])),_:1},8,["action","loading"])):(o(),c(T,{key:1,action:n.isCreating?n.createProduct:n.updateProduct,loading:r.isSubmitting,class:"w-40"},{default:p(()=>[l(f(n.isCreating?"Create Product":"Save Changes"),1)]),_:1},8,["action","loading"]))]),_:1})):m("",!0),e("div",me,[e("div",pe,[r.isLoadingProduct||r.isSubmitting?(o(),c(a,{key:0,class:"rounded-lg"})):m("",!0),e("div",ce,[u(F),u(P,{label:"Name",modelValue:r.form.name,"onUpdate:modelValue":t[0]||(t[0]=d=>r.form.name=d),placeholder:"Standard Ticket",labelPopoverTitle:"What Is This?",errorText:i.getFormError("name"),labelPopoverDescription:"The name of your product e.g Standard Ticket"},null,8,["modelValue","errorText"]),r.form.allowVariations==!1?(o(),s(v,{key:0},[u(x,{size:"md",modelValue:r.form.isFree,"onUpdate:modelValue":t[1]||(t[1]=d=>r.form.isFree=d),labelPopoverTitle:"What Is This?",errorText:i.getFormError("isFree"),labelPopoverDescription:"Turn on if you want your product to be made Free for customers"},{default:p(()=>t[21]||(t[21]=[l(" Is Free ")])),_:1},8,["modelValue","errorText"]),r.form.isFree?(o(),c(A,{key:0},{default:p(()=>t[22]||(t[22]=[l(" This product is "),e("span",{class:"font-bold"},"Free",-1)])),_:1})):(o(),s(v,{key:1},[u(M,{label:"Regular Price",modelValue:r.form.unitRegularPrice,"onUpdate:modelValue":t[2]||(t[2]=d=>r.form.unitRegularPrice=d),labelPopoverTitle:"What Is This?",errorText:i.getFormError("unitRegularPrice"),labelPopoverDescription:"Set the regular price of this product (How much the product is sold when its not on sale)"},null,8,["modelValue","errorText"]),u(M,{label:"Sale Price",modelValue:r.form.unitSalePrice,"onUpdate:modelValue":t[3]||(t[3]=d=>r.form.unitSalePrice=d),labelPopoverTitle:"What Is This?",errorText:i.getFormError("unitSalePrice"),labelPopoverDescription:"Set the sale price of this product (if the product is on sale)"},null,8,["modelValue","errorText"])],64)),u(x,{size:"md",modelValue:r.form.showDescription,"onUpdate:modelValue":t[4]||(t[4]=d=>r.form.showDescription=d),labelPopoverTitle:"What Is This?",errorText:i.getFormError("showDescription"),labelPopoverDescription:"Turn on if you want to show the product description to customers"},{default:p(()=>t[23]||(t[23]=[l(" Show Description ")])),_:1},8,["modelValue","errorText"]),r.form.showDescription?(o(),c(G,{key:2,rows:2,label:"Description",modelValue:r.form.description,"onUpdate:modelValue":t[5]||(t[5]=d=>r.form.description=d),labelPopoverTitle:"What Is This?",errorText:i.getFormError("description"),placeholder:"1 day show with popular artists",labelPopoverDescription:"Sweet and short description of your product e.g 1 day show with popular artists"},null,8,["modelValue","errorText"])):m("",!0),e("div",he,[u(U,{label:"Available Stock",modelValue:r.form.stockQuantityType,"onUpdate:modelValue":t[6]||(t[6]=d=>r.form.stockQuantityType=d),labelPopoverTitle:"What Is This?",errorText:i.getFormError("stockQuantityType"),labelPopoverDescription:"Select the available stock e.g Unlimited means that stock is always available while limited means that stock is limited to the quatities specified"},{default:p(()=>t[24]||(t[24]=[e("option",{value:"Limited"},"Limited",-1),e("option",{value:"Unlimited"},"Unlimited",-1)])),_:1},8,["modelValue","errorText"]),r.form.stockQuantityType=="Limited"?(o(),c(Q,{key:0,min:"1",modelValue:r.form.stockQuantity,"onUpdate:modelValue":t[7]||(t[7]=d=>r.form.stockQuantity=d),labelPopoverTitle:"What Is This?",label:"Stock Quantity",placeholder:"100",errorText:i.getFormError("stockQuantity"),labelPopoverDescription:"Set the stock quantity e.g 100 means that you only have 100 items of this product"},null,8,["modelValue","errorText"])):m("",!0)]),e("div",fe,[u(U,{label:"Quantities Per Order",labelPopoverTitle:"What Is This?",modelValue:r.form.allowedQuantityPerOrder,"onUpdate:modelValue":t[8]||(t[8]=d=>r.form.allowedQuantityPerOrder=d),errorText:i.getFormError("allowedQuantityPerOrder"),labelPopoverDescription:"Select the maximum quantity per order of this product (Used to manage supply and demand) e.g Unlimited means that a customer can specify any quantity while limited means that a customer can only specify up to the maximum quantity that you support"},{default:p(()=>t[25]||(t[25]=[e("option",{value:"Limited"},"Limited",-1),e("option",{value:"Unlimited"},"Unlimited",-1)])),_:1},8,["modelValue","errorText"]),r.form.allowedQuantityPerOrder=="Limited"?(o(),c(Q,{key:0,min:"1",placeholder:"10",labelPopoverTitle:"What Is This?",label:"Maximum Quantities Per Order",modelValue:r.form.maximumAllowedQuantityPerOrder,"onUpdate:modelValue":t[9]||(t[9]=d=>r.form.maximumAllowedQuantityPerOrder=d),errorText:i.getFormError("maximumAllowedQuantityPerOrder"),labelPopoverDescription:"Set the maximum quantity per order of this product (Used to manage supply and demand) e.g 10 means that a customer can only specify a quantity of 1 up to 10 when placing an order. They will not be permitted to order anymore than this quantity"},null,8,["modelValue","errorText"])):m("",!0)])],64)):m("",!0)]),e("div",ge,[r.form.allowVariations||n.hasOriginalVariantAttributes?(o(),c(x,{key:0,labelPopoverTitle:"What Is This?",modelValue:r.form.allowVariations,"onUpdate:modelValue":t[10]||(t[10]=d=>r.form.allowVariations=d),size:"md",errorText:i.getFormError("allowVariations"),labelPopoverDescription:"Turn on if you want your product to support variations (different versions of itself e.g different sizes, materials, colors, etc)"},{default:p(()=>t[26]||(t[26]=[l(" Allow variations ")])),_:1},8,["modelValue","errorText"])):m("",!0),n.hasOriginalVariantAttributes?m("",!0):(o(),s("div",ve,[e("div",ye,[e("div",be,[e("h1",we,[r.form.allowVariations&&n.hasVariantAttributes?(o(),s(v,{key:0},[l("Create Variations")],64)):r.form.allowVariations?(o(),s(v,{key:1},[l("Add Options")],64)):(o(),s(v,{key:2},[l("Have Options?")],64))]),n.hasVariantAttributes?(o(),s("p",ke,[t[27]||(t[27]=l("Click the ")),u(D,{type:"primary",text:"Create Variations",showDot:!1}),t[28]||(t[28]=l(" button to create different variations of your product e.g different sizes, materials, colors, etc"))])):r.form.allowVariations?(o(),s("p",Ve,[t[29]||(t[29]=l("Click the ")),u(D,{type:"primary",text:"+ Add Option",showDot:!1}),t[30]||(t[30]=l(" button to add different variations of your product e.g different sizes, materials, colors, etc"))])):(o(),s("p",Pe,[t[31]||(t[31]=l("Turn on ")),u(D,{type:"primary",text:"Allow variations",showDot:!1}),t[32]||(t[32]=l(" if you want your product to support variations (different versions of itself e.g different sizes, materials, colors, etc)"))])),r.form.allowVariations?m("",!0):(o(),c(x,{key:3,labelPopoverTitle:"What Is This?",modelValue:r.form.allowVariations,"onUpdate:modelValue":t[11]||(t[11]=d=>r.form.allowVariations=d),size:"md",errorText:i.getFormError("allowVariations"),labelPopoverDescription:"Turn on if you want your product to support variations (different versions of itself e.g different sizes, materials, colors, etc)"},{default:p(()=>t[33]||(t[33]=[l(" Allow variations ")])),_:1},8,["modelValue","errorText"]))]),t[34]||(t[34]=e("div",null,[e("span",{class:"text-8xl"},"🛍️")],-1))])])),r.form.allowVariations?(o(),s(v,{key:2},[(o(!0),s(v,null,E(r.form.variantAttributes,(d,h)=>(o(),s("div",{key:h,class:"relative bg-gray-50 p-4 border rounded-lg"},[e("div",Te,[(o(),s("svg",{class:"w-6 h-6 cursor-pointer hover:opacity-50",onClick:V=>r.form.variantAttributes[h].isEditable=!r.form.variantAttributes[h].isEditable,xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[r.form.variantAttributes[h].isEditable?(o(),s("path",Ae)):(o(),s("path",_e))],8,xe)),u(y,{type:"danger",size:"xs",action:()=>n.onRemoveVariantAttribute(h)},null,8,["action"])]),r.form.variantAttributes[h].isEditable?(o(),s("div",Se,[u(P,{label:"Name",placeholder:"Size",labelPopoverTitle:"What Is This?",modelValue:r.form.variantAttributes[h].name,"onUpdate:modelValue":V=>r.form.variantAttributes[h].name=V,errorText:i.getFormError("variantAttributes"+h+"name"),labelPopoverDescription:"The variation name e.g Size, Color, Material, etc"},null,8,["modelValue","onUpdate:modelValue","errorText"]),u(P,{label:"Instruction",placeholder:"Select your size",labelPopoverTitle:"What Is This?",modelValue:r.form.variantAttributes[h].instruction,"onUpdate:modelValue":V=>r.form.variantAttributes[h].instruction=V,errorText:i.getFormError("variantAttributes"+h+"instruction"),labelPopoverDescription:"The variation instruction e.g Select your size"},null,8,["modelValue","onUpdate:modelValue","errorText"]),(o(),c(Y,{label:"Options",labelPopoverTitle:"What Is This?",key:r.form.variantAttributes[h].values,tags:r.form.variantAttributes[h].values,errorText:i.getFormError("variantAttributes"+h+"value"),onOnTagsChanged:V=>r.form.variantAttributes[h].values=V,labelPopoverDescription:"The variation options e.g Small, Medium, Large, etc"},null,8,["tags","errorText","onOnTagsChanged"]))])):(o(),s("div",{key:1,class:"space-y-2 cursor-pointer",onClick:V=>r.form.variantAttributes[h].isEditable=!0},[e("p",Fe,f(r.form.variantAttributes[h].name),1),i.getFormError("variantAttributes"+h+"name")?(o(),c(I,{key:0,errorText:i.getFormError("variantAttributes"+h+"name")},null,8,["errorText"])):m("",!0),e("p",Ee,f(r.form.variantAttributes[h].instruction),1),i.getFormError("variantAttributes"+h+"name")?(o(),c(I,{key:1,errorText:i.getFormError("variantAttributes"+h+"instruction")},null,8,["errorText"])):m("",!0),e("div",Le,[(o(!0),s(v,null,E(r.form.variantAttributes[h].values,(V,$)=>(o(),s("span",{key:$,class:"py-1 px-2 bg-black text-white text-xs rounded-lg"},f(V),1))),128))]),i.getFormError("variantAttributes"+h+"name")?(o(),c(I,{key:2,errorText:i.getFormError("variantAttributes"+h+"value")},null,8,["errorText"])):m("",!0)],8,Ce))]))),128)),e("div",De,[n.variantAttributesHaveChanged&&n.hasOriginalVariantAttributes?(o(),c(y,{key:0,primary:"light",size:"xs",action:n.onResetVariantAttributes},{default:p(()=>t[35]||(t[35]=[e("span",null,"Undo",-1)])),_:1},8,["action"])):m("",!0),e("div",Ie,[e("div",Me,[e("div",Ue,[n.hasVariantAttributes?m("",!0):(o(),s("div",Qe,"👆"))]),u(y,{type:"primary",size:"xs",action:n.onAddVariantAttribute,class:_(n.hasVariantAttributes?"w-48":"w-40")},{default:p(()=>[e("span",Oe,f(n.hasVariantAttributes?"Add Another Option":"Add Option"),1)]),_:1},8,["action","class"])])]),n.variantAttributesHaveChanged&&n.hasVariantAttributes?(o(),s("div",Be,[e("div",Ne,[r.isCreatingVariations?m("",!0):(o(),s("div",He,"👆"))]),u(y,{type:"primary",size:"xs",action:()=>r.product?n.createProductVariations():n.createProduct(),loading:r.isCreatingVariations,class:"w-40"},{default:p(()=>t[36]||(t[36]=[l(" Create Variations ")])),_:1},8,["action","loading"])])):m("",!0)])],64)):m("",!0)])]),e("div",We,[e("div",ze,[r.isLoadingProduct||r.isSubmitting?(o(),c(a,{key:0,showSpinningLoader:!1,class:"rounded-lg"})):m("",!0),e("div",Re,[e("div",je,[r.form.visible?(o(),s("svg",{key:0,onClick:t[12]||(t[12]=d=>r.form.visible=!r.form.visible),class:"w-6 h-6 cursor-pointer",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},t[37]||(t[37]=[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"},null,-1),e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"},null,-1)]))):(o(),s("svg",{key:1,onClick:t[13]||(t[13]=d=>r.form.visible=!r.form.visible),class:"w-6 h-6 cursor-pointer",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},t[38]||(t[38]=[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"},null,-1)]))),u(x,{class:"flex",modelValue:r.form.visible,"onUpdate:modelValue":t[14]||(t[14]=d=>r.form.visible=d),size:"md",labelPopoverTitle:"What Is This?",errorText:i.getFormError("visible"),labelPopoverDescription:"Turn on if you want your product to be visible (Made available to customers)"},{default:p(()=>t[39]||(t[39]=[l(" Show Product ")])),_:1},8,["modelValue","errorText"])]),r.form.visible?m("",!0):(o(),c(A,{key:0,type:"warning"},{default:p(()=>t[40]||(t[40]=[l(" This product has been "),e("span",{class:"font-bold"},"hidden",-1),l(" from customers visiting your store ")])),_:1})),u(P,{modelValue:r.form.sku,"onUpdate:modelValue":t[15]||(t[15]=d=>r.form.sku=d),errorText:i.getFormError("sku"),labelPopoverTitle:"What Is This?",label:"SKU",placeholder:"std-ticket",labelPopoverDescription:"The stock keeping unit of this product. Useful for stock management"},null,8,["modelValue","errorText"]),u(P,{modelValue:r.form.barcode,"onUpdate:modelValue":t[16]||(t[16]=d=>r.form.barcode=d),labelPopoverTitle:"What Is This?",errorText:i.getFormError("barcode"),label:"Barcode",placeholder:"123456789",labelPopoverDescription:"The barcode of this product. Useful for stock management"},null,8,["modelValue","errorText"])])])]),e("div",qe,[r.form.allowVariations&&n.hasOriginalVariantAttributes?(o(),s("div",Ze,[n.variantAttributesHaveChanged?(o(),c(A,{key:0,class:"flex items-start space-x-2"},{default:p(()=>[t[45]||(t[45]=e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"})],-1)),e("div",null,[t[43]||(t[43]=l(" The variation options have been changed. You can ")),n.hasVariantAttributes?(o(),s(v,{key:0},[t[41]||(t[41]=l(" either ")),e("span",{onClick:t[17]||(t[17]=()=>n.createProductVariations()),class:"font-bold underline cursor-pointer"}," Create New Variations "),t[42]||(t[42]=l(" or "))],64)):m("",!0),e("span",{onClick:t[18]||(t[18]=(...d)=>n.onResetVariantAttributes&&n.onResetVariantAttributes(...d)),class:"font-bold underline cursor-pointer"}," Undo Changes "),t[44]||(t[44]=l(" to revert back to the original variations you had before. "))])]),_:1})):r.product?(o(),c(J,{key:1,product:r.product,isLoadingProduct:r.isLoadingProduct,isCreatingVariations:r.isCreatingVariations},null,8,["product","isLoadingProduct","isCreatingVariations"])):m("",!0)])):m("",!0)])]),r.product?(o(),s("div",{key:1,class:_(["space-y-4 shadow-lg rounded-lg border p-4",r.isLoadingProduct?"bg-gray-50":"border-red-300 bg-red-50"])},[e("p",null,[t[46]||(t[46]=l("Do you want to permanently delete ")),e("span",Ke,f(r.form.name),1),t[47]||(t[47]=l("? Once this product is deleted you will not be able to recover it."))]),e("div",Ge,[u(X,{approveText:"Delete Product",approveAction:n.deleteProduct,isLoading:r.isDeleting},{content:p(()=>[t[50]||(t[50]=e("p",{class:"text-lg font-bold border-b border-dashed pb-4 mb-4"},"Confirm Delete",-1)),e("p",Ye,[t[48]||(t[48]=l("Are you sure you want to permanently delete ")),e("span",Je,f(r.form.name),1),t[49]||(t[49]=l("?"))])]),trigger:p(d=>[u(T,{action:d.showModal,loading:r.isDeleting,class:"w-40",type:"danger"},{default:p(()=>t[51]||(t[51]=[l(" Delete Product ")])),_:2},1032,["action","loading"])]),_:1},8,["approveAction","isLoading"])])],2)):m("",!0)])])}const Ir=K(ae,[["render",Xe]]);export{Ir as default};
