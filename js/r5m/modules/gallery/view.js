define([
	'dijit/Dialog',
	'dojo/Deferred',
	'r5m/modules/trans/index',
	'r5m/modules/r5mDialogs/controller',
	'r5m/modules/r5m-contentEditor/controller'
], function (Dialog, Deferred, trans, r5mDialog, r5mContent) {

	function Editor() {

	}

	Editor.prototype.showEditor = function (schema, module) {
		//console.log('here');

		var def = new Deferred();

		r5mDialog.init(schema, module);
		r5mDialog.show().then(function (formElem) {
			def.resolve(formElem);
		}, function (error) {
			def.reject(error);
		});

		return def.promise;
	};

	Editor.prototype._createDialogTemplate = function () {

	};

	return Editor;
});
