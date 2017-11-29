var gulp 			= require('gulp'),
	scss 			= require('gulp-sass'),
	browserSync 	= require('browser-sync'),
	cleanCSS 		= require('gulp-clean-css'),
	sourcemaps		= require('gulp-sourcemaps'),
	autoprefixer	= require('gulp-autoprefixer'),
	del				= require('del');

gulp.task('scss', function(done){
    return gulp.src('app/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(scss())
		.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
		.pipe(cleanCSS())
		.pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('watch', ['browser-sync','scss'], function() {
    gulp.watch('app/scss/**/*.scss',['scss']);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('build', ['clean', 'scss'], function() {

    var buildCss = gulp.src([
        'app/css/**/*',
        'app/css/libs.min.css'
        ])
    .pipe(gulp.dest('dist/css'))
	
	var buildMaps = gulp.src('app/css/maps/**/*')
    .pipe(gulp.dest('dist/css/maps'))

    var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));

});

gulp.task('default', ['watch']);
