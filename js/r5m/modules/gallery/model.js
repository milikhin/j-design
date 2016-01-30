define(['r5m/modules/simple-model'], function (SimpleModel) {

	function Model() {
		this.path = 'gallery';
	}

	Model.prototype = Object.create(SimpleModel.prototype);
	Model.prototype.constructor = Model;

	return new Model();
});
