import{_ as m,r as f,h as j,c as y,o as k,i as x,j as v,a as p,b as g,f as B,v as H,u as d}from"./index-BUbREswJ.js";import{C as M}from"./index-iCYYr22m.js";const w={"json-container":"_json-container_1yqab_22","json-key":"_json-key_1yqab_26","json-string":"_json-string_1yqab_30","json-number":"_json-number_1yqab_34","json-boolean":"_json-boolean_1yqab_38","json-null":"_json-null_1yqab_42"},S=["innerHTML"],D={__name:"JsonViewer",props:{jsonText:Object},setup(u){const n=u,s=f(""),a=()=>({key:"color: #ffb86c;",string:"color: #50fa7b;",number:"color: #bd93f9;",boolean:"color: #8be9fd;",null:"color: #ff5555;"}),r=l=>{const c=a();return typeof l!="string"&&(l=JSON.stringify(l,null,2)),l=l.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),l.replace(/("(\\u[\da-fA-F]{4}|\\[^u"]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g,e=>{let t="";return/^"/.test(e)?/:$/.test(e)?t=c.key:t=c.string:/true|false/.test(e)?t=c.boolean:/null/.test(e)?t=c.null:t=c.number,`<span style="${t}">${e}</span>`})};return j(()=>{s.value=r(n.jsonText)}),(l,c)=>(k(),y("pre",{innerHTML:s.value,class:"json-container"},null,8,S))}},T={$style:w},h=m(D,[["__cssModules",T]]),$=()=>({index:1,hash:"0000",timestamp:Date.now(),data:{},lastHash:"0000"}),q=x("blockchain",()=>{const u=f([$()]),n=f(4),s=f(""),a=f(0),r=f(!1),l=o=>{console.log(o),n.value=o},c=o=>{u.value.push(o)},e=o=>{const i=JSON.stringify(o);return M.SHA256(i).toString()},t=(o,i,b,_)=>(console.log("lastBlock: ",o),{...{index:o.index+1,timestamp:i,nonce:_,data:b,lastHash:o.hash}});return{blockchain:u,Mine:()=>{r.value=!1,s.value=null,a.value=0;const o=u.value[u.value.length-1];let i,b;const _=()=>{if(a.value++,b=Date.now(),i=t(o,b,1e3,a.value),s.value=e(i),console.log(s.value),s.value.substring(0,n.value)==="0".repeat(n.value)&&!r.value){c({...i,hash:s.value});return}r.value||setTimeout(_,0)};_()},setDifficulty:l,currentHash:{difficulty:n,hash:s,nonce:a},stop:r}}),C={class:"page-int"},J={class:"container"},V={class:"group-btns"},L={__name:"blockchain",setup(u){const n=q(),s=f(null),a=v(()=>n.blockchain),r=v(()=>n.currentHash),l=()=>{n.setDifficulty(s.value)};return(c,e)=>(k(),y("div",C,[p("div",J,[e[3]||(e[3]=p("h3",{class:"title"},"blockchain",-1)),g(h,{"json-text":r.value},null,8,["json-text"]),B(p("input",{type:"number","onUpdate:modelValue":e[0]||(e[0]=t=>s.value=t),class:"input",onKeyup:l,placeholder:"dificuldade",min:"0",max:"10"},null,544),[[H,s.value]]),p("div",V,[p("button",{class:"btn",onClick:e[1]||(e[1]=(...t)=>d(n).Mine&&d(n).Mine(...t))},"Mine"),p("button",{class:"btn",onClick:e[2]||(e[2]=t=>d(n).stop=!0)},"Stop")]),g(h,{"json-text":a.value[a.value.length-1]},null,8,["json-text"])])]))}};export{L as default};
