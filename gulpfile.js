var { series, parallel, watch, src, dest } = require('gulp')
var sass = require('gulp-sass')
var connect = require('gulp-connect')

function clean() {
  console.log('clean')
}

function scss() {
  return src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./dist/css'))
    .pipe(connect.reload())
}

function html() {
  return src('./src/*.html').pipe(dest('./dist')).pipe(connect.reload())
}

function img() {
  return src('./src/img/**/*.*').pipe(dest('./dist/img')).pipe(connect.reload())
}

function js() {
  return src('./src/js/**/*.js').pipe(dest('./dist/js')).pipe(connect.reload())
}

function connectDev() {
  connect.server({
    root: './dist',
    port: 8000,
    livereload: true
  })
}

function watchDist() {
  watch('src/scss/**/*.scss', scss)
  watch('src/*.html', html)
  watch('src/img/**/*.*', img)
  watch('src/js/**/*.js', js)
}

exports.watch = watchDist
exports.dev = function () {
  connectDev()
  watchDist()
}

exports.build = series(clean, parallel(scss))
