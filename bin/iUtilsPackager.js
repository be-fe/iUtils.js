#!/usr/bin/env node

var amdclean = require('amdclean');
var requirejs = require('requirejs');
var buildModules = require('../config.js');
var fs = require('fs');
var path = require('path');
var program = require('commander');
var exec = require('child_process').exec;
var http = require('http');
var UglifyJS = require('uglify-js');
var app = require('../server/app');

var optimeze = 'none';
var allModules = [];
var output = '.';

// console.log('current_path:' + process.cwd());
// console.log('module_path:' + path.join(__dirname, '../src/modules/'));

function scanFolder(path) {

    var fileList = [];
    var folderList = [];
    var files;

    var walk = function (path, fileList, folderList) {
        files = fs.readdirSync(path);
        files.forEach(function (item) {
            var tmpPath = path + '/' + item;
            var stats = fs.statSync(tmpPath);

            if (stats.isDirectory()) {
                walk(tmpPath, fileList, folderList);
                folderList.push(tmpPath);
            } else {
                fileList.push(tmpPath);
            }
        });
    };

    walk(path, fileList, folderList);

    return {
        files: fileList,
        folders: folderList
    };
}

var result = scanFolder(path.join(__dirname, '../src/modules/'));

for (var i = 0; i < result.files.length; i++) {

    if (path.extname(result.files[i]) === '.js') {
        allModules.push(path.relative(path.join(__dirname, '../src/modules'), result.files[i].substring(0, result.files[i].length - 3)));
    }

}

program
    .allowUnknownOption()
    .version('1.0.9')
    .option('-a, --all', '不读取配置文件,读取目录打包全部')
    .option('-p, --package <package>', '填写需要构建的合法模块名进行打包,模块名之间逗号分隔')
    .option('-b, --browser', '打开浏览器,可查看各个包的文档,勾选需要的模块名进行打包')
    .option('-m, --min', '是否启用压缩')
    .option('-c, --config', '打开配置文件,通过修改配置文件进行打包')
    .option('-o, --output <output>', '指定打包文件输出目录')
    .option('-s, --source', '查看源代码,便于参考')
    .option('-l, --list', '列出所有模块');

program.parse(process.argv);

// 打开配置文件,测试通过
if (program.config) {
    console.log('打开了配置文件,请前往编辑然后重新进行打包');
    var p = path.join(__dirname, '../config.js')
    exec('open ' + p,
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
}

else if (program.source) {
    console.log('打开了源码文件夹,你可以查看源代码');
    var p = path.join(__dirname, '../src/modules/');

    exec('open ' + p,
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            process.exit();
        });

}

// 列出所有模块,测试通过
else if (program.list) {

    console.log('list all modules:');

    console.log(allModules);

    process.exit();

}

else if (program.browser) {
    var port = 3000;
    function startServer(port) {
        var server = http.createServer(app);
        server.listen(port, function (){
            console.log("You can access http://localhost:" + port);
            openBrowser('http://localhost:' + port);
        });
        server.on('error', function(error) {
            if (error.syscall !== 'listen') {
                throw error;
            }

            var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

            switch (error.code) {
                case 'EACCES':
                    console.error(bind + ' requires elevated privileges');
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    console.error(bind + ' is already in use');
                    port = port + 1;
                    startServer(port);
                    break;
                default:
                    throw error;
            }
        });

    }

    function openBrowser(url) {
        exec('open ' + url, function (error, stdout, stderr) {
            if (error !== null) {
                console.log('Open Browser Failed: ' + error);
            } else {
                console.log('Open Browser Succeed ^_^');
            }
        });
    }

    startServer(port);

}

// 可填写包名,测试通过
else if (program.package) {

    console.log('填写了需要构建的包:' + program.package);

    var arr = program.package.split(',');

    console.log(arr);

    buildModules = arr;

    if (program.min) {
        console.log('手动启用压缩');
        optimeze = 'uglify';
    } else {
        console.log('默认不压缩');
    }

    if (program.output) {
        console.log('指定了打包路径');
        output = program.output;
    } else {
        console.log('默认路径为当前目录');
    }

    build();

}

// 不读取配置,直接扫描目录,打包全部模块,测试通过
else if (program.all) {

    console.log('配置了打包全部模块');

    buildModules = allModules;
    if (program.min) {
        console.log('手动启用压缩');
        optimeze = 'uglify';
    } else {
        console.log('默认不压缩');
    }

    if (program.output) {
        console.log('指定了打包路径');
        output = program.output;
    } else {
        console.log('默认路径为当前目录');
    }

    build();

}

// 指名输出目录
else if (program.output) {

    console.log('手动指定输出目录:' + program.output);

    output = program.output;

    if (program.min) {
        console.log('手动启用压缩');
        optimeze = 'uglify';
    } else {
        console.log('默认不压缩');
    }

    build();

}

// 无任何参数,默认读取配置,打包全部
else {

    console.log('默认读取配置构建');

    if (program.min) {
        console.log('手动启用压缩');
        optimeze = 'uglify';
    } else {
        console.log('默认不压缩');
    }

    build();

}


function build() {
// 这里在代码内,重写gulp的过程
    requirejs.optimize({
        'findNestedDependencies': true,
        'baseUrl': path.join(__dirname, '../src/modules/'),
        'optimize': 'none',
        'include': buildModules,
        'out': path.join(process.cwd(), './build/iUtils.temp.js'),
        'onModuleBundleComplete': function (data) {

            var outputFile = data.path;

            fs.writeFileSync(outputFile, amdclean.clean({
                'filePath': outputFile
            }));

            var content = fs.readFileSync(path.join(process.cwd(), './build/iUtils.temp.js'));

            var string = content.toString();


            string = string.substring(14, string.length);
            string = string.substring(0, string.length - 5);

            // 前容器
            var before = '';
            before += '(function (ns, factory) {';
            before += 'if (typeof define === "function" && define.amd) {';
            before += 'define(factory);';
            before += '}';
            before += 'else if (typeof module === "object" && module.exports) {';
            before += 'module.exports = factory();';
            before += '}';
            before += 'else {';
            before += 'window[ns] = factory();';
            before += '}';
            before += '})("iUtils", function () {\n';

            string = before + string;

            // return数组
            var returnString = '\nreturn {';
            for (var i = 0; i < buildModules.length; i++) {

                // 1.将目录替换成下划线,作为返回的函数值
                var tempString = buildModules[i];
                var resultString = tempString.replace(/\//g, '_');

                // 2.将键名更改掉,去掉文件夹和下划线,只保留函数名,方便调用
                var idx = resultString.lastIndexOf('_');

                var keyString;
                keyString = resultString.substring(idx + 1, resultString.length);

                returnString += keyString + ':' + resultString + ',';
            }
            // 去掉,
            var newString = returnString.substring(0, returnString.length - 1);
            newString += '}';

            string = string + newString;

            // 后容器
            var after = '\n});';

            string = string + after;

            // 写入文件
            // 创建目录

            var file = '/iUtils.js';

            // 压缩代码
            if (optimeze === 'uglify') {
                var result = UglifyJS.minify(string, {fromString: true});
                // console.log(result.code); // minified output
                string = result.code;
                file = '/iUtils.min.js';
            }


            function mkdirsSync(dirname, mode) {
                if (fs.existsSync(dirname)) {
                    return true;
                } else {
                    if (mkdirsSync(path.dirname(dirname), mode)) {
                        fs.mkdirSync(dirname, mode);
                        return true;
                    }
                }
            }


            // 路径处理
            // 1.是否是绝对路径?
            // 2.不是的话全部当成相对路径

            if (path.isAbsolute(output)) {

                fs.exists(output, function (exists) {
                    if (exists) {
                        var result = fs.writeFileSync(output + file, string, {flag: 'w+'});
                    } else {
                        mkdirsSync(output);
                        var result = fs.writeFileSync(output + file, string, {flag: 'w+'});
                    }
                });

            } else {

                fs.exists(path.join(process.cwd(), output), function (exists) {
                    if (exists) {
                        var result = fs.writeFileSync(path.join(process.cwd(), output + file), string, {flag: 'w+'});
                    } else {
                        mkdirsSync(path.join(process.cwd(), output));
                        var result = fs.writeFileSync(path.join(process.cwd(), output + file), string, {flag: 'w+'});
                    }
                });

            }

        }
    });
// 重写结束
    console.log('构建了如下的包:');
    console.log(buildModules);
}