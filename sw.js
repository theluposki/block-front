if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,l)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let t={};const c=e=>n(e,r),o={module:{uri:r},exports:t,require:c};s[r]=Promise.all(i.map((e=>o[e]||c(e)))).then((e=>(l(...e),t)))}}define(["./workbox-b634d5ce"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/AboutView-D73vKdVH.js",revision:null},{url:"assets/blockchain-D022tCIN.js",revision:null},{url:"assets/blockchain-UIBalfl5.css",revision:null},{url:"assets/config-BiNGfivj.css",revision:null},{url:"assets/config-t2UIZFrc.js",revision:null},{url:"assets/crypto-D8_TNsEz.js",revision:null},{url:"assets/encrypted-BKx_BORF.css",revision:null},{url:"assets/encrypted-DyiCCRle.js",revision:null},{url:"assets/hashing-C7ueeIMJ.js",revision:null},{url:"assets/hashing-XE-JeDlM.css",revision:null},{url:"assets/index-7nNj2LCV.js",revision:null},{url:"assets/index-iCYYr22m.js",revision:null},{url:"assets/index-UddTbStx.css",revision:null},{url:"assets/mineWorker-Vdxk6qtc.js",revision:null},{url:"assets/workbox-window.prod.es5-DL_hIMXg.js",revision:null},{url:"index.html",revision:"4d302055217aca88b68a5bc09e3b475b"},{url:"manifest.webmanifest",revision:"4f03738c18cdea0ea1d706090eadbd8c"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute((({request:e})=>"document"===e.destination),new e.NetworkFirst({cacheName:"html-cache",plugins:[]}),"GET"),e.registerRoute((({request:e})=>["script","style"].includes(e.destination)),new e.CacheFirst({cacheName:"static-resources",plugins:[]}),"GET"),e.registerRoute((({request:e})=>"image"===e.destination),new e.CacheFirst({cacheName:"image-cache",plugins:[new e.ExpirationPlugin({maxEntries:50})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(googleapis|gstatic)\.com/,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:30})]}),"GET"),e.registerRoute(/^https:\/\/cdn\.jsdelivr\.net/,new e.CacheFirst({cacheName:"cdn-cache",plugins:[new e.ExpirationPlugin({maxEntries:20})]}),"GET")}));
