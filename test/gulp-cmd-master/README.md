# gulp-cmd

***
> seajs(CMD) Module transform and concat pulgin for gulp

## Install

```
$ npm install --save-dev gulp-cmd
```

注：虽然可以处理不同目录下的同名文件，但是最好的模式是还是每个模块文件名都是不同的，因为所有模块都是基于文件名来分配define id，这样做主要是为了保证build后的模块不带路径信息，对于其他不同文件夹下的同名文件，为了避免冲突，命名方式会被更换成是{文件名}_gulp-cmd_{uid}，对于不同文件夹下的同名文件名，需要注意一点的是ignore中需要用精确匹配。


## Usage

```
var gulp = require( 'gulp' ),
    cmd = require( 'gulp-cmd' );
    
gulp.task( 'cmd', function(){
    return gulp.src( 'src/js/main.js' )
        .pipe( cmd() )
        .pipe( gulp.task('build/js') );
}); 
```
想要直接使用例子，请先下载 https://github.com/elover/gulp-cmd

运行 npm install
到 example目录下，
运行 gulp server 即可查看demo

## 模块依赖解析及合并规则

Module `a.js` :

```
define(function(){
    var b = require( 'deps/b' );
    return 'a' + ' ' + b;
});
```

Module `deps/b.js` :

```
define(function(){
    return 'b';
});
```

gulp code :

```
gulp.src( 'src/a.js' )
    .pipe( cmd() )
    ...
```

合并 后 `a.js` :

```
define('b',function(){
    return 'b';
});
define('a',['b'],function(){
    var b = require( 'b' );
    return 'a' + ' ' + b;
});
```

File `main.js` :

```
seajs.use( 'a' );
```

Gulp code : 

```
gulp.src( 'src/main.js' )
    .pipe( cmd() )
    ...
```

合并后 `main.js` :

```
define('b',function(){
    return 'b';
});
define('a',['b'],function(){
    var b = require( 'b' );
    return 'a' + ' ' + b;
});
seajs.use( 'a' );
```



## API

### cmd( options )

可配置项

### options

#### encoding 

Type : `String`

Default : `utf-8`

#### ignore

Type : `Array`

打包时忽略的模块文件，用于处理公共模块。

例如：打包时忽略 global和common模块，global和common的为文件名

```
ignore : [ 'global', 'common' ]
```

模糊匹配：不带路径信息

ignore : ['a'] 会匹配 src/a src/b/a

精确匹配：带路径信息为带/

ignore : ['src/a'] 会匹配 src/a 但不会匹配 src/b/a


#### map

用于打包时处理模块路径映射，比如用于处理模块路径和调用模块时不一致的问题

例如：模块的路径是a/b.js,但是我们在调这个模块时用了require('b')或者seajs.use('b'),这时候如果不处理，b模块肯定是找不着的

解决办法如下
```
map : {
    "b" : "./a/b"
}
```

#### plugins

`plugins` 用于处理一些非js模块，例如模板等

例如：以下是把 handlebars模板预编译成一个正常的js模块，然后再命名合并
```
var handlebars = require( 'gulp-handlebars' ),
      wrap = require( 'gulp-wrap' );
      
...
plugins : [{
    ext : [ '.tpl' ],
    use : [{
            plugin : handlebars, 
        },{
            plugin : wrap,
            param : ['define(function(){return Handlebars.template(<%= contents %>)});']
    }]
}]
```

## Parse `seajs.config`

可以解析seajs.config中的alias,vars,paths 只有在有seajs.use的时候才有用

`gulp-cmd` will parse `alias` `vars` `paths` in `seajs.config`, other configuration is ignored, the configuration value must be a `String`, will ignored variable. see more [seajs.config](https://github.com/seajs/seajs/issues/262). [test/src/m.js](https://github.com/elover/gulp-cmd/blob/master/test/src/m.js) and [test/build/m.js](https://github.com/elover/gulp-cmd/blob/master/test/build/m.js) is parse example.

## License

MIT @ [nan wei](https://github.com/elover)