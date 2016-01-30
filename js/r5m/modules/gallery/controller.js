define([
		'./ui',
		'./model',
		'./view',
		'dojo/DeferredList',
		'r5m/modules/helper/photo'], function (Ui, model, View, DeferredList, helper) {

	var $ = document.querySelectorAll.bind(document);

	function Gallery() {
		this.title = 'gallery';
		this.name = 'Галерея изображений';
		this.model = model;
		this._selector = '.r5m-custom-page, .reviews__container';
		this.view = new View();
		this._photos = {};
		var self = this;
		document.body.addEventListener('vk-ninja-loaded', function () {
			self.ui = new Ui('r5m-ninja-img', 'r5m-ninja-link').init();
		});

		self.ui2 = new Ui('r5m-gallery-img', 'r5m-gallery-link').init();

		var isAdmin = window.r5m.isAdmin;
		var galleryRoot = $('.r5m-gallery')[0];
		if (isAdmin && galleryRoot) {
			require(['vendor/sortable.min'], function(Sortable) {
				// Sortable.create(galleryRoot);
			});
		}

		this.debugMessages = {
			SAVED: 'Изменения сохранены',
			REMOVED: 'Страница успешно удалена',
			ADDED: 'Новая страница успешно создана',
			ERROR: 'При выполнении операции возникла ошибка'
		};
	}

	Gallery.prototype.init = function () {
		this.pageElems = $(this._selector);
		this._updatePhotosList();
	};

	Gallery.prototype.removeImg = function (targetElem) {
		var imgElems = targetElem.getElementsByClassName('r5m-gallery-img');
		if (!imgElems.length) return;

		targetElem.parentElement.removeChild(targetElem);
		this._updatePhotosList();
	};

	Gallery.prototype._updatePhotosList = function () {
		[].forEach.call(this.pageElems, function (pageElem) {
			this._photos[pageElem.dataset.pageId] = [];

			var imgElems = pageElem.parentElement.getElementsByClassName('r5m-gallery-img');
			[].forEach.call(imgElems, function (imgElem) {
				// console.log(imgElem);
				this._photos[pageElem.dataset.pageId].push(imgElem.dataset.fileName);
			}, this);
		}, this);

		console.log('photos now: ', this._photos);
	};

	Gallery.prototype.remove = function (linkId, title) {
		var self = this;

		if (confirm('Удалить альбом "' + title + '"')) {
			this.model.remove(linkId).then(function () {
				helper.i(self.debugMessages.REMOVED);
			}, function () {
				helper.i(self.debugMessages.ERROR);
			});
		}
	};

	Gallery.prototype._addFieldsToForm = function (form, fields) {
		for (var name in fields) {
			var value = (typeof fields[name] == 'string' || typeof fields[name] == 'number') ? fields[name] : JSON.stringify(fields[name]);
			if (form[name]) {
				form[name].value = value;
				continue;
			}
			var fieldElem = document.createElement('input');
			fieldElem.name = name;
			fieldElem.type = "hidden";
			fieldElem.value = value;
			form.appendChild(fieldElem);
		}
	};

	Gallery.prototype.save = function () {
		var results = [];
		var self = this;
		this._updatePhotosList();

		[].forEach.call(this.pageElems, function (editorElem) {
			var content = editorElem.innerHTML;
			var photos = self._photos[editorElem.dataset.pageId] || [];

			var editorForm = document.getElementById('gallery-editor');
			this._addFieldsToForm(editorForm, {
				text: content,
				_id: editorElem.dataset.pageId,
				_csrf: window.r5m.getCSRF(),
				photos: photos
			});


			results.push(this.model.save(editorForm));
		}, this);

		new DeferredList(results).then(function (res) {
			helper.i(self.debugMessages.SAVED);
			console.log(res);
		}, function (err) {
			helper.i(self.debugMessages.ERROR);

			console.error(err);
		});
	};

	Gallery.prototype.clickHandler = function (action, target) {
		var self = this;
		switch (action) {
		case 'create':
			{
				self.model.getSchema()
					.then(function (result) {

						self.view.showEditor(result.schema, {
							title: self.title,
							name: self.name,
							action: action
						}).then(function (formElem) {
							//	console.log('formDOM = ', formDOM);
							self.model.add(formElem).then(function () {
								helper.i(self.debugMessages.ADDED);
							}, function (err) {
								helper.i(self.debugMessages.ERROR);
							});
						}, function (error) {
							helper.i(self.debugMessages.ERROR);
							console.log(error);
						});
					}, function (error) {
						helper.i(self.debugMessages.ERROR);
						console.log('error = ', error);
						// error handle
					});
				break;

			}
		case 'remove':
			{
				this.remove(target.dataset.pageId, target.dataset.title);
				break;
			}
		case 'save':
			{
				this.save(target);
				break;
			}
		case 'removeimg':
			{
				this.removeImg(target);
				break;
			}
		default:
			{
				return;
			}
		}

	};

	return new Gallery();
});
