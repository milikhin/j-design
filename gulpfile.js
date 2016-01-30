var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('daemon', function () {
	gulp.watch('css/**/*.css', ['css']);
	gulp.watch('js/**/*.js', ['js']);
});


gulp.task('js', function () {
	gulp.src('').pipe(shell([
		'r.js -o baseUrl=. paths.r5m=js/r5m paths.vendor=js/bower_components name=js/r5m/index out=dist/lp.js'
	]));
});

gulp.task('css', function () {
	gulp.src('').pipe(shell([
		'r.js -o cssIn=css/all.css out=dist/lp.css'
	]));
});


gulp.task('default', ['js', 'css', 'daemon']);
