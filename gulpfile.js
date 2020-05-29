var { series, parallel, watch, src, dest } = require('gulp')
var sass = require('gulp-sass')
var connect = require('gulp-connect')

function clean(cb) {
  console.log('clean')
}

function scss(cb) {
  console.log('scss')
  return src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./dist/css'))
    .pipe(connect.reload())
}

function html() {
  return src('./src/*.html').pipe(dest('./dist/')).pipe(connect.reload())
}

function connectDev() {
  console.log('connectDev...')
  connect.server({
    root: './dist',
    port: 8000,
    livereload: true,
  })
}

function watchDist() {
  console.log('watchDist...')
  watch('src/scss/*.scss', scss)
  watch('src/*.html', html)
}

exports.watch = watchDist
exports.dev = function () {
  connectDev()
  watchDist()
}

exports.build = series(clean, parallel(scss))
