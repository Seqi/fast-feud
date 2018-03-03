let gulp = require('gulp')
addsrc = require('gulp-add-src')
cleanCSS = require('gulp-clean-css')
sass = require('gulp-sass')
concat = require('gulp-concat')
inject = require('gulp-inject')
webpack = require('gulp-webpack')
webserver = require('gulp-webserver')

let del = require('del')

let paths = {
    src: 'src',
    entry: 'src/index.js',
    components: 'src/components/**/*.js',
    styles: 'src/sass/index.scss',
    page: 'src/index.html',
    images: 'src/images/**/*',
    buildFolder: 'dist',
    buildPage: 'dist/index.html',
    buildStylesFolder: 'dist/styles',
    buildStyles: 'dist/styles/**/*.css',
    buildJsFolder: 'dist/js',
    buildJs: 'dist/js/**/*.js'
}

gulp.task('clean', function () {
    return del(paths.buildFolder)
})

gulp.task('scripts', function () {
    return gulp.src(paths.entry)
        .pipe(webpack({
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: "babel-loader"
                    }
                ]
            }
        }))
        .pipe(gulp.dest(paths.buildJsFolder))
})

gulp.task('styles', function () {
    return gulp.src(paths.styles)
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(concat('app.bundle.css'))
        .pipe(gulp.dest(paths.buildStylesFolder))
})

gulp.task('html', function () {
    return gulp.src(paths.page)
        .pipe(gulp.dest(paths.buildFolder))
})

gulp.task('inject', function () {
    return gulp.src(paths.buildPage)
        .pipe(inject(gulp.src(paths.buildStyles), { relative: true }))
        .pipe(inject(gulp.src(paths.buildJs), { relative: true }))
        .pipe(gulp.dest(paths.buildFolder))
})

gulp.task('watch', function () {
    gulp.watch(paths.styles, gulp.parallel('styles'))
    gulp.watch([paths.entry, paths.buildJs], gulp.parallel('scripts'))
    gulp.watch(paths.page, gulp.parallel('html'))
})

gulp.task('build', gulp.series('clean', gulp.parallel('scripts', 'html', 'styles'), 'inject'))

gulp.task('serve', function () {
    return gulp.src(paths.buildFolder)
        .pipe(webserver({
            port: 3100,
            livereload: true,
            open: true,
        }))
})

gulp.task('dev', gulp.series('build', 'serve', 'watch'))