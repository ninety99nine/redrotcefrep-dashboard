import{o as l,c as u,r as q,C as K,p as O,a as m,F as M,l as A,k as I,G as F,H as z,t as H,m as B,i as y,g as R,y as $,n as C,h as G,I as W}from"./app-vGTXn0df.js";var J=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function U(e,n,t){return t={path:n,exports:{},require:function(s,r){return Q(s,r??t.path)}},e(t,t.exports),t.exports}function Q(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}var X=U(function(e,n){(function(t,s){e.exports=s()})(J,function(){var t="__v-click-outside",s=typeof window<"u",r=typeof navigator<"u",i=s&&("ontouchstart"in window||r&&navigator.msMaxTouchPoints>0)?["touchstart"]:["click"],k=function(a){var c=a.event,h=a.handler;(0,a.middleware)(c)&&h(c)},T=function(a,c){var h=function(o){var f=typeof o=="function";if(!f&&typeof o!="object")throw new Error("v-click-outside: Binding value must be a function or an object");return{handler:f?o:o.handler,middleware:o.middleware||function(v){return v},events:o.events||i,isActive:o.isActive!==!1,detectIframe:o.detectIframe!==!1,capture:!!o.capture}}(c.value),b=h.handler,N=h.middleware,D=h.detectIframe,S=h.capture;if(h.isActive){if(a[t]=h.events.map(function(o){return{event:o,srcTarget:document.documentElement,handler:function(f){return function(v){var x=v.el,g=v.event,_=v.handler,w=v.middleware,E=g.path||g.composedPath&&g.composedPath();(E?E.indexOf(x)<0:!x.contains(g.target))&&k({event:g,handler:_,middleware:w})}({el:a,event:f,handler:b,middleware:N})},capture:S}}),D){var j={event:"blur",srcTarget:window,handler:function(o){return function(f){var v=f.el,x=f.event,g=f.handler,_=f.middleware;setTimeout(function(){var w=document.activeElement;w&&w.tagName==="IFRAME"&&!v.contains(w)&&k({event:x,handler:g,middleware:_})},0)}({el:a,event:o,handler:b,middleware:N})},capture:S};a[t]=[].concat(a[t],[j])}a[t].forEach(function(o){var f=o.event,v=o.srcTarget,x=o.handler;return setTimeout(function(){a[t]&&v.addEventListener(f,x,S)},0)})}},d=function(a){(a[t]||[]).forEach(function(c){return c.srcTarget.removeEventListener(c.event,c.handler,c.capture)}),delete a[t]},p=s?{beforeMount:T,updated:function(a,c){var h=c.value,b=c.oldValue;JSON.stringify(h)!==JSON.stringify(b)&&(d(a),T(a,{value:h}))},unmounted:d}:{};return{install:function(a){a.directive("click-outside",p)},directive:p}})}),Y=X;const Z={class:"v3ti-loader-wrapper"},ee=m("div",{class:"v3ti-loader"},null,-1),te=m("span",null,"Loading",-1),ne=[ee,te];function ie(e,n){return l(),u("div",Z,ne)}function L(e,n){n===void 0&&(n={});var t=n.insertAt;if(!(!e||typeof document>"u")){var s=document.head||document.getElementsByTagName("head")[0],r=document.createElement("style");r.type="text/css",t==="top"&&s.firstChild?s.insertBefore(r,s.firstChild):s.appendChild(r),r.styleSheet?r.styleSheet.cssText=e:r.appendChild(document.createTextNode(e))}}var ae=`.v3ti-loader-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #112B3C;
}
.v3ti-loader-wrapper .v3ti-loader {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: inline-block;
  border-top: 2px solid #112B3C;
  border-right: 2px solid transparent;
  box-sizing: border-box;
  animation: rotation 0.8s linear infinite;
  margin-right: 8px;
}
@keyframes rotation {
0% {
    transform: rotate(0deg);
}
100% {
    transform: rotate(360deg);
}
}`;L(ae);const V={};V.render=ie;var re=V,P={name:"Vue3TagsInput",emits:["update:modelValue","update:tags","on-limit","on-tags-changed","on-remove","on-error","on-focus","on-blur","on-select","on-select-duplicate-tag","on-new-tag"],props:{readOnly:{type:Boolean,default:!1},modelValue:{type:String,default:""},validate:{type:[String,Function,Object],default:""},addTagOnKeys:{type:Array,default:function(){return[13,",",32]}},placeholder:{type:String,default:""},tags:{type:Array,default:()=>[]},loading:{type:Boolean,default:!1},limit:{type:Number,default:-1},allowDuplicates:{type:Boolean,default:!1},addTagOnBlur:{type:Boolean,default:!1},selectItems:{type:Array,default:()=>[]},select:{type:Boolean,default:!1},duplicateSelectItem:{type:Boolean,default:!0},uniqueSelectField:{type:String,default:"id"},addTagOnKeysWhenSelect:{type:Boolean,default:!1},isShowNoData:{type:Boolean,default:!0}},components:{Loading:re},directives:{clickOutside:Y.directive},data(){return{isInputActive:!1,isError:!1,newTag:"",innerTags:[],multiple:!1}},computed:{isLimit(){const e=this.limit>0&&Number(this.limit)===this.innerTags.length;return e&&this.$emit("on-limit"),e},selectedItemsIds(){return this.duplicateSelectItem?[]:this.tags.map(e=>e[this.uniqueSelectField]||"")}},watch:{error(){this.isError=this.error},modelValue:{immediate:!0,handler(e){this.newTag=e}},tags:{deep:!0,immediate:!0,handler(e){this.innerTags=[...e]}}},methods:{isShot(e){return!!this.$slots[e]},makeItNormal(e){this.$emit("update:modelValue",e.target.value),this.$refs.inputTag.className="v3ti-new-tag",this.$refs.inputTag.style.textDecoration="none"},resetData(){this.innerTags=[]},resetInputValue(){this.newTag="",this.$emit("update:modelValue","")},setPosition(){const e=this.$refs.inputBox,n=this.$refs.contextMenu;if(e&&n){n.style.display="block";const t=e.clientHeight||32,s=3;n.style.top=t+s+"px"}},closeContextMenu(){this.$refs.contextMenu&&(this.$refs.contextMenu.style={display:"none"})},handleSelect(e){if(this.isShowCheckmark(e)){const n=this.tags.filter(t=>e.id!==t.id);this.$emit("update:tags",n),this.$emit("on-select-duplicate-tag",e),this.resetInputValue()}else this.$emit("on-select",e);this.$nextTick(()=>{this.closeContextMenu()})},isShowCheckmark(e){return this.duplicateSelectItem?!1:this.selectedItemsIds.includes(e[this.uniqueSelectField])},focusNewTag(){this.select&&!this.disabled&&this.setPosition(),!(this.readOnly||!this.$el.querySelector(".v3ti-new-tag"))&&this.$el.querySelector(".v3ti-new-tag").focus()},handleInputFocus(e){this.isInputActive=!0,this.$emit("on-focus",e)},handleInputBlur(e){this.isInputActive=!1,this.addNew(e),this.$emit("on-blur",e)},addNew(e){if(this.select&&!this.addTagOnKeysWhenSelect)return;const n=e?this.addTagOnKeys.indexOf(e.keyCode)!==-1||this.addTagOnKeys.indexOf(e.key)!==-1:!0,t=e&&e.type!=="blur";!n&&(t||!this.addTagOnBlur)||this.isLimit||(this.newTag&&(this.allowDuplicates||this.innerTags.indexOf(this.newTag)===-1)&&this.validateIfNeeded(this.newTag)?(this.innerTags.push(this.newTag),this.addTagOnKeysWhenSelect&&(this.$emit("on-new-tag",this.newTag),this.updatePositionContextMenu()),this.resetInputValue(),this.tagChange(),e&&e.preventDefault()):(this.validateIfNeeded(this.newTag)?this.makeItError(!0):this.makeItError(!1),e&&e.preventDefault()))},updatePositionContextMenu(){this.$nextTick(()=>{this.setPosition()})},makeItError(e){this.newTag!==""&&(this.$refs.inputTag.className="v3ti-new-tag v3ti-new-tag--error",this.$refs.inputTag.style.textDecoration="underline",this.$emit("on-error",e))},validateIfNeeded(e){return this.validate===""||this.validate===void 0?!0:typeof this.validate=="function"?this.validate(e):!0},removeLastTag(){this.newTag||(this.innerTags.pop(),this.tagChange(),this.updatePositionContextMenu())},remove(e){this.innerTags.splice(e,1),this.tagChange(),this.$emit("on-remove",e),this.updatePositionContextMenu()},tagChange(){this.$emit("on-tags-changed",this.innerTags)}}};const oe={key:1,class:"v3ti-tag-content"},se=["onClick"],le=["placeholder","disabled"],de={key:0,class:"v3ti-loading"},ue={key:1,class:"v3ti-no-data"},ce={key:1},he={key:2},fe=["onClick"],ve={class:"v3ti-context-item--label"},pe={key:0,class:"v3ti-icon-selected-tag",width:"44",height:"44",viewBox:"0 0 24 24","stroke-width":"1.5",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},ge=m("path",{stroke:"none",d:"M0 0h24v24H0z"},null,-1),me=m("path",{d:"M5 12l5 5l10 -10"},null,-1),xe=[ge,me];function ye(e,n,t,s,r,i){const k=q("Loading"),T=K("click-outside");return O((l(),u("div",{onClick:n[6]||(n[6]=d=>i.focusNewTag()),class:C([{"v3ti--focus":r.isInputActive,"v3ti--error":r.isError},"v3ti"])},[m("div",{class:C(["v3ti-content",{"v3ti-content--select":t.select}]),ref:"inputBox"},[(l(!0),u(M,null,A(r.innerTags,(d,p)=>(l(),u("span",{key:p,class:"v3ti-tag"},[i.isShot("item")?I(e.$slots,"item",F(z({key:0},{name:d,index:p,tag:d}))):(l(),u("span",oe,H(d),1)),t.readOnly?y("",!0):(l(),u("a",{key:2,onClick:B(a=>i.remove(p),["prevent","stop"]),class:"v3ti-remove-tag"},null,8,se))]))),128)),O(m("input",{ref:"inputTag",placeholder:t.placeholder,"onUpdate:modelValue":n[0]||(n[0]=d=>r.newTag=d),onKeydown:[n[1]||(n[1]=R(B(function(){return i.removeLastTag&&i.removeLastTag(...arguments)},["stop"]),["delete"])),n[2]||(n[2]=function(){return i.addNew&&i.addNew(...arguments)})],onBlur:n[3]||(n[3]=function(){return i.handleInputBlur&&i.handleInputBlur(...arguments)}),onFocus:n[4]||(n[4]=function(){return i.handleInputFocus&&i.handleInputFocus(...arguments)}),onInput:n[5]||(n[5]=function(){return i.makeItNormal&&i.makeItNormal(...arguments)}),class:"v3ti-new-tag",disabled:t.readOnly},null,40,le),[[$,r.newTag]])],2),t.select?(l(),u("section",{key:0,class:C(["v3ti-context-menu",{"v3ti-context-menu-no-data":!t.isShowNoData&&t.selectItems.length===0}]),ref:"contextMenu"},[t.loading?(l(),u("div",de,[i.isShot("loading")?I(e.$slots,"default",{key:0}):(l(),G(k,{key:1}))])):y("",!0),!t.loading&&t.selectItems.length===0&&t.isShowNoData?(l(),u("div",ue,[i.isShot("no-data")?I(e.$slots,"no-data",{key:0}):(l(),u("span",ce," No data "))])):y("",!0),!t.loading&&t.selectItems.length>0?(l(),u("div",he,[(l(!0),u(M,null,A(t.selectItems,(d,p)=>(l(),u("div",{key:p,class:C(["v3ti-context-item",{"v3ti-context-item--active":i.isShowCheckmark(d)}]),onClick:B(a=>i.handleSelect(d,p),["stop"])},[m("div",ve,[I(e.$slots,"select-item",F(W(d)))]),i.isShowCheckmark(d)?(l(),u("svg",pe,xe)):y("",!0)],10,fe))),128))])):y("",!0)],2)):y("",!0)],2)),[[T,i.closeContextMenu]])}var we=`.v3ti {
  border-radius: 5px;
  min-height: 32px;
  line-height: 1.4;
  background-color: #fff;
  border: 1px solid #9ca3af;
  cursor: text;
  text-align: left;
  -webkit-appearance: textfield;
  display: flex;
  flex-wrap: wrap;
  position: relative;
}
.v3ti .v3ti-icon-selected-tag {
  stroke: #19be6b;
  width: 1rem;
  height: 1rem;
  margin-left: 4px;
}
.v3ti--focus {
  outline: 0;
  border-color: #000000;
  box-shadow: 0 0 0 1px #000000;
}
.v3ti--error {
  border-color: #F56C6C;
}
.v3ti .v3ti-no-data {
  color: #d8d8d8;
  text-align: center;
  padding: 4px 7px;
}
.v3ti .v3ti-loading {
  padding: 4px 7px;
  text-align: center;
}
.v3ti .v3ti-context-menu {
  max-height: 150px;
  min-width: 150px;
  overflow: auto;
  display: none;
  outline: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0;
  padding: 5px 0;
  background: #ffffff;
  z-index: 1050;
  color: #475569;
  box-shadow: 0 3px 8px 2px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 6px 6px;
}
.v3ti .v3ti-context-menu .v3ti-context-item {
  padding: 4px 7px;
  display: flex;
  align-items: center;
}
.v3ti .v3ti-context-menu .v3ti-context-item:hover {
  background: #e8e8e8;
  cursor: pointer;
}
.v3ti .v3ti-context-menu .v3ti-context-item--label {
  flex: 1;
  min-width: 1px;
}
.v3ti .v3ti-context-menu .v3ti-context-item--active {
  color: #317CAF;
}
.v3ti .v3ti-context-menu-no-data {
  padding: 0;
}
.v3ti .v3ti-content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.v3ti .v3ti-content--select {
  padding-right: 30px;
}
.v3ti .v3ti-tag {
  display: flex;
  font-weight: 400;
  margin: 3px;
  padding: 0 5px;
  background: #317CAF;
  color: #ffffff;
  height: 27px;
  border-radius: 5px;
  align-items: center;
  max-width: calc(100% - 16px);
}
.v3ti .v3ti-tag .v3ti-tag-content {
  flex: 1;
  min-width: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.v3ti .v3ti-tag .v3ti-remove-tag {
  color: #ffffff;
  transition: opacity 0.3s ease;
  opacity: 0.5;
  cursor: pointer;
  padding: 0 5px 0 7px;
}
.v3ti .v3ti-tag .v3ti-remove-tag::before {
  content: "x";
}
.v3ti .v3ti-tag .v3ti-remove-tag:hover {
  opacity: 1;
}
.v3ti .v3ti-new-tag {
  background: transparent;
  border: 0;
  font-weight: 400;
  margin: 3px;
  outline: none;
  padding: 0 4px;
  flex: 1;
  min-width: 60px;
  height: 27px;
}
.v3ti .v3ti-new-tag--error {
  color: #F56C6C;
}`;L(we);P.render=ye;var Te=(()=>{const e=P;return e.install=n=>{n.component("Vue3TagsInput",e)},e})();export{Te as e};
