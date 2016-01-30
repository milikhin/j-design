var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('js', function () {
	return gulp.src('')
		.pipe(shell([
			'r.js -o baseUrl=. paths.r5m=js/r5m paths.vendor=js/bower_components name=js/r5m/index out=js/r5m/index-built.js'
		]));
});

gulp.task('css', function () {
	return gulp.src('')
		.pipe(shell([
			'r.js cssIn=../css/all.css out=../css/all-built.css'
		]));
});


gulp.task('default', ['js', 'css']);
