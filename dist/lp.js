define('r5m/modules/lib/closest',[], function () {
	// Element.prototype.closest polyfill
	return function (ELEMENT) {
		ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
		ELEMENT.closest = ELEMENT.closest || function closest(selector) {
			var element = this;
			while (element) {
				if (element.matches(selector)) {
					break;
				}
				element = element.parentElement;
			}
			return element;
		};
	};	
});

define('r5m/modules/r5mDimmer/controller',[], function () {

	function r5mDimmer() {
		this.title = 'r5mDimmer';
		this.name = 'Dimmer';
	}

	r5mDimmer.prototype.init = function (dimmerElem) {
		this.dimmer = dimmerElem || document.getElementsByClassName('r5m-dimmer')[0];
		if (!this.dimmer) {
			throw new Error('Dimmer Element not found');
		}
	};

	r5mDimmer.prototype.clickHandler = function (action, target) {
		switch (action) {
		case 'show':
			this.showDimmer(target);
			break;
		case 'close':
			this.closeDimmer();
			break;
		default:
			return;
		}
	};

	r5mDimmer.prototype.showDimmer = function (target, type) {
		var self = this;
		if (!this.dimmer) {
			throw new Error('Dimmer Element not found');
		}

		var actionType = type || target.getAttribute('data-type');
		var actionText = target.getAttribute('data-text');
		console.log(actionType);

		//по-умолчанию просто показываем dimmer
		if (!actionType) {
			self.dimmer.classList.add('r5m-dimmer-active');
		} else {
			//если есть специальный actionType
			self.showDimmerWithActionType(actionType, actionText);
		}
	};

	r5mDimmer.prototype.closeDimmer = function () {
		if (!this.dimmer) {
			return;
		}

		this.dimmer.classList.remove('r5m-dimmer-active');
	};

	r5mDimmer.prototype.showDimmerWithActionType = function (type, defaultText) {
		// Скрываем все элементы внутри dimmer
		defaultText = defaultText || '';
		var elementsToHide = this.dimmer.getElementsByClassName('r5m-dimmer-wrapper');
		for (var i = 0; i < elementsToHide.length; i++) {
			elementsToHide[i].classList.add('is-hidden');
		}

		// показываем тот, который нам нужен
		var elementToShow = this.dimmer.getElementsByClassName('r5m-dimmer-' + type)[0];
		if (elementToShow) {
			elementToShow.classList.remove('is-hidden');
		}

		this.dimmer.classList.add('r5m-dimmer-active');

		// try {
		// 	var commentsTextElem = this.dimmer.getElementsByClassName('r5mFeedback__text')[0];
		// 	// feedback.setText(commentsTextElem, defaultText);
		// } catch (err) {
		// 	console.error(err);
		// }
	};

	return new r5mDimmer();
});

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define('vendor/qwest/qwest.min',[],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.qwest=e()}}(function(){var define,module,exports;return function e(t,n,o){function r(i,a){if(!n[i]){if(!t[i]){var p="function"==typeof require&&require;if(!a&&p)return p(i,!0);if(s)return s(i,!0);var u=new Error("Cannot find module '"+i+"'");throw u.code="MODULE_NOT_FOUND",u}var d=n[i]={exports:{}};t[i][0].call(d.exports,function(e){var n=t[i][1][e];return r(n?n:e)},d,d.exports,e,t,n,o)}return n[i].exports}for(var s="function"==typeof require&&require,i=0;i<o.length;i++)r(o[i]);return r}({1:[function(e,t,n){!function(e){"use strict";var n=function(e){var t=function(e,t,n){n="function"==typeof n?n():null===n?"":void 0===n?"":n,e[e.length]=encodeURIComponent(t)+"="+encodeURIComponent(n)},n=function(e,o,r){var s,i,a;if("[object Array]"===Object.prototype.toString.call(o))for(s=0,i=o.length;i>s;s++)n(e+"["+("object"==typeof o[s]?s:"")+"]",o[s],r);else if(o&&"[object Object]"===o.toString())for(a in o)o.hasOwnProperty(a)&&(e?n(e+"["+a+"]",o[a],r,t):n(a,o[a],r,t));else if(e)t(r,e,o);else for(a in o)t(r,a,o[a]);return r};return n("",e,[]).join("&").replace(/%20/g,"+")};"object"==typeof t&&"object"==typeof t.exports?t.exports=n:"function"==typeof define&&define.amd?define([],function(){return n}):e.param=n}(this)},{}],2:[function(e,t,n){!function(e){function t(e){return"function"==typeof e}function n(e){return"object"==typeof e}function o(e){"undefined"!=typeof setImmediate?setImmediate(e):"undefined"!=typeof process&&process.nextTick?process.nextTick(e):setTimeout(e,0)}var r;e[0][e[1]]=function s(e){var i,a=[],p=[],u=function(e,t){return null==i&&null!=e&&(i=e,a=t,p.length&&o(function(){for(var e=0;e<p.length;e++)p[e]()})),i};return u.then=function(u,d){var c=s(e),f=function(){function e(o){var s,i=0;try{if(o&&(n(o)||t(o))&&t(s=o.then)){if(o===c)throw new TypeError;s.call(o,function(){i++||e.apply(r,arguments)},function(e){i++||c(!1,[e])})}else c(!0,arguments)}catch(a){i++||c(!1,[a])}}try{var o=i?u:d;t(o)?e(o.apply(r,a||[])):c(i,a)}catch(s){c(!1,[s])}};return null!=i?o(f):p.push(f),c},e&&(u=e(u)),u}}("undefined"==typeof t?[window,"pinkySwear"]:[t,"exports"])},{}],qwest:[function(_dereq_,module,exports){module.exports=function(){var global=window||this,pinkyswear=_dereq_("pinkyswear"),jparam=_dereq_("jquery-param"),defaultXdrResponseType="json",defaultDataType="post",limit=null,requests=0,request_stack=[],getXHR=function(){return global.XMLHttpRequest?new global.XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")},xhr2=""===getXHR().responseType,qwest=function(method,url,data,options,before){method=method.toUpperCase(),data=data||null,options=options||{};var nativeResponseParsing=!1,crossOrigin,xhr,xdr=!1,timeoutInterval,aborted=!1,attempts=0,headers={},mimeTypes={text:"*/*",xml:"text/xml",json:"application/json",post:"application/x-www-form-urlencoded"},accept={text:"*/*",xml:"application/xml; q=1.0, text/xml; q=0.8, */*; q=0.1",json:"application/json; q=1.0, text/*; q=0.8, */*; q=0.1"},i,j,serialized,response,sending=!1,delayed=!1,timeout_start,promise=pinkyswear(function(e){if(e["catch"]=function(t){return e.then(null,t)},e.complete=function(t){return e.then(t,t)},"pinkyswear"in options)for(i in options.pinkyswear)e[i]=options.pinkyswear[i];return e.send=function(){if(!sending){if(requests==limit)return void request_stack.push(e);if(++requests,sending=!0,timeout_start=(new Date).getTime(),xhr=getXHR(),crossOrigin&&("withCredentials"in xhr||!global.XDomainRequest||(xhr=new XDomainRequest,xdr=!0,"GET"!=method&&"POST"!=method&&(method="POST"))),xdr?xhr.open(method,url):(xhr.open(method,url,options.async,options.user,options.password),xhr2&&options.async&&(xhr.withCredentials=options.withCredentials)),!xdr)for(var t in headers)headers[t]&&xhr.setRequestHeader(t,headers[t]);if(xhr2&&"document"!=options.responseType&&"auto"!=options.responseType)try{xhr.responseType=options.responseType,nativeResponseParsing=xhr.responseType==options.responseType}catch(n){}xhr2||xdr?(xhr.onload=handleResponse,xhr.onerror=handleError):xhr.onreadystatechange=function(){4==xhr.readyState&&handleResponse()},"auto"!=options.responseType&&"overrideMimeType"in xhr&&xhr.overrideMimeType(mimeTypes[options.responseType]),before&&before(xhr),xdr?(xhr.onprogress=function(){},xhr.ontimeout=function(){},xhr.onerror=function(){},setTimeout(function(){xhr.send("GET"!=method?data:null)},0)):xhr.send("GET"!=method?data:null)}},e}),handleResponse=function(){var i,responseType;if(--requests,sending=!1,(new Date).getTime()-timeout_start>=options.timeout)return void(options.attempts&&++attempts==options.attempts?promise(!1,[new Error("Timeout ("+url+")"),xhr,response]):promise.send());request_stack.length&&request_stack.shift().send();try{if(nativeResponseParsing&&"response"in xhr&&null!==xhr.response)response=xhr.response;else if("document"==options.responseType){var frame=document.createElement("iframe");frame.style.display="none",document.body.appendChild(frame),frame.contentDocument.open(),frame.contentDocument.write(xhr.response),frame.contentDocument.close(),response=frame.contentDocument,document.body.removeChild(frame)}else{if(responseType=options.responseType,"auto"==responseType)if(xdr)responseType=defaultXdrResponseType;else{var ct=xhr.getResponseHeader("Content-Type")||"";responseType=ct.indexOf(mimeTypes.json)>-1?"json":ct.indexOf(mimeTypes.xml)>-1?"xml":"text"}switch(responseType){case"json":try{response="JSON"in global?JSON.parse(xhr.responseText):eval("("+xhr.responseText+")")}catch(e){throw"Error while parsing JSON body : "+e}break;case"xml":try{global.DOMParser?response=(new DOMParser).parseFromString(xhr.responseText,"text/xml"):(response=new ActiveXObject("Microsoft.XMLDOM"),response.async="false",response.loadXML(xhr.responseText))}catch(e){response=void 0}if(!response||!response.documentElement||response.getElementsByTagName("parsererror").length)throw"Invalid XML";break;default:response=xhr.responseText}}if("status"in xhr&&!/^2|1223/.test(xhr.status))throw xhr.status+" ("+xhr.statusText+")";promise(!0,[xhr,response])}catch(e){promise(!1,[e,xhr,response])}},handleError=function(e){--requests,promise(!1,[new Error("Connection aborted"),xhr,null])};switch(options.async="async"in options?!!options.async:!0,options.cache="cache"in options?!!options.cache:!1,options.dataType="dataType"in options?options.dataType.toLowerCase():defaultDataType,options.responseType="responseType"in options?options.responseType.toLowerCase():"auto",options.user=options.user||"",options.password=options.password||"",options.withCredentials=!!options.withCredentials,options.timeout="timeout"in options?parseInt(options.timeout,10):3e4,options.attempts="attempts"in options?parseInt(options.attempts,10):1,i=url.match(/\/\/(.+?)\//),crossOrigin=i&&(i[1]?i[1]!=location.host:!1),"ArrayBuffer"in global&&data instanceof ArrayBuffer?options.dataType="arraybuffer":"Blob"in global&&data instanceof Blob?options.dataType="blob":"Document"in global&&data instanceof Document?options.dataType="document":"FormData"in global&&data instanceof FormData&&(options.dataType="formdata"),options.dataType){case"json":data=null!==data?JSON.stringify(data):data;break;case"post":data=jparam(data)}if(options.headers){var format=function(e,t,n){return t+n.toUpperCase()};for(i in options.headers)headers[i.replace(/(^|-)([^-])/g,format)]=options.headers[i]}return"Content-Type"in headers||"GET"==method||options.dataType in mimeTypes&&mimeTypes[options.dataType]&&(headers["Content-Type"]=mimeTypes[options.dataType]),headers.Accept||(headers.Accept=options.responseType in accept?accept[options.responseType]:"*/*"),crossOrigin||"X-Requested-With"in headers||(headers["X-Requested-With"]="XMLHttpRequest"),options.cache||"Cache-Control"in headers||(headers["Cache-Control"]="no-cache"),"GET"==method&&data&&"string"==typeof data&&(url+=(/\?/.test(url)?"&":"?")+data),options.async&&promise.send(),promise};return{base:"",get:function(e,t,n,o){return qwest("GET",this.base+e,t,n,o)},post:function(e,t,n,o){return qwest("POST",this.base+e,t,n,o)},put:function(e,t,n,o){return qwest("PUT",this.base+e,t,n,o)},"delete":function(e,t,n,o){return qwest("DELETE",this.base+e,t,n,o)},map:function(e,t,n,o,r){return qwest(e.toUpperCase(),this.base+t,n,o,r)},xhr2:xhr2,limit:function(e){limit=e},setDefaultXdrResponseType:function(e){defaultXdrResponseType=e.toLowerCase()},setDefaultDataType:function(e){defaultDataType=e.toLowerCase()}}}()},{"jquery-param":1,pinkyswear:2}]},{},[1,2])("qwest")});
define('r5m/modules/feedback/controller',[
	'vendor/qwest/qwest.min',
	'r5m/modules/r5mDimmer/controller'
], function (xhr, dimmer) {
	'use strict';

	function FeedbackController() {
		// this.formElem = formElem;
		this._service = 'formspree';
		if (window.r5m && window.r5m.FEEDBACK_SERVICE) {
			this._service = window.r5m.FEEDBACK_SERVICE;
		}
	}

	FeedbackController.prototype.init = function () {
		[].forEach.call(document.querySelectorAll('.r5mFeedback__form'), function (formElem) {
			this._addModernPlaceholderHandler(formElem);
			this._addSubmitHandler(formElem);
		}, this);
	};

	FeedbackController.prototype._addSubmitHandler = function (form) {
		var self = this;

		form.onsubmit = function () {
			var data = {};
			['name', 'phone', 'email', 'text'].forEach(function (field) {
				if (form[field]) {
					data[field] = form[field].value;
				}
			});
			// xhr.post('feedback', {

			self.send(data).then(function () {
				self._showSuccessDialog(form, 'thanks');
			}, function () {
				self._showSuccessDialog(form, 'oops');
			});

			return false;
		};
	};

	FeedbackController.prototype.send = function (data) {
		if (!data) {
			throw new Error('Data required to send message');
		}

		switch (this._service) {
		case 'emailjs':
			{
				// ...
				break;
			}

		case 'formspree':
		default:
			{
				data._subject = 'Сообщение на сайте';
				return xhr.post('http://formspree.io/milikhin@gmail.com', data, {
					cache: true,
					headers: {
						'Accept': 'application/json'
					}
				});
			}
		}
	};

	FeedbackController.prototype._getMessage = function (data) {
		if (!data) {
			throw new Error('Data required to generate message');
		}
		var content = '';
		for (var i in data) {
			content += '<li>' + data[i] + '</li>';
		}

		return '\
			<p>Это сообщение было сформировано с помощью формы обратной связи на сайте.</p>\
			<ul>\
				' + content + '\
			</ul>\
		';
	};

	FeedbackController.prototype._showSuccessDialog = function (form, type) {
		console.log(form, type);
		dimmer.showDimmer(form, type);
	};

	FeedbackController.prototype._addModernPlaceholderHandler = function (form) {
		var self = this;

		form.addEventListener('input', function (e) {
			self._setupPlaceholder(e.target);
		});

		setTimeout(function () {
			[].forEach.call(form.getElementsByTagName('textarea'), self._setupPlaceholder);
			[].forEach.call(form.getElementsByTagName('input'), self._setupPlaceholder);
		}, 0);
	};

	FeedbackController.prototype._setupPlaceholder = function (target) {
		if (target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
			return;
		}
		if (target.parentNode.tagName != 'LABEL') {
			return;
		}
		var modernPlaceholder = target.parentNode.getElementsByClassName('r5mFeedback__placeholder')[0];
		if (!modernPlaceholder) return;

		if (target.value) {
			target.classList.add('r5mFeedback__input-with-modern-placeholder');
			modernPlaceholder.classList.add('r5mFeedback__placeholder-top');
		} else {
			target.classList.remove('r5mFeedback__input-with-modern-placeholder');
			modernPlaceholder.classList.remove('r5mFeedback__placeholder-top');
		}
	};

	FeedbackController.prototype._resetFormValue = function (form) {
		var self = this;
		form.reset();

		[].forEach.call(form.getElementsByTagName('textarea'), self._setupPlaceholder);
		[].forEach.call(form.getElementsByTagName('input'), self._setupPlaceholder);
	};

	return new FeedbackController();
});

define('r5m/modules/gallery/ui',[], function () {
	var $ = document.querySelectorAll.bind(document);

	/*
	* images: {
			url: оригинальное изображение
				alt: подпись
			}
			currentIndex: Current enlarged image's index (in the current gallery)
			total : Total amount of images in the gallery
	*
	*/
	function ImageZoomer(imageClass, linkClass) {
		var self = this;
		linkClass = linkClass || imageClass;
		if (!imageClass || !linkClass) {
			return;
		}

		this.images = [];
		this.imageClass = imageClass;
		this.linkClass = linkClass;
		this.imageElems = $('.' + imageClass);
		[].forEach.call(this.imageElems, function (imageElem) {
			// Что же я хотел этим сказать? О_о
			// ...ах да, если в массиве еще нет объектов с img == dataset.href, добавить его!
			if (!self.images.filter(function (img) {
					return img.url == imageElem.dataset.href;
				}).length) {
				self.images.push({
					url: imageElem.dataset.href,
					alt: imageElem.dataset.alt || imageElem.getAttribute('alt') || ""
				});
			}
		});

		console.log(self.images);
		this.currentIndex = 0;
		this.total = this.images.length;
		this._onKeyHandler = this._onKey.bind(this);
	}

	// create UI elements here
	ImageZoomer.prototype.init = function () {
		var slider = document.createElement('div');
		var sliderImage = document.createElement('img');
		var imageWrapper = document.createElement('figure');
		var imgCaption = document.createElement('figcaption');
		var imgCaptionContent = document.createElement('span');
		var loader = document.createElement('div');
		var self = this;
		loader.innerHTML = '<i class="fa fa-spin fa-refresh"></i>';
		loader.classList.add('image-zoomer__loading');
		loader.classList.add('image-zoomer__loading-visible');
		this.loader = loader;

		slider.classList.add('image-zoomer');
		sliderImage.classList.add('image-zoomer__image');
		sliderImage.classList.add('fade');

		imageWrapper.appendChild(sliderImage);
		imageWrapper.appendChild(imgCaption);

		imgCaption.appendChild(imgCaptionContent);
		imgCaption.appendChild(loader);
		slider.appendChild(imageWrapper);
		document.body.appendChild(slider);

		this.slider = slider;
		this.sliderCaptionElem = imgCaptionContent;
		this.preloaderImgElem = document.createElement('img');
		this.sliderImageElem = sliderImage;
		this.preloaderImgElem.onload = function () {
			sliderImage.classList.remove('fade-in');
			sliderImage.classList.add('fade-out');
			var img = this;
			setTimeout(function () {
				self.sliderImageElem.src = img.src;
			}, 400);

		};

		this.sliderImageElem.onload = function () {
			sliderImage.classList.remove('fade-out');
			sliderImage.classList.add('fade-in');
			loader.classList.remove('image-zoomer__loading-visible');
		};

		this._createButtons();
		this._registerEventHandlers();

	};

	ImageZoomer.prototype.open = function () {
		this._registerKeyboardEvents();
		this.slider.classList.add('visible');
	};

	ImageZoomer.prototype.close = function () {
		this._unregisterKeyboardEvents();
		this.slider.classList.remove('visible');
	};

	ImageZoomer.prototype._createButtons = function () {
		var nav = document.createElement('nav');
		var prev = document.createElement('button');
		var next = document.createElement('button');
		var close = document.createElement('button');

		prev.classList.add('image-zoomer__left');
		next.classList.add('image-zoomer__right');
		close.classList.add('image-zoomer__close');

		next.innerHTML = '<div class="image-zoomer__text">>></div>';
		prev.innerHTML = '<div class="image-zoomer__text"><<</div>';
		close.innerHTML = '<i class="fa fa-close"></i>';

		nav.appendChild(prev);
		nav.appendChild(next);
		nav.appendChild(close);

		this.nextButtonElem = next;
		this.prevButtonElem = prev;
		this.closeButtonElem = close;

		this.slider.appendChild(nav);
	};

	ImageZoomer.prototype._registerEventHandlers = function () {
		console.log('Registering Zoomer event handlers');
		if (!this.imageClass || !this.linkClass) {
			throw new Error('Error in gallery engine: missing requrired elements');
		}
		var self = this;
		document.body.addEventListener('click', function (evt) {
			var goodTarget = evt.target.classList.contains(self.imageClass) ? evt.target : evt.target.closest("." + self.imageClass);
			// console.log('Target: ', goodTarget, self.imageClass, evt.target);

			if (!goodTarget) {
				return;
			}

			evt.preventDefault();
			self.showPicture(goodTarget.dataset.href, goodTarget.dataset.alt);
		});

		this.nextButtonElem.onclick = function () {
			self.showNext();
		};

		this.prevButtonElem.onclick = function () {
			self.showPrev();
		};

		this.closeButtonElem.onclick = function () {
			self.close();
		};
	};

	ImageZoomer.prototype.showNext = function () {
		var curNumber = this.normalizeImageNumber(this.currentNumber + 1);
		this._oops = this.currentNumber == curNumber ? 1 : 0;
		this.showPicture(curNumber);
	};

	ImageZoomer.prototype.showPrev = function () {
		var curNumber = this.normalizeImageNumber(this.currentNumber - 1);
		this._oops = this.currentNumber == curNumber ? -1 : 0;
		this.showPicture(curNumber);
	};

	ImageZoomer.prototype._onKey = function (event) {
		console.log(event.keyCode);
		switch (+event.keyCode) {
			case 37 /* left */ :
				{
					this.showPrev();
					break;
				}
			case 39 /* right */ :
				{
					this.showNext();
					break;
				}
			case 27 /* Esc */ :
				{
					this.close();
				}
		}
	};

	ImageZoomer.prototype._registerKeyboardEvents = function () {
		document.addEventListener('keydown', this._onKeyHandler);
	};

	ImageZoomer.prototype._unregisterKeyboardEvents = function () {
		document.removeEventListener('keydown', this._onKeyHandler);
	};

	ImageZoomer.prototype.normalizeImageNumber = function (imageNumber) {
		if (imageNumber >= this.total) {
			imageNumber = this.total - 1;
		}

		if (imageNumber < 0) {
			imageNumber = 0;
		}

		return imageNumber;
	};

	ImageZoomer.prototype.showPicture = function (hrefOrIndex) {
		var self = this;
		var href = (+hrefOrIndex || +hrefOrIndex === 0) ? this.images[+hrefOrIndex].url : hrefOrIndex;

		if (window.innerWidth < 800) {
			window.open(href);
			return false;
		}

		if (!this.slider.classList.contains('visible')) {
			this.open();
		}

		// if HREF is given, then navigation is Ok (we are not trying to go before 0 of after last image)
		if (!(+hrefOrIndex || +hrefOrIndex === 0)) {
			this._oops = 0;
		}

		if (this._oops) {
			return false;
		}

		var alt = "";

		if (href) {
			this.loader.classList.add('image-zoomer__loading-visible');

			this.images.forEach(function (imageDesc, i) {
				if (href == imageDesc.url) {
					self.currentNumber = i;
					alt = imageDesc.alt;
				}
			});

			self.prevButtonElem.classList[self.currentNumber === 0 ? "add" : "remove"]('inactive');
			self.nextButtonElem.classList[self.currentNumber === self.total - 1 ? "add" : "remove"]('inactive');

			self.preloaderImgElem.src = href;
			if (alt) {
				this.sliderCaptionElem.innerHTML = alt +
					' (' +
					(self.currentNumber + 1) +
					'/' +
					self.total +
					')';
			} else {
				this.sliderCaptionElem.innerHTML = 'Изображение ' +
					(self.currentNumber + 1) +
					' из ' +
					self.total;
			}
		}

		// document.querySelector('.preview img').src="img/" + currentFolder + "/" + n + ".JPG";
		// document.querySelector('.preview').style.display = "block";
		// currentPicture = n;

		// var pn = imagesNumber[currentFolder];
		// document.querySelector('.next').classList[currentPicture == pn ? "add" : "remove"]('inactive');
		// document.querySelector('.prev').classList[currentPicture == 1 ? "add" : "remove"]('inactive');
	};

	return ImageZoomer;
});

// event.type должен быть keypress
function getChar(event) {
	if (event.which == null) { // IE
		if (event.keyCode < 32) return null; // спец. символ
		return String.fromCharCode(event.keyCode);
	}

	if (event.which != 0 && event.charCode != 0) { // все кроме IE
		if (event.which < 32) return null; // спец. символ
		return String.fromCharCode(event.which); // остальные
	}

	return null; // спец. символ
}
;
define('r5m/modules/gallery/controller',[
	'./ui'
], function (Ui) {

	var $ = document.querySelectorAll.bind(document);

	function Gallery() {
		this.title = 'gallery';
		this.name = 'Галерея изображений';
		// this.model = model;

		this._selector = '.r5m-custom-page, .gallery-container';
		this._photos = {};

		this.ui = new Ui('r5m-gallery-img', 'r5m-gallery-link').init();
	}

	Gallery.prototype.init = function () {
		this.pageElems = $(this._selector);
		this._updatePhotosList();
	};

	Gallery.prototype._updatePhotosList = function () {
		[].forEach.call(this.pageElems, function (pageElem) {
			this._photos[pageElem.dataset.pageId] = [];

			var imgElems = pageElem.getElementsByClassName('r5m-gallery-img');
			[].forEach.call(imgElems, function (imgElem) {
				// console.log(imgElem);
				this._photos[pageElem.dataset.pageId].push(imgElem.dataset.fileName);
			}, this);
		}, this);

		console.log('photos now: ', this._photos);
	};

	return new Gallery();
});

/**
 * @module Carousel.
 * @autor mikhael
 * @version 1.0*
 * @param options - options object.
 *     options.rounded - if true carousel will be infinite, if false - will stop at last/first slides
 */

define('r5m/modules/carousel/carousel',[], function () {
	"use strict";

	function Carousel(elem, options) {
		var self = this;
		this.settings = {
			step: options ? options.step || 1 : 1,
			isRounded: options ? options.rounded : true,
			classNames: {
				leftButton: "carousel__left-button",
				rightButton: "carousel__right-button",
				content: "carousel__content",
				item: "carousel__item",
				contentWrapper: "carousel__inner-wrapper",
				animation: "carousel__animation"
			}
		};

		this.carouselElem = elem;

		this.init();

		this.items = elem.getElementsByClassName(this.settings.classNames.item);
		this.realItemsCount = this.items.length;
		this.totalItemsCount = this.items.length + (this.settings.isRounded ? 2 : 0);

		if (this.settings.isRounded) {
			this._createCloneNodes();
			this._enableInfinityRoundLoop();
		}

		this._createNavigationButtons();
		this.startup();

		window.addEventListener('resize', this.resize.bind(this));
	}

	Carousel.prototype.resize = function () {
		var currentSlide = +this.carouselContentElem.getAttribute('data-carousel-currentSlide');
		this.carouselContentElem.classList.remove(this.settings.classNames.animation);
		this.moveToSlide(currentSlide);
	};

	Carousel.prototype.moveLeft = function () {
		this._shiftCarousel(-1);
	};

	Carousel.prototype.moveRight = function () {
		this._shiftCarousel(+1);
	};

	Carousel.prototype._shiftCarousel = function (step) {
		var currentIndex = +this.carouselContentElem.getAttribute('data-carousel-currentSlide');
		var newIndex = currentIndex + step;

		this.carouselContentElem.classList.add(this.settings.classNames.animation);
		this.moveToSlide(newIndex);
	};

	Carousel.prototype.moveToSlide = function (slideNumber) {
		var totalItemsWidth = this.carouselContentElem.scrollWidth;
		var newOffset = -totalItemsWidth / this.totalItemsCount * slideNumber;

		if (newOffset > 0) return; // the first slide
		if (newOffset <= -totalItemsWidth || newOffset >= this.carouselElem.clientWidth) return; //the last slide

		this.carouselContentElem.style.transform = 'translateX(' + newOffset + 'px)';
		this.carouselContentElem.setAttribute('data-carousel-offset', newOffset);
		this.carouselContentElem.setAttribute('data-carousel-currentSlide', slideNumber);
	};

	Carousel.prototype.init = function () {
		var settings = this.settings;
		var elem = this.carouselElem;

		//create wrapper
		var carouselWrapper = document.createElement('div');
		carouselWrapper.appendChild(elem.firstElementChild);
		carouselWrapper.classList.add(settings.classNames.contentWrapper);

		carouselWrapper.firstElementChild.classList.add(settings.classNames.content);
		[].forEach.call(carouselWrapper.firstElementChild.children, function (carouselItem) {
			carouselItem.classList.add(settings.classNames.item);
		});
		elem.appendChild(carouselWrapper);

		this.carouselContentElem = this.carouselElem.getElementsByClassName(this.settings.classNames.content)[0];

	};

	Carousel.prototype._createCloneNodes = function () {
		var firstItem = this.items[0];
		var lastItem = this.items[this.items.length - 1];

		var firstElemClone = firstItem.cloneNode(true);
		var lastElemClone = lastItem.cloneNode(true);

		firstElemClone.classList.add("first-clone");
		lastElemClone.classList.add("last-clone");

		this.carouselContentElem.insertBefore(lastElemClone, firstItem);
		this.carouselContentElem.insertBefore(firstElemClone, lastItem.nextSibling);
	};

	Carousel.prototype._createNavigationButtons = function () {
		//setup Left/Right button click handlers
		this.carouselElem.getElementsByClassName(this.settings.classNames.leftButton)[0].addEventListener('click', this.moveLeft.bind(this));
		this.carouselElem.getElementsByClassName(this.settings.classNames.rightButton)[0].addEventListener('click', this.moveRight.bind(this));
	};

	Carousel.prototype.startup = function () {
		this.carouselContentElem.classList.remove(this.settings.classNames.animation);
		this.moveToSlide(this.settings.isRounded ? 1 : 0);
	};

	Carousel.prototype._enableInfinityRoundLoop = function () {

		var self = this;
		var moveToRealItem = (function () {
			var currentIndex = +this.carouselContentElem.getAttribute('data-carousel-currentSlide');
			if (currentIndex === 0) {
				this.carouselContentElem.classList.remove(this.settings.classNames.animation);
				this.moveToSlide(self.totalItemsCount - 2);
			} else if (currentIndex === this.totalItemsCount - 1) {
				this.carouselContentElem.classList.remove(this.settings.classNames.animation);
				this.moveToSlide(1);
			}
		}).bind(this);
		//moveToRealItem = moveToRealItem.bind(this);

		if (window.transitionEnd) {
			window.transitionEnd(this.carouselContentElem).bind(moveToRealItem);
		} else {
			this.carouselContentElem.addEventListener('transitionend', moveToRealItem);
		}
	};

	return Carousel;
});

define('r5m/modules/carousel/controller',['./carousel'], function (Carousel) {
  console.log(Carousel);

  function CarouselController() {}

	CarouselController.prototype.init = function () {
		[].forEach.call(document.querySelectorAll('.carousel'), function (elem) {
			new Carousel(elem);
		});
	};

	return new CarouselController();
});

define('r5m/app',[
	'r5m/modules/lib/closest',
	'r5m/modules/r5mDimmer/controller',
	'r5m/modules/feedback/controller',
	'r5m/modules/gallery/controller',
	'r5m/modules/carousel/controller'
], function (applyClosestPolyfill) {

	return function (modules) {
		var activeModules = [];
		applyClosestPolyfill(window.Element.prototype);

		if (!modules) {
			return;
		}

		modules.forEach(function (moduleName) {
			require(['r5m/modules/' + moduleName + '/controller'], function (moduleClass) {
				if (!~activeModules.indexOf(moduleClass)) {
					activeModules.push(moduleClass);
					moduleClass.init();
				}
			});
		});

		//обработчик на весь документ. Нас интересуют только элементы с data-action, по которым мы поймем, какой модуль с каким action вызвать. Например 'tour-create'
		document.addEventListener('click', function (e) {
			var target;

			if (e.target.dataset && e.target.dataset.action) {
				target = e.target;
			} else {
				target = e.target.closest('.r5m-action');
			}

			if (!target) {
				return;
			}

			var action = target.dataset.action;
			// Отметаем все без data-action
			if (!action || (typeof (action) != 'string')) return;

			// разбиваем по тире на [модуль, действие]. Если не вышло - в топку
			var moduleAction = action.split('-');
			if (moduleAction.length < 2) return;

			e.preventDefault();
			console.log(moduleAction);

			activeModules.forEach(function (module) {
				if (moduleAction[0] == module.title && module.clickHandler) {
					module.clickHandler(moduleAction[1], target); //передаем только action в модуль
				}
			});
		});
	};
});

define(['r5m/app']);

