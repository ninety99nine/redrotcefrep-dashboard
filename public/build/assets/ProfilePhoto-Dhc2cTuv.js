import{F as g}from"./FormMixin-D44Bj-el.js";import{a as d,r as c,o as l,c as s,b as r,n as a,f as h,d as p}from"./app-DEkFCb1u.js";import{a as f,p as w}from"./api-repository-CIJPUswr.js";import{b as k}from"./InputErrorMessage-lzTzq-uZ.js";import{_ as v}from"./_plugin-vue_export-helper-DlAUqK2U.js";async function E(o,e){return await f(o._links.updateUser,e)}async function b(o,e){const t=new FormData;return t.append("profile_photo",e),await w(o._links.updateProfilePhoto,t,{headers:{"Content-Type":"multipart/form-data"}})}const x={props:{user:{type:Object},width:{type:String,default:"w-20"},height:{type:String,default:"h-20"},canUpload:{type:Boolean,default:!0}},mixins:[g],components:{InputErrorMessage:k},data(){return{selectedFile:null,isSubmitting:!1,authState:d(),imageUrl:this.user.profilePhoto,originalImageUrl:this.user.profilePhoto}},watch:{"user.profilePhoto":{handler(o,e){this.imageUrl=o},deep:!1}},methods:{selectImage(){this.canUpload&&this.$refs.fileInput.click()},handleImageChange(o){const e=o.target.files[0];e&&(this.selectedFile=e,this.imageUrl=URL.createObjectURL(e),this.user.id==this.authState.user.id&&(d().user.profilePhoto=this.imageUrl),this.$emit("selectedPhoto",e),this.uploadImage(o,e))},uploadImage(o,e){this.formState.hideFormErrors(),this.isSubmitting=!0,b(this.user,e).then(t=>{t.status==200&&(this.isSubmitting=!1,this.notificationState.showSuccessNotification("Profile photo updated"))}).catch(t=>{this.isSubmitting=!1,this.formState.setServerFormErrors(t),this.user.id==this.authState.user.id&&(d().user.profilePhoto=this.originalImageUrl),o.target.value=null})}}},U=["src"],y={key:0,class:"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"},P=["src"],I={key:0,class:"absolute bottom-0 -right-2 w-4 h-4 text-gray-400",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},C={key:0,class:"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"},M={key:1,class:a(["absolute top-0 bottom-0 left-0 right-0 z-10 bg-black/75 group-hover:bg-black/50"])},S={class:a(["w-full h-full text-gray-200 dark:text-gray-700"]),xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 20 20"};function _(o,e,t,j,i,n){const m=c("InputErrorMessage");return l(),s("div",null,[r("div",{class:a([t.width,t.height,"relative","mx-auto"])},[i.imageUrl?(l(),s("div",{key:0,onClick:e[0]||(e[0]=(...u)=>n.selectImage&&n.selectImage(...u)),class:a(["w-full h-full",{"cursor-pointer group":t.canUpload}])},[r("div",{src:i.imageUrl,class:a(["w-full h-full rounded-full border-4 overflow-hidden relative"])},[i.isSubmitting?(l(),s("div",y,e[3]||(e[3]=[r("svg",{class:"w-6 h-6 animate-spin text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[r("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"})],-1)]))):h("",!0),t.canUpload?(l(),s("div",{key:1,class:a(["absolute top-0 bottom-0 left-0 right-0 z-10 group-hover:bg-black/50",{"bg-black/75":i.isSubmitting}])},null,2)):h("",!0),(l(),s("img",{class:"w-full h-full object-cover object-top",key:i.imageUrl,src:i.imageUrl,alt:"Profile Photo"},null,8,P))],8,U),t.canUpload?(l(),s("svg",I,e[4]||(e[4]=[r("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"},null,-1),r("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"},null,-1)]))):h("",!0)],2)):(l(),s("div",{key:1,onClick:e[1]||(e[1]=(...u)=>n.selectImage&&n.selectImage(...u)),class:a(["w-full h-full rounded-full border-4 border-transparent overflow-hidden relative",{"cursor-pointer group":t.canUpload}])},[t.canUpload?(l(),s("div",C,e[5]||(e[5]=[r("svg",{class:"w-6 h-6 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[r("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"}),r("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"})],-1)]))):h("",!0),t.canUpload?(l(),s("div",M)):h("",!0),(l(),s("svg",S,e[6]||(e[6]=[r("path",{d:"M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"},null,-1)])))],2)),r("input",{type:"file",ref:"fileInput",class:"hidden",onChange:e[2]||(e[2]=(...u)=>n.handleImageChange&&n.handleImageChange(...u)),accept:"image/jpeg, image/png, image/jpg, image/gif, image/bmp"},null,544)],2),p(m,{errorText:o.getFormError("profilePhoto"),class:a({"block text-center mt-4":this.getFormError("profilePhoto")})},null,8,["errorText","class"])])}const z=v(x,[["render",_]]);export{z as P,E as u};
