var { series, parallel, watch, src, dest } = require('gulp')
var sass = require('gulp-sass')

function clean(cb) {
  console.log('clean')
}

function scss(cb) {
  console.log('scss')
  return src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./src/css'))
}

exports.watch = function () {
  watch('src/scss/*.scss', scss)
}

exports.build = series(clean, parallel(scss))
