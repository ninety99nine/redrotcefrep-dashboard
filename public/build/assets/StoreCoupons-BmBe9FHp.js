import{F as M}from"./FormMixin-BSf8Kh8A.js";import{U as N,S as E}from"./SpiningLoader-COnJLsaj.js";import{u as R}from"./store-store-CV52Rs-E.js";import{A as F}from"./AddButton-d_CpB1dj.js";import{T as H}from"./TextHeader-C9wn3Won.js";import{C as z}from"./Checkbox-DVNqMNJl.js";import{B as U}from"./BasicTable-W7_55bdS.js";import{C as W}from"./ConfirmModal-CfNuJ83i.js";import{P as j}from"./PrimaryButton-CZPI_FYh.js";import{M as O}from"./MoreInfoPopover-CKuNZTrg.js";import{g as q,d as G}from"./api-repository-LmUqmO20.js";import{T as J}from"./ToogleSwitch-BMGiwfio.js";import{B as K}from"./BadgeIndicator-CL1O2gvW.js";import{N as Q}from"./NoDataPlaceholder-Dpagx3Ki.js";import{c as i,d as e,e as r,w as c,F as g,h,g as m,i as u,r as d,o,l as x,t as _,m as v,n as X}from"./app-piavnWUw.js";import{_ as Y}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./InputErrorMessage-D6kZl79B.js";import"./SearchInput-BLhW_LtD.js";import"./TextInput-DrcRoVTX.js";import"./InputLabel-CtY3wyzz.js";import"./StatusDot-BROLAEOo.js";const Z={mixins:[M,N],components:{AddButton:F,TextHeader:H,BasicTable:U,Checkbox:z,ConfirmModal:W,PrimaryButton:j,SpiningLoader:E,MoreInfoPopover:O,ToogleSwitch:J,BadgeIndicator:K,NoDataPlaceholder:Q},data(){return{coupons:[],pagination:null,searchTerm:null,checkedRowIds:[],showEverything:!1,deletableCoupon:null,isDeletingCouponIds:[],isLoadingCoupons:!1,storeState:R()}},computed:{store(){return this.storeState.store},tableHeaders(){return this.showEverything?["","Name","Description","Instructions","Status","Offers","Created Date",""]:["","Name","Description","Status","Offers",""]},hasSearchTerm(){return this.searchTerm!=null&&this.searchTerm.trim()!=""}},methods:{onView(s){this.$router.push({name:"show-store-coupon",params:{store_href:this.store._links.showStore,coupon_href:s._links.showCoupon}}).then(()=>{window.scrollTo(0,0)})},showDeleteConfirmationModal(s){this.deletableCoupon=s,this.$nextTick(()=>{this.$refs.confirmDeleteButton.$el.click()})},isDeleting(s){return this.isDeletingCouponIds.findIndex(l=>l==s.id)!=-1},onAddCoupon(){this.$router.push({name:"create-store-coupon",params:{store_href:this.store._links.showStore}})},paginate(s){this.getCoupons(s)},search(s){this.searchTerm=s,this.getCoupons()},getCoupons(s=null){this.isLoadingCoupons=!0;const l={};this.hasSearchTerm&&(l.search=this.searchTerm),s=s??this.store._links.showStoreCoupons,q(s,l).then(y=>{y.status==200&&(this.pagination=y.data,this.coupons=this.pagination.data,this.checkedRowIds=this.coupons.map(D=>!1)),this.isLoadingCoupons=!1}).catch(y=>{this.isLoadingCoupons=!1,this.setServerFormErrors(y)})},deleteCoupon(){this.isDeletingCouponIds.push(this.deletableCoupon.id),G(this.deletableCoupon._links.deleteCoupon).then(s=>{this.isDeletingCouponIds.splice(this.isDeletingCouponIds.findIndex(l=>l==this.deletableCoupon.id,1)),s.status==200&&(this.showSuccessfulNotification("Coupon deleted"),this.isDeletingCouponIds.length==0&&this.getCoupons())}).catch(s=>{this.isDeletingCouponIds.splice(this.isDeletingCouponIds.findIndex(l=>l==this.deletableCoupon.id,1)),this.setServerFormErrors(s)})}},mounted(){},created(){this.getCoupons()}},$={class:"flex justify-between items-center border-dashed py-6"},ee={class:"flex items-center"},te=e("span",{class:"mr-2"},"🥰",-1),oe=e("span",{class:"ml-2"},"Add Coupon",-1),se=["onClick"],ne={class:"whitespace-nowrap align-top px-4 py-4"},ie={class:"flex space-x-1 items-center w-40"},ae={class:"align-top px-4 py-4"},re={class:"flex space-x-1 items-center w-80"},le={key:1},ce={key:0,class:"align-top px-4 py-4"},de={class:"w-80 bg-green-50 border border-green-200 rounded-md py-2 px-6 mb-2 shadow-md"},pe={class:"space-y-2 list-disc"},he={class:"whitespace-nowrap align-top px-4 py-4"},ue={class:"flex space-x-1 items-center"},me={class:"whitespace-nowrap align-top px-4 py-4"},_e={class:"flex items-center space-x-2"},fe={class:"whitespace-normal space-y-2 border-t border-dashed pt-2 mt-4"},ge={key:1,class:"whitespace-nowrap align-top px-4 py-4"},ye={class:"flex space-x-1 items-center"},Ce={class:"align-top px-4 py-4 flex items-center space-x-4"},we=["onClick"],xe=e("span",{class:"text-xs ml-2"},"Deleting...",-1),ve=["onClick"],be={key:1,class:"flex justify-between space-x-20 bg-white shadow-lg rounded-lg border p-20"},ke={class:"space-y-4"},De=e("h1",{class:"text-2xl font-bold"},"Add your coupons",-1),Te=e("span",{class:"ml-2"},"Add Coupon",-1),Se=e("div",null,[e("span",{class:"text-8xl"},"🥰")],-1),Ie=e("p",{class:"text-lg font-bold border-b border-dashed pb-4 mb-4"},"Confirm Delete",-1),Be={class:"mb-8"},Ae={class:"font-bold text-black"};function Le(s,l,y,D,a,n){const T=d("TextHeader"),C=d("MoreInfoPopover"),S=d("ToogleSwitch"),k=d("AddButton"),I=d("Checkbox"),B=d("NoDataPlaceholder"),f=d("BadgeIndicator"),A=d("SpiningLoader"),L=d("BasicTable"),P=d("PrimaryButton"),V=d("ConfirmModal");return o(),i("div",null,[e("div",$,[e("div",ee,[r(T,null,{default:c(()=>[te,u(" Coupons")]),_:1}),r(C,{class:"ml-2 mt-1",title:"What Is This?",description:"Coupons are promotional incentives that customers can claim while placing orders, such as discounts or free delivery. This encourages purchases and enhances the customer shopping experience.",placement:"top"})]),(a.pagination??{}).total>0?(o(),i(g,{key:0},[r(S,{modelValue:a.showEverything,"onUpdate:modelValue":l[0]||(l[0]=t=>a.showEverything=t),size:"md",labelPopoverTitle:"What Is This?",labelPopoverDescription:"Turn on if you want to show more information about your coupons"},{default:c(()=>[u(" Show Everything ")]),_:1},8,["modelValue"]),r(k,{action:n.onAddCoupon,class:"w-40"},{default:c(()=>[oe]),_:1},8,["action"])],64)):h("",!0)]),a.isLoadingCoupons||(a.pagination??{}).total>0||n.hasSearchTerm?(o(),m(L,{key:0,pagination:a.pagination,isLoading:a.isLoadingCoupons,onPaginate:n.paginate,onSearch:n.search,onRefresh:n.getCoupons,totalHeaders:n.tableHeaders.length},{head:c(()=>[e("tr",null,[(o(!0),i(g,null,x(n.tableHeaders,(t,w)=>(o(),i("th",{key:w,scope:"col",class:"whitespace-nowrap px-4 py-3"},_(t),1))),128))])]),body:c(()=>[(o(!0),i(g,null,x(a.coupons,(t,w)=>(o(),i("tr",{onClick:v(p=>n.onView(t),["stop"]),key:t.id,class:X(["group cursor-pointer border-b",a.checkedRowIds[w]?"bg-blue-100":"bg-white hover:bg-gray-50"])},[e("td",{onClick:l[1]||(l[1]=v(()=>{},["stop"])),class:"whitespace-nowrap pl-4"},[r(I,{size:"xs",modelValue:a.checkedRowIds[w],"onUpdate:modelValue":p=>a.checkedRowIds[w]=p},null,8,["modelValue","onUpdate:modelValue"])]),e("td",ne,[e("div",ie,[e("span",null,_(t.name),1),r(C,{class:"opacity-0 group-hover:opacity-100",title:t.name,description:t.description,placement:"top"},null,8,["title","description"])])]),e("td",ae,[e("div",re,[t.description==null?(o(),m(B,{key:0})):(o(),i("span",le,_(t.description),1))])]),a.showEverything?(o(),i("td",ce,[e("div",de,[e("ul",pe,[(o(!0),i(g,null,x(t._attributes.instructions,(p,b)=>(o(),i("li",{key:b},_(p),1))),128))])])])):h("",!0),e("td",he,[e("div",ue,[r(f,{type:t.active.status?"success":"warning",text:t.active.name,showDot:!1},null,8,["type","text"]),r(C,{class:"opacity-0 group-hover:opacity-100",description:t.active.description,placement:"top"},null,8,["description"])])]),e("td",me,[e("div",_e,[t.offerDiscount.status?(o(),i(g,{key:0},[t.discountType.toLowerCase()=="fixed"?(o(),m(f,{key:0,type:"success",text:t.discountFixedRate.amountWithCurrency+" Discount",showDot:!1},null,8,["text"])):t.discountType.toLowerCase()=="percentage"?(o(),m(f,{key:1,type:"success",text:t.discountPercentageRate.valueSymbol+" Discount",showDot:!1},null,8,["text"])):h("",!0)],64)):h("",!0),t.offerFreeDelivery.status?(o(),m(f,{key:1,type:"success",text:"Free Delivery",showDot:!1})):h("",!0),r(C,{class:"opacity-0 group-hover:opacity-100",title:"Instructions",placement:"top"},{description:c(()=>[e("div",fe,[(o(!0),i(g,null,x(t._attributes.instructions,(p,b)=>(o(),i("p",{key:b},_(p),1))),128))])]),_:2},1024)])]),a.showEverything?(o(),i("td",ge,[e("div",ye,[e("span",null,_(s.formattedDatetime(t.createdAt)),1),r(C,{class:"opacity-0 group-hover:opacity-100",title:s.formattedRelativeDate(t.createdAt),placement:"top"},null,8,["title"])])])):h("",!0),e("td",Ce,[n.isDeleting(t)?h("",!0):(o(),i("a",{key:0,href:"#",onClick:v(p=>n.onView(t),["stop","prevent"]),class:"font-medium text-blue-600 dark:text-blue-500 hover:underline"},"View",8,we)),n.isDeleting(t)?(o(),m(A,{key:1,type:"danger"},{default:c(()=>[xe]),_:1})):(o(),i("a",{key:2,href:"#",onClick:v(p=>n.showDeleteConfirmationModal(t),["stop","prevent"]),class:"font-medium text-red-600 dark:text-red-500 hover:underline"},"Delete",8,ve))])],10,se))),128))]),_:1},8,["pagination","isLoading","onPaginate","onSearch","onRefresh","totalHeaders"])):(o(),i("div",be,[e("div",ke,[De,e("p",null,[u("Create amazing incentives for your customers, such as offering "),r(f,{type:"primary",text:"discounts",showDot:!1,onClick:n.onAddCoupon,class:"cursor-pointer hover:opacity-80"},null,8,["onClick"]),u(" and "),r(f,{type:"primary",text:"free delivery",showDot:!1,onClick:n.onAddCoupon,class:"cursor-pointer hover:opacity-80"},null,8,["onClick"]),u(", while determining who can claim them and when.")]),r(k,{action:n.onAddCoupon,class:"w-40",size:"sm"},{default:c(()=>[Te]),_:1},8,["action"])]),Se])),a.deletableCoupon?(o(),m(V,{key:2,approveText:"Delete Coupon",approveAction:n.deleteCoupon,isLoading:n.isDeleting(a.deletableCoupon)},{content:c(()=>[Ie,e("p",Be,[u("Are you sure you want to permanently delete "),e("span",Ae,_(a.deletableCoupon.name),1),u("?")])]),trigger:c(t=>[r(P,{ref:"confirmDeleteButton",onClick:t.showModal,class:"hidden",type:"danger"},{default:c(()=>[u(" Delete Coupon ")]),_:2},1032,["onClick"])]),_:1},8,["approveAction","isLoading"])):h("",!0)])}const $e=Y(Z,[["render",Le]]);export{$e as default};
