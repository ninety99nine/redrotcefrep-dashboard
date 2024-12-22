import{c,i as B}from"./cloneDeep-Cj89CU0d.js";import{A}from"./Alert-BHnqwbfj.js";import{F as E}from"./FormMixin-CYiBG1ca.js";import{U as D,S as V}from"./SpiningLoader-CsPmXxst.js";import{a as H,c as n,d as t,e as a,w as l,F as p,f as h,g as f,t as g,l as O,i as u,r as m,o as r}from"./app-Kf0mCOXy.js";import{u as j}from"./store-store-C2_eLuQh.js";import{T as R}from"./TextInput-_gM6fl6u.js";import{I as U}from"./InputTags-Se_SBSRe.js";import{T as W}from"./TextHeader-Cdgnrugi.js";import{C as Z}from"./Checkbox-C6zZavZf.js";import{B as q}from"./BackButton-CDDlBeJF.js";import{N as G,B as Y}from"./BackdropLoader-BVS-Fv1Y.js";import{S as z}from"./SelectInput-BklpiaOv.js";import{C as J}from"./ConfirmModal-DrJlS0Sa.js";import{S as K,L as Q}from"./LineSkeleton-Ckj2823e.js";import{P as X}from"./PrimaryButton-DULDYb5e.js";import{S as $}from"./SelectInputTags-BRWqtVq0.js";import{M as ee}from"./MoreInfoPopover-gLIaCQca.js";import{M as se}from"./MobileNumberInput-E_RreW9n.js";import{B as te}from"./BadgeIndicator-BRfv_GU4.js";import{F as ie}from"./FormErrorMessages-Bdf-el1D.js";import{g as w,p as re,a as oe,d as ae}from"./api-repository-C4cDgx_E.js";import{_ as me}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./InputLabel-B11U1-WT.js";import"./InputErrorMessage-B1NpEu7u.js";import"./vue3-tags-input.esm-BEOsPq0u.js";import"./StatusDot-B0b3cfnt.js";const ne={mixins:[D,E],components:{Alert:A,TextInput:R,TextHeader:W,Checkbox:Z,InputTags:U,BackButton:q,NumberInput:G,SelectInput:z,ConfirmModal:J,ShineEffect:K,PrimaryButton:X,LineSkeleton:Q,SpiningLoader:V,SelectInputTags:$,MoreInfoPopover:ee,BackdropLoader:Y,MobileNumberInput:se,BadgeIndicator:te,FormErrorMessages:ie},data(){return{form:{hasFullPermissions:!1,mobileNumbers:["+26772000001"],permissions:[]},teamMember:null,isDeleting:!1,originalForm:null,isSubmitting:!1,authState:H(),isLoadingTeamMember:!1,storeState:j(),selectedAllPermissions:!1,teamMemberPermissionOptions:[],isLoadingTeamMemberPermissions:!1,isLoadingAvailableTeamMemberPermissions:!1}},watch:{"$route.params.team_member_href"(s,e){window.scrollTo(0,0),this.getTeamMember()}},computed:{store(){return this.storeState.store},isInviting(){return this.$route.name==="invite-store-team-member"},isEditting(){return this.$route.name==="show-store-team-member"},teamMemberRole(){return this.teamMember==null?null:this.teamMember._attributes.userStoreAssociation.teamMemberRole},teamMemberStatus(){return this.teamMember==null?null:this.teamMember._attributes.userStoreAssociation.teamMemberStatus},hasPermissions(){return this.totalPermissions>0},totalPermissions(){return this.form.permissions.length},isMe(){return(this.teamMember||{}).id==this.authState.user.id},isCreator(){return this.teamMemberRole.toLowerCase()=="creator"},isInvited(){return this.teamMemberStatus.toLowerCase()=="invited"},hasFullPermissions(){return this.form.hasFullPermissions},hasProvidedMobileNumber(){return this.form.mobileNumbers.length>0&&this.form.mobileNumbers.some(s=>s.trim()!=="")},formHasChanged(){var s=c(this.form),e=c(this.originalForm);return!B(s,e)},mustSaveChanges(){return this.isEditting&&this.formHasChanged&&this.hasProvidedMobileNumber&&(this.hasFullPermissions||this.hasPermissions)&&!this.isLoadingTeamMemberPermissions&&!this.isLoadingAvailableTeamMemberPermissions&&!this.isSubmitting},mustInvite(){return this.isInviting&&this.formHasChanged&&this.hasProvidedMobileNumber&&(this.hasFullPermissions||this.hasPermissions)&&!this.isLoadingTeamMemberPermissions&&!this.isLoadingAvailableTeamMemberPermissions&&!this.isSubmitting}},methods:{goBack(){this.$router.replace({name:"show-store-team-members",params:{store_href:this.store._links.showStore}})},setTeamMemberFields(){this.form.mobileNumbers[0]=(this.teamMember.mobileNumber||{}).international||this.teamMember._relationships.userStoreAssociation.mobileNumber.international,this.originalForm=c(this.form)},getTeamMember(){this.isLoadingTeamMember=!0,w(this.$route.params.team_member_href).then(s=>{s.status==200&&(this.teamMember=s.data.user,this.setTeamMemberFields(),this.showStoreTeamMemberPermissions()),this.isLoadingTeamMember=!1}).catch(s=>{this.isLoadingTeamMember=!1,this.setServerFormErrors(s)})},showStoreTeamMemberPermissions(){this.isLoadingTeamMemberPermissions=!0,w(this.teamMember._links.showStoreTeamMemberPermissions).then(s=>{s.status==200&&(this.form.hasFullPermissions=s.data.hasFullPermissions,this.form.permissions=s.data.permissions.map(e=>({text:e.name,grant:e.grant})),this.originalForm=c(this.form)),this.isLoadingTeamMemberPermissions=!1}).catch(s=>{this.isLoadingTeamMemberPermissions=!1,this.setServerFormErrors(s)})},showTeamMemberPermissionOptions(){this.isLoadingAvailableTeamMemberPermissions=!0,w(this.store._links.showTeamMemberPermissionOptions).then(s=>{s.status==200&&(this.teamMemberPermissionOptions=s.data.map(e=>({text:e.name,grant:e.grant}))),this.isLoadingAvailableTeamMemberPermissions=!1}).catch(s=>{this.isLoadingAvailableTeamMemberPermissions=!1,this.setServerFormErrors(s)})},inviteTeamMember(){this.isSubmitting=!0;var s=c(this.form);this.form.hasFullPermissions?s.permissions=["*"]:s.permissions=s.permissions.map(e=>e.grant),re(this.store._links.inviteStoreTeamMembers,s).then(e=>{e.status==200&&(this.showSuccessfulNotification(e.data.message),this.$router.push({name:"show-store-team-members",params:{store_href:this.store._links.showStore}}),window.scrollTo(0,0)),this.isSubmitting=!1}).catch(e=>{this.isSubmitting=!1,this.setServerFormErrors(e)})},updateTeamMember(){if(!this.isMe){this.isSubmitting=!0;var s=c(this.form);this.form.hasFullPermissions?s.permissions=["*"]:s.permissions=s.permissions.map(e=>e.grant),oe(this.teamMember._links.updateStoreTeamMemberPermissions,s).then(e=>{e.status==200&&(e.data.updated?(this.originalForm=c(this.form),this.showSuccessfulNotification("Team member updated"),this.form.hasFullPermissions&&this.showStoreTeamMemberPermissions()):(this.form=c(this.originalForm),this.setFormError("general",e.data.message),this.showUnsuccessfulNotification(e.data.message))),this.isSubmitting=!1}).catch(e=>{this.isSubmitting=!1,this.setServerFormErrors(e)})}},deleteTeamMember(){this.isDeleting=!0;var s={mobileNumbers:this.form.mobileNumbers};ae(this.store._links.removeStoreTeamMembers,s).then(e=>{e.status==200&&(e.data.deleted?(this.showSuccessfulNotification(e.data.message),this.$router.push({name:"show-store-team-members",params:{store_href:this.store._links.showStore}}),window.scrollTo(0,0)):(this.setFormError("general",e.data.message),this.showUnsuccessfulNotification(e.data.message))),this.isDeleting=!1}).catch(e=>{this.isDeleting=!1,this.setServerFormErrors(e)})}},created(){this.originalForm=c(this.form),this.isEditting&&this.getTeamMember(),this.showTeamMemberPermissionOptions()}},le={class:"flex justify-start items-center border-dashed py-6"},he={key:0,class:"flex items-center space-x-2"},ue={class:"flex items-center space-x-2"},de={class:"relative",action:"#",method:"POST"},ce={class:"flex items-center space-x-2"},be=t("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"})],-1),fe={class:"grid grid-cols-12 gap-4 mb-8"},ge={class:"col-span-8 relative"},pe={class:"space-y-4 bg-white shadow-lg rounded-lg border p-4 mb-4"},_e=t("p",{class:"font-bold text-sm"},"Invitation",-1),ve=t("p",{class:"text-sm text-gray-400"},"Enter the mobile number of the person you want to invite e.g +26772000001",-1),Me={key:2},we={class:"flex items-center space-x-2"},Te=t("span",null,"Mobile Number: ",-1),Pe={key:1,class:"font-bold"},Se={class:"bg-white shadow-lg rounded-lg border p-4"},xe={key:1,class:"space-y-2"},ke=t("svg",{class:"w-4 h-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"})],-1),ye=t("span",null,"You cannot change your own permissions",-1),Fe=t("span",{class:"font-bold"},"Full Permissions",-1),Le={class:"col-span-4"},Ie={class:"flex flex-col justify-between bg-white shadow-lg rounded-lg border p-4 relative"},Ne={class:"flex items-center space-x-4 mb-2"},Ce=t("div",{class:"flex items-center space-x-2"},[t("svg",{class:"w-4 h-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"})]),t("p",{class:"font-bold text-lg"},"Permissions")],-1),Be=t("p",{class:"text-sm text-gray-400 border-b border-dashed pb-2 mb-4"},"See permissions granted",-1),Ae={key:2,class:"space-y-2"},Ee={class:"text-xs"},De={key:1,class:"space-y-4 shadow-lg rounded-lg border border-red-300 bg-red-50 p-4"},Ve={class:"font-bold text-black"},He={class:"flex justify-end"},Oe=t("p",{class:"text-lg font-bold border-b border-dashed pb-4 mb-4"},"Confirm Delete",-1),je={class:"mb-8"},Re={class:"font-bold text-black"};function Ue(s,e,We,Ze,i,o){const S=m("BackButton"),b=m("LineSkeleton"),_=m("ShineEffect"),x=m("TextHeader"),M=m("BadgeIndicator"),k=m("MoreInfoPopover"),T=m("PrimaryButton"),v=m("Alert"),y=m("FormErrorMessages"),P=m("BackdropLoader"),F=m("MobileNumberInput"),L=m("Checkbox"),I=m("SelectInputTags"),N=m("ConfirmModal");return r(),n("div",null,[t("div",le,[a(S,{class:"w-16 mr-4",action:o.goBack},null,8,["action"]),i.isLoadingTeamMember?(r(),n("div",he,[a(_,{class:"flex space-x-2"},{default:l(()=>[a(b,{width:"w-20 mt-2"}),a(b,{width:"w-16 mt-2"}),a(b,{width:"w-4 mt-2"})]),_:1})])):(r(),n(p,{key:1},[t("div",ue,[a(x,null,{default:l(()=>[u(g(o.isInviting?"Add Team Member":i.teamMember._attributes.name),1)]),_:1}),o.isEditting?(r(),h(M,{key:0,type:o.isCreator?"success":"info",text:o.teamMemberRole,showDot:o.isCreator},null,8,["type","text","showDot"])):f("",!0),o.isEditting?(r(),h(M,{key:1,type:o.isInvited?"warning":"info",text:o.teamMemberStatus,showDot:o.isCreator},null,8,["type","text","showDot"])):f("",!0)]),a(k,{class:"ml-2",title:"What Is This?",description:"Team members are people who help you manage your store and grow your business",placement:"top"})],64))]),t("form",de,[o.mustInvite||o.mustSaveChanges?(r(),h(v,{key:0,type:"warning",class:"flex justify-between items-center mb-2"},{default:l(()=>[t("div",ce,[be,t("span",null,g(o.isInviting?"Invite your team member":"Please save your changes"),1)]),a(T,{action:o.isInviting?o.inviteTeamMember:o.updateTeamMember,loading:i.isSubmitting,class:"w-40"},{default:l(()=>[u(g(o.isInviting?"Invite":"Save Changes"),1)]),_:1},8,["action","loading"])]),_:1})):f("",!0),a(y),t("div",fe,[t("div",ge,[i.isLoadingTeamMember||i.isSubmitting?(r(),h(P,{key:0,class:"rounded-lg"})):f("",!0),t("div",pe,[o.isInviting?(r(),n(p,{key:0},[_e,ve],64)):f("",!0),o.isInviting?(r(),h(F,{key:1,modelValue:i.form.mobileNumbers[0],"onUpdate:modelValue":e[0]||(e[0]=d=>i.form.mobileNumbers[0]=d),labelPopoverTitle:"What Is This?",errorText:s.getFormError("mobileNumbers0"),labelPopoverDescription:"The mobile number that will be used by customers as the primary contact number of your store"},null,8,["modelValue","errorText"])):(r(),n("div",Me,[t("div",we,[Te,i.isLoadingTeamMember?(r(),h(_,{key:0},{default:l(()=>[a(b,{width:"w-24"})]),_:1})):(r(),n("span",Pe,g((i.teamMember.mobileNumber||{}).national||i.teamMember._relationships.userStoreAssociation.mobileNumber.national),1))])]))]),t("div",Se,[i.isLoadingTeamMember||i.isLoadingTeamMemberPermissions||i.isLoadingAvailableTeamMemberPermissions?(r(),h(_,{key:0,class:"space-y-4"},{default:l(()=>[a(b,{width:"w-24"}),a(b,{width:"w-60"})]),_:1})):(r(),n("div",xe,[o.isMe?(r(),n(p,{key:0},[i.form.hasFullPermissions?(r(),h(v,{key:0,class:"flex items-center space-x-2"},{default:l(()=>[ke,ye]),_:1})):f("",!0)],64)):(r(),n(p,{key:1},[a(L,{label:"Grant Full Permissions",modelValue:i.form.hasFullPermissions,"onUpdate:modelValue":e[1]||(e[1]=d=>i.form.hasFullPermissions=d),labelPopoverTitle:"What Is This?",labelPopoverDescription:"The team member will be granted all available permissions when this is checked"},null,8,["modelValue"]),i.form.hasFullPermissions?(r(),h(v,{key:0},{default:l(()=>[u(" This team member has been granted "),Fe,u(" to manage this store ")]),_:1})):(r(),h(I,{key:1,class:"w-full",label:"Permissions",tags:i.form.permissions,labelPopoverTitle:"What Is This?",errorText:s.getFormError("permissions"),selectableTags:i.teamMemberPermissionOptions,onOnTagsChanged:e[2]||(e[2]=d=>i.form.permissions=d),labelPopoverDescription:"Set the permissions for your team member"},null,8,["tags","errorText","selectableTags"]))],64))]))])]),t("div",Le,[t("div",Ie,[i.isLoadingTeamMember||i.isSubmitting?(r(),h(P,{key:0,showSpiningLoader:!1,class:"rounded-lg"})):f("",!0),t("div",Ne,[Ce,a(M,{type:"primary",text:i.form.hasFullPermissions?"All":o.totalPermissions,showDot:!1},null,8,["text"])]),Be,i.isLoadingTeamMember||i.isLoadingTeamMemberPermissions?(r(),h(_,{key:1,class:"space-y-4"},{default:l(()=>[a(b,{width:"w-32"}),a(b,{width:"w-60"})]),_:1})):o.hasPermissions?(r(),n("div",Ae,[(r(!0),n(p,null,O(i.form.permissions,(d,C)=>(r(),n("div",{key:C,class:"flex space-x-2 px-2 border-l-4 border-green-300"},[t("p",Ee,g(d.text),1)]))),128))])):(r(),h(v,{key:3},{default:l(()=>[u(" No permissions granted ")]),_:1}))])])]),i.teamMember&&!o.isCreator?(r(),n("div",De,[t("p",null,[u("Do you want to remove "),t("span",Ve,g(i.teamMember._attributes.name),1),u("?")]),t("div",He,[a(N,{approveText:"Remove Team Member",approveAction:o.deleteTeamMember,isLoading:i.isDeleting},{content:l(()=>[Oe,t("p",je,[u("Are you sure you want to remove "),t("span",Re,g(i.teamMember._attributes.name),1),u("?")])]),trigger:l(d=>[a(T,{onClick:d.showModal,loading:i.isDeleting,class:"w-60",type:"danger"},{default:l(()=>[u(" Remove Team Member ")]),_:2},1032,["onClick","loading"])]),_:1},8,["approveAction","isLoading"])])])):f("",!0)])])}const _s=me(ne,[["render",Ue]]);export{_s as default};
