'use strict';

var $	 	 		 = require('gulp-load-plugins')();
var gulp 		 = require('gulp');
var browser  = require('browser-sync');
var rimraf   = require('rimraf');
var sequence = require('run-sequence');

var PORT = 3000;

gulp.task('clean', function(done) {
  rimraf('dist', done);
});

gulp.task('javascript', function() {
	gulp.src([
			'bower_components/jquery/dist/jquery.js',
			'bower_components/toastr/toastr.js',
			'src/assets/js/app.js',
			'src/assets/js/user.js',
			'src/assets/js/questions.js',
			'src/assets/js/common.js'
		])
	.pipe($.sourcemaps.init())
	.pipe($.concat('app.js'))
	.pipe($.sourcemaps.write('./'))
	.pipe(gulp.dest('dist/assets/js'))
	.on('finish', browser.reload);
});

gulp.task('sass', function() {
	gulp.src('src/assets/scss/app.scss')
	.pipe($.sourcemaps.init())
	.pipe($.sass())
	.pipe($.autoprefixer())
	.pipe($.sourcemaps.write('./'))
	.pipe(gulp.dest('dist/assets/css'))
	.pipe(browser.reload({ stream: true }));
});

gulp.task('css', function() {
	gulp.src([
			'bower_components/normalize.css/normalize.css',
			'bower_components/skeleton/css/skeleton.css',
			'bower_components/toastr/toastr.css'
		])
	.pipe($.sourcemaps.init())
	.pipe($.concat('public.css'))
	.pipe($.sourcemaps.write('./'))
	.pipe(gulp.dest('dist/assets/css'))
	.on('finish', browser.reload);
});

gulp.task('build', function(done) {
  sequence('clean', ['sass', 'css', 'javascript'], done);
});

gulp.task('server', function() {
	browser.init({
    server: '', port: PORT
  });
});

gulp.task('default', ['build', 'server'], function() {
	gulp.watch(['src/assets/scss/**/{*.scss, *.sass}'], ['sass']);
  gulp.watch(['src/assets/js/**/*.js'], ['javascript']);
  gulp.watch(['*.html'], browser.reload);
});