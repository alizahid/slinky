const gulp = require('gulp')

const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')

gulp.task('slinky-js', () =>
  gulp
    .src('src/slinky.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename('slinky.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
)

gulp.task('slinky-css', () =>
  gulp
    .src('src/slinky.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename('slinky.min.css'))
    .pipe(gulp.dest('dist'))
)

gulp.task('docs', () =>
  gulp
    .src([
      'dist/slinky.min.css',
      'dist/slinky.min.js',
      'dist/slinky.min.js.map'
    ])
    .pipe(gulp.dest('docs/slinky'))
)

gulp.task('default', ['slinky-js', 'slinky-css', 'docs'])

gulp.task('dev', ['slinky-js', 'slinky-css'], () => {
  gulp.watch('src/slinky.js', ['slinky-js'])
  gulp.watch('src/slinky.scss', ['slinky-css'])
})
