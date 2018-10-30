let gulp = require('gulp')
let cleanCSS = require('gulp-clean-css')
let sass = require('gulp-sass')
let concat = require('gulp-concat')
let inject = require('gulp-inject')
let imagemin = require('gulp-imagemin')
let webserver = require('gulp-webserver')
let webpack = require('webpack-stream')

let del = require('del')
let path = require('path')

let paths = {
	src: 'src',
	entry: 'src/index.js',
	components: 'src/app/**/*.js',
	config: 'src/config/**/*.js',
	stylesEntry: 'src/sass/index.scss',
	styles: 'src/sass/**/*.scss',
	page: 'src/index.html',
	icon: 'src/favicon.ico',
	images: 'src/images/**/*',
	buildFolder: 'dist',
	buildPage: 'dist/index.html',
	buildStylesFolder: 'dist/styles',
	buildStyles: 'dist/styles/**/*.css',
	buildJsFolder: 'dist/js',
	buildJs: 'dist/js/**/*.js',
	buildFontFolder: 'dist/fonts',
	buildImagesFolder: 'dist/images',
	buildBootstrap: 'dist/js/bootstrap.min.js',
	buildJquery: 'dist/js/jquery.min.js'
}

gulp.task('clean', function() {
	return del(paths.buildFolder)
})

gulp.task('clean-styles', function() {
	return del(paths.buildStylesFolder)
})

gulp.task('scripts', function() {
	return gulp
		.src(paths.entry)
		.pipe(
			webpack({
				output: {
					filename: 'app.bundle.js'
				},
				module: {
					loaders: [
						{
							test: /\.js$/,
							exclude: /node_modules/,
							loader: 'babel-loader',
							options: {
								plugins: ['lodash']
							}
						}
					]
				},
				resolve: {
					alias: {
						'@core': path.resolve('src', 'app', 'core'),
						'@features': path.resolve('src', 'app', 'features'),
						'@shared': path.resolve('src', 'app', 'shared'),
						'@config': path.resolve('src', 'config')
					}
				}
			})
		)
		.pipe(
			gulp.src(
				[
					'node_modules/bootstrap/dist/js/bootstrap.min.js',
					'node_modules/jquery/dist/jquery.min.js'
				],
				{ passthrough: true }
			)
		)
		.pipe(gulp.dest(paths.buildJsFolder))
})

gulp.task('fonts', function() {
	return gulp
		.src('node_modules/font-awesome/fonts/fontawesome-webfont.*')
		.pipe(gulp.dest(paths.buildFontFolder))
})

gulp.task('styles', function() {
	return gulp
		.src(paths.stylesEntry)
		.pipe(sass())
		.pipe(cleanCSS())
		.pipe(concat('app.bundle.css'))
		.pipe(
			gulp.src(
				[
					'node_modules/font-awesome/css/font-awesome.min.css',
					'node_modules/bootstrap/dist/css/bootstrap.min.css'
				],
				{ passthrough: true }
			)
		)
		.pipe(gulp.dest(paths.buildStylesFolder))
})

gulp.task('images', function() {
	return gulp
		.src(paths.images)
		.pipe(
			imagemin({
				optimizationLevel: 5
			})
		)
		.pipe(gulp.dest(paths.buildImagesFolder))
})

gulp.task('html', function() {
	return gulp.src([paths.page, paths.icon]).pipe(gulp.dest(paths.buildFolder))
})

gulp.task('copy', gulp.parallel('scripts', 'html', 'styles', 'fonts', 'images'))

gulp.task('inject', function() {
	return (
		gulp
			.src(paths.buildPage)
			// Make sure that scripts load in order
			.pipe(
				inject(gulp.src(paths.buildJquery), {
					relative: true,
					removeTags: true,
					starttag: '<!-- inject:jq -->'
				})
			)
			.pipe(
				inject(gulp.src(paths.buildBootstrap), {
					relative: true,
					removeTags: true,
					starttag: '<!-- inject:bs -->'
				})
			)
			.pipe(inject(gulp.src(paths.buildStyles), { relative: true }))
			.pipe(
				inject(gulp.src(paths.buildJs), {
					relative: true,
					removeTags: true,
					ignorePath: ['js/bootstrap.min.js', 'js/jquery.min.js']
				})
			)
			.pipe(gulp.dest(paths.buildFolder))
	)
})

gulp.task('build', gulp.series('clean', 'copy', 'inject'))

gulp.task('set prod', function(done) {
	process.env.NODE_ENV = 'production'
	done()
})

gulp.task('prod', gulp.series('set prod', 'build'))

gulp.task('serve', function() {
	return gulp.src(paths.buildFolder).pipe(
		webserver({
			port: 3100,
			livereload: true,
			open: true,
			fallback: 'index.html'
		})
	)
})

gulp.task('watch', function() {
	gulp.watch(paths.styles, gulp.series('clean-styles', 'styles'))
	gulp.watch(
		[paths.entry, paths.components, paths.config],
		gulp.series('build')
	)
	gulp.watch(paths.page, gulp.series('html', 'inject'))
})

gulp.task('dev', gulp.series('build', 'serve', 'watch'))
