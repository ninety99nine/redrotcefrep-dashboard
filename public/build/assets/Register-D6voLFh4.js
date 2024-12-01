import{R as k,u as R,s as U,f as I,c as l,a,b as r,w as c,F as d,g as f,i as h,h as x,r as i,o as n,d as u,t as b}from"./app-DgwDG0oL.js";import{L as P}from"./Logo-1z0bYkRh.js";import{A as B}from"./Alert-DeOdG3YV.js";import{F as K,u as A}from"./FormMixin-Bl09yP4i.js";import{U as H}from"./SpiningLoader-CtP8XMxq.js";import{T as L}from"./TextInput-Cvcclkkj.js";import{T as M}from"./TextHeader-Cv0Yig1G.js";import{B as O}from"./BackButton-BSj9mnOl.js";import{P as q,C as G}from"./ConfirmPasswordInput-B10PR3av.js";import{O as D}from"./OtpInput-B5YmCNin.js";import{P as j}from"./PrimaryButton-BwxTXQIn.js";import{M as W}from"./MobileNumberInput-Dy4e2HdE.js";import{v as z,r as J}from"./auth-repository-CxMWyXAE.js";import{_ as Q}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./InputLabel-h7tVZV7a.js";import"./MoreInfoPopover-CikMcfV_.js";import"./InputErrorMessage-MOiSGfLL.js";const X={mixins:[K,H],components:{Logo:P,Alert:B,RouterLink:k,TextInput:L,TextHeader:M,BackButton:O,PasswordInput:q,OtpInput:D,PrimaryButton:j,MobileNumberInput:W,ConfirmPasswordInput:G},data(){return{registerUrl:null,isSubmitting:!1,accountExistsUrl:null,apiState:R(),validateRegisterUrl:null,appName:U.appName,mobileVerificationShortcode:null,notificationState:A(),accountExists:null,showVerificationCode:!1,lastName:"",password:"",firstName:"",mobileNumber:"",verificationCode:"",passwordConfirmation:""}},beforeRouteEnter(o,e,g){g(p=>{o.query.hasOwnProperty("mobileNumber")&&(p.mobileNumber=o.query.mobileNumber,p.handleRegistration())})},methods:{setUrls(){this.registerUrl=this.apiState.apiHome._links.register,this.accountExistsUrl=this.apiState.apiHome._links.accountExists,this.validateRegisterUrl=this.apiState.apiHome._links.validateRegister,this.mobileVerificationShortcode=this.apiState.apiHome.mobileVerificationShortcode},handleRegistration(){this.hideFormErrors(),this.showVerificationCode?this.attemptRegistration():this.accountExists==null?this.checkIfAccountExists():this.validateRegistration()},checkIfAccountExists(){this.mobileNumber.trim()==""?this.setFormError("mobileNumber","Enter your mobile number"):this.accountExistsUrl!=null?(this.isSubmitting=!0,I.post(this.accountExistsUrl,{mobileNumber:this.mobileNumber}).then(o=>{this.isSubmitting=!1,this.accountExists=o.data.exists,this.accountExists&&this.$router.push({name:"login",query:{mobileNumber:this.mobileNumber}})}).catch(o=>{this.isSubmitting=!1,this.setServerFormErrors(o)})):this.setGeneralFormError("The accountExistsUrl does not exist")},validateRegistration(){if(this.firstName.trim()=="")this.setFormError("firstName","Enter your first name");else if(this.lastName.trim()=="")this.setFormError("lastName","Enter your last name");else if(this.mobileNumber.trim()=="")this.setFormError("mobileNumber","Enter your mobile number");else if(this.password.trim()=="")this.setFormError("password","Enter your password");else if(this.passwordConfirmation.trim()=="")this.setFormError("passwordConfirmation","Enter your password confirmation");else if(this.password!=this.passwordConfirmation)this.setFormError("password","Password does not match confirmation");else if(this.validateRegisterUrl!=null){this.isSubmitting=!0;let o={lastName:this.lastName,password:this.password,firstName:this.firstName,mobileNumber:this.mobileNumber,passwordConfirmation:this.passwordConfirmation};z(o).then(e=>{e.status==200&&(this.isSubmitting=!1,this.showVerificationCode=!0)}).catch(e=>{this.isSubmitting=!1,this.setServerFormErrors(e)})}else this.setGeneralFormError("The validateRegisterUrl does not exist")},attemptRegistration(){if(this.verificationCode.trim()=="")this.setFormError("verificationCode","Enter your verification code");else if(this.registerUrl!=null){this.isSubmitting=!0;let o={lastName:this.lastName,password:this.password,firstName:this.firstName,mobileNumber:this.mobileNumber,verificationCode:this.verificationCode,passwordConfirmation:this.passwordConfirmation};J(o).then(e=>{e.status==200&&(this.isSubmitting=!1,this.$router.replace({name:"dashboard"}),this.showSuccessfulNotification("Welcome to "+this.appName))}).catch(e=>{this.isSubmitting=!1,this.setServerFormErrors(e)})}else this.setGeneralFormError("The registerUrl does not exist")},backToRegistrationForm(){this.showVerificationCode=!1}},created(){this.setUrls()}},Y={class:"flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"},Z={class:"sm:mx-auto sm:w-full sm:max-w-sm"},$={class:"mt-10 sm:mx-auto sm:w-full sm:max-w-sm"},ee={class:"space-y-6",action:"#",method:"POST"},te={class:"font-bold"},oe={class:"font-bold"},se={class:"grid grid-cols-2 gap-4"},re={class:"md:col-span-1 col-span-2"},ie={class:"md:col-span-1 col-span-2"},ae={class:"flex"},ne={class:"text-sm text-center mt-8"},me=a("span",{class:"text-gray-500 mr-1"},"Already have an account?",-1);function le(o,e,g,p,t,m){const E=i("Logo"),_=i("TextHeader"),w=i("Alert"),y=i("OtpInput"),C=i("MobileNumberInput"),N=i("TextInput"),V=i("PasswordInput"),v=i("ConfirmPasswordInput"),F=i("BackButton"),S=i("PrimaryButton"),T=i("router-link");return n(),l("div",Y,[a("div",Z,[r(E,{class:"mx-auto"}),r(_,{class:"mt-10 text-center"},{default:c(()=>[u("Create your account")]),_:1})]),a("div",$,[a("form",ee,[t.showVerificationCode?(n(),l(d,{key:0},[r(w,null,{default:c(()=>[u(" Dial "),a("span",te,b(t.mobileVerificationShortcode),1),u(" and enter the verification code below to confirm ownership of the mobile number "),a("span",oe,b(t.mobileNumber),1)]),_:1}),r(y,{modelValue:t.verificationCode,"onUpdate:modelValue":e[0]||(e[0]=s=>t.verificationCode=s),errorText:o.getFormError("verificationCode")},null,8,["modelValue","errorText"])],64)):(n(),l(d,{key:1},[r(C,{modelValue:t.mobileNumber,"onUpdate:modelValue":e[1]||(e[1]=s=>t.mobileNumber=s),errorText:o.getFormError("mobileNumber"),onKeydown:f(m.handleRegistration,["enter"])},null,8,["modelValue","errorText","onKeydown"]),t.accountExists==!1?(n(),l(d,{key:0},[a("div",se,[a("div",re,[r(N,{modelValue:t.firstName,"onUpdate:modelValue":e[2]||(e[2]=s=>t.firstName=s),label:"First Name",autocomplete:"given-name",errorText:o.getFormError("firstName"),onKeydown:f(m.handleRegistration,["enter"])},null,8,["modelValue","errorText","onKeydown"])]),a("div",ie,[r(N,{modelValue:t.lastName,"onUpdate:modelValue":e[3]||(e[3]=s=>t.lastName=s),label:"Last Name",autocomplete:"family-name",errorText:o.getFormError("lastName"),onKeydown:f(m.handleRegistration,["enter"])},null,8,["modelValue","errorText","onKeydown"])])]),t.firstName&&t.lastName?(n(),l(d,{key:0},[r(V,{modelValue:t.password,"onUpdate:modelValue":e[4]||(e[4]=s=>t.password=s),showForgotPassword:!1,errorText:o.getFormError("password"),onKeydown:f(m.handleRegistration,["enter"])},null,8,["modelValue","errorText","onKeydown"]),r(v,{modelValue:t.passwordConfirmation,"onUpdate:modelValue":e[5]||(e[5]=s=>t.passwordConfirmation=s),errorText:o.getFormError("passwordConfirmation"),onKeydown:f(m.handleRegistration,["enter"])},null,8,["modelValue","errorText","onKeydown"])],64)):h("",!0)],64)):h("",!0)],64)),o.getFormError("general")?(n(),x(w,{key:2,class:"mt-4 mb-0 mx-auto max-w-96",type:"warning"},{default:c(()=>[u(b(o.getFormError("general")),1)]),_:1})):h("",!0),a("div",ae,[t.showVerificationCode?(n(),x(F,{key:0,action:m.backToRegistrationForm,class:"w-16 mr-2"},null,8,["action"])):h("",!0),r(S,{action:m.handleRegistration,loading:t.isSubmitting,class:"w-full"},{default:c(()=>[t.showVerificationCode?(n(),l(d,{key:0},[u("Create Account")],64)):(n(),l(d,{key:1},[u("Continue")],64))]),_:1},8,["action","loading"])])]),a("p",ne,[me,r(T,{to:{name:"login"}},{default:c(()=>[u("Login")]),_:1})])])])}const Fe=Q(X,[["render",le]]);export{Fe as default};
