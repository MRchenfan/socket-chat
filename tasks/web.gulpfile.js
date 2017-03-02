'use strict';

let fs = require('fs')
let path = require('path')
let gulp = require('gulp')
let bs = require('browser-sync')
let sass = require('gulp-sass')
let sourcemaps = require('gulp-sourcemaps')
let ejs = require('gulp-ejs')
let rename = require('gulp-rename')
let del = require('del')
let runSequence = require('run-sequence')
let data = require('gulp-data')
let cleanCss = require('gulp-clean-css')
let uglifyJs = require('gulp-uglify')
let replace = require('gulp-replace')

let config = require('../config/config')
const HOST = config.host
const PORT = config.port

// todo: 读取gulp命令的参数，然后切换tasks
// 1. 如何读取参数
// 2. 如何将tasks放到另外的路径下然后导入
// 3. 能否实现条件引用
// 如： webTasks, webappTasks, mobileTasks...
let srcdir = {
	html: 'src',
	css: 'src/css',
	js: 'src/js',
	img: 'src/img',
	lib: 'src/lib',
	views: 'src/views',
	scss: 'src/scss',
	data: 'src/data'
}
let distdir = {
	dist: 'public',
	css: 'public',
	js: 'public',
	img: 'public',
	lib: 'public',
	views: 'views'
}

// dev tasks start

gulp.task('sass', () => {

	return gulp.src(srcdir.scss + '/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(srcdir.css))
})

gulp.task('ejs', () => {

	return gulp.src(srcdir.views + '/*.ejs')
		.pipe(data((file) => {

			try {
				let dataPath = srcdir.data + '/' + path.basename(file.path, '.ejs') + '.json';
				return JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
			} catch (err) {
				return {}
			}
		}))
		.pipe(ejs())
		.pipe(rename((filePath) => {

			filePath.extname = '.html'
		}))
		.pipe(gulp.dest(srcdir.html))
})

gulp.task('jade', () => {

	return gulp.src(srcdir.views + '/*.jade')
		.pipe(data((file) => {

			let dataPath = srcdir.data + '/' + path.basename(file.path, '.jade') + '.json';
			return JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
		}))
		.pipe(jade())
		.pipe(gulp.dest(srcdir.html))
})

gulp.task('server:dev', () => {

	bs.init({
		server: {
			baseDir: 'src',
			port: PORT
		}
	})
})

gulp.task('watch', () => {

	gulp.watch(srcdir.views + '/**/*.ejs', ['ejs'])
		// gulp.watch(srcdir.views + '/**/*.jade', ['jade'])
	gulp.watch(srcdir.scss + '/**/*.scss', ['sass'])

	gulp.watch('src/**/*.html', bs.reload);
	gulp.watch('src/**/*.css', bs.reload);
	gulp.watch('src/**/*.js', bs.reload);
})

gulp.task('default', () => {

	return runSequence('sass', 'ejs', 'server:dev', 'watch')
})

// dev tasks end fuck

// build tasks start

gulp.task('css', () => {

	return gulp.src(srcdir.css + '**/*.css')
		.pipe(cleanCss())
		.pipe(rename((filePath) => {

			filePath.extname = '.min.css'
		}))
		.pipe(gulp.dest(distdir.dist))
})

gulp.task('js', () => {

	return gulp.src(srcdir.js + '**/*.js')
		// .pipe(uglifyJs())
		.pipe(rename((filePath) => {

			filePath.extname = '.min.js'
		}))
		.pipe(gulp.dest(distdir.dist))
})

gulp.task('lib', () => {

	return gulp.src(srcdir.lib + '/**/*.*')
		.pipe(gulp.dest(distdir.dist + '/lib'))
})

gulp.task('img', () => {

	return gulp.src(srcdir.img + '/**/*.*')
		.pipe(gulp.dest(distdir.dist + '/img'))
})

gulp.task('views', () => {

	return gulp.src(srcdir.views + '/**/*.*')
		.pipe(replace('.html', ''))
		.pipe(replace('.css', '.min.css'))
		.pipe(replace('.js', '.min.js'))
		.pipe(gulp.dest(distdir.views))
})

gulp.task('build', () => {

	runSequence('css', 'js', 'lib', 'img', 'views', () => {

		console.log('your web project is built, check it ')
	})
})

// build tasks end