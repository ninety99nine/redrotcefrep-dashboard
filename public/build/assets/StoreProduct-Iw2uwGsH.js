import{c as _,i as Q}from"./cloneDeep-oqn_4Jlj.js";import{A as rt}from"./Alert-BJCbLq-J.js";import{F as W,u as st}from"./FormMixin-BSf8Kh8A.js";import{U as N,S as H}from"./SpiningLoader-COnJLsaj.js";import{o,c as i,d as t,i as l,t as f,h as d,e as u,g as m,w as h,F as v,l as E,m as it,n as A,r as p,u as at}from"./app-piavnWUw.js";import{u as z}from"./store-store-CV52Rs-E.js";import{T as nt}from"./TextInput-DrcRoVTX.js";import{I as lt,N as ut,L as ct}from"./LoadingBackdrop-DMqonLig.js";import{A as dt}from"./AddButton-d_CpB1dj.js";import{T as ht}from"./TextHeader-C9wn3Won.js";import{M as mt}from"./MoneyInput-Dy86LtLu.js";import{U as pt}from"./UndoButton-Sqe13aVn.js";import{B as ft}from"./BackButton-Jzb0508Y.js";import{S as gt}from"./SelectInput-CfaK-FWb.js";import{C as vt}from"./ConfirmModal-CfNuJ83i.js";import{S as yt,L as _t}from"./LineSkeleton-CjlPsSYc.js";import{D as bt}from"./DeleteButton-BYaaI91E.js";import{T as wt}from"./TextareaInput-2NmMHV_h.js";import{P as kt}from"./PrimaryButton-CZPI_FYh.js";import{M as R}from"./MoreInfoPopover-CKuNZTrg.js";import{T as j}from"./ToogleSwitch-BMGiwfio.js";import{B as q}from"./BadgeIndicator-CL1O2gvW.js";import{I as Vt}from"./InputErrorMessage-D6kZl79B.js";import{g as Z,p as O,a as Pt,d as Tt}from"./api-repository-LmUqmO20.js";import{B as xt}from"./BasicTable-W7_55bdS.js";import{N as At}from"./NoDataPlaceholder-Dpagx3Ki.js";import{_ as K}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./InputLabel-CtY3wyzz.js";import"./vue3-tags-input.esm-_7BFvsmR.js";import"./StatusDot-BROLAEOo.js";import"./SearchInput-BLhW_LtD.js";const St={mixins:[W,N],components:{MoreInfoPopover:R,ToogleSwitch:j,BasicTable:xt,SpiningLoader:H,BadgeIndicator:q,NoDataPlaceholder:At},props:{product:{type:Object},isLoadingProduct:{type:Boolean},isCreatingVariations:{type:Boolean}},data(){return{pagination:null,searchTerm:null,showEverything:!1,sentFirstRequest:!1,storeState:z(),isLoadingProductVariations:!1}},watch:{isLoadingProduct(r,a){r==!1&&this.getProductVariations()},isCreatingVariations(r,a){r==!1&&this.getProductVariations()}},computed:{store(){return this.storeState.store},products(){return(this.pagination??{}).data??[]},hasVariations(){return this.totalVariations>0},totalVariations(){return(this.pagination??{}).total??0},tableHeaders(){return this.showEverything?["Name","Properties","Description","Visibility","Price","Stock","Variations","Quantity Per Order","Created Date"]:["Name","Properties","Visibility","Price","Stock","Variations"]}},methods:{onEdit(r){this.$router.push({name:"show-store-product",params:{store_href:this.store._links.showStore,product_href:r._links.showProduct}})},paginate(r){this.getProductVariations(r)},search(r){this.searchTerm=r,this.getProductVariations()},getProductVariations(r=null){this.isLoadingProductVariations=!0;const a={};this.searchTerm!=null&&this.searchTerm!=""&&(a.search=this.searchTerm),r=r??this.product._links.showProductVariations,Z(r,a).then(y=>{y.status==200&&(this.pagination=y.data),this.isLoadingProductVariations=!1,this.sentFirstRequest=!0}).catch(y=>{this.isLoadingProductVariations=!1,this.setServerFormErrors(y)})}},mounted(){},created(){this.getProductVariations()}},Ct={class:"flex items-center"},Lt={class:"font-bold text-lg"},Et={key:0},Ft={key:0,class:"text-xs"},Dt={key:1,class:"flex justify-center"},It={key:2,class:"mt-4"},Mt=["onClick"],Bt={class:"whitespace-nowrap px-4 py-4"},Ut={class:"flex space-x-1 items-center w-40"},Qt=t("hr",null,null,-1),Ot=t("span",null,"SKU: ",-1),Wt={key:0,class:"text-black"},Nt=t("span",null,"Barcode: ",-1),Ht={key:0,class:"text-black"},zt=t("hr",null,null,-1),Rt={class:"whitespace-nowrap px-4 py-4"},jt={class:"flex space-x-1"},qt={key:0,class:"px-4 py-4"},Zt={class:"flex space-x-1 items-center w-60"},Kt={class:"whitespace-nowrap px-4 py-4"},Gt={class:"flex space-x-1 items-center"},Yt={class:"whitespace-nowrap px-4 py-4"},Jt={key:1,class:"flex space-x-1 items-center"},Xt=t("hr",null,null,-1),$t={key:0},te=t("hr",null,null,-1),ee=t("p",{class:"font-bold text-black"},[l("Price: "),t("span",{class:"text-green-500"},"Free")],-1),oe={key:2,class:"text-black"},re={class:"font-bold"},se={class:"whitespace-nowrap px-4 py-4"},ie={key:1,class:"flex space-x-1 items-center"},ae={class:"whitespace-normal"},ne={key:0},le={key:1},ue={class:"whitespace-nowrap px-4 py-4"},ce={class:"flex space-x-1 items-center"},de={class:"whitespace-normal"},he=t("hr",{class:"my-2"},null,-1),me={class:"whitespace-nowrap px-4 py-4"},pe={class:"flex space-x-1 items-center"},fe={class:"whitespace-normal"},ge={class:"whitespace-nowrap px-4 py-4"},ve={class:"flex space-x-1 items-center"},ye={key:1,class:"flex justify-between p-20 border rounded-lg bg-gray-50"},_e=t("span",{class:"ml-2"},"Creating variations",-1),be={key:1,class:"space-y-4"},we=t("h1",{class:"text-2xl font-bold"},"No variations",-1),ke=t("p",null,[l("Add your product options above ☝️ and then "),t("span",{class:"underline decoration-dashed underline-offset-4"},"create"),l(" the different variations of your product")],-1),Ve=[we,ke],Pe=t("span",{class:"text-8xl"},"🛍️",-1),Te=[Pe];function xe(r,a,y,S,e,n){const b=p("MoreInfoPopover"),C=p("SpiningLoader"),F=p("ToogleSwitch"),w=p("BadgeIndicator"),L=p("NoDataPlaceholder"),T=p("BasicTable");return o(),i("div",null,[t("div",Ct,[t("p",Lt,[l("Variations "),n.hasVariations?(o(),i("span",Et,"("+f(n.totalVariations)+")",1)):d("",!0)]),u(b,{class:"ml-2 mt-1",title:"What Is This?",description:"Variations are different options of the same product e.g options for sizes, colors or materials.",placement:"top"})]),n.hasVariations?(o(),i("p",Ft,"Select any variations to make changes")):d("",!0),!e.sentFirstRequest&&e.isLoadingProductVariations?(o(),i("div",Dt,[u(C,{class:"my-4"})])):(o(),i("div",It,[n.totalVariations>0?(o(),m(T,{key:0,pagination:e.pagination,isLoading:e.isLoadingProductVariations,onPaginate:n.paginate,onSearch:n.search,onRefresh:n.getProductVariations,totalHeaders:n.tableHeaders.length},{primaryFilters:h(()=>[u(F,{modelValue:e.showEverything,"onUpdate:modelValue":a[0]||(a[0]=s=>e.showEverything=s),size:"md",labelPopoverTitle:"What Is This?",labelPopoverDescription:"Turn on if you want to show more information about your product variations"},{default:h(()=>[l(" Show Everything ")]),_:1},8,["modelValue"])]),head:h(()=>[t("tr",null,[(o(!0),i(v,null,E(n.tableHeaders,(s,x)=>(o(),i("th",{key:x,scope:"col",class:"whitespace-nowrap px-4 py-3"},f(s),1))),128))])]),body:h(()=>[(o(!0),i(v,null,E(n.products,(s,x)=>(o(),i("tr",{onClick:it(V=>n.onEdit(s),["stop"]),key:x,class:"group cursor-pointer bg-white hover:bg-gray-50 border-b"},[t("td",Bt,[t("div",Ut,[t("span",null,f(s.name),1),u(b,{class:"opacity-0 group-hover:opacity-100",title:s.name,placement:"top"},{description:h(()=>[Qt,t("p",null,[Ot,s.sku?(o(),i("span",Wt)):(o(),m(w,{key:1,type:"info",text:"None",showDot:!1}))]),t("p",null,[Nt,s.barcode?(o(),i("span",Ht)):(o(),m(w,{key:1,type:"info",text:"None",showDot:!1}))]),s.showDescription.status&&s.description!=null?(o(),i(v,{key:0},[zt,t("p",null,f(s.description),1)],64)):d("",!0)]),_:2},1032,["title"])])]),t("td",Rt,[t("div",jt,[(o(!0),i(v,null,E(s._relationships.variables,(V,P)=>(o(),m(w,{key:P,type:"info",text:V.value,showDot:!1},null,8,["text"]))),128))])]),e.showEverything?(o(),i("td",qt,[t("div",Zt,[s.description==null?(o(),m(L,{key:0})):(o(),i(v,{key:1},[t("span",{class:A({"line-through":s.showDescription.status==!1})},f(s.description),3),u(b,{class:"opacity-0 group-hover:opacity-100",description:s.showDescription.description,placement:"top"},null,8,["description"])],64))])])):d("",!0),t("td",Kt,[t("div",Gt,[u(w,{type:s.visible.status?"success":"warning",text:s.visible.name,showDot:!1},null,8,["type","text"]),u(b,{class:"opacity-0 group-hover:opacity-100",title:s.visible.name,description:s.visible.description,placement:"top"},null,8,["title","description"])])]),t("td",Yt,[s.allowVariations.status?(o(),m(L,{key:0})):(o(),i("div",Jt,[s.isFree.status?(o(),m(w,{key:0,type:"info",text:"Free",showDot:!1})):(o(),i(v,{key:1},[t("span",null,f(s.unitPrice.amountWithCurrency),1),s.onSale.status?(o(),m(w,{key:0,type:"success",text:"on sale",showDot:!1})):d("",!0)],64)),u(b,{class:"opacity-0 group-hover:opacity-100",title:"Pricing",placement:"top"},{description:h(()=>[s.hasPrice.status?(o(),i(v,{key:0},[Xt,t("p",null,[l("Regular Price: "),t("span",{class:A(["text-black",{"line-through":s.onSale.status||s.isFree.status}])},f(s.unitRegularPrice.amountWithCurrency),3)]),s.onSale.status?(o(),i("p",$t,[l("Sale Price: "),t("span",{class:A(["text-black",{"line-through":s.isFree.status}])},f(s.unitSalePrice.amountWithCurrency),3)])):d("",!0)],64)):d("",!0),te,s.isFree.status?(o(),i(v,{key:1},[t("p",null,f(s.isFree.description),1),ee],64)):(o(),i("p",oe,[l("Price: "),t("span",re,f(s.unitPrice.amountWithCurrency),1)]))]),_:2},1024)]))]),t("td",se,[s.allowVariations.status?(o(),m(L,{key:0})):(o(),i("div",ie,[u(w,{type:s.hasStock.status?"info":"danger",text:s.hasStock.status?s.stockQuantityType.value.toLowerCase()=="unlimited"?"Unlimited":s.stockQuantity.description:s.hasStock.name,showDot:!1},null,8,["type","text"]),u(b,{class:"opacity-0 group-hover:opacity-100",title:"Stock",placement:"top"},{description:h(()=>[t("div",ae,[s.stockQuantityType.value.toLowerCase()=="unlimited"?(o(),i("p",ne,f(s.stockQuantityType.description),1)):(o(),i("p",le,f(s.stockQuantity.description),1))])]),_:2},1024)]))]),t("td",ue,[t("div",ce,[u(w,{type:"info",text:s.allowVariations.name.toLowerCase()=="yes"?s.totalVisibleVariations:"None",showDot:!1},null,8,["text"]),u(b,{class:"opacity-0 group-hover:opacity-100",title:"Allow Variations",placement:"top"},{description:h(()=>[t("div",de,[t("p",null,f(s.allowVariations.description),1),s.allowVariations.status?(o(),i(v,{key:0},[he,t("p",null,[l("Total Variations: "),t("span",null,f(s.totalVariations??"..."),1)]),t("p",null,[l("Total Visible Variations: "),t("span",null,f(s.totalVisibleVariations??"..."),1)])],64)):d("",!0)])]),_:2},1024)])]),e.showEverything?(o(),i(v,{key:1},[t("td",me,[t("div",pe,[u(w,{type:"info",text:s.allowedQuantityPerOrder.value.toLowerCase()=="unlimited"?"Unlimited":s.maximumAllowedQuantityPerOrder.value,showDot:!1},null,8,["text"]),u(b,{class:"opacity-0 group-hover:opacity-100",title:"Quantity Per Order",placement:"top"},{description:h(()=>[t("div",fe,[t("p",null,f(s.allowedQuantityPerOrder.description),1)])]),_:2},1024)])]),t("td",ge,[t("div",ve,[t("span",null,f(r.formattedDatetime(s.createdAt)),1),u(b,{class:"opacity-0 group-hover:opacity-100",title:r.formattedRelativeDate(s.createdAt),placement:"top"},null,8,["title"])])])],64)):d("",!0)],8,Mt))),128))]),_:1},8,["pagination","isLoading","onPaginate","onSearch","onRefresh","totalHeaders"])):(o(),i("div",ye,[y.isCreatingVariations?(o(),m(C,{key:0},{default:h(()=>[_e]),_:1})):(o(),i("div",be,Ve)),t("div",{class:A({"animate-bounce":y.isCreatingVariations})},Te,2)]))]))])}const Ae=K(St,[["render",xe]]),Se={mixins:[N,W],components:{Alert:rt,TextInput:nt,TextHeader:ht,MoneyInput:mt,InputTags:lt,AddButton:dt,UndoButton:pt,BackButton:ft,NumberInput:ut,SelectInput:gt,ConfirmModal:vt,ShineEffect:yt,DeleteButton:bt,TextareaInput:wt,SpiningLoader:H,PrimaryButton:kt,LineSkeleton:_t,MoreInfoPopover:R,LoadingBackdrop:ct,ToogleSwitch:j,BadgeIndicator:q,InputErrorMessage:Vt,ProductVariations:Ae},data(){return{form:{sku:"",name:"",barcode:"",isFree:!1,visible:!0,storeId:null,description:"",stockQuantity:"100",unitSalePrice:"0.00",variantAttributes:[],allowVariations:!1,showDescription:!1,unitRegularPrice:"0.00",stockQuantityType:"Unlimited",maximumAllowedQuantityPerOrder:"1",allowedQuantityPerOrder:"Unlimited"},product:null,isDeleting:!1,originalForm:null,isSubmitting:!1,apiState:at(),isLoadingProduct:!1,storeState:z(),isCreatingVariations:!1,originalVariantAttributes:[],notificationState:st()}},watch:{"$route.params.product_href"(r,a){window.scrollTo(0,0),this.getProduct()}},computed:{store(){return this.storeState.store},isCreating(){return this.$route.name==="create-store-product"},isEditting(){return this.$route.name==="show-store-product"},hasVariantAttributes(){return this.form.variantAttributes.length},hasOriginalVariantAttributes(){return this.originalVariantAttributes.length},variantAttributesHaveChanged(){var r=_(this.form.variantAttributes),a=_(this.originalVariantAttributes);return r.forEach(y=>delete y.isEditable),a.forEach(y=>delete y.isEditable),!Q(r,a)},formHasChanged(){var r=_(this.form),a=_(this.originalForm);return!Q(r,a)},mustSaveChanges(){return this.isEditting&&this.formHasChanged&&!this.isLoadingProduct&&!this.isSubmitting},mustCreate(){return this.isCreating&&this.formHasChanged&&!this.isLoadingProduct&&!this.isSubmitting}},methods:{setProductFields(){this.form.sku=this.product.sku,this.form.name=this.product.name,this.form.barcode=this.product.barcode,this.form.isFree=this.product.isFree.status,this.form.visible=this.product.visible.status,this.form.description=this.product.description,this.form.allowVariations=this.product.allowVariations.status,this.form.showDescription=this.product.showDescription.status,this.form.stockQuantityType=this.product.stockQuantityType.value,this.form.stockQuantity=this.product.stockQuantity.value.toString(),this.form.allowedQuantityPerOrder=this.product.allowedQuantityPerOrder.value,this.form.unitSalePrice=this.covertToValidMoney(this.product.unitSalePrice.amountWithoutCurrency),this.form.maximumAllowedQuantityPerOrder=this.product.maximumAllowedQuantityPerOrder.value.toString(),this.form.unitRegularPrice=this.covertToValidMoney(this.product.unitRegularPrice.amountWithoutCurrency),this.form.variantAttributes=this.product.variantAttributes.map(r=>(r.isEditable=!1,r)),this.originalVariantAttributes=_(this.form.variantAttributes),this.originalForm=_(this.form)},goBack(){this.product?this.product.parentProductId?this.$router.replace({name:"show-store-product",params:{store_href:this.store._links.showStore,product_href:this.product._links.showParentProduct}}):this.$router.replace({name:"show-store-products",params:{store_href:this.store._links.showStore}}):this.$router.replace({name:"show-store-products",params:{store_href:this.store._links.showStore}})},onAddVariantAttribute(){this.form.variantAttributes.some(r=>r.name.toLowerCase()==="size")?this.form.variantAttributes.some(r=>r.name.toLowerCase()==="colour")?this.form.variantAttributes.some(r=>r.name.toLowerCase()==="material")?this.form.variantAttributes.push({name:"",isEditable:!0,instruction:"",values:[]}):this.form.variantAttributes.push({name:"Material",isEditable:!0,instruction:"Select your material",values:["Cotton","Nylon"]}):this.form.variantAttributes.push({name:"Colour",isEditable:!0,instruction:"Select your colour",values:["Red","Blue","Green"]}):this.form.variantAttributes.push({name:"Size",isEditable:!0,instruction:"Select your size",values:["Small","Medium","Large"]})},onRemoveVariantAttribute(r){this.form.variantAttributes.splice(r,1)},onResetVariantAttributes(){this.form.variantAttributes=_(this.originalVariantAttributes)},getProduct(){this.isLoadingProduct=!0,Z(this.$route.params.product_href).then(r=>{r.status==200&&r.data.exists&&(this.product=r.data.product,this.setProductFields()),this.isLoadingProduct=!1}).catch(r=>{this.isLoadingProduct=!1,this.setServerFormErrors(r)})},createProduct(){if(this.form.name.trim()==""){this.setFormError("name","The product name is required"),this.notificationState.addWarningNotification("The product name is required"),window.scrollTo(0,0);return}if(this.form.allowVariations&&this.form.variantAttributes.length==0){this.setFormError("allowVariations","Add variation options"),this.notificationState.addWarningNotification("Add variation options"),window.scrollTo(0,0);return}this.isSubmitting=!0,this.form.return=!0,O(this.apiState.apiHome._links.createProduct,this.form).then(r=>{if(r.status==200)if(this.showSuccessfulNotification("Product created"),this.form.allowVariations){if(this.form.variantAttributes.length){var a=r.data.product;this.createProductVariations(a)}}else this.$router.push({name:"show-store-products",params:{store_href:this.store._links.showStore}}),window.scrollTo(0,0);this.isSubmitting=!1}).catch(r=>{this.isSubmitting=!1,this.setServerFormErrors(r)})},createProductVariations(r=null){if(this.isCreatingVariations)return;this.isCreatingVariations=!0;let a={variantAttributes:this.form.variantAttributes};const y=r?r._links.createProductVariations:this.product._links.createProductVariations;O(y,a).then(S=>{S.status==200&&(r==null?(this.originalForm=_(this.form),this.form.variantAttributes=this.form.variantAttributes.map(e=>(e.isEditable=!1,e)),this.originalForm.variantAttributes=_(this.form.variantAttributes),this.originalVariantAttributes=_(this.form.variantAttributes)):this.$router.replace({name:"show-store-product",params:{store_href:this.store._links.showStore,product_href:r._links.showProduct}})),this.isCreatingVariations=!1}).catch(S=>{this.isCreatingVariations=!1,this.setServerFormErrors(S)})},updateProduct(){if(this.form.name.trim()==""){this.setFormError("name","The product name is required"),this.notificationState.addWarningNotification("The product name is required"),window.scrollTo(0,0);return}this.isSubmitting=!0,Pt(this.product._links.updateProduct,this.form).then(r=>{r.status==200&&(this.originalForm=_(this.form),this.showSuccessfulNotification("Product updated")),this.isSubmitting=!1}).catch(r=>{this.isSubmitting=!1,this.setServerFormErrors(r)})},deleteProduct(){this.isDeleting=!0,Tt(this.product._links.deleteProduct).then(r=>{r.status==200&&(this.showSuccessfulNotification("Product deleted"),this.product._attributes.isVariation?this.$router.replace({name:"show-store-product",params:{store_href:this.store._links.showStore,product_href:this.product._links.showParentProduct}}):(this.$router.replace({name:"show-store-products",params:{store_href:this.store._links.showStore}}),window.scrollTo(0,0))),this.isDeleting=!1}).catch(r=>{this.isDeleting=!1,this.setServerFormErrors(r)})}},mounted(){},created(){this.form.storeId=this.store.id,this.originalForm=_(this.form),this.isEditting&&this.getProduct()}},Ce={class:"flex justify-start items-center border-dashed py-6"},Le={key:0,class:"flex items-center space-x-2"},Ee={action:"#",method:"POST"},Fe={class:"flex items-center space-x-2"},De=t("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"})],-1),Ie=t("svg",{class:"w-3 h-3 mr-2",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"})],-1),Me={class:"grid grid-cols-12 gap-4 mb-8"},Be={class:"col-span-8 relative"},Ue={class:"space-y-4 bg-white shadow-lg rounded-lg border p-4 mb-4"},Qe=t("span",{class:"font-bold"},"Free",-1),Oe={class:"flex space-x-4"},We=t("option",{value:"Limited"},"Limited",-1),Ne=t("option",{value:"Unlimited"},"Unlimited",-1),He={class:"flex space-x-4"},ze=t("option",{value:"Limited"},"Limited",-1),Re=t("option",{value:"Unlimited"},"Unlimited",-1),je={class:"space-y-4 bg-white shadow-lg rounded-lg border p-4 mb-4"},qe={key:1},Ze={class:"flex justify-between p-20 border rounded-lg bg-gray-50"},Ke={class:"space-y-4"},Ge={class:"text-2xl font-bold"},Ye={key:0},Je={key:1},Xe={key:2},$e=t("div",null,[t("span",{class:"text-8xl"},"🛍️")],-1),to={class:"absolute top-2 right-2 flex items-center space-x-2"},eo=["onClick"],oo={key:0,"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"},ro={key:1,"stroke-linecap":"round","stroke-linejoin":"round",d:"m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"},so={key:0,class:"space-y-4"},io=["onClick"],ao={class:"text-black"},no={class:"text-xs text-black"},lo={class:"flex space-x-2"},uo={class:"flex justify-end space-x-2"},co=t("span",{class:"ml-1"},"Undo",-1),ho={class:"flex justify-end"},mo={class:"relative"},po={class:"absolute -bottom-12 left-1/2 transform -translate-x-1/2"},fo={key:0,class:"animate-bounce text-4xl"},go={class:"ml-2"},vo={key:1,class:"relative"},yo={class:"absolute -bottom-12 left-1/2 transform -translate-x-1/2"},_o={key:0,class:"animate-bounce text-4xl"},bo=t("svg",{class:"w-3 h-3 mr-2",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"})],-1),wo={class:"col-span-4"},ko={class:"flex flex-col justify-between bg-white shadow-lg rounded-lg border p-4 relative"},Vo={class:"space-y-4"},Po={class:"flex items-center space-x-4"},To=t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"},null,-1),xo=t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"},null,-1),Ao=[To,xo],So=t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"},null,-1),Co=[So],Lo=t("span",{class:"font-bold"},"hidden",-1),Eo={class:"col-span-12"},Fo={key:0,class:"space-y-4 bg-white shadow-lg rounded-lg border p-4"},Do=t("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"})],-1),Io={class:"font-bold text-black"},Mo={class:"flex justify-end"},Bo=t("p",{class:"text-lg font-bold border-b border-dashed pb-4 mb-4"},"Confirm Delete",-1),Uo={class:"mb-8"},Qo={class:"font-bold text-black"};function Oo(r,a,y,S,e,n){const b=p("BackButton"),C=p("LineSkeleton"),F=p("ShineEffect"),w=p("TextHeader"),L=p("MoreInfoPopover"),T=p("PrimaryButton"),s=p("Alert"),x=p("LoadingBackdrop"),V=p("TextInput"),P=p("ToogleSwitch"),M=p("MoneyInput"),G=p("TextareaInput"),B=p("SelectInput"),U=p("NumberInput"),D=p("BadgeIndicator"),Y=p("DeleteButton"),J=p("InputTags"),I=p("InputErrorMessage"),X=p("UndoButton"),$=p("AddButton"),tt=p("ProductVariations"),et=p("ConfirmModal");return o(),i("div",null,[t("div",Ce,[u(b,{class:"w-16 mr-4",action:n.goBack},null,8,["action"]),e.isLoadingProduct?(o(),i("div",Le,[u(F,{class:"flex space-x-2"},{default:h(()=>[u(C,{width:"w-40 mt-2"}),u(C,{width:"w-4 mt-2"})]),_:1})])):(o(),i(v,{key:1},[u(w,null,{default:h(()=>[l(f(n.isCreating?"Add Product":e.form.name),1)]),_:1}),u(L,{class:"ml-2 mt-1",title:"What Is This?",description:"Products are physical or non physical items that customers can place orders and pay for using your preferred payment methods",placement:"top"})],64))]),t("form",Ee,[n.mustCreate&&!(e.form.allowVariations&&!n.hasVariantAttributes)||n.mustSaveChanges?(o(),m(s,{key:0,type:"warning",class:"flex justify-between items-center mb-2"},{default:h(()=>[t("div",Fe,[De,t("span",null,[!e.product&&n.variantAttributesHaveChanged&&n.hasVariantAttributes?(o(),i(v,{key:0},[l("Create your product and variations")],64)):n.variantAttributesHaveChanged&&n.hasVariantAttributes?(o(),i(v,{key:1},[l("Create your product variations")],64)):(o(),i(v,{key:2},[l(f(n.isCreating?"Create your product":"Please save your changes"),1)],64))])]),n.variantAttributesHaveChanged&&n.hasVariantAttributes?(o(),m(T,{key:0,action:()=>e.product?n.createProductVariations():n.createProduct(),loading:e.isCreatingVariations,class:"w-48",type:"primary"},{default:h(()=>[Ie,l(" Create Variations ")]),_:1},8,["action","loading"])):(o(),m(T,{key:1,action:n.isCreating?n.createProduct:n.updateProduct,loading:e.isSubmitting,class:"w-40"},{default:h(()=>[l(f(n.isCreating?"Create Product":"Save Changes"),1)]),_:1},8,["action","loading"]))]),_:1})):d("",!0),t("div",Me,[t("div",Be,[e.isLoadingProduct||e.isSubmitting?(o(),m(x,{key:0,class:"rounded-lg"})):d("",!0),t("div",Ue,[r.getFormError("general")?(o(),m(s,{key:0,type:"warning"},{default:h(()=>[l(f(r.getFormError("general")),1)]),_:1})):d("",!0),u(V,{label:"Name",modelValue:e.form.name,"onUpdate:modelValue":a[0]||(a[0]=c=>e.form.name=c),placeholder:"Standard Ticket",labelPopoverTitle:"What Is This?",errorText:r.getFormError("name"),labelPopoverDescription:"The name of your product e.g Standard Ticket"},null,8,["modelValue","errorText"]),e.form.allowVariations==!1?(o(),i(v,{key:1},[u(P,{size:"md",modelValue:e.form.isFree,"onUpdate:modelValue":a[1]||(a[1]=c=>e.form.isFree=c),labelPopoverTitle:"What Is This?",errorText:r.getFormError("isFree"),labelPopoverDescription:"Turn on if you want your product to be made Free for customers"},{default:h(()=>[l(" Is Free ")]),_:1},8,["modelValue","errorText"]),e.form.isFree?(o(),m(s,{key:0},{default:h(()=>[l(" This product is "),Qe]),_:1})):(o(),i(v,{key:1},[u(M,{label:"Regular Price",modelValue:e.form.unitRegularPrice,"onUpdate:modelValue":a[2]||(a[2]=c=>e.form.unitRegularPrice=c),labelPopoverTitle:"What Is This?",errorText:r.getFormError("unitRegularPrice"),labelPopoverDescription:"Set the regular price of this product (How much the product is sold when its not on sale)"},null,8,["modelValue","errorText"]),u(M,{label:"Sale Price",modelValue:e.form.unitSalePrice,"onUpdate:modelValue":a[3]||(a[3]=c=>e.form.unitSalePrice=c),labelPopoverTitle:"What Is This?",errorText:r.getFormError("unitSalePrice"),labelPopoverDescription:"Set the sale price of this product (if the product is on sale)"},null,8,["modelValue","errorText"])],64)),u(P,{size:"md",modelValue:e.form.showDescription,"onUpdate:modelValue":a[4]||(a[4]=c=>e.form.showDescription=c),labelPopoverTitle:"What Is This?",errorText:r.getFormError("showDescription"),labelPopoverDescription:"Turn on if you want to show the product description to customers"},{default:h(()=>[l(" Show Description ")]),_:1},8,["modelValue","errorText"]),e.form.showDescription?(o(),m(G,{key:2,rows:2,label:"Description",modelValue:e.form.description,"onUpdate:modelValue":a[5]||(a[5]=c=>e.form.description=c),labelPopoverTitle:"What Is This?",errorText:r.getFormError("description"),placeholder:"1 day show with popular artists",labelPopoverDescription:"Sweet and short description of your product e.g 1 day show with popular artists"},null,8,["modelValue","errorText"])):d("",!0),t("div",Oe,[u(B,{label:"Available Stock",modelValue:e.form.stockQuantityType,"onUpdate:modelValue":a[6]||(a[6]=c=>e.form.stockQuantityType=c),labelPopoverTitle:"What Is This?",errorText:r.getFormError("stockQuantityType"),labelPopoverDescription:"Select the available stock e.g Unlimited means that stock is always available while limited means that stock is limited to the quatities specified"},{default:h(()=>[We,Ne]),_:1},8,["modelValue","errorText"]),e.form.stockQuantityType=="Limited"?(o(),m(U,{key:0,modelValue:e.form.stockQuantity,"onUpdate:modelValue":a[7]||(a[7]=c=>e.form.stockQuantity=c),labelPopoverTitle:"What Is This?",label:"Stock Quantity",placeholder:"100",errorText:r.getFormError("stockQuantity"),labelPopoverDescription:"Set the stock quantity e.g 100 means that you only have 100 items of this product"},null,8,["modelValue","errorText"])):d("",!0)]),t("div",He,[u(B,{label:"Quantities Per Order",labelPopoverTitle:"What Is This?",modelValue:e.form.allowedQuantityPerOrder,"onUpdate:modelValue":a[8]||(a[8]=c=>e.form.allowedQuantityPerOrder=c),errorText:r.getFormError("allowedQuantityPerOrder"),labelPopoverDescription:"Select the maximum quantity per order of this product (Used to manage supply and demand) e.g Unlimited means that a customer can specify any quantity while limited means that a customer can only specify up to the maximum quantity that you support"},{default:h(()=>[ze,Re]),_:1},8,["modelValue","errorText"]),e.form.allowedQuantityPerOrder=="Limited"?(o(),m(U,{key:0,placeholder:"10",labelPopoverTitle:"What Is This?",label:"Maximum Quantities Per Order",modelValue:e.form.maximumAllowedQuantityPerOrder,"onUpdate:modelValue":a[9]||(a[9]=c=>e.form.maximumAllowedQuantityPerOrder=c),errorText:r.getFormError("maximumAllowedQuantityPerOrder"),labelPopoverDescription:"Set the maximum quantity per order of this product (Used to manage supply and demand) e.g 10 means that a customer can only specify a quantity of 1 up to 10 when placing an order. They will not be permitted to order anymore than this quantity"},null,8,["modelValue","errorText"])):d("",!0)])],64)):d("",!0)]),t("div",je,[e.form.allowVariations||n.hasOriginalVariantAttributes?(o(),m(P,{key:0,labelPopoverTitle:"What Is This?",modelValue:e.form.allowVariations,"onUpdate:modelValue":a[10]||(a[10]=c=>e.form.allowVariations=c),size:"md",errorText:r.getFormError("allowVariations"),labelPopoverDescription:"Turn on if you want your product to support variations (different versions of itself e.g different sizes, materials, colors, etc)"},{default:h(()=>[l(" Allow variations ")]),_:1},8,["modelValue","errorText"])):d("",!0),n.hasOriginalVariantAttributes?d("",!0):(o(),i("div",qe,[t("div",Ze,[t("div",Ke,[t("h1",Ge,[e.form.allowVariations&&n.hasVariantAttributes?(o(),i(v,{key:0},[l("Create Variations")],64)):e.form.allowVariations?(o(),i(v,{key:1},[l("Add Options")],64)):(o(),i(v,{key:2},[l("Have Options?")],64))]),n.hasVariantAttributes?(o(),i("p",Ye,[l("Click the "),u(D,{type:"primary",text:"Create Variations",showDot:!1}),l(" button to create different variations of your product e.g different sizes, materials, colors, etc")])):e.form.allowVariations?(o(),i("p",Je,[l("Click the "),u(D,{type:"primary",text:"+ Add Option",showDot:!1}),l(" button to add different variations of your product e.g different sizes, materials, colors, etc")])):(o(),i("p",Xe,[l("Turn on "),u(D,{type:"primary",text:"Allow variations",showDot:!1}),l(" if you want your product to support variations (different versions of itself e.g different sizes, materials, colors, etc)")])),e.form.allowVariations?d("",!0):(o(),m(P,{key:3,labelPopoverTitle:"What Is This?",modelValue:e.form.allowVariations,"onUpdate:modelValue":a[11]||(a[11]=c=>e.form.allowVariations=c),size:"md",errorText:r.getFormError("allowVariations"),labelPopoverDescription:"Turn on if you want your product to support variations (different versions of itself e.g different sizes, materials, colors, etc)"},{default:h(()=>[l(" Allow variations ")]),_:1},8,["modelValue","errorText"]))]),$e])])),e.form.allowVariations?(o(),i(v,{key:2},[(o(!0),i(v,null,E(e.form.variantAttributes,(c,g)=>(o(),i("div",{key:g,class:"relative bg-gray-50 p-4 border rounded-lg"},[t("div",to,[(o(),i("svg",{class:"w-6 h-6 cursor-pointer hover:opacity-50",onClick:k=>e.form.variantAttributes[g].isEditable=!e.form.variantAttributes[g].isEditable,xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[e.form.variantAttributes[g].isEditable?(o(),i("path",oo)):(o(),i("path",ro))],8,eo)),u(Y,{action:()=>n.onRemoveVariantAttribute(g),size:"xs",type:"danger"},null,8,["action"])]),c.isEditable?(o(),i("div",so,[u(V,{label:"Name",placeholder:"Size",labelPopoverTitle:"What Is This?",modelValue:e.form.variantAttributes[g].name,"onUpdate:modelValue":k=>e.form.variantAttributes[g].name=k,errorText:r.getFormError("variantAttributes"+g+"name"),labelPopoverDescription:"The variation name e.g Size, Color, Material, etc"},null,8,["modelValue","onUpdate:modelValue","errorText"]),u(V,{label:"Instruction",placeholder:"Select your size",labelPopoverTitle:"What Is This?",modelValue:e.form.variantAttributes[g].instruction,"onUpdate:modelValue":k=>e.form.variantAttributes[g].instruction=k,errorText:r.getFormError("variantAttributes"+g+"instruction"),labelPopoverDescription:"The variation instruction e.g Select your size"},null,8,["modelValue","onUpdate:modelValue","errorText"]),(o(),m(J,{label:"Options",labelPopoverTitle:"What Is This?",key:e.form.variantAttributes[g].values,tags:e.form.variantAttributes[g].values,errorText:r.getFormError("variantAttributes"+g+"value"),onOnTagsChanged:k=>e.form.variantAttributes[g].values=k,labelPopoverDescription:"The variation options e.g Small, Medium, Large, etc"},null,8,["tags","errorText","onOnTagsChanged"]))])):(o(),i("div",{key:1,class:"space-y-2 cursor-pointer",onClick:k=>e.form.variantAttributes[g].isEditable=!0},[t("p",ao,f(e.form.variantAttributes[g].name),1),r.getFormError("variantAttributes"+g+"name")?(o(),m(I,{key:0,errorText:r.getFormError("variantAttributes"+g+"name")},null,8,["errorText"])):d("",!0),t("p",no,f(e.form.variantAttributes[g].instruction),1),r.getFormError("variantAttributes"+g+"name")?(o(),m(I,{key:1,errorText:r.getFormError("variantAttributes"+g+"instruction")},null,8,["errorText"])):d("",!0),t("div",lo,[(o(!0),i(v,null,E(e.form.variantAttributes[g].values,(k,ot)=>(o(),i("span",{key:ot,class:"py-1 px-2 bg-black text-white text-xs rounded-lg"},f(k),1))),128))]),r.getFormError("variantAttributes"+g+"name")?(o(),m(I,{key:2,errorText:r.getFormError("variantAttributes"+g+"value")},null,8,["errorText"])):d("",!0)],8,io))]))),128)),t("div",uo,[n.variantAttributesHaveChanged&&n.hasOriginalVariantAttributes?(o(),m(X,{key:0,action:n.onResetVariantAttributes,size:"xs"},{default:h(()=>[co]),_:1},8,["action"])):d("",!0),t("div",ho,[t("div",mo,[t("div",po,[n.hasVariantAttributes?d("",!0):(o(),i("div",fo,"👆"))]),u($,{action:n.onAddVariantAttribute,class:A(n.hasVariantAttributes?"w-48":"w-40"),size:"xs"},{default:h(()=>[t("span",go,f(n.hasVariantAttributes?"Add Another Option":"Add Option"),1)]),_:1},8,["action","class"])])]),n.variantAttributesHaveChanged&&n.hasVariantAttributes?(o(),i("div",vo,[t("div",yo,[e.isCreatingVariations?d("",!0):(o(),i("div",_o,"👆"))]),u(T,{action:()=>e.product?n.createProductVariations():n.createProduct(),loading:e.isCreatingVariations,class:"w-40",size:"xs",type:"primary"},{default:h(()=>[bo,l(" Create Variations ")]),_:1},8,["action","loading"])])):d("",!0)])],64)):d("",!0)])]),t("div",wo,[t("div",ko,[e.isLoadingProduct||e.isSubmitting?(o(),m(x,{key:0,showSpiningLoader:!1,class:"rounded-lg"})):d("",!0),t("div",Vo,[t("div",Po,[e.form.visible?(o(),i("svg",{key:0,onClick:a[12]||(a[12]=c=>e.form.visible=!e.form.visible),class:"w-6 h-6 cursor-pointer",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},Ao)):(o(),i("svg",{key:1,onClick:a[13]||(a[13]=c=>e.form.visible=!e.form.visible),class:"w-6 h-6 cursor-pointer",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},Co)),u(P,{class:"flex",modelValue:e.form.visible,"onUpdate:modelValue":a[14]||(a[14]=c=>e.form.visible=c),size:"md",labelPopoverTitle:"What Is This?",errorText:r.getFormError("visible"),labelPopoverDescription:"Turn on if you want your product to be visible (Made available to customers)"},{default:h(()=>[l(" Show Product ")]),_:1},8,["modelValue","errorText"])]),e.form.visible?d("",!0):(o(),m(s,{key:0,type:"warning"},{default:h(()=>[l(" This product has been "),Lo,l(" from customers visiting your store ")]),_:1})),u(V,{modelValue:e.form.sku,"onUpdate:modelValue":a[15]||(a[15]=c=>e.form.sku=c),errorText:r.getFormError("sku"),labelPopoverTitle:"What Is This?",label:"SKU",placeholder:"std-ticket",labelPopoverDescription:"The stock keeping unit of this product. Useful for stock management"},null,8,["modelValue","errorText"]),u(V,{modelValue:e.form.barcode,"onUpdate:modelValue":a[16]||(a[16]=c=>e.form.barcode=c),labelPopoverTitle:"What Is This?",errorText:r.getFormError("barcode"),label:"Barcode",placeholder:"123456789",labelPopoverDescription:"The barcode of this product. Useful for stock management"},null,8,["modelValue","errorText"])])])]),t("div",Eo,[e.form.allowVariations&&n.hasOriginalVariantAttributes?(o(),i("div",Fo,[n.variantAttributesHaveChanged?(o(),m(s,{key:0,class:"flex items-start space-x-2"},{default:h(()=>[Do,t("div",null,[l(" The variation options have been changed. You can "),n.hasVariantAttributes?(o(),i(v,{key:0},[l(" either "),t("span",{onClick:a[17]||(a[17]=()=>n.createProductVariations()),class:"font-bold underline cursor-pointer"}," Create New Variations "),l(" or ")],64)):d("",!0),t("span",{onClick:a[18]||(a[18]=(...c)=>n.onResetVariantAttributes&&n.onResetVariantAttributes(...c)),class:"font-bold underline cursor-pointer"}," Undo Changes "),l(" to revert back to the original variations you had before. ")])]),_:1})):e.product?(o(),m(tt,{key:1,product:e.product,isLoadingProduct:e.isLoadingProduct,isCreatingVariations:e.isCreatingVariations},null,8,["product","isLoadingProduct","isCreatingVariations"])):d("",!0)])):d("",!0)])]),e.product?(o(),i("div",{key:1,class:A(["space-y-4 shadow-lg rounded-lg border p-4",e.isLoadingProduct?"bg-gray-50":"border-red-300 bg-red-50"])},[t("p",null,[l("Do you want to permanently delete "),t("span",Io,f(e.form.name),1),l("? Once this product is deleted you will not be able to recover it.")]),t("div",Mo,[u(et,{approveText:"Delete Product",approveAction:n.deleteProduct,isLoading:e.isDeleting},{content:h(()=>[Bo,t("p",Uo,[l("Are you sure you want to permanently delete "),t("span",Qo,f(e.form.name),1),l("?")])]),trigger:h(c=>[u(T,{onClick:c.showModal,loading:e.isDeleting,class:"w-40",type:"danger"},{default:h(()=>[l(" Delete Product ")]),_:2},1032,["onClick","loading"])]),_:1},8,["approveAction","isLoading"])])],2)):d("",!0)])])}const vr=K(Se,[["render",Oo]]);export{vr as default};
