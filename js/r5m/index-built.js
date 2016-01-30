define("r5m/modules/lib/closest",[],function(){return function(e){e.matches=e.matches||e.mozMatchesSelector||e.msMatchesSelector||e.oMatchesSelector||e.webkitMatchesSelector,e.closest=e.closest||function(t){var n=this;while(n){if(n.matches(t))break;n=n.parentElement}return n}}}),define("r5m/modules/r5mDimmer/controller",[],function(){function e(){this.title="r5mDimmer",this.name="Dimmer"}return e.prototype.init=function(e){this.dimmer=e||document.getElementsByClassName("r5m-dimmer")[0];if(!this.dimmer)throw new Error("Dimmer Element not found")},e.prototype.clickHandler=function(e,t){switch(e){case"show":this.showDimmer(t);break;case"close":this.closeDimmer();break;default:return}},e.prototype.showDimmer=function(e){var t=this;console.log("!!!",this.dimmer);if(!this.dimmer)throw new Error("Dimmer Element not found");var n=e.getAttribute("data-type"),r=e.getAttribute("data-text");n?t.showDimmerWithActionType(n,r):t.dimmer.classList.add("r5m-dimmer-active")},e.prototype.closeDimmer=function(){if(!this.dimmer)return;this.dimmer.classList.remove("r5m-dimmer-active")},e.prototype.showDimmerWithActionType=function(e,t){t=t||"";var n=this.dimmer.getElementsByClassName("r5m-dimmer-wrapper");for(var r=0;r<n.length;r++)n[r].classList.add("is-hidden");var i=this.dimmer.getElementsByClassName("r5m-dimmer-"+e)[0];i&&i.classList.remove("is-hidden"),this.dimmer.classList.add("r5m-dimmer-active")},new e}),!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define("vendor/qwest/qwest.min",[],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.qwest=e()}}(function(){var define,module,exports;return function e(t,n,r){function i(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(s)return s(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return i(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var s="function"==typeof require&&require,o=0;o<r.length;o++)i(r[o]);return i}({1:[function(e,t,n){!function(e){"use strict";var n=function(e){var t=function(e,t,n){n="function"==typeof n?n():null===n?"":void 0===n?"":n,e[e.length]=encodeURIComponent(t)+"="+encodeURIComponent(n)},n=function(e,r,i){var s,o,u;if("[object Array]"===Object.prototype.toString.call(r))for(s=0,o=r.length;o>s;s++)n(e+"["+("object"==typeof r[s]?s:"")+"]",r[s],i);else if(r&&"[object Object]"===r.toString())for(u in r)r.hasOwnProperty(u)&&(e?n(e+"["+u+"]",r[u],i,t):n(u,r[u],i,t));else if(e)t(i,e,r);else for(u in r)t(i,u,r[u]);return i};return n("",e,[]).join("&").replace(/%20/g,"+")};"object"==typeof t&&"object"==typeof t.exports?t.exports=n:"function"==typeof define&&define.amd?define([],function(){return n}):e.param=n}(this)},{}],2:[function(e,t,n){!function(e){function t(e){return"function"==typeof e}function n(e){return"object"==typeof e}function r(e){"undefined"!=typeof setImmediate?setImmediate(e):"undefined"!=typeof process&&process.nextTick?process.nextTick(e):setTimeout(e,0)}var i;e[0][e[1]]=function s(e){var u,a=[],f=[],l=function(e,t){return null==u&&null!=e&&(u=e,a=t,f.length&&r(function(){for(var e=0;e<f.length;e++)f[e]()})),u};return l.then=function(l,c){var h=s(e),d=function(){function e(r){var s,o=0;try{if(r&&(n(r)||t(r))&&t(s=r.then)){if(r===h)throw new TypeError;s.call(r,function(){o++||e.apply(i,arguments)},function(e){o++||h(!1,[e])})}else h(!0,arguments)}catch(u){o++||h(!1,[u])}}try{var r=u?l:c;t(r)?e(r.apply(i,a||[])):h(u,a)}catch(s){h(!1,[s])}};return null!=u?r(d):f.push(d),h},e&&(l=e(l)),l}}("undefined"==typeof t?[window,"pinkySwear"]:[t,"exports"])},{}],qwest:[function(_dereq_,module,exports){module.exports=function(){var global=window||this,pinkyswear=_dereq_("pinkyswear"),jparam=_dereq_("jquery-param"),defaultXdrResponseType="json",defaultDataType="post",limit=null,requests=0,request_stack=[],getXHR=function(){return global.XMLHttpRequest?new global.XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")},xhr2=""===getXHR().responseType,qwest=function(method,url,data,options,before){method=method.toUpperCase(),data=data||null,options=options||{};var nativeResponseParsing=!1,crossOrigin,xhr,xdr=!1,timeoutInterval,aborted=!1,attempts=0,headers={},mimeTypes={text:"*/*",xml:"text/xml",json:"application/json",post:"application/x-www-form-urlencoded"},accept={text:"*/*",xml:"application/xml; q=1.0, text/xml; q=0.8, */*; q=0.1",json:"application/json; q=1.0, text/*; q=0.8, */*; q=0.1"},i,j,serialized,response,sending=!1,delayed=!1,timeout_start,promise=pinkyswear(function(e){if(e["catch"]=function(t){return e.then(null,t)},e.complete=function(t){return e.then(t,t)},"pinkyswear"in options)for(i in options.pinkyswear)e[i]=options.pinkyswear[i];return e.send=function(){if(!sending){if(requests==limit)return void request_stack.push(e);if(++requests,sending=!0,timeout_start=(new Date).getTime(),xhr=getXHR(),crossOrigin&&("withCredentials"in xhr||!global.XDomainRequest||(xhr=new XDomainRequest,xdr=!0,"GET"!=method&&"POST"!=method&&(method="POST"))),xdr?xhr.open(method,url):(xhr.open(method,url,options.async,options.user,options.password),xhr2&&options.async&&(xhr.withCredentials=options.withCredentials)),!xdr)for(var t in headers)headers[t]&&xhr.setRequestHeader(t,headers[t]);if(xhr2&&"document"!=options.responseType&&"auto"!=options.responseType)try{xhr.responseType=options.responseType,nativeResponseParsing=xhr.responseType==options.responseType}catch(n){}xhr2||xdr?(xhr.onload=handleResponse,xhr.onerror=handleError):xhr.onreadystatechange=function(){4==xhr.readyState&&handleResponse()},"auto"!=options.responseType&&"overrideMimeType"in xhr&&xhr.overrideMimeType(mimeTypes[options.responseType]),before&&before(xhr),xdr?(xhr.onprogress=function(){},xhr.ontimeout=function(){},xhr.onerror=function(){},setTimeout(function(){xhr.send("GET"!=method?data:null)},0)):xhr.send("GET"!=method?data:null)}},e}),handleResponse=function(){var i,responseType;if(--requests,sending=!1,(new Date).getTime()-timeout_start>=options.timeout)return void (options.attempts&&++attempts==options.attempts?promise(!1,[new Error("Timeout ("+url+")"),xhr,response]):promise.send());request_stack.length&&request_stack.shift().send();try{if(nativeResponseParsing&&"response"in xhr&&null!==xhr.response)response=xhr.response;else if("document"==options.responseType){var frame=document.createElement("iframe");frame.style.display="none",document.body.appendChild(frame),frame.contentDocument.open(),frame.contentDocument.write(xhr.response),frame.contentDocument.close(),response=frame.contentDocument,document.body.removeChild(frame)}else{if(responseType=options.responseType,"auto"==responseType)if(xdr)responseType=defaultXdrResponseType;else{var ct=xhr.getResponseHeader("Content-Type")||"";responseType=ct.indexOf(mimeTypes.json)>-1?"json":ct.indexOf(mimeTypes.xml)>-1?"xml":"text"}switch(responseType){case"json":try{response="JSON"in global?JSON.parse(xhr.responseText):eval("("+xhr.responseText+")")}catch(e){throw"Error while parsing JSON body : "+e}break;case"xml":try{global.DOMParser?response=(new DOMParser).parseFromString(xhr.responseText,"text/xml"):(response=new ActiveXObject("Microsoft.XMLDOM"),response.async="false",response.loadXML(xhr.responseText))}catch(e){response=void 0}if(!response||!response.documentElement||response.getElementsByTagName("parsererror").length)throw"Invalid XML";break;default:response=xhr.responseText}}if("status"in xhr&&!/^2|1223/.test(xhr.status))throw xhr.status+" ("+xhr.statusText+")";promise(!0,[xhr,response])}catch(e){promise(!1,[e,xhr,response])}},handleError=function(e){--requests,promise(!1,[new Error("Connection aborted"),xhr,null])};switch(options.async="async"in options?!!options.async:!0,options.cache="cache"in options?!!options.cache:!1,options.dataType="dataType"in options?options.dataType.toLowerCase():defaultDataType,options.responseType="responseType"in options?options.responseType.toLowerCase():"auto",options.user=options.user||"",options.password=options.password||"",options.withCredentials=!!options.withCredentials,options.timeout="timeout"in options?parseInt(options.timeout,10):3e4,options.attempts="attempts"in options?parseInt(options.attempts,10):1,i=url.match(/\/\/(.+?)\//),crossOrigin=i&&(i[1]?i[1]!=location.host:!1),"ArrayBuffer"in global&&data instanceof ArrayBuffer?options.dataType="arraybuffer":"Blob"in global&&data instanceof Blob?options.dataType="blob":"Document"in global&&data instanceof Document?options.dataType="document":"FormData"in global&&data instanceof FormData&&(options.dataType="formdata"),options.dataType){case"json":data=null!==data?JSON.stringify(data):data;break;case"post":data=jparam(data)}if(options.headers){var format=function(e,t,n){return t+n.toUpperCase()};for(i in options.headers)headers[i.replace(/(^|-)([^-])/g,format)]=options.headers[i]}return"Content-Type"in headers||"GET"==method||options.dataType in mimeTypes&&mimeTypes[options.dataType]&&(headers["Content-Type"]=mimeTypes[options.dataType]),headers.Accept||(headers.Accept=options.responseType in accept?accept[options.responseType]:"*/*"),crossOrigin||"X-Requested-With"in headers||(headers["X-Requested-With"]="XMLHttpRequest"),options.cache||"Cache-Control"in headers||(headers["Cache-Control"]="no-cache"),"GET"==method&&data&&"string"==typeof data&&(url+=(/\?/.test(url)?"&":"?")+data),options.async&&promise.send(),promise};return{base:"",get:function(e,t,n,r){return qwest("GET",this.base+e,t,n,r)},post:function(e,t,n,r){return qwest("POST",this.base+e,t,n,r)},put:function(e,t,n,r){return qwest("PUT",this.base+e,t,n,r)},"delete":function(e,t,n,r){return qwest("DELETE",this.base+e,t,n,r)},map:function(e,t,n,r,i){return qwest(e.toUpperCase(),this.base+t,n,r,i)},xhr2:xhr2,limit:function(e){limit=e},setDefaultXdrResponseType:function(e){defaultXdrResponseType=e.toLowerCase()},setDefaultDataType:function(e){defaultDataType=e.toLowerCase()}}}()},{"jquery-param":1,pinkyswear:2}]},{},[1,2])("qwest")}),define("r5m/modules/feedback/controller",["vendor/qwest/qwest.min","r5m/modules/r5mDimmer/controller"],function(e,t){"use strict";function n(e){}return n.prototype.init=function(){[].forEach.call(document.querySelectorAll(".r5mFeedback__form"),function(e){this._addModernPlaceholderHandler(e),this._addSubmitHandler(e)},this)},n.prototype._addSubmitHandler=function(t){var n=this;t.onsubmit=function(){var r={};return["name","phone","mail","text"].forEach(function(e){t[e]&&(r[e]=t[e])}),e.post("/feedback",r).then(function(){n._showSuccessDialog(t)},function(){n._showSuccessDialog(t)}),!1}},n.prototype._showSuccessDialog=function(e){t.showDimmer(e)},n.prototype._addModernPlaceholderHandler=function(e){var t=this;e.addEventListener("input",function(e){t._setupPlaceholder(e.target)}),setTimeout(function(){[].forEach.call(e.getElementsByTagName("textarea"),t._setupPlaceholder),[].forEach.call(e.getElementsByTagName("input"),t._setupPlaceholder)},0)},n.prototype._setupPlaceholder=function(e){if(e.tagName!="INPUT"&&e.tagName!="TEXTAREA")return;if(e.parentNode.tagName!="LABEL")return;var t=e.parentNode.getElementsByClassName("r5mFeedback__placeholder")[0];if(!t)return;e.value?(e.classList.add("r5mFeedback__input-with-modern-placeholder"),t.classList.add("r5mFeedback__placeholder-top")):(e.classList.remove("r5mFeedback__input-with-modern-placeholder"),t.classList.remove("r5mFeedback__placeholder-top"))},n.prototype._resetFormValue=function(e){var t=this;e.reset(),[].forEach.call(e.getElementsByTagName("textarea"),t._setupPlaceholder),[].forEach.call(e.getElementsByTagName("input"),t._setupPlaceholder)},new n}),define("r5m/app",["r5m/modules/lib/closest","r5m/modules/r5mDimmer/controller","r5m/modules/feedback/controller"],function(e){return function(t){var n=[];e(window.Element.prototype);if(!t)return;t.forEach(function(e){require(["r5m/modules/"+e+"/controller"],function(e){~n.indexOf(e)||(n.push(e),e.init())})}),document.addEventListener("click",function(e){var t;e.target.dataset&&e.target.dataset.action?t=e.target:t=e.target.closest(".r5m-action");if(!t)return;var r=t.dataset.action;if(!r||typeof r!="string")return;var i=r.split("-");if(i.length<2)return;e.preventDefault(),console.log(i),n.forEach(function(e){i[0]==e.title&&e.clickHandler&&e.clickHandler(i[1],t)})})}}),define("r5m/index",["r5m/app"],function(e){e(window.r5mModules)});