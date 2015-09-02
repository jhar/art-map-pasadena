var gulp = require('gulp'),
    concat = require('gulp-concat');

gulp.task('bowerStyles', function() {
    return gulp.src([
            'bower_components/bootstrap/css/bootstrap.min.css',
            'bower_components/bootstrap-material-design/dist/css/material-fullpalette.min.css'
        ])
        .pipe(concat('bower.css'))
        .pipe(gulp.dest('./src/css/'));
});

gulp.task('bowerScripts', function() {
    return gulp.src([
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/bootstrap/js/bootstrap.min.js',
            'bower_components/bootstrap-material-design/dist/js/material.min.js',
            'bower_components/knockout/dist/knockout.js',
            'bower_components/Heyoffline/heyoffline.js'
        ])
        .pipe(concat('bower.js'))
        .pipe(gulp.dest('./src/js'));
});

gulp.task('default', function() {
  // place code for your default task here
  console.log("Hello Gulp!");
});