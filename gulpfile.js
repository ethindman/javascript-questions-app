'use strict';

var $	 	 		 = require('gulp-load-plugins')();
var gulp 		 = require('gulp');
var browser  = require('browser-sync');
var panini   = require('panini');
var rimraf   = require('rimraf');
var sequence = require('run-sequence');

var PORT = 5000;

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

// Copy page templates into finished HTML files
gulp.task('pages', function() {
  gulp.src('src/pages/**/*.{html,hbs,handlebars}')
    .pipe(panini({
      root: 'src/pages/',
      layouts: 'src/layouts/',
      partials: 'src/partials/',
      data: 'src/data/',
      helpers: 'src/helpers/'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', function(done) {
  sequence('clean', ['sass', 'css', 'javascript', 'pages'], done);
});

gulp.task('server', function() {
	browser.init({
    server: 'dist',
    port: PORT
  });
});

gulp.task('default', ['build', 'server'], function() {
	gulp.watch(['src/assets/scss/**/{*.scss, *.sass}'], ['sass']);
  gulp.watch(['src/assets/js/**/*.js'], ['javascript']);
  gulp.watch(['*.html'], browser.reload);
});