function getChar(e){return e.which==null?e.keyCode<32?null:String.fromCharCode(e.keyCode):e.which!=0&&e.charCode!=0?e.which<32?null:String.fromCharCode(e.which):null}define("r5m/modules/lib/closest",[],function(){return function(e){e.matches=e.matches||e.mozMatchesSelector||e.msMatchesSelector||e.oMatchesSelector||e.webkitMatchesSelector,e.closest=e.closest||function(t){var n=this;while(n){if(n.matches(t))break;n=n.parentElement}return n}}}),define("r5m/modules/lib/custom-event",[],function(){return function(e){try{new window.CustomEvent("test")}catch(t){var n=function(e,t){var n;return t=t||{bubbles:!1,cancelable:!1,detail:undefined},n=document.createEvent("CustomEvent"),n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n};n.prototype=window.Event.prototype,e.CustomEvent=n}}}),define("r5m/modules/lib/dataset",[],function(){!("dataset"in document.createElement("span"))&&"Element"in window&&Element.prototype&&Object.defineProperty&&Object.defineProperty(Element.prototype,"dataset",{get:function(){var e=Object.create(null);for(var t=0;t<this.attributes.length;++t){var n=this.attributes[t];n.specified&&n.name.substring(0,5)==="data-"&&function(t,n){var r=n.replace(/-([a-z])/g,function(e,t){return t.toUpperCase()});e[r]=t.getAttribute("data-"+n),Object.defineProperty(e,r,{get:function(){return t.getAttribute("data-"+n)},set:function(e){t.setAttribute("data-"+n,e)}})}(this,n.name.substring(5))}return e}})}),define("r5m/modules/r5mDimmer/controller",[],function(){function e(){this.title="r5mDimmer",this.name="Dimmer"}return e.prototype.init=function(e){this.dimmer=e||document.getElementsByClassName("r5m-dimmer")[0];if(!this.dimmer)throw new Error("Dimmer Element not found")},e.prototype.clickHandler=function(e,t){switch(e){case"show":this.showDimmer(t);break;case"close":this.closeDimmer();break;default:return}},e.prototype.showDimmer=function(e,t){var n=this;if(!this.dimmer)throw new Error("Dimmer Element not found");var r=t||e.getAttribute("data-type"),i=e.getAttribute("data-text"),s=window.innerWidth-document.documentElement.clientWidth;if(!document.body.style.marginRight||document.body.style.marginRight=="0px")document.body.style.marginRight=s+"px";document.body.classList.add("with-dimmer"),r?n.showDimmerWithActionType(r,i):n.dimmer.classList.add("r5m-dimmer-active")},e.prototype.closeDimmer=function(){if(!this.dimmer)return;this.dimmer.classList.remove("r5m-dimmer-active"),setTimeout(function(){document.body.classList.remove("with-dimmer"),document.body.style.marginRight=0},250)},e.prototype.showDimmerWithActionType=function(e,t){t=t||"";var n=this.dimmer.getElementsByClassName("r5m-dimmer-wrapper");for(var r=0;r<n.length;r++)n[r].classList.add("is-hidden");var i=this.dimmer.getElementsByClassName("r5m-dimmer-"+e)[0];if(i){i.classList.remove("is-hidden");var s=i.getElementsByTagName("TEXTAREA")[0];s&&(s.value=t||"",s.dispatchEvent(new CustomEvent("input",{bubbles:!0,cancelable:!1})))}this.dimmer.classList.add("r5m-dimmer-active")},new e}),!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define("vendor/qwest/qwest.min",[],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.qwest=e()}}(function(){var define,module,exports;return function e(t,n,r){function i(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(s)return s(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return i(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var s="function"==typeof require&&require,o=0;o<r.length;o++)i(r[o]);return i}({1:[function(e,t,n){!function(e){"use strict";var n=function(e){var t=function(e,t,n){n="function"==typeof n?n():null===n?"":void 0===n?"":n,e[e.length]=encodeURIComponent(t)+"="+encodeURIComponent(n)},n=function(e,r,i){var s,o,u;if("[object Array]"===Object.prototype.toString.call(r))for(s=0,o=r.length;o>s;s++)n(e+"["+("object"==typeof r[s]?s:"")+"]",r[s],i);else if(r&&"[object Object]"===r.toString())for(u in r)r.hasOwnProperty(u)&&(e?n(e+"["+u+"]",r[u],i,t):n(u,r[u],i,t));else if(e)t(i,e,r);else for(u in r)t(i,u,r[u]);return i};return n("",e,[]).join("&").replace(/%20/g,"+")};"object"==typeof t&&"object"==typeof t.exports?t.exports=n:"function"==typeof define&&define.amd?define([],function(){return n}):e.param=n}(this)},{}],2:[function(e,t,n){!function(e){function t(e){return"function"==typeof e}function n(e){return"object"==typeof e}function r(e){"undefined"!=typeof setImmediate?setImmediate(e):"undefined"!=typeof process&&process.nextTick?process.nextTick(e):setTimeout(e,0)}var i;e[0][e[1]]=function s(e){var u,a=[],f=[],l=function(e,t){return null==u&&null!=e&&(u=e,a=t,f.length&&r(function(){for(var e=0;e<f.length;e++)f[e]()})),u};return l.then=function(l,c){var h=s(e),d=function(){function e(r){var s,o=0;try{if(r&&(n(r)||t(r))&&t(s=r.then)){if(r===h)throw new TypeError;s.call(r,function(){o++||e.apply(i,arguments)},function(e){o++||h(!1,[e])})}else h(!0,arguments)}catch(u){o++||h(!1,[u])}}try{var r=u?l:c;t(r)?e(r.apply(i,a||[])):h(u,a)}catch(s){h(!1,[s])}};return null!=u?r(d):f.push(d),h},e&&(l=e(l)),l}}("undefined"==typeof t?[window,"pinkySwear"]:[t,"exports"])},{}],qwest:[function(_dereq_,module,exports){module.exports=function(){var global=window||this,pinkyswear=_dereq_("pinkyswear"),jparam=_dereq_("jquery-param"),defaultXdrResponseType="json",defaultDataType="post",limit=null,requests=0,request_stack=[],getXHR=function(){return global.XMLHttpRequest?new global.XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")},xhr2=""===getXHR().responseType,qwest=function(method,url,data,options,before){method=method.toUpperCase(),data=data||null,options=options||{};var nativeResponseParsing=!1,crossOrigin,xhr,xdr=!1,timeoutInterval,aborted=!1,attempts=0,headers={},mimeTypes={text:"*/*",xml:"text/xml",json:"application/json",post:"application/x-www-form-urlencoded"},accept={text:"*/*",xml:"application/xml; q=1.0, text/xml; q=0.8, */*; q=0.1",json:"application/json; q=1.0, text/*; q=0.8, */*; q=0.1"},i,j,serialized,response,sending=!1,delayed=!1,timeout_start,promise=pinkyswear(function(e){if(e["catch"]=function(t){return e.then(null,t)},e.complete=function(t){return e.then(t,t)},"pinkyswear"in options)for(i in options.pinkyswear)e[i]=options.pinkyswear[i];return e.send=function(){if(!sending){if(requests==limit)return void request_stack.push(e);if(++requests,sending=!0,timeout_start=(new Date).getTime(),xhr=getXHR(),crossOrigin&&("withCredentials"in xhr||!global.XDomainRequest||(xhr=new XDomainRequest,xdr=!0,"GET"!=method&&"POST"!=method&&(method="POST"))),xdr?xhr.open(method,url):(xhr.open(method,url,options.async,options.user,options.password),xhr2&&options.async&&(xhr.withCredentials=options.withCredentials)),!xdr)for(var t in headers)headers[t]&&xhr.setRequestHeader(t,headers[t]);if(xhr2&&"document"!=options.responseType&&"auto"!=options.responseType)try{xhr.responseType=options.responseType,nativeResponseParsing=xhr.responseType==options.responseType}catch(n){}xhr2||xdr?(xhr.onload=handleResponse,xhr.onerror=handleError):xhr.onreadystatechange=function(){4==xhr.readyState&&handleResponse()},"auto"!=options.responseType&&"overrideMimeType"in xhr&&xhr.overrideMimeType(mimeTypes[options.responseType]),before&&before(xhr),xdr?(xhr.onprogress=function(){},xhr.ontimeout=function(){},xhr.onerror=function(){},setTimeout(function(){xhr.send("GET"!=method?data:null)},0)):xhr.send("GET"!=method?data:null)}},e}),handleResponse=function(){var i,responseType;if(--requests,sending=!1,(new Date).getTime()-timeout_start>=options.timeout)return void (options.attempts&&++attempts==options.attempts?promise(!1,[new Error("Timeout ("+url+")"),xhr,response]):promise.send());request_stack.length&&request_stack.shift().send();try{if(nativeResponseParsing&&"response"in xhr&&null!==xhr.response)response=xhr.response;else if("document"==options.responseType){var frame=document.createElement("iframe");frame.style.display="none",document.body.appendChild(frame),frame.contentDocument.open(),frame.contentDocument.write(xhr.response),frame.contentDocument.close(),response=frame.contentDocument,document.body.removeChild(frame)}else{if(responseType=options.responseType,"auto"==responseType)if(xdr)responseType=defaultXdrResponseType;else{var ct=xhr.getResponseHeader("Content-Type")||"";responseType=ct.indexOf(mimeTypes.json)>-1?"json":ct.indexOf(mimeTypes.xml)>-1?"xml":"text"}switch(responseType){case"json":try{response="JSON"in global?JSON.parse(xhr.responseText):eval("("+xhr.responseText+")")}catch(e){throw"Error while parsing JSON body : "+e}break;case"xml":try{global.DOMParser?response=(new DOMParser).parseFromString(xhr.responseText,"text/xml"):(response=new ActiveXObject("Microsoft.XMLDOM"),response.async="false",response.loadXML(xhr.responseText))}catch(e){response=void 0}if(!response||!response.documentElement||response.getElementsByTagName("parsererror").length)throw"Invalid XML";break;default:response=xhr.responseText}}if("status"in xhr&&!/^2|1223/.test(xhr.status))throw xhr.status+" ("+xhr.statusText+")";promise(!0,[xhr,response])}catch(e){promise(!1,[e,xhr,response])}},handleError=function(e){--requests,promise(!1,[new Error("Connection aborted"),xhr,null])};switch(options.async="async"in options?!!options.async:!0,options.cache="cache"in options?!!options.cache:!1,options.dataType="dataType"in options?options.dataType.toLowerCase():defaultDataType,options.responseType="responseType"in options?options.responseType.toLowerCase():"auto",options.user=options.user||"",options.password=options.password||"",options.withCredentials=!!options.withCredentials,options.timeout="timeout"in options?parseInt(options.timeout,10):3e4,options.attempts="attempts"in options?parseInt(options.attempts,10):1,i=url.match(/\/\/(.+?)\//),crossOrigin=i&&(i[1]?i[1]!=location.host:!1),"ArrayBuffer"in global&&data instanceof ArrayBuffer?options.dataType="arraybuffer":"Blob"in global&&data instanceof Blob?options.dataType="blob":"Document"in global&&data instanceof Document?options.dataType="document":"FormData"in global&&data instanceof FormData&&(options.dataType="formdata"),options.dataType){case"json":data=null!==data?JSON.stringify(data):data;break;case"post":data=jparam(data)}if(options.headers){var format=function(e,t,n){return t+n.toUpperCase()};for(i in options.headers)headers[i.replace(/(^|-)([^-])/g,format)]=options.headers[i]}return"Content-Type"in headers||"GET"==method||options.dataType in mimeTypes&&mimeTypes[options.dataType]&&(headers["Content-Type"]=mimeTypes[options.dataType]),headers.Accept||(headers.Accept=options.responseType in accept?accept[options.responseType]:"*/*"),crossOrigin||"X-Requested-With"in headers||(headers["X-Requested-With"]="XMLHttpRequest"),options.cache||"Cache-Control"in headers||(headers["Cache-Control"]="no-cache"),"GET"==method&&data&&"string"==typeof data&&(url+=(/\?/.test(url)?"&":"?")+data),options.async&&promise.send(),promise};return{base:"",get:function(e,t,n,r){return qwest("GET",this.base+e,t,n,r)},post:function(e,t,n,r){return qwest("POST",this.base+e,t,n,r)},put:function(e,t,n,r){return qwest("PUT",this.base+e,t,n,r)},"delete":function(e,t,n,r){return qwest("DELETE",this.base+e,t,n,r)},map:function(e,t,n,r,i){return qwest(e.toUpperCase(),this.base+t,n,r,i)},xhr2:xhr2,limit:function(e){limit=e},setDefaultXdrResponseType:function(e){defaultXdrResponseType=e.toLowerCase()},setDefaultDataType:function(e){defaultDataType=e.toLowerCase()}}}()},{"jquery-param":1,pinkyswear:2}]},{},[1,2])("qwest")}),define("r5m/modules/feedback/controller",["vendor/qwest/qwest.min","r5m/modules/r5mDimmer/controller"],function(e,t){"use strict";function n(){this._service="formspree",window.r5m&&window.r5m.app.FEEDBACK_SERVICE&&(this._service=window.r5m.app.FEEDBACK_SERVICE)}return n.prototype.init=function(){[].forEach.call(document.querySelectorAll(".r5mFeedback__form"),function(e){this._addModernPlaceholderHandler(e),this._addSubmitHandler(e)},this)},n.prototype._disableSubmit=function(e){try{var t=e.getElementsByClassName("submit-button")[0];t.disabled=!0,t.dataset.value=t.innerHTML,t.innerHTML="Подождите пожалуйста..."}catch(n){console.log(n)}},n.prototype._enableSubmit=function(e){try{var t=e.getElementsByClassName("submit-button")[0];t.disabled=!1,t.dataset.value&&(t.innerHTML=t.dataset.value)}catch(n){console.log(n)}},n.prototype._addSubmitHandler=function(e){var t=this;e.onsubmit=function(){var n={};return t._disableSubmit(e),["name","phone","email","text"].forEach(function(t){e[t]&&(n[t]=e[t].value)}),t._reachYandexGoal(e.dataset.metrikaGoal),t.send(n).then(function(){t._showSuccessDialog(e,"thanks"),t._enableSubmit(e)},function(){t._showSuccessDialog(e,"oops"),t._enableSubmit(e)}),!1}},n.prototype.send=function(t){if(!t)throw new Error("Data required to send message");switch(this._service){case"emailjs":try{return window.emailjs.send("info","callme",t)}catch(n){console.log("error sending with emailjs.com")}break;case"formspree":default:return t._subject="Сообщение на сайте",e.post("http://formspree.io/milikhin@gmail.com",t,{cache:!0,headers:{Accept:"application/json"}})}},n.prototype._getMessage=function(e){if(!e)throw new Error("Data required to generate message");var t="";for(var n in e)t+="<li>"+e[n]+"</li>";return"			<p>Это сообщение было сформировано с помощью формы обратной связи на сайте.</p>			<ul>				"+t+"			</ul>		"},n.prototype._showSuccessDialog=function(e,n){console.log(e,n),t.showDimmer(e,n)},n.prototype._addModernPlaceholderHandler=function(e){var t=this;e.addEventListener("input",function(e){t._setupPlaceholder(e.target)}),setTimeout(function(){[].forEach.call(e.getElementsByTagName("textarea"),t._setupPlaceholder),[].forEach.call(e.getElementsByTagName("input"),t._setupPlaceholder)},0)},n.prototype._setupPlaceholder=function(e){if(e.tagName!="INPUT"&&e.tagName!="TEXTAREA")return;if(e.parentNode.tagName!="LABEL")return;var t=e.parentNode.getElementsByClassName("r5mFeedback__placeholder")[0];if(!t)return;e.value?(e.classList.add("r5mFeedback__input-with-modern-placeholder"),t.classList.add("r5mFeedback__placeholder-top")):(e.classList.remove("r5mFeedback__input-with-modern-placeholder"),t.classList.remove("r5mFeedback__placeholder-top"))},n.prototype._resetFormValue=function(e){var t=this;e.reset(),[].forEach.call(e.getElementsByTagName("textarea"),t._setupPlaceholder),[].forEach.call(e.getElementsByTagName("input"),t._setupPlaceholder)},n.prototype._reachYandexGoal=function(e){try{var t=window.r5m.yandex;window["yaCounter"+t.COUNTER_IR].reachGoal(e||t.DEFAULT_GOAL)}catch(n){console.log("Error in metrika")}},new n}),define("r5m/modules/gallery/ui",[],function(){function t(t,n){var r=this;n=n||t;if(!t||!n)return;this.images=[],this.imageClass=t,this.linkClass=n,this.imageElems=e("."+t),[].forEach.call(this.imageElems,function(e){r.images.filter(function(t){return t.url==e.dataset.href}).length||r.images.push({url:e.dataset.href,alt:e.dataset.alt||e.getAttribute("alt")||""})}),console.log(r.images),this.currentIndex=0,this.total=this.images.length,this._onKeyHandler=this._onKey.bind(this)}var e=document.querySelectorAll.bind(document);return t.prototype.init=function(){var e=document.createElement("div"),t=document.createElement("img"),n=document.createElement("figure"),r=document.createElement("figcaption"),i=document.createElement("span"),s=document.createElement("div"),o=this;s.innerHTML='<i class="fa fa-spin fa-refresh"></i>',s.classList.add("image-zoomer__loading"),s.classList.add("image-zoomer__loading-visible"),this.loader=s,e.classList.add("image-zoomer"),t.classList.add("image-zoomer__image"),t.classList.add("fade"),n.appendChild(t),n.appendChild(r),r.appendChild(i),r.appendChild(s),e.appendChild(n),document.body.appendChild(e),this.slider=e,this.sliderCaptionElem=i,this.preloaderImgElem=document.createElement("img"),this.sliderImageElem=t,this.preloaderImgElem.onload=function(){t.classList.remove("fade-in"),t.classList.add("fade-out");var e=this;setTimeout(function(){o.sliderImageElem.src=e.src},400)},this.sliderImageElem.onload=function(){t.classList.remove("fade-out"),t.classList.add("fade-in"),s.classList.remove("image-zoomer__loading-visible")},this._createButtons(),this._registerEventHandlers()},t.prototype.open=function(){this._registerKeyboardEvents(),this.slider.classList.add("visible")},t.prototype.close=function(){this._unregisterKeyboardEvents(),this.slider.classList.remove("visible")},t.prototype._createButtons=function(){var e=document.createElement("nav"),t=document.createElement("button"),n=document.createElement("button"),r=document.createElement("button");t.classList.add("image-zoomer__left"),n.classList.add("image-zoomer__right"),r.classList.add("image-zoomer__close"),n.innerHTML='<div class="image-zoomer__text">>></div>',t.innerHTML='<div class="image-zoomer__text"><<</div>',r.innerHTML='<i class="fa fa-close"></i>',e.appendChild(t),e.appendChild(n),e.appendChild(r),this.nextButtonElem=n,this.prevButtonElem=t,this.closeButtonElem=r,this.slider.appendChild(e)},t.prototype._registerEventHandlers=function(){console.log("Registering Zoomer event handlers");if(!this.imageClass||!this.linkClass)throw new Error("Error in gallery engine: missing requrired elements");var e=this;document.body.addEventListener("click",function(t){var n=t.target.classList.contains(e.imageClass)?t.target:t.target.closest("."+e.imageClass);if(!n)return;t.preventDefault(),e.showPicture(n.dataset.href,n.dataset.alt)}),this.nextButtonElem.onclick=function(){e.showNext()},this.prevButtonElem.onclick=function(){e.showPrev()},this.closeButtonElem.onclick=function(){e.close()}},t.prototype.showNext=function(){var e=this.normalizeImageNumber(this.currentNumber+1);this._oops=this.currentNumber==e?1:0,this.showPicture(e)},t.prototype.showPrev=function(){var e=this.normalizeImageNumber(this.currentNumber-1);this._oops=this.currentNumber==e?-1:0,this.showPicture(e)},t.prototype._onKey=function(e){console.log(e.keyCode);switch(+e.keyCode){case 37:this.showPrev();break;case 39:this.showNext();break;case 27:this.close()}},t.prototype._registerKeyboardEvents=function(){document.addEventListener("keydown",this._onKeyHandler)},t.prototype._unregisterKeyboardEvents=function(){document.removeEventListener("keydown",this._onKeyHandler)},t.prototype.normalizeImageNumber=function(e){return e>=this.total&&(e=this.total-1),e<0&&(e=0),e},t.prototype.showPicture=function(e){var t=this,n=+e||+e===0?this.images[+e].url:e;if(window.innerWidth<800)return window.open(n),!1;this.slider.classList.contains("visible")||this.open(),!+e&&+e!==0&&(this._oops=0);if(this._oops)return!1;var r="";n&&(this.loader.classList.add("image-zoomer__loading-visible"),this.images.forEach(function(e,i){n==e.url&&(t.currentNumber=i,r=e.alt)}),t.prevButtonElem.classList[t.currentNumber===0?"add":"remove"]("inactive"),t.nextButtonElem.classList[t.currentNumber===t.total-1?"add":"remove"]("inactive"),t.preloaderImgElem.src=n,r?this.sliderCaptionElem.innerHTML=r+" ("+(t.currentNumber+1)+"/"+t.total+")":this.sliderCaptionElem.innerHTML="Изображение "+(t.currentNumber+1)+" из "+t.total)},t}),define("r5m/modules/gallery/controller",["./ui"],function(e){function n(){this.title="gallery",this.name="Галерея изображений",this._selector=".r5m-custom-page, .gallery-container",this._photos={},this.ui=(new e("r5m-gallery-img","r5m-gallery-link")).init()}var t=document.querySelectorAll.bind(document);return n.prototype.init=function(){this.pageElems=t(this._selector),this._updatePhotosList()},n.prototype._updatePhotosList=function(){[].forEach.call(this.pageElems,function(e){this._photos[e.dataset.pageId]=[];var t=e.getElementsByClassName("r5m-gallery-img");[].forEach.call(t,function(t){this._photos[e.dataset.pageId].push(t.dataset.fileName)},this)},this),console.log("photos now: ",this._photos)},new n}),define("r5m/modules/carousel/carousel",[],function(){"use strict";function e(e,t){var n=this;this.settings={step:t?t.step||1:1,isRounded:t?t.rounded:!0,classNames:{leftButton:"carousel__left-button",rightButton:"carousel__right-button",content:"carousel__content",item:"carousel__item",contentWrapper:"carousel__inner-wrapper",animation:"carousel__animation"}},this.carouselElem=e,this.init(),this.items=e.getElementsByClassName(this.settings.classNames.item),this.realItemsCount=this.items.length,this.totalItemsCount=this.items.length+(this.settings.isRounded?2:0),this.settings.isRounded&&(this._createCloneNodes(),this._enableInfinityRoundLoop()),this._createNavigationButtons(),this.startup(),window.addEventListener("resize",this.resize.bind(this))}return e.prototype.resize=function(){var e=+this.carouselContentElem.getAttribute("data-carousel-currentSlide");this.carouselContentElem.classList.remove(this.settings.classNames.animation),this.moveToSlide(e)},e.prototype.moveLeft=function(){this._shiftCarousel(-1)},e.prototype.moveRight=function(){this._shiftCarousel(1)},e.prototype._shiftCarousel=function(e){var t=+this.carouselContentElem.getAttribute("data-carousel-currentSlide"),n=t+e;this.carouselContentElem.classList.add(this.settings.classNames.animation),this.moveToSlide(n)},e.prototype.moveToSlide=function(e){var t=this.carouselContentElem.scrollWidth,n=-t/this.totalItemsCount*e;if(n>0)return;if(n<=-t||n>=this.carouselElem.clientWidth)return;this.carouselContentElem.style.transform="translateX("+n+"px)",this.carouselContentElem.setAttribute("data-carousel-offset",n),this.carouselContentElem.setAttribute("data-carousel-currentSlide",e)},e.prototype.init=function(){var e=this.settings,t=this.carouselElem,n=document.createElement("div");n.appendChild(t.firstElementChild),n.classList.add(e.classNames.contentWrapper),n.firstElementChild.classList.add(e.classNames.content),[].forEach.call(n.firstElementChild.children,function(t){t.classList.add(e.classNames.item)}),t.appendChild(n),this.carouselContentElem=this.carouselElem.getElementsByClassName(this.settings.classNames.content)[0]},e.prototype._createCloneNodes=function(){var e=this.items[0],t=this.items[this.items.length-1],n=e.cloneNode(!0),r=t.cloneNode(!0);n.classList.add("first-clone"),r.classList.add("last-clone"),this.carouselContentElem.insertBefore(r,e),this.carouselContentElem.insertBefore(n,t.nextSibling)},e.prototype._createNavigationButtons=function(){this.carouselElem.getElementsByClassName(this.settings.classNames.leftButton)[0].addEventListener("click",this.moveLeft.bind(this)),this.carouselElem.getElementsByClassName(this.settings.classNames.rightButton)[0].addEventListener("click",this.moveRight.bind(this))},e.prototype.startup=function(){this.carouselContentElem.classList.remove(this.settings.classNames.animation),this.moveToSlide(this.settings.isRounded?1:0)},e.prototype._enableInfinityRoundLoop=function(){var e=this,t=function(){var t=+this.carouselContentElem.getAttribute("data-carousel-currentSlide");t===0?(this.carouselContentElem.classList.remove(this.settings.classNames.animation),this.moveToSlide(e.totalItemsCount-2)):t===this.totalItemsCount-1&&(this.carouselContentElem.classList.remove(this.settings.classNames.animation),this.moveToSlide(1))}.bind(this);window.transitionEnd?window.transitionEnd(this.carouselContentElem).bind(t):this.carouselContentElem.addEventListener("transitionend",t)},e}),define("r5m/modules/carousel/controller",["./carousel"],function(e){function t(){}return console.log(e),t.prototype.init=function(){[].forEach.call(document.querySelectorAll(".carousel"),function(t){new e(t)})},new t}),define("r5m/app",["r5m/modules/lib/closest","r5m/modules/lib/custom-event","r5m/modules/lib/dataset","r5m/modules/r5mDimmer/controller","r5m/modules/feedback/controller","r5m/modules/gallery/controller","r5m/modules/carousel/controller"],function(e,t){return function(n){var r=[];e(window.Element.prototype),t(window);if(!n)return;n.forEach(function(e){require(["r5m/modules/"+e+"/controller"],function(e){~r.indexOf(e)||(r.push(e),e.init())})}),document.addEventListener("click",function(e){var t;e.target.dataset&&e.target.dataset.action?t=e.target:t=e.target.closest(".r5m-action");if(!t)return;var n=t.dataset.action;if(!n||typeof n!="string")return;var i=n.split("-");if(i.length<2)return;e.preventDefault(),console.log(i),r.forEach(function(e){i[0]==e.title&&e.clickHandler&&e.clickHandler(i[1],t)})})}}),define(["r5m/app"]);