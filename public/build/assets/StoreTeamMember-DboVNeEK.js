import{c as d,i as C}from"./cloneDeep-BGE7Bmb-.js";import{P as A}from"./Pill-CD_3pjy5.js";import{A as B}from"./Alert-DEJps0rh.js";import{F as E}from"./FormMixin-D44Bj-el.js";import{U as D}from"./form-store-B_ZbhArT.js";import{a as V,c as a,b as t,d as m,F as f,w as b,e as l,f as c,t as g,k as H,h,r as n,o as r}from"./app-DEkFCb1u.js";import{u as O}from"./store-store-CxinBL3L.js";import{T as j}from"./TextInput-CwB-G_mS.js";import{I as R}from"./InputTags-Cvrz7IG0.js";import{T as U}from"./TextHeader-DRGBY_Ui.js";import{C as W}from"./Checkbox-BOFyOk4h.js";import{B as Z}from"./BackButton-DMqpm81M.js";import{N as q}from"./NumberInput-DlCNpvmN.js";import{S as G}from"./SelectInput-DXfLro8i.js";import{C as Y}from"./ConfirmModal-CKYpWGJT.js";import{P as z}from"./PrimaryButton-Cwf__Lsv.js";import{L as J}from"./LineSkeleton-DFWRI7XC.js";import{B as K}from"./BackdropLoader-jo1Que9S.js";import{S as Q}from"./SpinningLoader-BnJGVf_7.js";import{S as X}from"./SelectInputTags-DgViRfHa.js";import{M as $}from"./MoreInfoPopover-CrxGv8yo.js";import{M as ee}from"./MobileNumberInput-DB74IXOZ.js";import{F as se}from"./FormErrorMessages-T64AgTW8.js";import{g as w,p as te,a as ie,d as re}from"./api-repository-CIJPUswr.js";import{_ as oe}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./InputErrorMessage-lzTzq-uZ.js";import"./vue3-tags-input.esm-DL6THQw8.js";import"./Button-CTlUNYLQ.js";import"./ShineEffect-CWpUJr6E.js";/* empty css                                                                      */const me={mixins:[D,E],components:{Pill:A,Alert:B,TextInput:j,TextHeader:U,Checkbox:W,InputTags:R,BackButton:Z,NumberInput:q,SelectInput:G,ConfirmModal:Y,PrimaryButton:z,LineSkeleton:J,SpinningLoader:Q,SelectInputTags:X,MoreInfoPopover:$,BackdropLoader:K,MobileNumberInput:ee,FormErrorMessages:se},data(){return{form:{hasFullPermissions:!1,mobileNumbers:["+26772000001"],permissions:[]},teamMember:null,isDeleting:!1,originalForm:null,isSubmitting:!1,authState:V(),isLoadingTeamMember:!1,storeState:O(),selectedAllPermissions:!1,teamMemberPermissionOptions:[],isLoadingTeamMemberPermissions:!1,isLoadingAvailableTeamMemberPermissions:!1}},watch:{"$route.params.team_member_href"(s,e){window.scrollTo(0,0),this.getTeamMember()}},computed:{store(){return this.storeState.store},isInviting(){return this.$route.name==="invite-store-team-member"},isEditting(){return this.$route.name==="show-store-team-member"},teamMemberRole(){return this.teamMember==null?null:this.teamMember._attributes.userStoreAssociation.teamMemberRole},teamMemberStatus(){return this.teamMember==null?null:this.teamMember._attributes.userStoreAssociation.teamMemberStatus},hasPermissions(){return this.totalPermissions>0},totalPermissions(){return this.form.permissions.length},isMe(){return(this.teamMember||{}).id==this.authState.user.id},isCreator(){return this.teamMemberRole.toLowerCase()=="creator"},isInvited(){return this.teamMemberStatus.toLowerCase()=="invited"},hasFullPermissions(){return this.form.hasFullPermissions},hasProvidedMobileNumber(){return this.form.mobileNumbers.length>0&&this.form.mobileNumbers.some(s=>s.trim()!=="")},formHasChanged(){var s=d(this.form),e=d(this.originalForm);return!C(s,e)},mustSaveChanges(){return this.isEditting&&this.formHasChanged&&this.hasProvidedMobileNumber&&(this.hasFullPermissions||this.hasPermissions)&&!this.isLoadingTeamMemberPermissions&&!this.isLoadingAvailableTeamMemberPermissions&&!this.isSubmitting},mustInvite(){return this.isInviting&&this.formHasChanged&&this.hasProvidedMobileNumber&&(this.hasFullPermissions||this.hasPermissions)&&!this.isLoadingTeamMemberPermissions&&!this.isLoadingAvailableTeamMemberPermissions&&!this.isSubmitting}},methods:{goBack(){this.$router.replace({name:"show-store-team-members",params:{store_href:this.store._links.showStore}})},setTeamMemberFields(){this.form.mobileNumbers[0]=(this.teamMember.mobileNumber||{}).international||this.teamMember._relationships.userStoreAssociation.mobileNumber.international,this.originalForm=d(this.form)},getTeamMember(){this.isLoadingTeamMember=!0,w(this.$route.params.team_member_href).then(s=>{s.status==200&&(this.teamMember=s.data.user,this.setTeamMemberFields(),this.showStoreTeamMemberPermissions()),this.isLoadingTeamMember=!1}).catch(s=>{this.isLoadingTeamMember=!1,this.formState.setServerFormErrors(s)})},showStoreTeamMemberPermissions(){this.isLoadingTeamMemberPermissions=!0,w(this.teamMember._links.showStoreTeamMemberPermissions).then(s=>{s.status==200&&(this.form.hasFullPermissions=s.data.hasFullPermissions,this.form.permissions=s.data.permissions.map(e=>({text:e.name,grant:e.grant})),this.originalForm=d(this.form)),this.isLoadingTeamMemberPermissions=!1}).catch(s=>{this.isLoadingTeamMemberPermissions=!1,this.formState.setServerFormErrors(s)})},showTeamMemberPermissionOptions(){this.isLoadingAvailableTeamMemberPermissions=!0,w(this.store._links.showTeamMemberPermissionOptions).then(s=>{s.status==200&&(this.teamMemberPermissionOptions=s.data.map(e=>({text:e.name,grant:e.grant}))),this.isLoadingAvailableTeamMemberPermissions=!1}).catch(s=>{this.isLoadingAvailableTeamMemberPermissions=!1,this.formState.setServerFormErrors(s)})},inviteTeamMember(){this.isSubmitting=!0;var s=d(this.form);this.form.hasFullPermissions?s.permissions=["*"]:s.permissions=s.permissions.map(e=>e.grant),te(this.store._links.inviteStoreTeamMembers,s).then(e=>{e.status==200&&(this.notificationState.showSuccessNotification(e.data.message),this.$router.push({name:"show-store-team-members",params:{store_href:this.store._links.showStore}}),window.scrollTo(0,0)),this.isSubmitting=!1}).catch(e=>{this.isSubmitting=!1,this.formState.setServerFormErrors(e)})},updateTeamMember(){if(!this.isMe){this.isSubmitting=!0;var s=d(this.form);this.form.hasFullPermissions?s.permissions=["*"]:s.permissions=s.permissions.map(e=>e.grant),ie(this.teamMember._links.updateStoreTeamMemberPermissions,s).then(e=>{e.status==200&&(e.data.updated?(this.originalForm=d(this.form),this.notificationState.showSuccessNotification("Team member updated"),this.form.hasFullPermissions&&this.showStoreTeamMemberPermissions()):(this.form=d(this.originalForm),this.formState.setFormError("general",e.data.message),this.notificationState.showWarningNotification(e.data.message))),this.isSubmitting=!1}).catch(e=>{this.isSubmitting=!1,this.formState.setServerFormErrors(e)})}},deleteTeamMember(){this.isDeleting=!0;var s={mobileNumbers:this.form.mobileNumbers};re(this.store._links.removeStoreTeamMembers,s).then(e=>{e.status==200&&(e.data.deleted?(this.notificationState.showSuccessNotification(e.data.message),this.$router.push({name:"show-store-team-members",params:{store_href:this.store._links.showStore}}),window.scrollTo(0,0)):(this.formState.setFormError("general",e.data.message),this.notificationState.showWarningNotification(e.data.message))),this.isDeleting=!1}).catch(e=>{this.isDeleting=!1,this.formState.setServerFormErrors(e)})}},created(){this.originalForm=d(this.form),this.isEditting&&this.getTeamMember(),this.showTeamMemberPermissionOptions()}},ae={class:"flex justify-start items-center border-dashed py-6"},ne={key:0,class:"flex items-center space-x-2"},le={class:"flex space-x-2"},he={class:"flex items-center space-x-2"},ue={class:"relative",action:"#",method:"POST"},de={class:"flex items-center space-x-2"},be={class:"grid grid-cols-12 gap-4 mb-8"},pe={class:"col-span-8 relative"},ce={class:"space-y-4 bg-white shadow-lg rounded-lg border p-4 mb-4"},ge={key:2},fe={class:"flex items-center space-x-2"},ve={key:1,class:"font-bold"},Me={class:"bg-white shadow-lg rounded-lg border p-4"},we={key:0,class:"space-y-4"},Te={key:1,class:"space-y-2"},_e={class:"col-span-4"},Pe={class:"flex flex-col justify-between bg-white shadow-lg rounded-lg border p-4 relative"},xe={class:"flex items-center space-x-4 mb-2"},Se={key:1,class:"space-y-4"},ke={key:2,class:"space-y-2"},ye={class:"text-xs"},Fe={key:1,class:"space-y-4 shadow-lg rounded-lg border border-red-300 bg-red-50 p-4"},Le={class:"font-bold text-black"},Ie={class:"flex justify-end"},Ne={class:"mb-8"},Ce={class:"font-bold text-black"};function Ae(s,e,Be,Ee,i,o){const P=n("BackButton"),p=n("LineSkeleton"),x=n("TextHeader"),M=n("Pill"),S=n("MoreInfoPopover"),T=n("PrimaryButton"),v=n("Alert"),k=n("FormErrorMessages"),_=n("BackdropLoader"),y=n("MobileNumberInput"),F=n("Checkbox"),L=n("SelectInputTags"),I=n("ConfirmModal");return r(),a("div",null,[t("div",ae,[m(P,{class:"w-16 mr-4",action:o.goBack},null,8,["action"]),i.isLoadingTeamMember?(r(),a("div",ne,[t("div",le,[m(p,{width:"w-20",shine:!0}),m(p,{width:"w-16",shine:!0}),m(p,{width:"w-4",shine:!0})])])):(r(),a(f,{key:1},[t("div",he,[m(x,null,{default:b(()=>[h(g(o.isInviting?"Add Team Member":i.teamMember._attributes.name),1)]),_:1}),o.isEditting?(r(),l(M,{key:0,type:o.isCreator?"success":"info",text:o.teamMemberRole,showDot:o.isCreator},null,8,["type","text","showDot"])):c("",!0),o.isEditting?(r(),l(M,{key:1,type:o.isInvited?"warning":"info",text:o.teamMemberStatus,showDot:o.isCreator},null,8,["type","text","showDot"])):c("",!0)]),m(S,{class:"ml-2",title:"What Is This?",description:"Team members are people who help you manage your store and grow your business",placement:"top"})],64))]),t("form",ue,[o.mustInvite||o.mustSaveChanges?(r(),l(v,{key:0,type:"warning",class:"flex justify-between items-center mb-2"},{default:b(()=>[t("div",de,[e[3]||(e[3]=t("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"})],-1)),t("span",null,g(o.isInviting?"Invite your team member":"Please save your changes"),1)]),m(T,{action:o.isInviting?o.inviteTeamMember:o.updateTeamMember,loading:i.isSubmitting,class:"w-40"},{default:b(()=>[h(g(o.isInviting?"Invite":"Save Changes"),1)]),_:1},8,["action","loading"])]),_:1})):c("",!0),m(k),t("div",be,[t("div",pe,[i.isLoadingTeamMember||i.isSubmitting?(r(),l(_,{key:0,class:"rounded-lg"})):c("",!0),t("div",ce,[o.isInviting?(r(),a(f,{key:0},[e[4]||(e[4]=t("p",{class:"font-bold text-sm"},"Invitation",-1)),e[5]||(e[5]=t("p",{class:"text-sm text-gray-400"},"Enter the mobile number of the person you want to invite e.g +26772000001",-1))],64)):c("",!0),o.isInviting?(r(),l(y,{key:1,modelValue:i.form.mobileNumbers[0],"onUpdate:modelValue":e[0]||(e[0]=u=>i.form.mobileNumbers[0]=u),labelPopoverTitle:"What Is This?",errorText:s.getFormError("mobileNumbers0"),labelPopoverDescription:"The mobile number that will be used by customers as the primary contact number of your store"},null,8,["modelValue","errorText"])):(r(),a("div",ge,[t("div",fe,[e[6]||(e[6]=t("span",null,"Mobile Number: ",-1)),i.isLoadingTeamMember?(r(),l(p,{key:0,width:"w-24",shine:!0})):(r(),a("span",ve,g((i.teamMember.mobileNumber||{}).national||i.teamMember._relationships.userStoreAssociation.mobileNumber.national),1))])]))]),t("div",Me,[i.isLoadingTeamMember||i.isLoadingTeamMemberPermissions||i.isLoadingAvailableTeamMemberPermissions?(r(),a("div",we,[m(p,{width:"w-24",shine:!0}),m(p,{width:"w-60",shine:!0})])):(r(),a("div",Te,[o.isMe?(r(),a(f,{key:0},[i.form.hasFullPermissions?(r(),l(v,{key:0,class:"flex items-center space-x-2"},{default:b(()=>e[7]||(e[7]=[t("svg",{class:"w-4 h-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"})],-1),t("span",null,"You cannot change your own permissions",-1)])),_:1})):c("",!0)],64)):(r(),a(f,{key:1},[m(F,{label:"Grant Full Permissions",modelValue:i.form.hasFullPermissions,"onUpdate:modelValue":e[1]||(e[1]=u=>i.form.hasFullPermissions=u),labelPopoverTitle:"What Is This?",labelPopoverDescription:"The team member will be granted all available permissions when this is checked"},null,8,["modelValue"]),i.form.hasFullPermissions?(r(),l(v,{key:0},{default:b(()=>e[8]||(e[8]=[h(" This team member has been granted "),t("span",{class:"font-bold"},"Full Permissions",-1),h(" to manage this store ")])),_:1})):(r(),l(L,{key:1,class:"w-full",label:"Permissions",tags:i.form.permissions,labelPopoverTitle:"What Is This?",errorText:s.getFormError("permissions"),selectableTags:i.teamMemberPermissionOptions,onOnTagsChanged:e[2]||(e[2]=u=>i.form.permissions=u),labelPopoverDescription:"Set the permissions for your team member"},null,8,["tags","errorText","selectableTags"]))],64))]))])]),t("div",_e,[t("div",Pe,[i.isLoadingTeamMember||i.isSubmitting?(r(),l(_,{key:0,showSpinningLoader:!1,class:"rounded-lg"})):c("",!0),t("div",xe,[e[9]||(e[9]=t("div",{class:"flex items-center space-x-2"},[t("svg",{class:"w-4 h-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"})]),t("p",{class:"font-bold text-lg"},"Permissions")],-1)),m(M,{type:"primary",text:i.form.hasFullPermissions?"All":o.totalPermissions,showDot:!1},null,8,["text"])]),e[11]||(e[11]=t("p",{class:"text-sm text-gray-400 border-b border-dashed pb-2 mb-4"},"See permissions granted",-1)),i.isLoadingTeamMember||i.isLoadingTeamMemberPermissions?(r(),a("div",Se,[m(p,{width:"w-32",shine:!0}),m(p,{width:"w-60",shine:!0})])):o.hasPermissions?(r(),a("div",ke,[(r(!0),a(f,null,H(i.form.permissions,(u,N)=>(r(),a("div",{key:N,class:"flex space-x-2 px-2 border-l-4 border-green-300"},[t("p",ye,g(u.text),1)]))),128))])):(r(),l(v,{key:3},{default:b(()=>e[10]||(e[10]=[h(" No permissions granted ")])),_:1}))])])]),i.teamMember&&!o.isCreator?(r(),a("div",Fe,[t("p",null,[e[12]||(e[12]=h("Do you want to remove ")),t("span",Le,g(i.teamMember._attributes.name),1),e[13]||(e[13]=h("?"))]),t("div",Ie,[m(I,{approveText:"Remove Team Member",approveAction:o.deleteTeamMember,isLoading:i.isDeleting},{content:b(()=>[e[16]||(e[16]=t("p",{class:"text-lg font-bold border-b border-dashed pb-4 mb-4"},"Confirm Delete",-1)),t("p",Ne,[e[14]||(e[14]=h("Are you sure you want to remove ")),t("span",Ce,g(i.teamMember._attributes.name),1),e[15]||(e[15]=h("?"))])]),trigger:b(u=>[m(T,{action:u.showModal,loading:i.isDeleting,class:"w-60",type:"danger"},{default:b(()=>e[17]||(e[17]=[h(" Remove Team Member ")])),_:2},1032,["action","loading"])]),_:1},8,["approveAction","isLoading"])])])):c("",!0)])])}const ds=oe(me,[["render",Ae]]);export{ds as default};
