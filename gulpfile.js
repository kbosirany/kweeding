'use strict';

const gulp      = require('gulp');
const sass      = require('gulp-sass')(require('sass'));
const cleanCss  = require('gulp-clean-css');
const uglify    = require('gulp-uglify');
const rename    = require('gulp-rename');

// Compile SCSS → CSS lisible + version minifiée
gulp.task('sass', function () {
    return gulp.src('./sass/styles.scss')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(cleanCss({ level: 2 }))
        .pipe(rename({ basename: 'styles', suffix: '.min' }))
        .pipe(gulp.dest('./css'));
});

// Minifie scripts.js → scripts.min.js
gulp.task('minify-js', function () {
    return gulp.src('./js/scripts.js')
        .pipe(uglify())
        .pipe(rename({ basename: 'scripts', suffix: '.min' }))
        .pipe(gulp.dest('./js'));
});

// Watch : relance sass + js à chaque modification
gulp.task('watch', function () {
    gulp.watch('./sass/**/*.scss', gulp.series('sass'));
    gulp.watch('./js/scripts.js',  gulp.series('minify-js'));
});

// Tâche par défaut : build complet
gulp.task('default', gulp.series('sass', 'minify-js'));
