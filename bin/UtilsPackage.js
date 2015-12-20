#!/usr/bin/env node

var amdclean = require('amdclean');
var requirejs = require('requirejs');
var buildModules = require('../config.js');
var fs = require("fs");
var path = require("path");
var program = require("commander");
var childpProcess = require('child_process');
var http = require('http');
var UglifyJS = require("uglify-js");

var optimeze = 'none';
var allModules = [];
var output = '.';

console.log('当前路径:' + process.cwd());
console.log('模块路径:' + path.join(__dirname, '../src/modules/'));

function scanFolder(path) {

    var fileList = [];
    var folderList = [];

    var walk = function (path, fileList, folderList) {
        files = fs.readdirSync(path);
        files.forEach(function (item) {
            var tmpPath = path + '/' + item,
                stats = fs.statSync(tmpPath);

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
        'files': fileList,
        'folders': folderList
    }
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
    .option('-l, --list', '列出所有模块');

program.parse(process.argv);

// 打开配置文件,测试通过
if (program.config) {
    console.log('打开了配置文件,请前往编辑然后重新进行打包');
    var p = path.join(__dirname, '../config.js')
    childpProcess.exec('open ' + p,
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
                process.exit();
            } else {
                process.exit();
            }
        });
}

// 列出所有模块,测试通过
else if (program.list) {

    console.log('列出所有模块:');

    console.log(allModules);

    process.exit();

}

// 打开浏览器勾选模块,已经 OK 了,测试通过
else if (program.browser) {

    // 本地是否启动了服务器
    http.get("http://localhost:3000", function (res) {
        console.log("请在浏览器内勾选模块并打包:" + res.statusCode);

        childpProcess.exec("open http://localhost:3000");

        process.exit();
    }).on('error', function (e) {

        console.log("本地服务器未开启, 尝试开启...");

        var pa = path.join(__dirname, '../');

        var c = childpProcess.exec('sudo cd ' + pa + 'server && sudo npm install', function (error, stdout, stderr) {
            if (error !== null) {
                console.log('切换目录失败: ' + error);
            }

        });

        c.on('close', function () {

            childpProcess.exec('sudo npm start', function (error, stdout, stderr) {
                if (error !== null) {
                    console.log(' npm start 失败: ' + error);
                }

            });


            setTimeout(function () {

                childpProcess.exec('open http://localhost:3000', function (error, stdout, stderr) {
                    if (error !== null) {
                        console.log(' 打开浏览器失败: ' + error);
                    } else {
                        console.log(' 打开浏览器成功 ^_^ ');
                    }
                });

            }, 1000);

        });

    });

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
        'out': path.join(process.cwd(), './build/Utils.js'),
        'onModuleBundleComplete': function (data) {

            var outputFile = data.path;

            fs.writeFileSync(outputFile, amdclean.clean({
                'filePath': outputFile
            }));

            var content = fs.readFileSync(path.join(process.cwd(), './build/Utils.js'));

            var string = content.toString();


            string = string.substring(14, string.length);
            string = string.substring(0, string.length - 5);

            // 前容器
            var before = "";
            before += "(function (ns, factory) {";
            before += "if (typeof define === 'function' && define.amd) {";
            before += "define(factory);";
            before += "}";
            before += "else if (typeof module === 'object' && module.exports) {";
            before += "module.exports = factory();";
            before += "}";
            before += "else {";
            before += "window[ns] = factory();";
            before += "}";
            before += "})('Utils', function () {\n";

            string = before + string;

            // return数组
            var returnString = "\nreturn {";
            for (var i = 0; i < buildModules.length; i++) {

                // 1.将目录替换成下划线,作为返回的函数值
                var tempString = buildModules[i];
                var resultString = tempString.replace(/\//g, '_');

                // 2.将键名更改掉,去掉文件夹和下划线,只保留函数名,方便调用
                var idx = resultString.lastIndexOf('_');

                var keyString;
                keyString = resultString.substring(idx + 1, resultString.length);

                returnString += keyString + ":" + resultString + ",";
            }
            // 去掉,
            var newString = returnString.substring(0, returnString.length - 1);
            newString += "}";

            string = string + newString;

            // 后容器
            var after = "\n});";

            string = string + after;

            // 写入文件
            // 创建目录

            var file = '/Utils.js';

            // 压缩代码
            if (optimeze === 'uglify') {
                var result = UglifyJS.minify(string, {fromString: true});
                // console.log(result.code); // minified output
                string = result.code;
                file = '/Utils.min.js';
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
                        fs.mkdirsSync(output);
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
    console.log("构建了如下的包:");
    console.log(buildModules);
}
