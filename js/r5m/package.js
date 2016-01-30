var profile = (function () {
	var copyOnly = function (filename, mid) {
		var list = {
			'build.profile': true,
			// we shouldn't touch our profile
			'package.json': true
				// we shouldn't touch our package.json
		};
		return (mid in list) ||
			(/\.js/.test(mid) && !/\.css$/.test(filename)) ||
			/(png|jpg|jpeg|gif|tiff)$/.test(filename);
		// Check if it is one of the special files, if it is in
		// app/resource (but not CSS) or is an image
	};


	return {
		resourceTags: {
			copyOnly: function (filename, mid) {
				return copyOnly(filename, mid);
				// Tag our copy only files
			},

			amd: function (filename, mid) {
				return !copyOnly(filename, mid) && /\.js$/.test(filename);
				// If it isn't a copy only resource,
				// but is a .js file, tag it as AMD
			}
		}
	};
})();
