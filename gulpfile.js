var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del'),
    runSequence = require('run-sequence');

// Compile src scss to src css
gulp.task('sass', function() {
    return gulp.src('src/scss/**/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Watchers
gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('src/scss/**/**/*.scss', ['sass']);
    gulp.watch('src/css/*.css', browserSync.reload);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/*.js', browserSync.reload);
});

// Browser reload
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });
});

// Concat & minify JS & CSS from HTML tags
gulp.task('minify', function() {
    return gulp.src('src/index.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'));
});

// Optimize images
gulp.task('images', function() {
    return gulp.src('src/images/*.+(png|jpg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
});

// Copy fonts over
gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

// Copy favicon
gulp.task('favicon', function() {
    return gulp.src('src/*.ico')
        .pipe(gulp.dest('dist'));
});

// Clean dist folder
gulp.task('clean:dist', function() {
    return del.sync('dist');
});

// Default development task
gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync', 'watch'],
    callback
  );
});

// For marking beginning/ending of file lists
gulp.task('useref', function() {
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'))
});

// Build task
gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    'sass',
    ['useref', 'images', 'fonts'],
    callback
  );
});