var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
// var cp          = require('child_process');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');

var messages = {
    expressBuild: '<span style="color: grey">Running:</span> $ express build'
};

gulp.task('nodemon', function (cb) {
    browserSync.notify(messages.expressBuild);
    var called = false;
    return nodemon({script: 'index.js'}).on('start', function () {
        if (!called) {
            called = true;
            cb();
        }
    });
});/**
 * Wait for jekyll-build, then launch the Server
 */

gulp.task('browser-sync', ['sass', 'js', 'nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:5000",
        notify: true,
        port: 7000
    });
});

gulp.task('js', function(){
    return gulp.src('assets/js/*.js')
    // js compiler
    .pipe(gulp.dest('public/assets/js'));
});
/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('assets/css/main.scss')
        .pipe(sass({
            includePaths: ['css'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('public/assets/css'))
        .pipe(reload({stream:true}))
        .pipe(gulp.dest('assets/css'))
        ;
});


/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('assets/css/**', ['sass']);
    gulp.watch('assets/js/**', ['js']);
    gulp.watch('jadefiles/**', reload());
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);


// Image


var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache')
    del = require('del'),
    imageResize = require('gulp-image-resize'),
    watermark = require('gulp-watermark'),
    rename = require('gulp-rename');

var src = 'assets/img/*';
var dst = 'img';
var pub = 'public/assets/img/';

gulp.task('image', ['imagesmall'], function () {
// gulp.task('image', function () {
    return gulp.src(src)
        // .pipe(imageResize({
        //     width : 1920,
        //     height: 1080,
        //     crop  : true,
        //     upscale: true
        // }))
        .pipe(watermark({
            image: "assets/watermark/watermark.png"
        }))
        .pipe(rename(function (path){
            path.basename = path.basename.replace('','')
        }))
        // .pipe(rename(function (path){
        //     path.basename = path.basename.replace('','')
        // }))
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(pub));
})

gulp.task('imagesmall', function () {
    return gulp.src(src)
        .pipe(imageResize({
            width : 760,
            height: 428,
            crop  : true,
            upscale: true
        }))
        .pipe(watermark({
            image: "assets/watermark/watermark.png"
        }))
        .pipe(rename(function (path){
            path.basename = path.basename.replace('','')
        }))
        // .pipe(rename(function (path){
        //     path.basename = path.basename.replace('','back')
        // }))
        .pipe(cache(imagemin({progressive: true})))
        .pipe(gulp.dest(pub + '/small'));
})

gulp.task('clearcache', function() { return cache.crearAll();});
gulp.task('cleaready', function() {return del.sync(pub);});








