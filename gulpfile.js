var gulp = require('gulp'),
    concat = require('gulp-concat');

gulp.task('styles', function() {
    return gulp.src([
            'bower_components/bootstrap/css/bootstrap.min.css',
            'src/css/main.css',
            'src/css/login.css',
            'src/css/nav.css',
            'src/css/list.css',
            'src/css/map.css',
            'src/css/info.css',
            'src/css/footer.css'
        ])
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('./static/'));
});

gulp.task('scripts', function() {
    return gulp.src([
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/bootstrap/js/bootstrap.min.js',
            'bower_components/knockout/dist/knockout.js',
            'bower_components/Heyoffline/heyoffline.js',
            'src/js/app.js',
            'src/js/facebook.js'
        ])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./static/'));
});

gulp.task('default', function() {
  // place code for your default task here
  console.log("Hello Gulp!");
});