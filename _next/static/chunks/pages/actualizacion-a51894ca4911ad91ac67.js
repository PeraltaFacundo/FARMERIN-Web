_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[36],{CI88:function(t,e,r){"use strict";r.r(e);var n=r("KQm4"),a=r("HaE+"),o=r("q1tI"),i=r.n(o),c=r("UgP8"),u=r("jIy0"),l=r("hdTg"),f=r("T/rR"),s=r("QojX"),h=r("3Z9Z"),p=r("JI6e"),b=r("cWnB"),v=r("TUci"),d=r("sWYD"),y=r("gTSF"),g=r("F4te"),m=r("7Cbv"),O=r("25O0"),j=r("qKvR");i.a.createElement;function w(){w=function(){return e};var t,e={},r=Object.prototype,n=r.hasOwnProperty,a=Object.defineProperty||function(t,e,r){t[e]=r.value},o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",c=o.asyncIterator||"@@asyncIterator",u=o.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,r){return t[e]=r}}function f(t,e,r,n){var o=e&&e.prototype instanceof d?e:d,i=Object.create(o.prototype),c=new R(n||[]);return a(i,"_invoke",{value:L(t,r,c)}),i}function s(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=f;var h="suspendedStart",p="executing",b="completed",v={};function d(){}function y(){}function g(){}var m={};l(m,i,(function(){return this}));var O=Object.getPrototypeOf,j=O&&O(O(k([])));j&&j!==r&&n.call(j,i)&&(m=j);var E=g.prototype=d.prototype=Object.create(m);function N(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function x(t,e){function r(a,o,i,c){var u=s(t[a],t,o);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"==typeof f&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,i,c)}),(function(t){r("throw",t,i,c)})):e.resolve(f).then((function(t){l.value=t,i(l)}),(function(t){return r("throw",t,i,c)}))}c(u.arg)}var o;a(this,"_invoke",{value:function(t,n){function a(){return new e((function(e,a){r(t,n,e,a)}))}return o=o?o.then(a,a):a()}})}function L(e,r,n){var a=h;return function(o,i){if(a===p)throw Error("Generator is already running");if(a===b){if("throw"===o)throw i;return{value:t,done:!0}}for(n.method=o,n.arg=i;;){var c=n.delegate;if(c){var u=F(c,n);if(u){if(u===v)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(a===h)throw a=b,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);a=p;var l=s(e,r,n);if("normal"===l.type){if(a=n.done?b:"suspendedYield",l.arg===v)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(a=b,n.method="throw",n.arg=l.arg)}}}function F(e,r){var n=r.method,a=e.iterator[n];if(a===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,F(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),v;var o=s(a,e.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,v;var i=o.arg;return i?i.done?(r[e.resultName]=i.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,v):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function P(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function _(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function R(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(P,this),this.reset(!0)}function k(e){if(e||""===e){var r=e[i];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var a=-1,o=function r(){for(;++a<e.length;)if(n.call(e,a))return r.value=e[a],r.done=!1,r;return r.value=t,r.done=!0,r};return o.next=o}}throw new TypeError(typeof e+" is not iterable")}return y.prototype=g,a(E,"constructor",{value:g,configurable:!0}),a(g,"constructor",{value:y,configurable:!0}),y.displayName=l(g,u,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,l(t,u,"GeneratorFunction")),t.prototype=Object.create(E),t},e.awrap=function(t){return{__await:t}},N(x.prototype),l(x.prototype,c,(function(){return this})),e.AsyncIterator=x,e.async=function(t,r,n,a,o){void 0===o&&(o=Promise);var i=new x(f(t,r,n,a),o);return e.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},N(E),l(E,u,"Generator"),l(E,i,(function(){return this})),l(E,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=k,R.prototype={constructor:R,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(_),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function a(n,a){return c.type="throw",c.arg=e,r.next=n,a&&(r.method="next",r.arg=t),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],c=i.completion;if("root"===i.tryLoc)return a("end");if(i.tryLoc<=this.prev){var u=n.call(i,"catchLoc"),l=n.call(i,"finallyLoc");if(u&&l){if(this.prev<i.catchLoc)return a(i.catchLoc,!0);if(this.prev<i.finallyLoc)return a(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return a(i.catchLoc,!0)}else{if(!l)throw Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return a(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,v):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),_(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var a=n.arg;_(r)}return a}}throw Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:k(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),v}},e}e.default=function(){var t=Object(o.useContext)(c.a),e=t.firebase,r=t.tamboSel,i=Object(o.useState)(null),E=i[0],N=i[1],x=Object(o.useState)([]),L=x[0],F=x[1],P=Object(o.useState)([]),_=P[0],R=P[1],k=Object(o.useState)(!1),S=k[0],D=k[1];function T(){return(T=Object(a.a)(w().mark((function t(){var e;return w().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return D(!0),e=0,F([]),R([]),t.next=6,Object(y.a)(E).then((function(t){t.forEach((function(t){1!=++e&&C({erp:t[0],lactancia:t[1],categoria:t[2],estpro:t[3],fparto:t[4],estrep:t[5],fservicio:t[6],fila:e})}))}));case 6:N(null),D(!1);case 8:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function C(t){return I.apply(this,arguments)}function I(){return(I=Object(a.a)(w().mark((function t(a){var o,i,c,u,l,f,s,h,p,b,v,y;return w().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(i=!1,c="",u="",s="",p="",!a.erp||0==a.erp.length){t.next=21;break}return u=a.erp.toString(),b=!1,t.prev=8,t.next=11,e.db.collection("animal").where("idtambo","==",r.id).where("erp","in",[u,a.erp]).get().then((function(t){t.empty||t.forEach((function(t){o=t.id,b=!0}))}));case 11:t.next=18;break;case 13:t.prev=13,t.t0=t.catch(8),c="Fila N\xb0: "+a.fila+" / Error al consultar eRP: "+u,F((function(t){return[].concat(Object(n.a)(t),[c])})),i=!0;case 18:b||(c="Fila N\xb0: "+a.fila+" / eRP: "+a.erp+" - No existe el eRP en el tambo",F((function(t){return[].concat(Object(n.a)(t),[c])})),i=!0),t.next=24;break;case 21:c="Fila N\xb0: "+a.fila+" / Se debe ingresar un eRP",F((function(t){return[].concat(Object(n.a)(t),[c])})),i=!0;case 24:if(0!=a.lactancia&&(a.lactancia&&!isNaN(a.lactancia)||(c="Fila N\xb0: "+a.fila+" / eRP: "+a.erp+" - Debe ingresar el numero de lactancias ",F((function(t){return[].concat(Object(n.a)(t),[c])})),i=!0)),a.categoria?"vaca"==(l=a.categoria.trim().toLowerCase())?l="Vaca":"vaquillona"==l?l="Vaquillona":(c="Fila N\xb0: "+a.fila+" / eRP: "+a.erp+" - Categoria Incorrecta ",F((function(t){return[].concat(Object(n.a)(t),[c])})),i=!0):(c="Fila N\xb0: "+a.fila+" / eRP: "+a.erp+" - Debe ingresar categoria ",F((function(t){return[].concat(Object(n.a)(t),[c])})),i=!0),a.estpro?"seca"==(f=a.estpro.trim().toLowerCase())?f="seca":"en orde\xf1e"==f?f="En Orde\xf1e":(c="Fila N\xb0: "+a.fila+" / eRP: "+a.erp+" - Estado productivo incorrecto ",F((function(t){return[].concat(Object(n.a)(t),[c])})),i=!0):(c="Fila N\xb0: "+a.fila+" / eRP: "+a.erp+" - Debe ingresar el estado productivo ",F((function(t){return[].concat(Object(n.a)(t),[c])})),i=!0),isNaN(a.fparto)&&a.fparto)c="Fila N\xb0: "+a.fila+" / eRP: "+a.erp+" - Formato incorrecto de fecha de parto",F((function(t){return[].concat(Object(n.a)(t),[c])})),i=!0;else if(a.fparto)try{(s=new Date("1899-12-31")).setDate(s.getDate()+a.fparto),s=Object(d.a)(s,"yyyy-MM-dd")}catch(g){c="Fila N\xb0: "+a.fila+" / eRP: "+a.erp+" - Formato incorrecto de fecha de parto ",F((function(t){return[].concat(Object(n.a)(t),[c])})),i=!0}if(a.estrep?"vacia"!=(h=a.estrep.trim().toLowerCase())&&"vac\xeda"!=h&&"pre\xf1ada"!=h?(c="Fila N\xb0: "+a.fila+" / eRP: "+a.erp+" - Estado reproductivo incorrecto ",F((function(t){return[].concat(Object(n.a)(t),[c])})),i=!0):"vac\xeda"==h&&(h="vacia"):(c="Fila N\xb0: "+a.fila+" / eRP: "+a.erp+" - Debe ingresar el estado reproductivo ",F((function(t){return[].concat(Object(n.a)(t),[c])})),i=!0),isNaN(a.fservicio)&&a.fservicio)c="Fila N\xb0: "+a.fila+" / eRP: "+a.erp+" - Formato incorrecto de fecha de servicio",F((function(t){return[].concat(Object(n.a)(t),[c])})),i=!0;else if(a.fservicio)try{(p=new Date("1899-12-31")).setDate(p.getDate()+a.fservicio),p=Object(d.a)(p,"yyyy-MM-dd")}catch(g){c="Fila N\xb0: "+a.fila+" / eRP: "+a.erp+" - Formato incorrecto de fecha de servicio ",F((function(t){return[].concat(Object(n.a)(t),[c])})),i=!0}if("En Orde\xf1e"!=f||s||(c="Fila N\xb0: "+a.fila+" / eRP: "+a.erp+" - Debe ingresar la fecha del ultimo parto",F((function(t){return[].concat(Object(n.a)(t),[c])})),i=!0),"pre\xf1ada"==h?(1,p||(c="Fila N\xb0: "+a.fila+" / eRP: "+a.erp+" - Debe ingresar la fecha del ultimo servicio",F((function(t){return[].concat(Object(n.a)(t),[c])})),i=!0)):0,i){t.next=46;break}return t.prev=33,v={lactancia:a.lactancia,estpro:f,estrep:h,fparto:s,fservicio:p,categoria:l,erp:u},t.next=37,e.db.collection("animal").doc(o).update(v);case 37:y="Fila N\xb0: "+a.fila+" / eRP: "+a.erp+" - Lact.: "+a.lactancia+" - Cat.: "+l+"- Est. Prod.:"+f+"- Est. Rep.:"+h,R((function(t){return[].concat(Object(n.a)(t),[y])})),t.next=46;break;case 41:t.prev=41,t.t1=t.catch(33),c="Fila N\xb0: "+a.fila+" / eRP: "+a.erp+" -Error al actualizar el animal"+t.t1,F((function(t){return[].concat(Object(n.a)(t),[c])})),i=!0;case 46:case"end":return t.stop()}}),t,null,[[8,13],[33,41]])})))).apply(this,arguments)}return Object(j.b)(l.a,{titulo:"Actualizacion Masiva"},S?Object(j.b)(u.g,null," ",Object(j.b)(f.a,{animation:"border",variant:"info"})):Object(j.b)(u.a,null,Object(j.b)(s.a,{onSubmit:function(t){t.preventDefault(),E&&function(){T.apply(this,arguments)}()}},Object(j.b)(h.a,null,Object(j.b)(p.a,null,Object(j.b)(s.a.File,{id:"archivoExcel",onChange:function(t){var e=t.target.files[0];F([]),R([]),N(e)},required:!0})),Object(j.b)(p.a,null,Object(j.b)(b.a,{variant:"info",type:"submit",block:!0},"Actualizar Animales"))))),r?Object(j.b)(u.h,null,0!=L.length&&Object(j.b)(v.a,{variant:"danger"},Object(j.b)(v.a.Heading,null,"Se produjeron los siguientes errores:"),L.map((function(t){return Object(j.b)(g.a,{key:Object(m.a)(),info:t})}))),0!=_.length&&Object(j.b)(v.a,{variant:"success"},Object(j.b)(v.a.Heading,null,"Se actualizaron los siguientes animales:"),_.map((function(t){return Object(j.b)(g.a,{key:Object(m.a)(),info:t})})))):Object(j.b)(O.a,null))}},Wg2h:function(t,e,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/actualizacion",function(){return r("CI88")}])}},[["Wg2h",1,2,3,4,9,12,10,13,0,5,6,7,8,11,14,15,21]]]);