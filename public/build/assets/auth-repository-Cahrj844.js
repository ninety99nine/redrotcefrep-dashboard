import{j as t,a as s,u as c}from"./app-B1nu_-kd.js";const o=()=>c().apiHome._links;async function h(r){try{const e=await t.post(o().login,r);return e.status==200&&(a(e.data.accessToken),n(e.data.user)),e}catch(e){throw console.error("Login error:",e),e}}async function g(r){try{a(r);const e=await t.get(o().showAuthUser);return e.status==200&&e.data.exists&&(n(e.data.user),console.log("response.data.user"),console.log(e.data.user)),e}catch(e){throw console.error("Login error:",e),e}}async function f(r){try{return await t.post(o().validateRegister,r)}catch(e){throw console.error("Registration error:",e),e}}async function d(r){try{const e=await t.post(o().register,r);return e.status==200&&(a(e.data.accessToken),n(e.data.user)),e}catch(e){throw console.error("Registration error:",e),e}}async function p(){try{const r=s(),e=await t.post(r.user._links.logoutUser);return e.status==200&&(i(),u()),e}catch(r){throw console.error("Logout error:",r),r}}function a(r){t.defaults.headers.common.Authorization=`Bearer ${r}`,localStorage.setItem("accessToken",r)}function i(){t.defaults.headers.common.Authorization=null,localStorage.removeItem("accessToken")}function n(r){const e=s();e.authenticated=!0,e.user=r}function u(){const r=s();r.authenticated=!1,r.user=null}export{p as a,h as l,d as r,g as s,f as v};
