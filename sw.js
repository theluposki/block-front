if(!self.define){let s,e={};const n=(n,i)=>(n=new URL(n+".js",i).href,e[n]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=n,s.onload=e,document.head.appendChild(s)}else s=n,importScripts(n),e()})).then((()=>{let s=e[n];if(!s)throw new Error(`Module ${n} didn’t register its module`);return s})));self.define=(i,l)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let t={};const c=s=>n(s,r),o={module:{uri:r},exports:t,require:c};e[r]=Promise.all(i.map((s=>o[s]||c(s)))).then((s=>(l(...s),t)))}}define(["./workbox-b634d5ce"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/AboutView-DZ1wKMrn.js",revision:null},{url:"assets/blockchain-6Y1jD8Ew.js",revision:null},{url:"assets/blockchain-ztA8-Uhh.css",revision:null},{url:"assets/config-BiNGfivj.css",revision:null},{url:"assets/config-DSsZQeL0.js",revision:null},{url:"assets/crypto-C00cM6lv.js",revision:null},{url:"assets/encrypted-BKx_BORF.css",revision:null},{url:"assets/encrypted-BQ34RXrA.js",revision:null},{url:"assets/hashing-B_scFyKp.js",revision:null},{url:"assets/hashing-XE-JeDlM.css",revision:null},{url:"assets/index-CvlJnEiF.js",revision:null},{url:"assets/index-iCYYr22m.js",revision:null},{url:"assets/index-UddTbStx.css",revision:null},{url:"assets/mineWorker-Vdxk6qtc.js",revision:null},{url:"assets/workbox-window.prod.es5-DL_hIMXg.js",revision:null},{url:"index.html",revision:"4c0b383ee4b04f8367ded35504f90808"},{url:"manifest.webmanifest",revision:"4f03738c18cdea0ea1d706090eadbd8c"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"))),s.registerRoute((({request:s})=>"document"===s.destination),new s.NetworkFirst({cacheName:"html-cache",plugins:[]}),"GET"),s.registerRoute((({request:s})=>["script","style"].includes(s.destination)),new s.CacheFirst({cacheName:"static-resources",plugins:[]}),"GET"),s.registerRoute((({request:s})=>"image"===s.destination),new s.CacheFirst({cacheName:"image-cache",plugins:[new s.ExpirationPlugin({maxEntries:50})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(googleapis|gstatic)\.com/,new s.CacheFirst({cacheName:"google-fonts",plugins:[new s.ExpirationPlugin({maxEntries:30})]}),"GET"),s.registerRoute(/^https:\/\/cdn\.jsdelivr\.net/,new s.CacheFirst({cacheName:"cdn-cache",plugins:[new s.ExpirationPlugin({maxEntries:20})]}),"GET")}));
