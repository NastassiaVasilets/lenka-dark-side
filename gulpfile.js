var gulp = require('gulp'),
    jade = require('gulp-jade'),
    webserver = require('gulp-webserver'),
    jscs = require('gulp-jscs'),
    gulpif = require('gulp-if'),
    argv = require('minimist')(process.argv.slice(2)),
    gutil = require('gulp-util'),
    stylus = require('gulp-stylus'),
    autoprefixer = require('gulp-autoprefixer'),
    htmlmin = require('gulp-htmlmin'),
    seed = require('./server/scripts/seed');

gulp.task('img', function () {
    return gulp.src('./client/images/**')
        .pipe(gulp.dest('./dist/images'))

});

gulp.task('stylus', function() {
    return gulp.src('./client/index.styl')
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('jscs', function () {
    return gulp.src(['./dist/**/*.js','gulpfile.js', 'server.js'])
        .pipe(jscs())
        .pipe(jscs.reporter());
});

gulp.task('jade', function () {
    gulp.src('./client/**/*.jade')
        .pipe(jade({
            pretty: true
        }).on('error', gutil.log))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
    gulp.watch('./client/*.styl', ['stylus']);
    gulp.watch('./client/**/*.styl', ['stylus']);
    gulp.watch('./client/**/*.jade', ['jade']);
    gulp.watch('./client/images/**', ['img']);
    gulp.watch('./client/blocks/**/*.js', ['js']);
});

gulp.task('webserver', function () {
    gulp.src('./dist/')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('seed', function () {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/lenka');
    //FIXME: Clear DB
    return seed();
    //FIXME: Сделать так чтобы задача завершалась без CTRL+C
});

gulp.task('default', ['stylus','jade','watch', 'webserver', 'img']);

