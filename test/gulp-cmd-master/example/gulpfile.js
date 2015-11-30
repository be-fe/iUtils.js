var gulp = require( 'gulp' ),
    cmd = require( '../index' ),
    webserver = require('gulp-webserver');

gulp.task( 'demo', function(){
    return gulp.src( 'js/src/use_demo.js' )
        .pipe( cmd({
            map : {
                "define_demo":"./define_demo" // 这里的define_demo 是默认是相对于use_demo.js，所以需要配置一下
            }
        }) )
        .pipe( gulp.dest('js/build') );
});


gulp.task('server',function(){
    gulp.src(".")
        .pipe(webserver({
            livereload: false,
            port: 9999,
            fallback: 'view/index.html',
            directoryListing:false,
            open:true
        }))
});


gulp.task( 'default', ['demo'] );
