import{F as D}from"./FormMixin-DjJxif50.js";import{r as g,o as i,e as C,w as P,b as l,y as E,u as V,c as n,d as y,m as U,F as _,k as F,h as f,t as w,f as u,p as z,n as b,i as L}from"./app-DGr24LlD.js";import{T as N}from"./TextInput-D_8GVWar.js";import{u as Z}from"./store-store-DY5zIoy1.js";import{A as H}from"./AddButton-nZlgoy6b.js";import{S as q}from"./StoreLogo-zNj_6_-p.js";import{M as Y}from"./MoneyInput-Yb3Nl-CN.js";import{p as I}from"./api-repository-BpNKEdKW.js";import{P as M}from"./PrimaryButton-Bke-6sJ-.js";import{_ as B}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{D as O}from"./DeleteButton-EazF8ow9.js";import{F as K}from"./FormErrorMessages-H2z_xV0j.js";import"./form-store-fTlv55Ng.js";import"./UtilsMixin-CBwmyCNB.js";import"./InputErrorMessage-xckJoMbN.js";import"./MoreInfoPopover-MomTL1G-.js";import"./cloneDeep-BSUglKOW.js";import"./SpinningLoader-C59uW44G.js";const W={components:{PrimaryButton:M},props:{action:{type:Function},disabled:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},size:{type:String,default:"base",options:["xs","sm","base","lg"]},type:{type:String,default:"warning",options:["dark","success","light","primary","warning","danger"]}}};function G(t,e,s,a,r,o){const m=g("PrimaryButton");return i(),C(m,{action:s.action,disabled:s.disabled,loading:s.loading,size:s.size,type:s.type},{default:P(()=>[e[0]||(e[0]=l("svg",{class:"w-3 h-3",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor"},[l("path",{"fill-rule":"evenodd",d:"M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z","clip-rule":"evenodd"})],-1)),E(t.$slots,"default")]),_:3},8,["action","disabled","loading","size","type"])}const J=B(W,[["render",G]]),Q={mixins:[D],components:{TextInput:N,AddButton:H,StoreLogo:q,MoneyInput:Y,RetryButton:J,DeleteButton:O,PrimaryButton:M,FormErrorMessages:K},data(){return{products:[{name:"",photos:[],unitRegularPrice:"0.00",createProductPhoto:null}],maxProducts:5,fileInputs:[],uploadMessage:"",isUploading:!1,totalCompletedSteps:0,maxPhotosPerProduct:5,apiState:V(),totalCompletedUploads:0,isCreatingProducts:!1,storeState:Z(),formErrorMessagesIndex:null}},computed:{store(){return this.storeState.store},logo(){return this.store._relationships.logo},progressPercentage(){return this.totalCompletionSteps===0?0:Math.round(this.totalCompletedSteps/this.totalCompletionSteps*100)},totalUploads(){return this.products.reduce((t,e)=>t+e.photos.length,0)},totalFailedUploads(){return this.products.reduce((t,e)=>t+e.photos.filter(s=>s.uploaded===!1).length,0)},totalCompletionSteps(){return this.products.length+this.totalUploads},hasCompletedSteps(){return this.totalCompletedSteps>0},hasFailedUploads(){return this.totalFailedUploads>0},hasReachedProductLimit(){return this.maxProducts==this.products.length}},methods:{addProduct(){this.products.push({name:"",photos:[],unitRegularPrice:"0.00",created:!1})},removeProduct(t){this.products.splice(t,1)},productIsUploading(t){return this.products[t].photos.filter(e=>e.uploading===!0).length>0},productHasFailedUploads(t){return this.products[t].photos.filter(e=>e.uploaded===!1).length},setFileInputRef(t,e){t&&(this.fileInputs[e]=t)},triggerFileInput(t){if(this.isCreatingProducts||this.isUploading){this.showUnsuccessfulNotification("Still creating products");return}if(typeof t!="number"){console.warn(`⚠️ Invalid index: ${t}`,t);return}this.fileInputs[t]?this.fileInputs[t].click():console.warn(`⚠️ File input not found for index: ${t}`)},handleFileUpload(t,e){const s=t.target.files;s.length&&(this.processFiles(s,e),this.$nextTick(()=>{this.fileInputs[e].value=""}))},handleDrop(t,e){t.preventDefault();const s=t.dataTransfer.files;this.processFiles(s,e)},processFiles(t,e){if(!t.length)return;const s=this.products[e],a=s.photos.length,r=this.maxPhotosPerProduct-a;if(r<=0){this.showUnsuccessfulNotification(`You can only upload up to ${this.maxPhotosPerProduct} photos per product.`);return}const m=Array.from(t).slice(0,r).map(h=>new Promise(x=>{const v=new FileReader;v.onload=S=>{s.photos.push({filePath:URL.createObjectURL(h),uploading:!1,uploaded:null,fileRef:h}),x()},v.readAsDataURL(h)}));Promise.all(m).then(()=>{this.uploadProductImages(s)})},removePhoto(t,e,s){t&&(t.preventDefault(),t.stopPropagation()),this.products[e].photos.splice(s,1)},submit(){this.isCreatingProducts||this.isUploading||(this.totalCompletedSteps==0?this.submitProducts():this.navigateToAddPayments())},async submitProducts(){for(const[s,a]of this.products.entries()){if(a.name.trim()===""){this.setFormError("name","The product name is required",s),this.showUnsuccessfulNotification("The product name is required"),this.formErrorMessagesIndex=s;return}if(a.unitRegularPrice.trim()===""){this.setFormError("unitRegularPrice","The product price is required",s),this.showUnsuccessfulNotification("The product price is required"),this.formErrorMessagesIndex=s;return}}this.isCreatingProducts=!0;const t=this.apiState.apiHome._links.createProduct;let e=this.products.map(s=>{let a={return:"1",storeId:this.store.id,name:s.name,unitRegularPrice:s.unitRegularPrice};return this.uploadMessage=`Creating ${s.name}`,I(t,a).then(r=>{if(r.status===200){this.totalCompletedSteps++;let o=r.data.product;return s.createProductPhoto=o._links.createProductPhoto,this.uploadProductImages(s)}})});await Promise.allSettled(e).then(s=>{let a=0,r=[];s.forEach((o,m)=>{var h;o.status==="fulfilled"?(a++,this.showSuccessfulNotification(`${this.products[m].name} created successfully`)):(r.push(`Product ${m+1}: ${((h=o.reason)==null?void 0:h.message)||"An error occurred"}`),this.formErrorMessagesIndex=m,this.setServerFormErrors(o.reason,m))}),a&&this.showSuccessfulNotification("Products added!"),r.length>0&&this.showUnsuccessfulNotification(r.join(`
`))}).catch(s=>{this.showUnsuccessfulNotification("An unexpected error occurred while submitting products."),console.error(s)}).finally(()=>{this.isCreatingProducts=!1}),this.totalCompletedSteps>0&&!this.isUploading&&this.totalFailedUploads==0&&this.navigateToAddPayments()},async uploadProductImages(t,e=null){if(!t.createProductPhoto)return Promise.resolve();let s=[];for(let a=0;a<t.photos.length;a++){const r=t.photos[a];(r.uploaded===null||r.uploaded===!1)&&(e==null||e==a)&&s.push(this.uploadSingleImage(t,r,a))}return s.length?(this.isUploading=!0,this.uploadMessage="Uploading photos",Promise.allSettled(s).then(a=>{let r=a.filter(o=>o.status==="rejected").length;r>0&&this.showUnsuccessfulNotification(`⚠️ ${r} image(s) failed to upload. You can retry manually.`),this.isUploading=!1})):Promise.resolve()},async uploadSingleImage(t,e,s,a=0){if(a>2)return console.warn(`❌ Image ${s+1} permanently failed after 3 attempts.`),e.uploaded=!1,Promise.reject("Failed after 3 attempts");let r=new FormData;return r.append("product_photo",e.fileRef),e.uploading=!0,I(t.createProductPhoto,r,{headers:{"Content-Type":"multipart/form-data"}}).then(o=>{if(o.status===200)return e.uploaded=!0,this.totalCompletedSteps++,this.totalCompletedUploads++,this.uploadMessage=`Uploaded ${this.totalCompletedUploads}/${this.totalUploads} photos`,console.log(`✅ Image ${s+1} uploaded successfully.`),o;throw new Error("Upload failed")}).catch(o=>(console.error(`⚠️ Image ${s+1} upload attempt ${a+1} failed.`),this.uploadSingleImage(t,e,s,a+1))).finally(()=>{e.uploading=!1})},navigateToAddPayments(){this.$router.push({name:"add-payments",params:{store_href:this.store._links.showStore}})}},beforeRouteLeave(t,e,s){if(this.isCreatingProducts||this.isUploading){if(!window.confirm("You have unsaved changes. Are you sure you want to leave?"))return s(!1)}else if(this.totalCompletedSteps==0&&this.products.some(a=>a.name.trim()!==""||a.photos.length>0)&&!window.confirm("Are you sure you want to leave before adding products?"))return s(!1);s()}},X={class:"min-h-screen flex flex-col items-center pt-20 pb-40"},$={class:"w-full max-w-lg"},ee={class:"w-full max-w-lg"},te={class:"space-y-2 mb-4"},se={class:"flex items-center space-x-1 font-bold mb-4"},oe={class:"w-5 h-5 flex items-center justify-center bg-gray-100 rounded-full text-xs"},re=["onClick","onDrop"],le={key:0},ae={key:1},ie=["onChange"],ne={key:0,class:"grid grid-cols-3 gap-2"},de={key:0,class:"absolute z-10 top-1 right-1 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"},ue={key:1,class:"absolute z-10 top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"},pe=["onClick"],ce=["onClick"],me={key:4,class:"absolute inset-0 bg-white bg-opacity-80 border border-red-500 rounded-lg flex items-center justify-center"},ge={key:1,class:"absolute inset-0 bg-gray-900 bg-opacity-50 rounded-lg flex items-center justify-center"},he=["src"],fe={key:0,class:"space-y-2 mb-4"},ye={key:0,class:"text-sm text-blue-600 font-semibold bg-blue-100 border border-blue-300 p-3 rounded-lg shadow-md text-center"},we={class:"underline"},be={class:"font-bold"},Pe={key:1,class:"text-xs text-blue-600 font-semibold bg-blue-100 border border-blue-300 p-3 rounded-lg shadow-md"},ve={class:"flex items-center space-x-2"},xe={key:0},ke={key:1,class:"mb-4"},Ue={class:"w-full max-w-lg bg-gray-200 rounded-full h-2 mb-2"},_e={class:"text-xs text-center mt-2 font-bold"};function Ce(t,e,s,a,r,o){const m=g("StoreLogo"),h=g("TextInput"),x=g("MoneyInput"),v=g("RetryButton"),S=g("DeleteButton"),R=g("AddButton"),A=g("FormErrorMessages"),j=g("PrimaryButton");return i(),n("div",X,[l("div",$,[y(m,{showButton:!1,class:"flex justify-center mb-4"}),e[2]||(e[2]=l("h2",{class:"text-2xl font-semibold text-center mb-2"},"Add Products",-1)),e[3]||(e[3]=l("p",{class:"text-gray-500 text-center mb-6"},"Keep it simple—just the essentials to get started! 🚀",-1))]),l("div",ee,[l("form",{onSubmit:e[1]||(e[1]=U((...c)=>o.submit&&o.submit(...c),["prevent"]))},[l("div",te,[(i(!0),n(_,null,F(r.products,(c,p)=>(i(),n("div",{key:p,class:b(["space-y-3 bg-white p-4 shadow-lg rounded-xl"])},[l("div",se,[e[4]||(e[4]=l("span",{class:"text-sm"},"Product",-1)),l("div",oe,w(p+1),1)]),y(h,{modelValue:c.name,"onUpdate:modelValue":d=>c.name=d,placeholder:"Standard Ticket",errorText:t.getFormError("name",p)},null,8,["modelValue","onUpdate:modelValue","errorText"]),y(x,{modelValue:c.unitRegularPrice,"onUpdate:modelValue":d=>c.unitRegularPrice=d,currencySymbol:o.store.currency.symbol,errorText:t.getFormError("unitRegularPrice",p)},null,8,["modelValue","onUpdate:modelValue","currencySymbol","errorText"]),l("div",null,[e[5]||(e[5]=l("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-200"},[f(" Images "),l("span",{class:"font-normal text-gray-500"},"(Optional)")],-1)),c.photos.length<r.maxPhotosPerProduct?(i(),n("div",{key:0,onDragover:e[0]||(e[0]=U(()=>{},["prevent"])),onClick:()=>o.triggerFileInput(p),onDrop:d=>o.handleDrop(d,p),class:"mt-2 w-full h-20 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition"},[c.photos.length?(i(),n("p",ae,"Upload More Images")):(i(),n("p",le,"Click or Drag & Drop Images")),l("input",{multiple:"",type:"file",class:"hidden",accept:"image/*",ref_for:!0,ref:d=>o.setFileInputRef(d,p),onChange:d=>o.handleFileUpload(d,p)},null,40,ie)],40,re)):u("",!0)]),c.photos.length?(i(),n("div",ne,[(i(!0),n(_,null,F(c.photos,(d,k)=>(i(),n("div",{key:k,class:"relative group"},[d.uploading?u("",!0):(i(),n(_,{key:0},[d.uploaded===!0?(i(),n("div",de,e[6]||(e[6]=[l("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[l("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m4.5 12.75 6 6 9-13.5"})],-1)]))):u("",!0),d.uploaded===!1?(i(),n("div",ue,e[7]||(e[7]=[l("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor"},[l("path",{"fill-rule":"evenodd",d:"M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z","clip-rule":"evenodd"})],-1)]))):u("",!0),d.uploaded===!1?(i(),n("button",{key:2,onClick:()=>o.uploadProductImages(c,k),class:"flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 active:scale-95 absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"},e[8]||(e[8]=[l("svg",{class:"w-6 h-6",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor"},[l("path",{"fill-rule":"evenodd",d:"M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z","clip-rule":"evenodd"})],-1)]),8,pe)):u("",!0),!d.uploaded&&!d.uploading?(i(),n("button",{key:3,onClick:U(T=>o.removePhoto(T,p,k),["stop"]),class:"absolute z-10 top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"}," ✕ ",8,ce)):u("",!0),d.uploaded===!1?(i(),n("div",me)):u("",!0)],64)),d.uploading?(i(),n("div",ge,e[9]||(e[9]=[l("span",{class:"text-white text-xs font-bold"},"Uploading...",-1)]))):u("",!0),l("img",{src:d.filePath,class:"w-full h-24 p-4 object-contain rounded-lg border border-gray-300 dark:border-gray-700"},null,8,he)]))),128))])):u("",!0),o.productHasFailedUploads(p)?(i(),n("div",{key:1,class:b(["flex justify-end pt-2",{"pb-4":p==r.products.length-1}])},[y(v,{size:"xs",class:"w-40",disabled:o.productIsUploading(p),action:()=>o.uploadProductImages(c)},{default:P(()=>e[10]||(e[10]=[l("span",{class:"ml-2"},"Retry Uplaods",-1)])),_:2},1032,["disabled","action"])],2)):u("",!0),r.products.length>1&&!o.hasCompletedSteps?(i(),n("div",{key:2,class:b(["flex justify-end pt-2",{"pb-4":p==r.products.length-1}])},[r.isCreatingProducts?u("",!0):(i(),C(S,{key:0,size:"xs",class:"w-40",type:"danger",action:o.removeProduct},{default:P(()=>e[11]||(e[11]=[l("span",{class:"ml-2"},"Remove Product",-1)])),_:1},8,["action"]))],2)):u("",!0),p==r.products.length-1&&!o.hasReachedProductLimit&&!o.hasCompletedSteps?(i(),n("div",{key:3,class:b(["flex justify-center pt-4",{"border-t-2 border-dashed":r.products.length>1}])},[p==r.products.length-1&&!r.isCreatingProducts?(i(),C(R,{key:0,size:"sm",class:"w-40",type:"primary",action:o.addProduct},{default:P(()=>e[12]||(e[12]=[f(" Add Product ")])),_:1},8,["action"])):u("",!0)],2)):u("",!0)]))),128))]),o.hasReachedProductLimit||o.hasFailedUploads||t.hasErrors?(i(),n("div",fe,[o.hasReachedProductLimit?(i(),n("p",ye,[e[14]||(e[14]=f(" Let's work with ")),l("span",we,[l("span",be,w(r.maxProducts),1),e[13]||(e[13]=f(" products"))]),e[15]||(e[15]=f(" for now! 🚀 "))])):u("",!0),o.hasFailedUploads?(i(),n("div",Pe,[l("div",ve,[e[18]||(e[18]=l("svg",{class:"w-10 h-10",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[l("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"})],-1)),l("div",null,[l("p",null,[e[16]||(e[16]=f(" We could not upload ")),o.totalFailedUploads?(i(),n("span",xe,w(o.totalFailedUploads)+" "+w(o.totalFailedUploads==1?"photo":"photos")+". ",1)):u("",!0)]),e[17]||(e[17]=l("p",null,"But no worries—you can always add more later! 😊",-1))])]),e[19]||(e[19]=z('<div class="mt-2 p-2 border-t border-dotted border-blue-300"><ul class="font-normal space-y-1"><li>✅ Make sure you’re uploading images (jpeg, jpg, png, gif or svg).</li><li>✅ Ensure your images are not too large (we accept up to 5MB).</li><li>✅ Use <a href="https://tinypng.com/" target="_blank" class="underline inline-flex items-center"> tinypng.com <svg class="w-3 h-3 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path></svg></a> to reduce image size (it’s free). </li></ul></div>',1))])):u("",!0),y(A,{index:r.formErrorMessagesIndex},null,8,["index"])])):u("",!0),r.isCreatingProducts||r.isUploading||o.progressPercentage===100?(i(),n("div",ke,[l("div",Ue,[l("div",{class:b(["h-2 rounded-full transition-all duration-500",o.progressPercentage===100?"bg-green-500":"bg-blue-500"]),style:L({width:o.progressPercentage+"%"})},null,6)]),l("p",_e,w(o.progressPercentage===100?"Upload Complete 🎉":`${r.uploadMessage} (${o.progressPercentage}%)`),1)])):u("",!0),y(j,{class:"w-full",action:o.submit,loading:r.isCreatingProducts,disabled:r.isCreatingProducts},{default:P(()=>e[20]||(e[20]=[f(" Continue ")])),_:1},8,["action","loading","disabled"])],32)])])}const Ye=B(Q,[["render",Ce]]);export{Ye as default};
