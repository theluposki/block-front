if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,t)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let l={};const c=e=>i(e,r),o={module:{uri:r},exports:l,require:c};s[r]=Promise.all(n.map((e=>o[e]||c(e)))).then((e=>(t(...e),l)))}}define(["./workbox-b634d5ce"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/AboutView-BGt9UOoz.js",revision:null},{url:"assets/AboutView-UmUCSGzB.css",revision:null},{url:"assets/ChatView-4eNRFKIu.js",revision:null},{url:"assets/ChatView-D47VeT2d.css",revision:null},{url:"assets/HashingView-C7t3Pz8o.js",revision:null},{url:"assets/HashingView-DNrn3GF_.css",revision:null},{url:"assets/index-DJ-r3zw5.js",revision:null},{url:"assets/index-TgukCUxR.css",revision:null},{url:"index.html",revision:"87dbe681490d2760726c0e5563377cc2"},{url:"registerSW.js",revision:"4056b0907139c1e143855e52767c2814"},{url:"manifest.webmanifest",revision:"2a3d1f809a090f7101a08d1b3feb1930"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute((({request:e})=>"document"===e.destination),new e.NetworkFirst({cacheName:"html-cache",plugins:[]}),"GET"),e.registerRoute((({request:e})=>["script","style"].includes(e.destination)),new e.CacheFirst({cacheName:"static-resources",plugins:[]}),"GET"),e.registerRoute((({request:e})=>"image"===e.destination),new e.CacheFirst({cacheName:"image-cache",plugins:[new e.ExpirationPlugin({maxEntries:50})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(googleapis|gstatic)\.com/,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:30})]}),"GET"),e.registerRoute(/^https:\/\/cdn\.jsdelivr\.net/,new e.CacheFirst({cacheName:"cdn-cache",plugins:[new e.ExpirationPlugin({maxEntries:20})]}),"GET")}));
