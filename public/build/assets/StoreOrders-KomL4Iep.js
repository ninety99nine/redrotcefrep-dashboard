import{F as V}from"./FormMixin-CYiBG1ca.js";import{U as L,S as M}from"./SpiningLoader-CsPmXxst.js";import{u as W}from"./store-store-C2_eLuQh.js";import{T as F}from"./TextHeader-Cdgnrugi.js";import{A as R}from"./AddButton-YPx_iiuG.js";import{B as H}from"./BasicTable-BSovyWYs.js";import{C as U}from"./Checkbox-C6zZavZf.js";import{O as z,a as G}from"./OrderPaymentStatus-Px7T2FMM.js";import{C as j}from"./ConfirmModal-DrJlS0Sa.js";import{P as q}from"./PrimaryButton-DULDYb5e.js";import{M as Y}from"./MoreInfoPopover-gLIaCQca.js";import{g as J,d as K}from"./api-repository-C4cDgx_E.js";import{T as Q}from"./ToogleSwitch-CDDQu6G0.js";import{N as X}from"./NoDataPlaceholder-C-ZzFZvH.js";import{O as Z}from"./OrderCollectionStatus-BzW9-rFb.js";import{c as a,d as e,e as n,w as p,F as x,g as h,f,r as d,o as r,i as u,l as v,t as l,p as w,q as $}from"./app-Kf0mCOXy.js";import{_ as ee}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./SearchInput-Csxtp266.js";import"./TextInput-_gM6fl6u.js";import"./InputLabel-B11U1-WT.js";import"./InputErrorMessage-B1NpEu7u.js";import"./BadgeIndicator-BRfv_GU4.js";import"./StatusDot-B0b3cfnt.js";const te={mixins:[V,L],components:{TextHeader:F,AddButton:R,BasicTable:H,Checkbox:U,OrderStatus:z,ConfirmModal:j,SpiningLoader:M,PrimaryButton:q,MoreInfoPopover:Y,ToogleSwitch:Q,OrderPaymentStatus:G,NoDataPlaceholder:X,OrderCollectionStatus:Z},data(){return{orders:[],pagination:null,searchTerm:null,checkedRowIds:[],showEverything:!1,deletableOrder:null,isDeletingOrderIds:[],isLoadingOrders:!1,storeState:W()}},computed:{store(){return this.storeState.store},tableHeaders(){return this.showEverything?["","Name","Customer","Summary","status","Payment Status","Collection Status","Grand Total","Paid","Pending","Outstanding","Special Note","Created Date",""]:["","Name","Customer","Summary","status","Grand Total","Created Date",""]},hasSearchTerm(){return this.searchTerm!=null&&this.searchTerm.trim()!=""}},methods:{onView(s){this.$router.push({name:"show-store-order",params:{store_href:this.store._links.showStore,order_href:s._links.showOrder}}).then(()=>{window.scrollTo(0,0)})},showDeleteConfirmationModal(s){this.deletableOrder=s,this.$nextTick(()=>{this.$refs.confirmDeleteButton.$el.click()})},isDeleting(s){return this.isDeletingOrderIds.findIndex(c=>c==s.id)!=-1},onAddOrder(){this.$router.push({name:"create-store-order",params:{store_href:this.store._links.showStore}})},paginate(s){this.getOrders(s)},search(s){this.searchTerm=s,this.getOrders()},getOrders(s=null){this.isLoadingOrders=!0;const c={association:"teamMember",_relationships:"cart"};this.hasSearchTerm&&(c.search=this.searchTerm),s=s??this.store._links.showStoreOrders,J(s,c).then(_=>{_.status==200&&(this.pagination=_.data,this.orders=this.pagination.data,this.checkedRowIds=this.orders.map(O=>!1)),this.isLoadingOrders=!1}).catch(_=>{this.isLoadingOrders=!1,this.setServerFormErrors(_)})},deleteOrder(){this.isDeletingOrderIds.push(this.deletableOrder.id),K(this.deletableOrder._links.deleteOrder).then(s=>{this.isDeletingOrderIds.splice(this.isDeletingOrderIds.findIndex(c=>c==this.deletableOrder.id,1)),s.status==200&&(s.data.deleted?(this.showSuccessfulNotification("Order deleted"),this.isDeletingOrderIds.length==0&&this.getOrders()):(this.setFormError("general",s.data.message),this.showUnsuccessfulNotification(s.data.message)))}).catch(s=>{this.isDeletingOrderIds.splice(this.isDeletingOrderIds.findIndex(c=>c==this.deletableOrder.id,1)),this.setServerFormErrors(s)})}},mounted(){},created(){this.getOrders()}},se={class:"flex justify-between items-center border-dashed py-6"},oe={class:"flex items-center"},re=e("span",{class:"mr-2"},"🎁",-1),ae=e("span",{class:"ml-2"},"Add Order",-1),ne=["onClick"],ie={class:"whitespace-nowrap px-4 py-4"},le={class:"flex space-x-1 items-center"},ce={class:"px-4 py-4"},de={class:"w-40"},pe={class:"px-4 py-4"},he={class:"w-60"},ue={class:"whitespace-nowrap px-4 py-4"},me={key:0,class:"whitespace-nowrap px-4 py-4"},_e={key:1,class:"whitespace-nowrap px-4 py-4"},ge={class:"whitespace-nowrap px-4 py-4"},ye={class:"flex space-x-1 items-center"},fe={class:"font-bold"},we=e("hr",null,null,-1),xe={class:"text-black"},be={class:"text-black"},ve={class:"text-black"},Oe=e("hr",null,null,-1),ke={class:"text-black"},Se={class:"font-bold"},Ce={key:2,class:"whitespace-nowrap px-4 py-4"},Te={class:"flex space-x-1 items-center"},De={key:3,class:"whitespace-nowrap px-4 py-4"},Pe={class:"flex space-x-1 items-center"},Ie={key:4,class:"whitespace-nowrap px-4 py-4"},Be={class:"flex space-x-1 items-center"},Ae={key:5,class:"whitespace-nowrap px-4 py-4"},Ne={class:"flex space-x-1 items-center"},Ee={key:1},Ve={class:"whitespace-nowrap px-4 py-4"},Le={class:"flex space-x-1 items-center"},Me={class:"px-4 py-4 flex items-center space-x-4"},We=["onClick"],Fe=e("span",{class:"text-xs ml-2"},"Deleting...",-1),Re=["onClick"],He={key:1,class:"flex justify-between space-x-20 bg-white shadow-lg rounded-lg border p-20"},Ue={class:"space-y-4"},ze=e("h1",{class:"text-2xl font-bold"},"Ready For Your First Sale?",-1),Ge=e("p",null,"Your orders will appear here once customers start shopping. Start promoting your store to attract buyers and generate sales. Promote your store on as many platforms as possible.",-1),je=e("span",{class:"ml-2"},"Add Order",-1),qe=e("div",null,[e("span",{class:"text-8xl"},"🎁")],-1),Ye=e("p",{class:"text-lg font-bold border-b border-dashed pb-4 mb-4"},"Confirm Delete",-1),Je={class:"mb-8"},Ke={class:"font-bold text-black"};function Qe(s,c,_,O,o,i){const k=d("TextHeader"),m=d("MoreInfoPopover"),S=d("ToogleSwitch"),b=d("AddButton"),C=d("Checkbox"),T=d("OrderStatus"),D=d("OrderPaymentStatus"),P=d("OrderCollectionStatus"),I=d("NoDataPlaceholder"),B=d("SpiningLoader"),A=d("BasicTable"),N=d("PrimaryButton"),E=d("ConfirmModal");return r(),a("div",null,[e("div",se,[e("div",oe,[n(k,null,{default:p(()=>[re,u(" Orders")]),_:1}),n(m,{class:"ml-2 mt-1",title:"What Is This?",description:"Orders are requests placed by customers to purchase products or services from your store.",placement:"top"})]),(o.pagination??{}).total>0?(r(),a(x,{key:0},[n(S,{modelValue:o.showEverything,"onUpdate:modelValue":c[0]||(c[0]=t=>o.showEverything=t),size:"md",labelPopoverTitle:"What Is This?",labelPopoverDescription:"Turn on if you want to show more information about your orders"},{default:p(()=>[u(" Show Everything ")]),_:1},8,["modelValue"]),n(b,{action:i.onAddOrder,class:"w-40"},{default:p(()=>[ae]),_:1},8,["action"])],64)):h("",!0)]),o.isLoadingOrders||(o.pagination??{}).total>0||i.hasSearchTerm?(r(),f(A,{key:0,pagination:o.pagination,isLoading:o.isLoadingOrders,onPaginate:i.paginate,onSearch:i.search,onRefresh:i.getOrders,totalHeaders:i.tableHeaders.length},{head:p(()=>[e("tr",null,[(r(!0),a(x,null,v(i.tableHeaders,(t,g)=>(r(),a("th",{key:g,scope:"col",class:"whitespace-nowrap px-4 py-3"},l(t),1))),128))])]),body:p(()=>[(r(!0),a(x,null,v(o.orders,(t,g)=>(r(),a("tr",{onClick:w(y=>i.onView(t),["stop"]),key:t.id,class:$(["group cursor-pointer border-b",o.checkedRowIds[g]?"bg-blue-100":"bg-white hover:bg-gray-50"])},[e("td",{onClick:c[1]||(c[1]=w(()=>{},["stop"])),class:"whitespace-nowrap pl-4"},[n(C,{size:"xs",modelValue:o.checkedRowIds[g],"onUpdate:modelValue":y=>o.checkedRowIds[g]=y},null,8,["modelValue","onUpdate:modelValue"])]),e("td",ie,[e("div",le,[e("span",null,"#"+l(t._attributes.number),1),n(m,{class:"opacity-0 group-hover:opacity-100",title:"#"+t._attributes.number,description:t.summary,placement:"top"},null,8,["title","description"])])]),e("td",ce,[e("div",de,[e("span",null,l(t._attributes.customerDisplayName),1)])]),e("td",pe,[e("div",he,[e("span",null,l(t.summary),1)])]),e("td",ue,[n(T,{order:t,moreInfoPopoverClasses:"opacity-0 group-hover:opacity-100"},null,8,["order"])]),o.showEverything?(r(),a("td",me,[n(D,{order:t,moreInfoPopoverClasses:"opacity-0 group-hover:opacity-100"},null,8,["order"])])):h("",!0),o.showEverything?(r(),a("td",_e,[n(P,{order:t,moreInfoPopoverClasses:"opacity-0 group-hover:opacity-100"},null,8,["order"])])):h("",!0),e("td",ge,[e("div",ye,[e("span",fe,l(t.grandTotal.amountWithCurrency),1),n(m,{class:"opacity-0 group-hover:opacity-100",title:"Cost Breakdown",placement:"top"},{description:p(()=>[we,e("p",null,[u("Subtotal: "),e("span",xe,l(t._relationships.cart.subTotal.amountWithCurrency),1)]),e("p",null,[u("Sale Discount: "),e("span",be,l(t._relationships.cart.saleDiscountTotal.amountWithCurrency),1)]),e("p",null,[u("Coupon Discount: "),e("span",ve,l(t._relationships.cart.couponDiscountTotal.amountWithCurrency),1)]),Oe,e("p",ke,[u("Grand Total: "),e("span",Se,l(t.grandTotal.amountWithCurrency),1)])]),_:2},1024)])]),o.showEverything?(r(),a("td",Ce,[e("div",Te,[e("span",null,l(t.paidTotal.amountWithCurrency),1),n(m,{class:"opacity-0 group-hover:opacity-100",title:"Paid: "+t.paidPercentage.valueSymbol,placement:"top"},null,8,["title"])])])):h("",!0),o.showEverything?(r(),a("td",De,[e("div",Pe,[e("span",null,l(t.pendingTotal.amountWithCurrency),1),n(m,{class:"opacity-0 group-hover:opacity-100",title:"Pending: "+t.pendingPercentage.valueSymbol,placement:"top"},null,8,["title"])])])):h("",!0),o.showEverything?(r(),a("td",Ie,[e("div",Be,[e("span",null,l(t.outstandingTotal.amountWithCurrency),1),n(m,{class:"opacity-0 group-hover:opacity-100",title:"Outstanding: "+t.outstandingPercentage.valueSymbol,placement:"top"},null,8,["title"])])])):h("",!0),o.showEverything?(r(),a("td",Ae,[e("div",Ne,[t.specialNote?(r(),f(I,{key:0})):(r(),a("span",Ee,l(t.specialNote),1))])])):h("",!0),e("td",Ve,[e("div",Le,[e("span",null,l(s.formattedDatetime(t.createdAt)),1),n(m,{class:"opacity-0 group-hover:opacity-100",title:s.formattedRelativeDate(t.createdAt),placement:"top"},null,8,["title"])])]),e("td",Me,[i.isDeleting(t)?h("",!0):(r(),a("a",{key:0,href:"#",onClick:w(y=>i.onView(t),["stop","prevent"]),class:"font-medium text-blue-600 dark:text-blue-500 hover:underline"},"View",8,We)),i.isDeleting(t)?(r(),f(B,{key:1,type:"danger"},{default:p(()=>[Fe]),_:1})):(r(),a("a",{key:2,href:"#",onClick:w(y=>i.showDeleteConfirmationModal(t),["stop","prevent"]),class:"font-medium text-red-600 dark:text-red-500 hover:underline"},"Delete",8,Re))])],10,ne))),128))]),_:1},8,["pagination","isLoading","onPaginate","onSearch","onRefresh","totalHeaders"])):(r(),a("div",He,[e("div",Ue,[ze,Ge,n(b,{action:i.onAddOrder,class:"w-40",size:"sm"},{default:p(()=>[je]),_:1},8,["action"])]),qe])),o.deletableOrder?(r(),f(E,{key:2,approveText:"Delete Order",approveAction:i.deleteOrder,isLoading:i.isDeleting(o.deletableOrder)},{content:p(()=>[Ye,e("p",Je,[u("Are you sure you want to permanently delete "),e("span",Ke,l(o.deletableOrder.name),1),u("?")])]),trigger:p(t=>[n(N,{ref:"confirmDeleteButton",onClick:t.showModal,class:"hidden",type:"danger"},{default:p(()=>[u(" Delete Order ")]),_:2},1032,["onClick"])]),_:1},8,["approveAction","isLoading"])):h("",!0)])}const xt=ee(te,[["render",Qe]]);export{xt as default};
