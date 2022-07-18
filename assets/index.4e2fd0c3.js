import{o as r,c as d,a as n,w as h,v as u,b as m,d as f,e as l,f as _,g}from"./vendor.74f106a2.js";const v=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}};v();var C=(a,s)=>{const t=a.__vccOpts||a;for(const[i,e]of s)t[i]=e;return t};const p="https://evmtestnet.conflux123.xyz",y={data(){return{address:"",hash:"",captcha:"",coin:"cfx",captchaContent:"",captchaId:"",claiming:!1}},methods:{getCaptcha(){fetch(`${p}/v1/captcha`).then(a=>a.json()).then(a=>{this.captchaId=a.captchaId,this.captchaContent=a.content})},getFaucet(a){if(a.preventDefault(),!this.address){alert("Please enter an address");return}if(!this.captcha){alert("Please enter the captcha");return}this.claiming=!0;let s=`captchaId=${this.captchaId}&captchaVal=${this.captcha}`;this.coin==="cfx"?(s+=`&address=${this.address}`,fetch(`${p}/v1/CFX?${s}`,{method:"POST"}).then(t=>t.json()).then(t=>{this.claiming=!1,t.code===0?(alert("Claimed sucess!"),this.hash=t.data):alert("Claim failed: "+t.message)}).catch(t=>console.log(t))):fetch(`${p}/v1/ERC20?${s}`,{method:"POST",body:JSON.stringify({address:this.address,name:this.coin}),headers:{"Content-Type":"application/json"}}).then(t=>t.json()).then(t=>{this.claiming=!1,t.code===0?(alert("Claimed sucess!"),this.hash=t.data):alert("Claim failed: "+t.message)}).catch(t=>console.log(t))}},computed:{txScanLink(){return`https://evmtestnet.confluxscan.net/tx/${this.hash}`}},mounted(){console.log("App mounted"),this.getCaptcha()}},x={class:"container"},S=n("div",{class:"faucetHeader"},[n("span",null,"eSpace Faucet")],-1),k={class:"faucet-form"},O=l(" \xA0 "),T=_('<option value="cfx">CFX</option><option value="btc">BTC</option><option value="eth">ETH</option><option value="usdt">USDT</option><option value="usdc">USDC</option><option value="fc">FC</option>',6),b=[T],F={class:"captcha2btn"},I=l(" \xA0 "),N=["src"],V=l(" \xA0 "),L={key:0,class:"fa fa-spinner fa-spin"},P=l(" \xA0 Claim "),A={key:0},U=["href"],j=n("div",{class:"mt-10",style:{color:"#2c3e50"}},[n("ul",null,[n("li",null,"One address can claim one kind eSpace testnet token per hour"),n("li",null,"Click captcha image to refresh it")])],-1);function w(a,s,t,i,e,o){return r(),d("div",x,[S,n("form",k,[n("div",null,[h(n("input",{type:"text","onUpdate:modelValue":s[0]||(s[0]=c=>e.address=c),placeholder:"Input your hex40 address"},null,512),[[u,e.address]]),O,h(n("select",{"onUpdate:modelValue":s[1]||(s[1]=c=>e.coin=c)},b,512),[[m,e.coin]])]),n("div",F,[h(n("input",{type:"text","onUpdate:modelValue":s[2]||(s[2]=c=>e.captcha=c),placeholder:"Input the captcha"},null,512),[[u,e.captcha]]),I,n("img",{src:e.captchaContent,width:"100",onClick:s[3]||(s[3]=(...c)=>o.getCaptcha&&o.getCaptcha(...c))},null,8,N),V,n("button",{onClick:s[4]||(s[4]=(...c)=>o.getFaucet&&o.getFaucet(...c))},[e.claiming?(r(),d("i",L)):f("",!0),P])])]),e.hash?(r(),d("div",A,[n("span",null,[n("a",{href:o.txScanLink},"Check Transaction on ConfluxScan",8,U)])])):f("",!0),j])}var B=C(y,[["render",w]]);g(B).mount("#app");
