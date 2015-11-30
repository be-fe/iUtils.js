var gulp = require( 'gulp' ),
    cmd = require( '../index' ),
    handlebars = require( 'gulp-handlebars' ),
    wrap = require( 'gulp-wrap' );

gulp.task( 'a', function(){
    return gulp.src( 'src/a.js' )
        .pipe( cmd({ignore:['e']}) )
        .pipe( gulp.dest('build') );
});

gulp.task( 'c', function(){
    return gulp.src( 'src/c.js' )
        .pipe( cmd({
            ignore : [ 'e' ]
        }))
        .pipe( gulp.dest('build') );
});

gulp.task( 'f', function(){
    return gulp.src( 'src/f.js' )
        .pipe( cmd({
            map : {
                'src/g' : './g',
                'src/h' : './h'
            }
        }))
        .pipe( gulp.dest('build') );
});

gulp.task( 'f2', function(){
    return gulp.src( 'src/f2.js' )
        .pipe( cmd({
            map : {
                'src/g' : './g',
                'src/h' : './h'
            }
        }))
        .pipe( gulp.dest('build') );
});

gulp.task( 'k', function(){
    return gulp.src( 'src/k.js' )
        .pipe( cmd({
            map : {
                'src/l' : './l'
            }
        }))
        .pipe( gulp.dest('build') );
});

gulp.task( 'm', function(){
    return gulp.src( 'src/m.js' )
        .pipe( cmd() )
        .pipe( gulp.dest('build') );
});

gulp.task( 'q', function(){
    return gulp.src( 'src/q.js' )
        .pipe( cmd({
            plugins : [{
                ext : [ '.tpl' ],
                use : [{
                        plugin : handlebars
                    },{
                        plugin : wrap,
                        param : ['define(function(){return Handlebars.template(<%= contents %>)});']
                }]
            }]
        }))
        .pipe( gulp.dest('build') );
});

gulp.task( 'r', function(){
    return gulp.src( 'src/r.js' )
        .pipe( cmd({ignore:[]}) )
        .pipe( gulp.dest('build') );
});

gulp.task( 'default', ['a', 'c', 'f', 'f2', 'k', 'm', 'q', 'r'] );
