import{u as c}from"./store-store-C2_eLuQh.js";import{c as o,d as e,F as d,l as h,e as m,o as a,q as p,t as u,r as _}from"./app-Kf0mCOXy.js";import{_ as g}from"./_plugin-vue_export-helper-DlAUqK2U.js";const v={data(){return{navOptions:[{label:"General",name:"show-store-general-settings"},{label:"Workflows",name:"show-store-workflows"},{label:"Social Links",name:"show-store-social-settings"},{label:"Delivery / Pickup",name:"show-store-delivery-methods"},{label:"Payment Methods",name:"show-store-payment-method-settings"}],selectedNavOption:"show-store-general-settings",storeState:c()}},watch:{},computed:{store(){return this.storeState.store}},methods:{navigateToNavOption(t){this.$router.push({name:t.name,params:{store_href:this.store._links.showStore}})},activeNavOptionClasses(t){return t.name==this.$route.name?"bg-gray-200":""}},mounted(){},created(){}},f={class:"grid grid-cols-4 gap-4 pt-8"},w={class:"col-span-1 bg-white shadow-lg border rounded-lg"},b=e("h1",{class:"font-lg font-bold p-4"},"Store Settings",-1),S={class:"overflow-hidden"},k=["onClick"],y={class:"flex items-center"},x={class:"col-span-3"};function N(t,C,O,$,n,r){const l=_("router-view");return a(),o("div",f,[e("div",w,[b,e("ul",S,[(a(!0),o(d,null,h(n.navOptions,(s,i)=>(a(),o("li",{onClick:B=>r.navigateToNavOption(s),key:i,class:p([r.activeNavOptionClasses(s),"w-full px-4 py-2 text-xs hover:bg-blue-200 active:bg-blue-300 cursor-pointer"])},[e("div",y,[e("span",null,u(s.label),1)])],10,k))),128))])]),e("div",x,[m(l)])])}const P=g(v,[["render",N]]);export{P as default};
