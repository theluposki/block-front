if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,t)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let l={};const c=e=>n(e,r),o={module:{uri:r},exports:l,require:c};s[r]=Promise.all(i.map((e=>o[e]||c(e)))).then((e=>(t(...e),l)))}}define(["./workbox-b634d5ce"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/AboutView-C9x9gO-7.js",revision:null},{url:"assets/AboutView-UmUCSGzB.css",revision:null},{url:"assets/HashingView-DdoOJDlQ.js",revision:null},{url:"assets/HashingView-DNrn3GF_.css",revision:null},{url:"assets/index-DbjVAQaT.js",revision:null},{url:"assets/index-DkyaBJ8q.css",revision:null},{url:"index.html",revision:"dc22947027ae807cfdb09f98627d1f73"},{url:"registerSW.js",revision:"4056b0907139c1e143855e52767c2814"},{url:"manifest.webmanifest",revision:"2a3d1f809a090f7101a08d1b3feb1930"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute((({request:e})=>"document"===e.destination),new e.NetworkFirst({cacheName:"html-cache",plugins:[]}),"GET"),e.registerRoute((({request:e})=>["script","style"].includes(e.destination)),new e.CacheFirst({cacheName:"static-resources",plugins:[]}),"GET"),e.registerRoute((({request:e})=>"image"===e.destination),new e.CacheFirst({cacheName:"image-cache",plugins:[new e.ExpirationPlugin({maxEntries:50})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(googleapis|gstatic)\.com/,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:30})]}),"GET"),e.registerRoute(/^https:\/\/cdn\.jsdelivr\.net/,new e.CacheFirst({cacheName:"cdn-cache",plugins:[new e.ExpirationPlugin({maxEntries:20})]}),"GET")}));
