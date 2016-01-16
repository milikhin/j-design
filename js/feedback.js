'use strict';

function FeedbackController(formElem) {
  this.formElem = formElem;
  this._addModernPlaceholderHandler(this.formElem);
}

FeedbackController.prototype._addModernPlaceholderHandler = function (form) {
		var self = this;

		form.addEventListener('input', function(e){
			self._setupPlaceholder(e.target);
		});

		setTimeout(function() {
			[].forEach.call(form.getElementsByTagName('textarea'), self._setupPlaceholder);
			[].forEach.call(form.getElementsByTagName('input'), self._setupPlaceholder);
		}, 0);
	};

	FeedbackController.prototype._setupPlaceholder = function(target) {
		if (target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
			return;
		}
		if (target.parentNode.tagName != 'LABEL') {
			return;
		}
		var modernPlaceholder = target.parentNode.getElementsByClassName('r5mFeedback__placeholder')[0];
		if (!modernPlaceholder) return;
		console.log('TARGET', target, target.value);
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
