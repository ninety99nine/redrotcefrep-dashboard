import{R as i,u,a as p,c,b as s,d as e,w as t,e as x,F as f,r as o,o as n,h as a}from"./app-grlxYGJ_.js";import{L as g}from"./Logo-Cs_l-8dw.js";import{T as h}from"./TextHeader-CqSXahLq.js";import{L as k}from"./LargeTextHeader-Cp86HMaZ.js";import{_ as y}from"./_plugin-vue_export-helper-DlAUqK2U.js";const L={components:{Logo:g,RouterLink:i,TextHeader:h,LargeTextHeader:k},data(){return{apiState:u(),authState:p()}}},w={class:"flex h-screen flex-col px-6 py-12 lg:px-8 bg-gray-100"},T={class:"sm:mx-auto sm:w-full sm:max-w-sm"},H=s("p",{class:"text-center mt-4 text-gray-500"},"Hey, don't worry 😊",-1),b=s("p",{class:"text-center text-gray-500"},"Check out our links below to get back on track",-1),S={class:"mt-4 sm:mx-auto sm:w-full sm:max-w-sm flex space-x-4 justify-center"};function v(B,C,N,R,m,V){const d=o("Logo"),l=o("LargeTextHeader"),_=o("TextHeader"),r=o("router-link");return n(),c("div",w,[s("div",T,[e(d,{class:"mx-auto"}),e(l,{class:"mt-20"},{default:t(()=>[a("404")]),_:1}),e(_,{class:"mt-20 text-center"},{default:t(()=>[a("Sorry, we couldn't find that page")]),_:1}),H,b]),s("div",S,[m.authState.authenticated?(n(),x(r,{key:0,to:{name:"dashboard"}},{default:t(()=>[a("Dashboard")]),_:1})):(n(),c(f,{key:1},[e(r,{to:{name:"login"}},{default:t(()=>[a("Login")]),_:1}),e(r,{to:{name:"register"}},{default:t(()=>[a("Register")]),_:1})],64))])])}const E=y(L,[["render",v]]);export{E as default};
