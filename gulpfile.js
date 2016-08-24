const gulp = require('gulp');

const autoprefixer = require('gulp-autoprefixer'),
	clean = require('gulp-clean-css'),
	uglify = require('gulp-uglify');

gulp.task('styles', () => {
	return gulp.src('assets/css/jquery.slinky.css')
		.pipe(autoprefixer())
		.pipe(clean())
		.pipe(gulp.dest('dist'));
});

gulp.task('scripts', function() {
	return gulp.src('assets/js/jquery.slinky.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['styles', 'scripts']);
