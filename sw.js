if(!self.define){let s,e={};const n=(n,i)=>(n=new URL(n+".js",i).href,e[n]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=n,s.onload=e,document.head.appendChild(s)}else s=n,importScripts(n),e()})).then((()=>{let s=e[n];if(!s)throw new Error(`Module ${n} didn’t register its module`);return s})));self.define=(i,l)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let t={};const o=s=>n(s,r),u={module:{uri:r},exports:t,require:o};e[r]=Promise.all(i.map((s=>u[s]||o(s)))).then((s=>(l(...s),t)))}}define(["./workbox-b634d5ce"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/_commonjsHelpers-C4iS2aBk.js",revision:null},{url:"assets/AboutView-CAtP_h4-.js",revision:null},{url:"assets/blockchain-B1iXvU7q.js",revision:null},{url:"assets/blockchain-UIBalfl5.css",revision:null},{url:"assets/config-BjFC2WJu.js",revision:null},{url:"assets/config-BjpD_Niw.css",revision:null},{url:"assets/crypto-B1Hyz0mE.js",revision:null},{url:"assets/db-sBcmA5xO.js",revision:null},{url:"assets/encrypted-BKx_BORF.css",revision:null},{url:"assets/encrypted-Ep06Gjbt.js",revision:null},{url:"assets/hashing-DLgfejMK.js",revision:null},{url:"assets/hashing-XE-JeDlM.css",revision:null},{url:"assets/index-BoGxlpu5.js",revision:null},{url:"assets/index-CB3rfj__.js",revision:null},{url:"assets/index-UddTbStx.css",revision:null},{url:"assets/mineWorker-Vdxk6qtc.js",revision:null},{url:"assets/workbox-window.prod.es5-DL_hIMXg.js",revision:null},{url:"index.html",revision:"e96992e4f89252985d889096c8e00691"},{url:"manifest.webmanifest",revision:"4f03738c18cdea0ea1d706090eadbd8c"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"))),s.registerRoute((({request:s})=>"document"===s.destination),new s.NetworkFirst({cacheName:"html-cache",plugins:[]}),"GET"),s.registerRoute((({request:s})=>["script","style"].includes(s.destination)),new s.CacheFirst({cacheName:"static-resources",plugins:[]}),"GET"),s.registerRoute((({request:s})=>"image"===s.destination),new s.CacheFirst({cacheName:"image-cache",plugins:[new s.ExpirationPlugin({maxEntries:50})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(googleapis|gstatic)\.com/,new s.CacheFirst({cacheName:"google-fonts",plugins:[new s.ExpirationPlugin({maxEntries:30})]}),"GET"),s.registerRoute(/^https:\/\/cdn\.jsdelivr\.net/,new s.CacheFirst({cacheName:"cdn-cache",plugins:[new s.ExpirationPlugin({maxEntries:20})]}),"GET")}));
