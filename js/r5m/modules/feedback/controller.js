define([
	'vendor/qwest/qwest.min',
	'r5m/modules/r5mDimmer/controller'
], function (xhr, dimmer) {
	'use strict';

	function FeedbackController(formElem) {
		// this.formElem = formElem;
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
			['name', 'phone', 'mail', 'text'].forEach(function (field) {
				if (form[field]) {
					data[field] = form[field];
				}
			});
			xhr.post('/feedback', data).then(function() {
				self._showSuccessDialog(form);
			}, function() {
				self._showSuccessDialog(form);
			});

			return false;
		};
	};

	FeedbackController.prototype._showSuccessDialog = function (form) {
		dimmer.showDimmer(form);
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
