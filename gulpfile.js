/**
 * @author 雷全
 * @file gulpfile
 * @type {Gulp|exports|module.exports}
 */
var gulp = require('gulp');
var fs = require('fs');
var del = require('del');
var htmlMin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sequence = require('gulp-sequence');
var img64 = require('gulp-img64');
var minifyCSS = require('gulp-minify-css');
var htmlReplace = require('gulp-html-replace');
var injectString = require('gulp-inject-string');

gulp.task('clean', function (cb) {

    del(['dist/css', 'dist/js'], cb);

});

gulp.task('minifyHtml', function () {

    return gulp.src('src/index.html')

        .pipe(htmlMin({collapseWhitespace: true}))

        .pipe(gulp.dest('dist'));

});

gulp.task('minifyCSS', function () {

    return gulp.src('src/css/*.css')

        .pipe(concat('style.css'))

        .pipe(rename({suffix: '.min'}))

        .pipe(minifyCSS())

        .pipe(gulp.dest('dist/css'));

});

gulp.task('minifyJS', function () {

    return gulp.src('src/js/*.js')

        .pipe(concat('main.js'))

        .pipe(rename({suffix: '.min'}))

        .pipe(uglify())

        .pipe(gulp.dest('dist/js'));

});

gulp.task('htmlReplace', function () {

    return gulp.src('dist/index.html')

        .pipe(htmlReplace({

            css: {
                src: '<style></style>',
                tpl: '%s'
            },

            js: {
                src: '<script></script>',
                tpl: '%s'
            }

        }))

        .pipe(gulp.dest('dist/'));

});

gulp.task('merge', function () {

    var js = new Buffer(fs.readFileSync('dist/js/main.min.js')).toString();
    var css = new Buffer(fs.readFileSync('dist/css/style.min.css')).toString();

    return gulp.src('dist/index.html')

        .pipe(injectString.after('<style>', css))

        .pipe(injectString.after('<script>', js))

        .pipe(gulp.dest('dist'));

});

gulp.task('img64', function () {

    gulp.src('dist/index.html')

        .pipe(img64())

        .pipe(gulp.dest('dist'));

});

gulp.task('default', function (cb) {

    sequence('clean', 'minifyHtml', 'minifyCSS', 'minifyJS', 'htmlReplace', 'merge', 'img64', cb);

});