var hlib=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=new XMLHttpRequest;r.open(e.method,e.url),r.onload=function(){let o={response:r.response,status:r.status,statusText:r.statusText,headers:B(r.getAllResponseHeaders())};this.status>=200&&this.status<300?t(o):(console.log("http",e.url,this.status),n(o))},r.onerror=function(t){console.log("httpRequest",e.url,this.status),n({error:t,status:this.status,statusText:r.statusText})},e.headers&&Object.keys(e.headers).forEach(function(t){r.setRequestHeader(t,e.headers[t])}),r.send(e.params)})}function o(e,t,n){!function e(t,n,o,a,u,i){var s=2e3;t.max&&(s=t.max);var c=200;s<=c&&(c=s),i&&(l(i).innerHTML+=".");var d={method:"get",url:`https://hypothes.is/api/search?_separate_replies=true&limit=${c}&offset=${o}`,headers:{},params:{}};["group","user","tag","url","any"].forEach(function(e){if(t[e]){var n=encodeURIComponent(t[e]);d.url+=`&${e}=${n}`}}),r(d=f(d)).then(function(r){let l=r,d=JSON.parse(l.response);a=a.concat(d.rows),u=u.concat(d.replies),0===d.rows.length||a.length>=s?n(a,u):e(t,n,o+c,a,u,i)})}(e,t,0,[],[],n)}function a(e,t){return t.filter(function(t){return-1!=t.references.indexOf(e)}).map(function(e){return i(e)}).reverse()}function u(e){for(var t={},n={},r={},o={},a={},u=0;u<e.length;u++){var s=i(e[u]),c=s.id;a[c]=s;var l=s.url;l=l.replace(/\/$/,"");var d=s.updated,p=s.title;p||(p=l),l in t?(t[l]+=1,n[l].push(c),d>o.url&&(o[l]=d)):(t[l]=1,n[l]=[c],r[l]=p,o[l]=d)}return{ids:n,urlUpdates:o,annos:a,titles:r,urls:t}}function i(e){var t=e.id,n=e.uri,r=e.updated.slice(0,19),o=e.group,a=n,u=e.references?e.references:[],i=e.user.replace("acct:","").replace("@hypothes.is",""),s="";if(e.target&&e.target.length){var c=e.target[0].selector;if(c)for(var l=0;l<c.length;l++){let e=c[l];"TextQuoteSelector"===e.type&&(s=e.exact)}}var d=e.text?e.text:"",p=e.tags;try{a="object"==typeof(a=e.document.title)?a[0]:n}catch(e){a=n}return{id:t,url:n,updated:r,title:a,refs:u,isReply:u.length>0,isPagenote:e.target&&!e.target[0].hasOwnProperty("selector"),user:i,text:d,quote:s,tags:p,group:o,target:e.target}}function s(e){var t={},n=e[0];if(n){var r=n.selector;if(r){var o=r.filter(function(e){return"TextQuoteSelector"===e.type});o.length&&(t.TextQuote={exact:o[0].exact,prefix:o[0].prefix,suffix:o[0].suffix});var a=r.filter(function(e){return"TextPositionSelector"===e.type});a.length&&(t.TextPosition={start:a[0].start,end:a[0].end})}}return t}function c(e,t){t=t?"?"+t:window.location.href,e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var n=new RegExp("[\\?&]"+e+"=([^&#]*)").exec(t);return null==n?"":n[1]}function l(e){return document.getElementById(e)}function d(e){document.body.appendChild(e)}function p(e){var t=document.createElement("a");return t.href=e,t.hostname}function f(e,t){return t||(t=h()),t&&(e.headers={Authorization:"Bearer "+t,"Content-Type":"application/json;charset=utf-8"}),e}function h(){return S("h_token")}function g(){return S("h_user")}function v(){var e=S("h_group");return""!=e?e:"__world__"}function m(){$("tokenForm","h_token")}function y(){$("userForm","h_user")}function x(){$("groupForm","h_group")}function $(e,t){var n=l(e);localStorage.setItem(t,n.value)}function S(e,t){var n=c(e);if(""===n){let t=localStorage.getItem(`${e}`);n=t||""}return n&&""!==n||!t||(n=t),n||(n=""),n}function T(e,t){return{read:["group:"+t],update:["acct:"+e+"@hypothes.is"],delete:["acct:"+e+"@hypothes.is"]}}function _(e,t,n){let r={type:"TextQuoteSelector",exact:e,prefix:"",suffix:""};return t&&(r.prefix=t),n&&(r.suffix=n),r}function b(e,t){return{type:"TextPositionSelector",start:e,end:t}}function w(e){let t,n;e.exact&&(t=_(e.exact,e.prefix,e.suffix)),e.start&&e.end&&(n=b(e.start,e.end));var r={source:e.uri};if(t){var o=[t];n&&o.push(n),r.selector=o}var a={uri:e.uri,group:e.group,permissions:T(e.username,e.group),text:e.text,document:{title:[e.uri]},tags:e.tags?e.tags:[]};return r&&(a.target=[r]),e.extra&&(a.extra=e.extra),JSON.stringify(a)}function A(e,t){var n={method:"post",params:e,url:"https://hypothes.is/api/annotations",headers:{}};return r(n=f(n,t))}function k(e,t,n){return A(e,t).then(e=>{let t=e,r=t.status;if(200==r){var o=JSON.parse(t.response).uri;n&&(o+="#"+n),location.href=o}else alert(`hlib status ${r}`)}).catch(e=>{console.log(e)})}function F(e,t,n){var o={method:"put",params:n,url:`https://hypothes.is/api/annotations/${e}`,headers:{}};return r(o=f(o,t))}function H(e,t){var n={method:"delete",url:`https://hypothes.is/api/annotations/${e}`,headers:{},params:{}};return r(n=f(n,t))}function L(e){P({element:e,name:"Hypothesis API token",id:"token",value:h(),onchange:"hlib.setToken",type:"password",msg:'to write (or read private) annotations, copy/paste your <a href="https://hypothes.is/profile/developer">token</a>'})}function q(e){P({element:e,name:"Hypothesis username",id:"user",value:g(),onchange:"hlib.setUser",type:"",msg:""})}function P(e){let{element:t,name:n,id:r,value:o,onchange:a,type:u,msg:i}=e,s=`\n    <div class="formLabel">${n}</div>\n    <div class="${r}Form"><input onchange="${a}()" value="${o}" type="${u}" id="${r}Form"></input></div>\n    <div class="formMessage">${i}</div>`;return t.innerHTML+=s,t}function R(e,t,n){var r=`\n    <div class="formLabel">${t}</div>\n    <div class="${t}Form"><input id="${t}Form"></input></div>\n    <div class="formMessage">${n}</div>`;return e.innerHTML+=r,e}function I(){var e=O();localStorage.setItem("h_group",e)}function O(e){let t=e||"groupsList";t="#"+t;let n=document.querySelector(t);return n[n.selectedIndex].value}function C(e,t){let n=t||"groupsList";var o=h(),a={method:"get",url:"https://hypothes.is/api/profile",headers:{},params:{}};r(a=f(a,o)).then(t=>{let r=t,a=JSON.parse(r.response);var u="";o||(u="add token and refresh to see all groups here");var i=`\n        <div class="formLabel">Hypothesis Group</div>\n        <div class="inputForm">${function(e,t){var r=v(),o="";return e.forEach(function(e){var t="";r==e.id&&(t="selected"),o+=`<option ${t} value="${e.id}">${e.name}</option>\n`}),`\n      <select onchange="hlib.setSelectedGroup()" id="${n}">\n      ${o}\n      </select>`}(a.groups)}</div>\n        <div class="formMessage">${u}</div>`;e.innerHTML+=i}).catch(e=>{console.log(e)})}function M(e){var t=[];return e.forEach(function(e){var n=`<a target="_tag" href="./?tag=${e}"><span class="annotationTag">${e}</span></a>`;t.push(n)}),t.join(" ")}function E(e,t){var n=[e.toString(),t.updated,t.url,t.user,t.id,t.group,t.tags.join(", "),t.quote,t.text];return n.push(`https://hyp.is/${t.id}`),(n=n.map(function(e){return e&&(e=`"${e=(e=(e=(e=(e=e.replace(/&/g,"&amp;")).replace(/</g,"&lt;")).replace(/\s+/g," ")).replace(/"/g,'""')).replace(/\r?\n|\r/g," ")}"`),e})).join(",")}function U(e,t){var n=new Date(e.updated),r=n.toLocaleDateString()+" "+n.toLocaleTimeString().replace(/:\d{2}\s/," "),o=null==e.text?"":e.text;o=(new Showdown.converter).makeHtml(o);var a="";e.tags.length&&(a=M(e.tags));var u=e.user.replace("acct:","").replace("@hypothes.is",""),i=e.quote;e.quote&&(i=`<div class="annotationQuote">${e.quote}</div>`);var s=`https://hypothes.is/a/${e.id}`,c=20*t,l="in Public";return"__world__"!==e.group&&(l=`\n      in group\n      <span class="groupid"><a title="search group" target="_group" href="./?group=${e.group}">${e.group}</a>\n      </span>`),`\n    <div class="annotationCard" style="display:block; margin-left:${c}px;">\n      <div class="csvRow">${E(t,e)}</div>\n      <div class="annotationHeader">\n        <span class="user">\n        <a title="search user" target="_user"  href="./?user=${u}">${u}</a>\n        </span>\n      <span class="timestamp"><a title="view/edit/reply"  target="_standalone"\n        href="${s}">${r}</a>\n      </span>\n      ${l}\n      </div>\n      <div class="annotationBody">\n        ${i}\n        <div>${o}</div>\n        <div class="annotationTags">${a}</div>\n      </div>\n    </div>`}function j(e,t){var n=new Blob([e],{type:"application/octet-stream"}),r=URL.createObjectURL(n),o=document.createElement("a");o.href=r,o.target="_blank",o.download="hypothesis."+t,document.body.appendChild(o),o.click()}function B(e){var t={};if(!e)return t;for(var n=e.split("\r\n"),r=0;r<n.length;r++){var o=n[r],a=o.indexOf(": ");if(a>0){var u=o.substring(0,a),i=o.substring(a+2);t[u]=i}}return t}function G(){document.querySelectorAll(".urlHeading .toggle").forEach(function(e){N(e)}),z(document.querySelectorAll(".annotationCard"))}function Q(){document.querySelectorAll(".urlHeading .toggle").forEach(e=>{J(e)}),D(document.querySelectorAll(".annotationCard"))}function N(e){e.innerHTML="▶",e.title="expand"}function J(e){e.innerHTML="▼",e.title="collapse"}function D(e){for(var t=0;t<e.length;t++)e[t].style.display="block"}function z(e){for(var t=0;t<e.length;t++)e[t].style.display="none"}function X(e){var t=l("heading_"+e).querySelector(".toggle"),n=`#${`cards_${e}`} .annotationCard`,r=document.querySelectorAll(n);"block"===r[0].style.display?(N(t),z(r)):(J(t),D(r))}n.r(t),n.d(t,"httpRequest",function(){return r}),n.d(t,"hApiSearch",function(){return o}),n.d(t,"findRepliesForId",function(){return a}),n.d(t,"gatherAnnotationsByUrl",function(){return u}),n.d(t,"parseAnnotation",function(){return i}),n.d(t,"parseSelectors",function(){return s}),n.d(t,"gup",function(){return c}),n.d(t,"getById",function(){return l}),n.d(t,"appendBody",function(){return d}),n.d(t,"getDomainFromUrl",function(){return p}),n.d(t,"setApiTokenHeaders",function(){return f}),n.d(t,"getToken",function(){return h}),n.d(t,"getUser",function(){return g}),n.d(t,"getGroup",function(){return v}),n.d(t,"setToken",function(){return m}),n.d(t,"setUser",function(){return y}),n.d(t,"setGroup",function(){return x}),n.d(t,"setLocalStorageFromForm",function(){return $}),n.d(t,"getFromUrlParamOrLocalStorage",function(){return S}),n.d(t,"createPermissions",function(){return T}),n.d(t,"createTextQuoteSelector",function(){return _}),n.d(t,"createTextPositionSelector",function(){return b}),n.d(t,"createAnnotationPayload",function(){return w}),n.d(t,"postAnnotation",function(){return A}),n.d(t,"postAnnotationAndRedirect",function(){return k}),n.d(t,"updateAnnotation",function(){return F}),n.d(t,"deleteAnnotation",function(){return H}),n.d(t,"createApiTokenInputForm",function(){return L}),n.d(t,"createUserInputForm",function(){return q}),n.d(t,"createNamedInputForm",function(){return P}),n.d(t,"createFacetInputForm",function(){return R}),n.d(t,"setSelectedGroup",function(){return I}),n.d(t,"getSelectedGroup",function(){return O}),n.d(t,"createGroupInputForm",function(){return C}),n.d(t,"formatTags",function(){return M}),n.d(t,"csvRow",function(){return E}),n.d(t,"showAnnotation",function(){return U}),n.d(t,"download",function(){return j}),n.d(t,"parseResponseHeaders",function(){return B}),n.d(t,"collapseAll",function(){return G}),n.d(t,"expandAll",function(){return Q}),n.d(t,"setToggleControlCollapse",function(){return N}),n.d(t,"setToggleControlExpand",function(){return J}),n.d(t,"showCards",function(){return D}),n.d(t,"hideCards",function(){return z}),n.d(t,"toggle",function(){return X})}]);
//# sourceMappingURL=hlib.bundle.js.map