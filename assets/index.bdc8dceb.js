import{o as i,c as l,a,w as f,v as p,b as d,t as h,d as u,e as m}from"./vendor.2aaae69a.js";const _=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}};_();var g=(n,o)=>{const t=n.__vccOpts||n;for(const[r,e]of o)t[r]=e;return t};const y="https://cfxfaucet.confluxnetwork.org/api/v1",v="6Le6QDIfAAAAAGQe665G-jCoG9JFoRuDCoJpeXX9";function A(n){grecaptcha.execute(v,{action:"submit"}).then(n)}const C={data(){return{address:"",hash:"",claiming:!1}},methods:{getFaucet(n){if(n.preventDefault(),!this.address){alert("Please enter an address");return}this.claiming=!0,A(o=>{console.log(o),fetch(`${y}/faucet?address=${this.address}&token=${o}`).then(t=>t.json()).then(t=>{if(this.claiming=!1,t.code){let r=t.message;r.match("Tx with same nonce already inserted")&&(r="Service is busy, please try again later"),alert("Claim failed: "+r)}else this.hash=t.hash,alert("Claimed success!")}).catch(t=>{this.claiming=!1,console.log("error",t),alert("Error: "+t)})})}},mounted(){console.log("App mounted")}},x={class:"container"},F=a("div",{class:"faucetHeader"},[a("span",null,"eSpace CFX Faucet")],-1),b={class:"address-form"},k=u(" \xA0 "),L={key:0,class:"fa fa-spinner fa-spin"},N=u(" \xA0 Claim "),O=a("div",{class:"mt-10",style:{color:"#2c3e50"}},[a("p",null,"One address can claim 100 testnet eSpace CFX per hour")],-1),w={key:0};function D(n,o,t,r,e,s){return i(),l("div",x,[F,a("form",b,[f(a("input",{type:"text","onUpdate:modelValue":o[0]||(o[0]=c=>e.address=c),placeholder:"Input your hex40 address"},null,512),[[p,e.address]]),k,a("button",{onClick:o[1]||(o[1]=(...c)=>s.getFaucet&&s.getFaucet(...c))},[e.claiming?(i(),l("i",L)):d("",!0),N])]),O,e.hash?(i(),l("div",w,[a("span",null,"TX Hash: "+h(e.hash),1)])):d("",!0)])}var S=g(C,[["render",D]]);m(S).mount("#app");
