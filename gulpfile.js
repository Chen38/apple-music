const gulp = require('gulp');
const plumber = require('gulp-plumber');
const compass = require('gulp-compass');
const pug = require('gulp-pug');
const pump = require('pump');

gulp.task('sass', () => {
	pump([
		gulp.src('sass/*.scss'),
		plumber(),
		compass({
			config_file: 'config.rb',
			css: 'css',
			sass: 'sass'
		}),
		gulp.dest('css')
	]);
});

gulp.task('pug', () => {
	pump([
		gulp.src('index.pug'),
		pug(),
		gulp.dest('./')
	]);
});

gulp.watch('sass/*.scss', ['sass']);
gulp.watch('index.pug', ['pug']);
gulp.task('dev', ['sass', 'pug']);