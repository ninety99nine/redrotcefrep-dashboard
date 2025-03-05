import{P as A}from"./Pill-CNWbwQ3o.js";import{F as R}from"./FormMixin-6JkaGLLr.js";import{B as V}from"./Button-BeSnAT_x.js";import{U as E}from"./form-store-C265_0LO.js";import{u as z}from"./store-store-DI9g0YE3.js";import{B as F}from"./BasicTable-BENOl8OQ.js";import{C as U}from"./Checkbox-CA6moHBM.js";import{P as H}from"./ProfilePhoto-Bg88790_.js";import{C as j}from"./ConfirmModal-l78eHkJU.js";import{P as J}from"./PrimaryButton-BXUz1ZHt.js";import{S as W}from"./SpinningLoader-BdvFuScB.js";import{M as Y}from"./MoreInfoPopover-DuLCv7tU.js";import{g as q,d as G}from"./api-repository--xE_j9dL.js";import{T as K}from"./ToogleSwitch-D6TVHn6r.js";import{N as O}from"./NoDataPlaceholder-BIIoZLQj.js";import{c as r,b as t,e as g,B as Q,w as l,d as m,r as d,o,h as u,F as f,k as _,t as p,m as y,n as X,f as x}from"./app-jXH5QC3l.js";import{_ as Z}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./ShineEffect-DfG5M4Ts.js";import"./cloneDeep-B1YGuKb7.js";import"./SearchInput-BxlZh9-p.js";import"./index-CHIj4cOM.js";import"./TextInput-CYg7QVrw.js";import"./InputErrorMessage-CbGsL3fL.js";import"./SelectInput-D7XUHB9M.js";import"./Drawer-CCLxMHft.js";import"./MoneyInput-CQeRzHMh.js";import"./Datepicker-B1KIg2S4.js";import"./vue-draggable-next.esm-bundler-DxBVIkpx.js";/* empty css                                                                      */const $={mixins:[R,E],components:{Button:V,BasicTable:F,Checkbox:U,ProfilePhoto:H,ConfirmModal:j,PrimaryButton:J,SpinningLoader:W,MoreInfoPopover:Y,ToogleSwitch:K,Pill:A,NoDataPlaceholder:O},data(){return{teamMembers:[],pagination:null,searchTerm:null,checkedRowIds:[],showEverything:!1,deletableTeamMember:null,isDeletingTeamMemberIds:[],isLoadingTeamMembers:!1,storeState:z()}},watch:{isLoadingStore(i){i||this.getTeamMembers()}},computed:{store(){return this.storeState.store},isLoadingStore(){return this.storeState.isLoadingStore},tableHeaders(){return this.showEverything?["","","Name","Email","Mobile","Status","Role","Permissions","Joined Date",""]:["","","Name","Email","Mobile","Status","Role","Total Permissions",""]},hasSearchTerm(){return this.searchTerm!=null&&this.searchTerm.trim()!=""}},methods:{onView(i){this.$router.push({name:"show-store-team-member",params:{store_href:this.store._links.showStore,team_member_href:i._links.showStoreTeamMember}})},showDeleteConfirmationModal(i){this.deletableTeamMember=i,this.deleteTeamMemberModal.showModal()},isDeleting(i){return this.isDeletingTeamMemberIds.findIndex(e=>e==i.id)!=-1},onInviteTeamMember(){this.isDeletingTeamMemberIds.length||this.$router.push({name:"invite-store-team-member",params:{store_href:this.store._links.showStore}})},paginate(i){this.getTeamMembers(i)},search(i){this.searchTerm=i,this.getTeamMembers()},getTeamMembers(i=null){this.isLoadingTeamMembers=!0;const e={};this.hasSearchTerm&&(e.search=this.searchTerm),i=i??this.store._links.showStoreTeamMembers,q(i,e).then(c=>{c.status==200&&(this.pagination=c.data,this.teamMembers=this.pagination.data,this.checkedRowIds=this.teamMembers.map(k=>!1)),this.isLoadingTeamMembers=!1}).catch(c=>{this.isLoadingTeamMembers=!1,this.setServerFormErrors(c)})},deleteTeamMember(){this.isDeletingTeamMemberIds.push(this.deletableTeamMember.id);var i={mobileNumbers:[(this.deletableTeamMember.mobileNumber||{}).international||this.deletableTeamMember._relationships.userStoreAssociation.mobileNumber.international]};G(this.store._links.removeStoreTeamMembers,i).then(e=>{this.isDeletingTeamMemberIds.splice(this.isDeletingTeamMemberIds.findIndex(c=>c==this.deletableTeamMember.id,1)),e.status==200&&(e.data.deleted?(this.showSuccessfulNotification(e.data.message),this.isDeletingTeamMemberIds.length==0&&this.getTeamMembers()):(this.setFormError("general",e.data.message),this.showUnsuccessfulNotification(e.data.message)))}).catch(e=>{this.isDeletingTeamMemberIds.splice(this.isDeletingTeamMemberIds.findIndex(c=>c==this.deletableTeamMember.id,1)),this.setServerFormErrors(e)})}},mounted(){this.deleteTeamMemberModal=this.$refs.deleteTeamMemberModal},created(){this.isLoadingTeamMembers=!0}},ee={class:"pt-24 pb-80 px-8 relative"},te={class:"relative"},se={class:"flex justify-center my-4"},oe=["onClick"],ie={class:"w-20 align-top"},re={class:"whitespace-nowrap px-4 py-4 align-top"},ae={class:"px-4 py-4 align-top"},ne={key:1},le={class:"px-4 py-4 align-top"},me={key:1},de={class:"whitespace-nowrap px-4 py-4 align-top"},pe={class:"whitespace-nowrap px-4 py-4 align-top"},ce={key:0,class:"align-top px-4 py-4"},he={class:"w-80 bg-green-50 border border-green-200 rounded-md py-2 px-6 mb-2 shadow-md"},ue={class:"space-y-2 list-disc text-xs"},be={key:1,class:"whitespace-nowrap px-4 py-4 align-top"},ge={class:"flex items-center space-x-2"},fe={class:"whitespace-normal space-y-2 border-t border-dashed pt-2 mt-4"},_e={key:2,class:"whitespace-nowrap px-4 py-4 align-top"},ye={class:"flex space-x-1 items-center"},Te={class:"px-4 py-4 space-x-4 align-top"},we=["onClick"],xe=["onClick"],Me={key:1,class:"flex justify-center"},ve={class:"animated-border-blue w-96 bg-white py-4 px-4 shadow-sm space-y-4 rounded-xl"},Se={class:"flex justify-end"},ke={key:0,class:"mb-8"},Pe={class:"font-bold text-black"};function De(i,e,c,k,a,n){const P=d("ToogleSwitch"),M=d("Button"),D=d("Checkbox"),I=d("ProfilePhoto"),v=d("NoDataPlaceholder"),T=d("Pill"),S=d("MoreInfoPopover"),C=d("SpinningLoader"),L=d("BasicTable"),B=d("PrimaryButton"),N=d("ConfirmModal");return o(),r("div",ee,[e[13]||(e[13]=t("img",{src:"/images/clouds.png",class:"absolute top-0"},null,-1)),t("div",te,[e[8]||(e[8]=t("div",{class:"flex flex-col items-center mb-8"},[t("h1",{class:"space-x-2 text-xl text-gray-700 font-semibold bg-white rounded-full py-2 px-8 mb-4"},[t("span",null,"💪"),t("span",null,"Team Members")]),t("img",{src:"/images/store-rooftop.png",class:"w-96"})],-1)),a.isLoadingTeamMembers||(a.pagination??{}).total>0||n.hasSearchTerm?(o(),g(L,{key:0,pagination:a.pagination,isLoading:a.isLoadingTeamMembers,onPaginate:n.paginate,onSearch:n.search,onRefresh:n.getTeamMembers,totalHeaders:n.tableHeaders.length},Q({afterRefreshButton:l(()=>[m(M,{action:n.onInviteTeamMember,type:"primary",size:"sm",icon:"add"},{default:l(()=>e[3]||(e[3]=[t("span",null,"Invite Team",-1)])),_:1},8,["action"])]),head:l(()=>[t("tr",null,[(o(!0),r(f,null,_(n.tableHeaders,(s,b)=>(o(),r("th",{key:b,scope:"col",class:"whitespace-nowrap px-4 py-3"},p(s),1))),128))])]),body:l(()=>[(o(!0),r(f,null,_(a.teamMembers,(s,b)=>(o(),r("tr",{onClick:y(h=>n.onView(s),["stop"]),key:s.id,class:X(["group cursor-pointer border-b",a.checkedRowIds[b]?"bg-blue-100":"bg-white hover:bg-gray-50"])},[t("td",{onClick:e[1]||(e[1]=y(()=>{},["stop"])),class:"whitespace-nowrap pl-4 align-top"},[m(D,{size:"xs",class:"mt-2",modelValue:a.checkedRowIds[b],"onUpdate:modelValue":h=>a.checkedRowIds[b]=h},null,8,["modelValue","onUpdate:modelValue"])]),t("td",ie,[m(I,{user:s,canUpload:!1,width:"w-10",height:"h-10"},null,8,["user"])]),t("td",re,[t("span",null,p(s._attributes.name),1)]),t("td",ae,[s.email==null?(o(),g(v,{key:0})):(o(),r("span",ne,p(s.email),1))]),t("td",le,[s.mobileNumber==null?(o(),g(v,{key:0})):(o(),r("span",me,p((s.mobileNumber||{}).national||s._relationships.userStoreAssociation.mobileNumber.national),1))]),t("td",de,[m(T,{type:s._attributes.userStoreAssociation.teamMemberStatus.toLowerCase()=="invited"?"warning":"light",size:"xs"},{default:l(()=>[u(p(s._attributes.userStoreAssociation.teamMemberStatus),1)]),_:2},1032,["type"])]),t("td",pe,[m(T,{type:s._attributes.userStoreAssociation.teamMemberRole.toLowerCase()=="creator"?"success":"light",size:"xs",showDot:s._attributes.userStoreAssociation.teamMemberRole.toLowerCase()=="creator"},{default:l(()=>[u(p(s._attributes.userStoreAssociation.teamMemberRole),1)]),_:2},1032,["type","showDot"])]),a.showEverything?(o(),r("td",ce,[t("div",he,[t("ul",ue,[(o(!0),r(f,null,_(s._attributes.userStoreAssociation.teamMemberPermissions,(h,w)=>(o(),r("li",{key:w},p(h.name),1))),128))])])])):(o(),r("td",be,[t("div",ge,[m(T,{type:"light",size:"xs"},{default:l(()=>[u(p(s._attributes.userStoreAssociation.teamMemberPermissions.length),1)]),_:2},1024),m(S,{class:"opacity-0 group-hover:opacity-100",title:"Permissions",placement:"top"},{description:l(()=>[t("div",fe,[(o(!0),r(f,null,_(s._attributes.userStoreAssociation.teamMemberPermissions,(h,w)=>(o(),r("p",{key:w},p(h.name),1))),128))])]),_:2},1024)])])),a.showEverything?(o(),r("td",_e,[t("div",ye,[t("span",null,p(i.formattedDatetime(s.createdAt)),1),m(S,{class:"opacity-0 group-hover:opacity-100",title:i.formattedRelativeDate(s.createdAt),placement:"top"},null,8,["title"])])])):x("",!0),t("td",Te,[n.isDeleting(s)?x("",!0):(o(),r("span",{key:0,onClick:y(h=>n.onView(s),["stop","prevent"]),class:"cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"},"View",8,we)),n.isDeleting(s)?(o(),g(C,{key:1,type:"danger"},{default:l(()=>e[4]||(e[4]=[t("span",{class:"text-xs ml-2"},"Deleting...",-1)])),_:1})):(o(),r("span",{key:2,onClick:y(h=>n.showDeleteConfirmationModal(s),["stop","prevent"]),class:"cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"},"Remove",8,xe))])],10,oe))),128))]),_:2},[(a.pagination??{}).total>0?{name:"header",fn:l(()=>[t("div",se,[m(P,{modelValue:a.showEverything,"onUpdate:modelValue":e[0]||(e[0]=s=>a.showEverything=s),size:"md",labelPopoverTitle:"What Is This?",labelPopoverDescription:"Turn on if you want to show more information about your products"},{default:l(()=>e[2]||(e[2]=[u(" Show Everything ")])),_:1},8,["modelValue"])])]),key:"0"}:void 0]),1032,["pagination","isLoading","onPaginate","onSearch","onRefresh","totalHeaders"])):(o(),r("div",Me,[t("div",ve,[e[6]||(e[6]=t("h1",{class:"text-xl font-bold"}," Build Your Team ",-1)),e[7]||(e[7]=t("p",{class:"text-sm text-gray-500"}," Invite others to help manage your store. Collaborate by adding team members to help you grow your business. ",-1)),t("div",Se,[m(M,{action:n.onInviteTeamMember,type:"primary",size:"sm",icon:"add"},{default:l(()=>e[5]||(e[5]=[t("span",null,"Invite Team",-1)])),_:1},8,["action"])])])]))]),m(N,{ref:"deleteTeamMemberModal",approveText:"Remove Team Member",approveAction:n.deleteTeamMember,isLoading:n.isDeleting(a.deletableTeamMember)},{content:l(()=>[e[11]||(e[11]=t("p",{class:"text-lg font-bold border-b border-dashed pb-4 mb-4"},"Confirm Delete",-1)),a.deletableTeamMember?(o(),r("p",ke,[e[9]||(e[9]=u("Are you sure you want to remove ")),t("span",Pe,p(a.deletableTeamMember._attributes.name),1),e[10]||(e[10]=u("?"))])):x("",!0)]),trigger:l(s=>[m(B,{ref:"confirmDeleteButton",action:s.showModal,class:"hidden",type:"danger"},{default:l(()=>e[12]||(e[12]=[u(" Remove Team Member ")])),_:2},1032,["action"])]),_:1},8,["approveAction","isLoading"])])}const it=Z($,[["render",De]]);export{it as default};
