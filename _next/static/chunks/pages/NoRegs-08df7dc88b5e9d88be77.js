_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[33],{BsWD:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r("a3WO");function o(t,e){if(t){if("string"===typeof t)return Object(n.a)(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(t,e):void 0}}},IgfB:function(t,e,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/NoRegs",function(){return r("dFB8")}])},JEAp:function(t,e,r){var n,o=o||function(t){"use strict";if(!("undefined"===typeof t||"undefined"!==typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var e=t.document,r=function(){return t.URL||t.webkitURL||t},n=e.createElementNS("http://www.w3.org/1999/xhtml","a"),o="download"in n,a=/constructor/i.test(t.HTMLElement)||t.safari,i=/CriOS\/[\d]+/.test(navigator.userAgent),c=function(e){(t.setImmediate||t.setTimeout)((function(){throw e}),0)},s=function(t){setTimeout((function(){"string"===typeof t?r().revokeObjectURL(t):t.remove()}),4e4)},u=function(t){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob([String.fromCharCode(65279),t],{type:t.type}):t},l=function(e,l,f){f||(e=u(e));var h,p=this,d="application/octet-stream"===e.type,b=function(){!function(t,e,r){for(var n=(e=[].concat(e)).length;n--;){var o=t["on"+e[n]];if("function"===typeof o)try{o.call(t,r||t)}catch(a){c(a)}}}(p,"writestart progress write writeend".split(" "))};if(p.readyState=p.INIT,o)return h=r().createObjectURL(e),void setTimeout((function(){n.href=h,n.download=l,function(t){var e=new MouseEvent("click");t.dispatchEvent(e)}(n),b(),s(h),p.readyState=p.DONE}));!function(){if((i||d&&a)&&t.FileReader){var n=new FileReader;return n.onloadend=function(){var e=i?n.result:n.result.replace(/^data:[^;]*;/,"data:attachment/file;");t.open(e,"_blank")||(t.location.href=e),e=void 0,p.readyState=p.DONE,b()},n.readAsDataURL(e),void(p.readyState=p.INIT)}(h||(h=r().createObjectURL(e)),d)?t.location.href=h:t.open(h,"_blank")||(t.location.href=h);p.readyState=p.DONE,b(),s(h)}()},f=l.prototype;return"undefined"!==typeof navigator&&navigator.msSaveOrOpenBlob?function(t,e,r){return e=e||t.name||"download",r||(t=u(t)),navigator.msSaveOrOpenBlob(t,e)}:(f.abort=function(){},f.readyState=f.INIT=0,f.WRITING=1,f.DONE=2,f.error=f.onwritestart=f.onprogress=f.onwrite=f.onabort=f.onerror=f.onwriteend=null,function(t,e,r){return new l(t,e||t.name||"download",r)})}}("undefined"!==typeof self&&self||"undefined"!==typeof window&&window||this.content);t.exports?t.exports.saveAs=o:null!==r("uQAw")&&null!==r("VRIy")&&(void 0===(n=function(){return o}.call(e,r,e,t))||(t.exports=n))},KQm4:function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));var n=r("a3WO");var o=r("BsWD");function a(t){return function(t){if(Array.isArray(t))return Object(n.a)(t)}(t)||function(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||Object(o.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},MBJH:function(t,e,r){"use strict";var n=r("wx14"),o=r("zLVn"),a=r("eC2I"),i=r.n(a),c=r("q1tI"),s=r.n(c),u=r("vUet"),l=["bsPrefix","className","striped","bordered","borderless","hover","size","variant","responsive"],f=s.a.forwardRef((function(t,e){var r=t.bsPrefix,a=t.className,c=t.striped,f=t.bordered,h=t.borderless,p=t.hover,d=t.size,b=t.variant,v=t.responsive,y=Object(o.a)(t,l),m=Object(u.a)(r,"table"),g=i()(a,m,b&&m+"-"+b,d&&m+"-"+d,c&&m+"-striped",f&&m+"-bordered",h&&m+"-borderless",p&&m+"-hover"),w=s.a.createElement("table",Object(n.a)({},y,{className:g,ref:e}));if(v){var O=m+"-responsive";return"string"===typeof v&&(O=O+"-"+v),s.a.createElement("div",{className:O},w)}return w}));e.a=f},VRIy:function(t,e){(function(e){t.exports=e}).call(this,{})},a3WO:function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}r.d(e,"a",(function(){return n}))},dFB8:function(t,e,r){"use strict";r.r(e);var n=r("KQm4"),o=r("HaE+"),a=r("q1tI"),i=r.n(a),c=r("zuR4"),s=r("JcrP"),u=r("hdTg"),l=r("UgP8"),f=r("eKFT"),h=r("MBJH"),p=r("jIy0"),d=r("ma3e"),b=r("JEAp"),v=r("qKvR");i.a.createElement;function y(){y=function(){return e};var t,e={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},a="function"==typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function l(t,e,r,n){var a=e&&e.prototype instanceof v?e:v,i=Object.create(a.prototype),c=new _(n||[]);return o(i,"_invoke",{value:N(t,r,c)}),i}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=l;var h="suspendedStart",p="executing",d="completed",b={};function v(){}function m(){}function g(){}var w={};u(w,i,(function(){return this}));var O=Object.getPrototypeOf,j=O&&O(O(T([])));j&&j!==r&&n.call(j,i)&&(w=j);var E=g.prototype=v.prototype=Object.create(w);function x(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function S(t,e){function r(o,a,i,c){var s=f(t[o],t,a);if("throw"!==s.type){var u=s.arg,l=u.value;return l&&"object"==typeof l&&n.call(l,"__await")?e.resolve(l.__await).then((function(t){r("next",t,i,c)}),(function(t){r("throw",t,i,c)})):e.resolve(l).then((function(t){u.value=t,i(u)}),(function(t){return r("throw",t,i,c)}))}c(s.arg)}var a;o(this,"_invoke",{value:function(t,n){function o(){return new e((function(e,o){r(t,n,e,o)}))}return a=a?a.then(o,o):o()}})}function N(e,r,n){var o=h;return function(a,i){if(o===p)throw Error("Generator is already running");if(o===d){if("throw"===a)throw i;return{value:t,done:!0}}for(n.method=a,n.arg=i;;){var c=n.delegate;if(c){var s=R(c,n);if(s){if(s===b)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===h)throw o=d,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=p;var u=f(e,r,n);if("normal"===u.type){if(o=n.done?d:"suspendedYield",u.arg===b)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(o=d,n.method="throw",n.arg=u.arg)}}}function R(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,R(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),b;var a=f(o,e.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,b;var i=a.arg;return i?i.done?(r[e.resultName]=i.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,b):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,b)}function P(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function _(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(P,this),this.reset(!0)}function T(e){if(e||""===e){var r=e[i];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,a=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return a.next=a}}throw new TypeError(typeof e+" is not iterable")}return m.prototype=g,o(E,"constructor",{value:g,configurable:!0}),o(g,"constructor",{value:m,configurable:!0}),m.displayName=u(g,s,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,u(t,s,"GeneratorFunction")),t.prototype=Object.create(E),t},e.awrap=function(t){return{__await:t}},x(S.prototype),u(S.prototype,c,(function(){return this})),e.AsyncIterator=S,e.async=function(t,r,n,o,a){void 0===a&&(a=Promise);var i=new S(l(t,r,n,o),a);return e.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},x(E),u(E,s,"Generator"),u(E,i,(function(){return this})),u(E,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=T,_.prototype={constructor:_,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(L),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return c.type="throw",c.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var s=n.call(i,"catchLoc"),u=n.call(i,"finallyLoc");if(s&&u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!u)throw Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,b):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),b},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),L(r),b}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;L(r)}return o}}throw Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:T(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),b}},e}var m=function(t){var e=Array.from(t.querySelectorAll("tr")),r=Array.from(e[0].querySelectorAll("th")).map((function(t){return t.textContent}));return e.slice(1).map((function(t){var e=Array.from(t.querySelectorAll("td"));return r.reduce((function(t,r,n){return t[r]=e[n].textContent,t}),{})}))};e.default=function(){var t=Object(a.useState)([]),e=(t[0],t[1]),r=Object(a.useState)(!0),i=r[0],g=r[1],w=Object(a.useContext)(l.a),O=w.firebase,j=w.tamboSel,E=Object(a.useState)([]),x=E[0],S=E[1];Object(a.useEffect)((function(){(function(){var t=Object(o.a)(y().mark((function t(){var r,n,o,a,i,s,u;return y().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,!j){t.next=28;break}return t.next=4,O.db.collection("tambo").doc(j.id).get();case 4:if(!(r=t.sent).exists){t.next=27;break}if(!(n=r.data().noreg)){t.next=24;break}return t.next=10,c.a.get(n);case 10:if(o=t.sent,a=new DOMParser,i=a.parseFromString(o.data,"text/html"),!(s=i.querySelector("table"))){t.next=21;break}return u=m(s),e(u),t.next=19,N(u);case 19:t.next=22;break;case 21:console.error("No se encontr\xf3 la tabla en los datos obtenidos");case 22:t.next=25;break;case 24:console.error("El campo no registradas no contiene una URL v\xe1lida");case 25:t.next=28;break;case 27:console.log("El documento no existe");case 28:t.next=33;break;case 30:t.prev=30,t.t0=t.catch(0),console.error("Error al obtener el campo no registradas:",t.t0);case 33:return t.prev=33,g(!1),t.finish(33);case 36:case"end":return t.stop()}}),t,null,[[0,30,33,36]])})));return function(){return t.apply(this,arguments)}})()()}),[j,O]);var N=function(){var t=Object(o.a)(y().mark((function t(e){var r;return y().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.all(e.map(function(){var t=Object(o.a)(y().mark((function t(e){var r,n,o;return y().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.RFID,t.next=3,O.db.collection("animal").where("erp","==",r).where("idtambo","==",j.id).where("mbaja","==","").get();case 3:if((n=t.sent).empty){t.next=9;break}return o=n.docs[0].data(),t.abrupt("return",{eRP:r,RP:o.rp||"N/A","EST. PRO":o.estpro||"N/A","EST. REP":o.estrep||"N/A"});case 9:return t.abrupt("return",{eRP:r,RP:"No Registrada","EST. PRO":"No Registrada","EST. REP":"No Registrada"});case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()));case 2:r=t.sent,S(r);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),R=function(t){for(var e=new ArrayBuffer(t.length),r=new Uint8Array(e),n=0;n!==t.length;++n)r[n]=255&t.charCodeAt(n);return e},P=Object(a.useState)("asc"),L=P[0],_=P[1],T=Object(a.useState)("asc"),k=T[0],A=T[1],I=Object(a.useState)("asc"),C=I[0],D=I[1],B=Object(a.useState)("asc"),F=B[0],z=B[1];return Object(v.b)(u.a,{titulo:"Verificaci\xf3n ingreso"},Object(v.b)("div",{className:"listaNoRegs"},Object(v.b)("h1",{className:"tituloNoRegs"},"Lista de  Animales con Estado Seco, Cria o No Registrado"),Object(v.b)("button",{className:"excelNoRegs",onClick:function(){var t=s.a.json_to_sheet(x),e=s.a.book_new();s.a.book_append_sheet(e,t,"NoRegs");var r=s.b(e,{bookType:"xlsx",type:"binary"}),n=(new Date).toISOString().slice(0,10),o="ListaDeNoRegistrados_".concat(n,".xlsx");Object(b.saveAs)(new Blob([R(r)],{type:"application/octet-stream"}),o)}},"Excel")),Object(v.b)(p.b,null,i?Object(v.b)("div",{className:"loaderContainer"},Object(v.b)("div",{className:"loaderGrafico"},Object(v.b)("div",{className:"innerContent"},Object(v.b)("h1",{className:"imagenLogo"}))),Object(v.b)("h2",{className:"textoLoader"},"OBTENIENDO INFORMACION")):Object(v.b)(f.a,{height:450},0===x.length?Object(v.b)("div",{className:"divRaciones"},Object(v.b)("h1",{className:"tituloRacionesAviso"},"Aviso "),Object(v.b)("h2",{className:"tituloRacionesAviso"},"No se pudo obtener los animales no registrados")):Object(v.b)(h.a,{responsive:!0},Object(v.b)("thead",null,Object(v.b)("tr",null,Object(v.b)("th",{onClick:function(t){if(t.preventDefault(),"asc"===L){var e=x.sort((function(t,e){return t.eRP<e.eRP?1:-1}));_("desc"),S(Object(n.a)(e))}else{var r=x.sort((function(t,e){return t.eRP>e.eRP?1:-1}));_("asc"),S(Object(n.a)(r))}}},"eRP  ",Object(v.b)(d.i,{size:15})),Object(v.b)("th",{onClick:function(t){if(t.preventDefault(),"asc"===k){var e=x.sort((function(t,e){return t.RP<e.RP?1:-1}));A("desc"),S(Object(n.a)(e))}else{var r=x.sort((function(t,e){return t.RP>e.RP?1:-1}));A("asc"),S(Object(n.a)(r))}}},"RP  ",Object(v.b)(d.i,{size:15})),Object(v.b)("th",{onClick:function(t){if(t.preventDefault(),"asc"===C){var e=x.sort((function(t,e){return t.ESTPROD<e.ESTPROD?1:-1}));D("desc"),S(Object(n.a)(e))}else{var r=x.sort((function(t,e){return t.ESTPROD>e.ESTPROD?1:-1}));D("asc"),S(Object(n.a)(r))}}},"EST. PRO  ",Object(v.b)(d.i,{size:15})),Object(v.b)("th",{onClick:function(t){if(t.preventDefault(),"asc"===F){var e=x.sort((function(t,e){return t.ESTREP<e.ESTREP?1:-1}));z("desc"),S(Object(n.a)(e))}else{var r=x.sort((function(t,e){return t.ESTREP>e.ESTREP?1:-1}));z("asc"),S(Object(n.a)(r))}}},"EST. REP  ",Object(v.b)(d.i,{size:15})))),Object(v.b)("tbody",null,x.map((function(t,e){return Object(v.b)("tr",{key:e},Object.values(t).map((function(t,e){return Object(v.b)("td",{key:e},t)})))})))))))}},eKFT:function(t,e,r){"use strict";var n=r("q1tI"),o=r.n(n),a=r("17x9"),i=r.n(a),c=r("EVdn"),s=r.n(c);var u=function(t){var e,r;function n(e){return t.call(this,e)||this}r=t,(e=n).prototype=Object.create(r.prototype),e.prototype.constructor=e,e.__proto__=r;var a=n.prototype;return a.componentDidMount=function(){var t=this.tableContainer;s()(t).on("scroll",(function(){var t="translate(0,"+s()(this).scrollTop()+"px)";s()(this).find("thead").css("transform",t)}))},a.render=function(){var t=this,e=this.props;return o.a.createElement("div",{style:{overflow:"hidden",height:e.hiddenHorizontalScrollbar?e.height-15:""}},o.a.createElement("div",{ref:function(e){return t.tableContainer=e},className:this.props.className,style:{overflow:"auto",height:e.height,width:e.hiddenVerticalScrollbar?"calc(100% + 15px)":"100%"}},e.children))},n}(o.a.Component);u.defaultProps={height:450,hiddenVerticalScrollbar:!1,hiddenHorizontalScrollbar:!1,className:""},u.propTypes={height:i.a.number,hiddenVerticalScrollbar:i.a.bool,hiddenHorizontalScrollbar:i.a.bool,className:i.a.string},e.a=u},uQAw:function(t,e){t.exports=function(){throw new Error("define cannot be used indirect")}}},[["IgfB",1,2,3,4,9,12,10,13,17,29,0,5,6,7,8,11,19,26]]]);