import{F as R}from"./FormMixin-BSf8Kh8A.js";import{U as V,S as N}from"./SpiningLoader-COnJLsaj.js";import{u as E}from"./store-store-CV52Rs-E.js";import{T as H}from"./TextHeader-C9wn3Won.js";import{A as F}from"./AddButton-d_CpB1dj.js";import{B as U}from"./BasicTable-W7_55bdS.js";import{C as z}from"./Checkbox-DVNqMNJl.js";import{P as j}from"./ProfilePhoto-BO-ZuCta.js";import{C as W}from"./ConfirmModal-CfNuJ83i.js";import{P as J}from"./PrimaryButton-CZPI_FYh.js";import{M as Y}from"./MoreInfoPopover-CKuNZTrg.js";import{g as q,d as G}from"./api-repository-LmUqmO20.js";import{T as K}from"./ToogleSwitch-BMGiwfio.js";import{B as O}from"./BadgeIndicator-CL1O2gvW.js";import{c as a,d as e,e as l,w as m,F as b,h as g,g as M,r as c,o as s,i as _,l as f,t as p,m as T,n as Q}from"./app-piavnWUw.js";import{_ as X}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./SearchInput-BLhW_LtD.js";import"./TextInput-DrcRoVTX.js";import"./InputLabel-CtY3wyzz.js";import"./InputErrorMessage-D6kZl79B.js";import"./StatusDot-BROLAEOo.js";const Z={mixins:[R,V],components:{TextHeader:H,AddButton:F,BasicTable:U,Checkbox:z,ProfilePhoto:j,ConfirmModal:W,PrimaryButton:J,SpiningLoader:N,MoreInfoPopover:Y,ToogleSwitch:K,BadgeIndicator:O},data(){return{teamMembers:[],pagination:null,searchTerm:null,checkedRowIds:[],showEverything:!1,deletableTeamMember:null,isDeletingTeamMemberIds:[],isLoadingTeamMembers:!1,storeState:E()}},computed:{store(){return this.storeState.store},tableHeaders(){return this.showEverything?["","","Name","Mobile","Status","Role","Permissions","Joined Date",""]:["","","Name","Mobile","Status","Role","Total Permissions",""]},hasSearchTerm(){return this.searchTerm!=null&&this.searchTerm.trim()!=""}},methods:{onView(o){this.$router.push({name:"show-store-team-member",params:{store_href:this.store._links.showStore,team_member_href:o._links.showStoreTeamMember}}).then(()=>{window.scrollTo(0,0)})},showDeleteConfirmationModal(o){this.deletableTeamMember=o,this.$nextTick(()=>{this.$refs.confirmDeleteButton.$el.click()})},isDeleting(o){return this.isDeletingTeamMemberIds.findIndex(n=>n==o.id)!=-1},onInviteTeamMember(){this.$router.push({name:"invite-store-team-member",params:{store_href:this.store._links.showStore}})},paginate(o){this.getTeamMembers(o)},search(o){this.searchTerm=o,this.getTeamMembers()},getTeamMembers(o=null){this.isLoadingTeamMembers=!0;const n={};this.hasSearchTerm&&(n.search=this.searchTerm),o=o??this.store._links.showStoreTeamMembers,q(o,n).then(d=>{d.status==200&&(this.pagination=d.data,this.teamMembers=this.pagination.data,this.checkedRowIds=this.teamMembers.map(k=>!1)),this.isLoadingTeamMembers=!1}).catch(d=>{this.isLoadingTeamMembers=!1,this.setServerFormErrors(d)})},deleteTeamMember(){this.isDeletingTeamMemberIds.push(this.deletableTeamMember.id);var o={mobileNumbers:[(this.deletableTeamMember.mobileNumber||{}).international||this.deletableTeamMember._relationships.userStoreAssociation.mobileNumber.international]};G(this.store._links.removeStoreTeamMembers,o).then(n=>{this.isDeletingTeamMemberIds.splice(this.isDeletingTeamMemberIds.findIndex(d=>d==this.deletableTeamMember.id,1)),n.status==200&&(this.showSuccessfulNotification(n.data.message),this.isDeletingTeamMemberIds.length==0&&this.getTeamMembers())}).catch(n=>{this.isDeletingTeamMemberIds.splice(this.isDeletingTeamMemberIds.findIndex(d=>d==this.deletableTeamMember.id,1)),this.setServerFormErrors(n)})}},mounted(){},created(){this.getTeamMembers()}},$={class:"flex justify-between items-center border-dashed py-6"},ee={class:"flex items-center"},te=e("span",{class:"mr-2"},"💪",-1),se=e("span",{class:"ml-2"},"Add Team Member",-1),oe=["onClick"],ie={class:"w-20 align-top"},ae={class:"whitespace-nowrap px-4 py-4 align-top"},re={class:"px-4 py-4 align-top"},ne={class:"whitespace-nowrap px-4 py-4 align-top"},le={class:"whitespace-nowrap px-4 py-4 align-top"},me={key:0,class:"px-4 py-4 align-top"},ce={class:"space-y-2 list-disc"},de={key:1,class:"whitespace-nowrap px-4 py-4 align-top"},he={class:"flex items-center space-x-2"},pe={class:"whitespace-normal space-y-2 border-t border-dashed pt-2 mt-4"},ue={key:2,class:"whitespace-nowrap px-4 py-4 align-top"},be={class:"flex space-x-1 items-center"},_e={class:"px-4 py-4 space-x-4 align-top"},ge=["onClick"],fe=e("span",{class:"text-xs ml-2"},"Deleting...",-1),Te=["onClick"],we={key:1,class:"flex justify-between space-x-20 bg-white shadow-lg rounded-lg border p-20"},ye={class:"space-y-4"},xe=e("h1",{class:"text-2xl font-bold"},"Build Your Team",-1),Me=e("p",null,"Invite others to help manage your store. Collaborate by adding team members to help you grow your business.",-1),ve=e("span",{class:"ml-2"},"Add Team Member",-1),ke=e("div",null,[e("span",{class:"text-8xl"},"💪")],-1),Se=e("p",{class:"text-lg font-bold border-b border-dashed pb-4 mb-4"},"Confirm Delete",-1),Ce={class:"mb-8"},Ie={class:"font-bold text-black"};function De(o,n,d,k,i,r){const S=c("TextHeader"),w=c("MoreInfoPopover"),C=c("ToogleSwitch"),v=c("AddButton"),I=c("Checkbox"),D=c("ProfilePhoto"),y=c("BadgeIndicator"),P=c("SpiningLoader"),A=c("BasicTable"),B=c("PrimaryButton"),L=c("ConfirmModal");return s(),a("div",null,[e("div",$,[e("div",ee,[l(S,null,{default:m(()=>[te,_(" Team Members")]),_:1}),l(w,{class:"ml-2 mt-1",title:"What Is This?",description:"Team members are people who help you manage your store and grow your business",placement:"top"})]),(i.pagination??{}).total>0?(s(),a(b,{key:0},[l(C,{modelValue:i.showEverything,"onUpdate:modelValue":n[0]||(n[0]=t=>i.showEverything=t),size:"md",labelPopoverTitle:"What Is This?",labelPopoverDescription:"Turn on if you want to show more information about your team members"},{default:m(()=>[_(" Show Everything ")]),_:1},8,["modelValue"]),l(v,{action:r.onInviteTeamMember,class:"w-60"},{default:m(()=>[se]),_:1},8,["action"])],64)):g("",!0)]),i.isLoadingTeamMembers||(i.pagination??{}).total>0||r.hasSearchTerm?(s(),M(A,{key:0,pagination:i.pagination,isLoading:i.isLoadingTeamMembers,onPaginate:r.paginate,onSearch:r.search,onRefresh:r.getTeamMembers,totalHeaders:r.tableHeaders.length},{head:m(()=>[e("tr",null,[(s(!0),a(b,null,f(r.tableHeaders,(t,u)=>(s(),a("th",{key:u,scope:"col",class:"whitespace-nowrap px-4 py-3"},p(t),1))),128))])]),body:m(()=>[(s(!0),a(b,null,f(i.teamMembers,(t,u)=>(s(),a("tr",{onClick:T(h=>r.onView(t),["stop"]),key:t.id,class:Q(["group cursor-pointer border-b",i.checkedRowIds[u]?"bg-blue-100":"bg-white hover:bg-gray-50"])},[e("td",{onClick:n[1]||(n[1]=T(()=>{},["stop"])),class:"whitespace-nowrap pl-4 align-top"},[l(I,{size:"xs",class:"mt-2",modelValue:i.checkedRowIds[u],"onUpdate:modelValue":h=>i.checkedRowIds[u]=h},null,8,["modelValue","onUpdate:modelValue"])]),e("td",ie,[l(D,{user:t,canUpload:!1,width:"w-10",height:"h-10"},null,8,["user"])]),e("td",ae,[e("span",null,p(t._attributes.name),1)]),e("td",re,[e("span",null,p((t.mobileNumber||{}).national||t._relationships.userStoreAssociation.mobileNumber.national),1)]),e("td",ne,[l(y,{type:t._attributes.userStoreAssociation.teamMemberStatus.toLowerCase()=="invited"?"warning":"info",text:t._attributes.userStoreAssociation.teamMemberStatus,showDot:!1},null,8,["type","text"])]),e("td",le,[l(y,{type:t._attributes.userStoreAssociation.teamMemberRole.toLowerCase()=="creator"?"success":"info",text:t._attributes.userStoreAssociation.teamMemberRole,showDot:t._attributes.userStoreAssociation.teamMemberRole.toLowerCase()=="creator"},null,8,["type","text","showDot"])]),i.showEverything?(s(),a("td",me,[e("div",null,[e("ul",ce,[(s(!0),a(b,null,f(t._attributes.userStoreAssociation.teamMemberPermissions,(h,x)=>(s(),a("li",{key:x},p(h.name),1))),128))])])])):(s(),a("td",de,[e("div",he,[l(y,{type:"info",text:t._attributes.userStoreAssociation.teamMemberPermissions.length,showDot:!1},null,8,["text"]),l(w,{class:"opacity-0 group-hover:opacity-100",title:"Permissions",placement:"top"},{description:m(()=>[e("div",pe,[(s(!0),a(b,null,f(t._attributes.userStoreAssociation.teamMemberPermissions,(h,x)=>(s(),a("p",{key:x},p(h.name),1))),128))])]),_:2},1024)])])),i.showEverything?(s(),a("td",ue,[e("div",be,[e("span",null,p(o.formattedDatetime(t.createdAt)),1),l(w,{class:"opacity-0 group-hover:opacity-100",title:o.formattedRelativeDate(t.createdAt),placement:"top"},null,8,["title"])])])):g("",!0),e("td",_e,[r.isDeleting(t)?g("",!0):(s(),a("a",{key:0,href:"#",onClick:T(h=>r.onView(t),["stop","prevent"]),class:"font-medium text-blue-600 dark:text-blue-500 hover:underline"},"View",8,ge)),r.isDeleting(t)?(s(),M(P,{key:1,type:"danger"},{default:m(()=>[fe]),_:1})):(s(),a("a",{key:2,href:"#",onClick:T(h=>r.showDeleteConfirmationModal(t),["stop","prevent"]),class:"font-medium text-red-600 dark:text-red-500 hover:underline"},"Remove",8,Te))])],10,oe))),128))]),_:1},8,["pagination","isLoading","onPaginate","onSearch","onRefresh","totalHeaders"])):(s(),a("div",we,[e("div",ye,[xe,Me,l(v,{action:r.onInviteTeamMember,class:"w-60",size:"sm"},{default:m(()=>[ve]),_:1},8,["action"])]),ke])),i.deletableTeamMember?(s(),M(L,{key:2,approveText:"Remove Team Member",approveAction:r.deleteTeamMember,isLoading:r.isDeleting(i.deletableTeamMember)},{content:m(()=>[Se,e("p",Ce,[_("Are you sure you want to remove "),e("span",Ie,p(i.deletableTeamMember._attributes.name),1),_("?")])]),trigger:m(t=>[l(B,{ref:"confirmDeleteButton",onClick:t.showModal,class:"hidden",type:"danger"},{default:m(()=>[_(" Remove Team Member ")]),_:2},1032,["onClick"])]),_:1},8,["approveAction","isLoading"])):g("",!0)])}const Xe=X(Z,[["render",De]]);export{Xe as default};
