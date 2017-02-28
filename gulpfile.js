const gulp = require('gulp');
const plugin = require('gulp-load-plugins')();
const pump = require('pump');

gulp.task('sass', () => {
	pump([
		gulp.src('sass/*.scss'),
		plugin.plumber(),
		plugin.compass({
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
		plugin.pug(),
		gulp.dest('./')
	]);
});

gulp.watch('sass/*.scss', ['sass']);
gulp.watch('index.pug', ['pug']);
gulp.task('dev', ['sass', 'pug']);

gulp.task('uglify', ()=> {
	pump([
		gulp.src(['vendor/js/jquery.min.js', 'vendor/js/howler.min.js', 'js/util.js']),
		plugin.concat('util.min.js'),
		plugin.uglify(),
		gulp.dest('dist/js')
	]);
});