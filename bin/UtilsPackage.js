#!/usr/bin/env node

var amdclean = require('amdclean');
var requirejs = require('requirejs');
var buildModules = require('../config.js');

var fs = require("fs");
var path = require("path");
var program = require("commander");

var childpProcess = require('child_process');

var optimeze = 'none';
var allModules = [];

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

// console.log(allModules);


program
    .allowUnknownOption()
    .version('0.0.1')
    .option('-p, --package <package>', '填写需要构建的合法包名,逗号分隔')
    .option('-m, --min', '是否启用压缩')
    .option('-c, --config', '打开配置文件');

program.parse(process.argv);


if (program.config) {

    console.log('打开了配置文件,请前往编辑然后重新进行构建!');

    var childProcess = childpProcess.exec('open config.js',
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            } else {
                console.log(stdout);
            }
        });

    process.exit();

} else {


    if (program.package) {

        console.log('填写了需要构建的包:' + program.package);

        var arr = program.package.split(',');

        console.log(arr);

        buildModules = arr;


        if (program.min) {
            console.log('启用压缩');
            optimeze = 'uglify';
        } else {
            console.log('默认不压缩');
        }

    } else {

        console.log('默认全量构建');
        buildModules = allModules;

        if (program.min) {
            console.log('启用压缩');
            optimeze = 'uglify';
        } else {
            console.log('默认不压缩');
        }

    }

}


// 这里在代码内,重写gulp的过程
requirejs.optimize({
    'findNestedDependencies': true,
    'baseUrl': './src/modules/',
    'optimize': optimeze,
    'include': buildModules,
    'out': './build/Utils.js',
    'onModuleBundleComplete': function (data) {

        var outputFile = data.path;

        fs.writeFileSync(outputFile, amdclean.clean({
            'filePath': outputFile
        }));

        var content = fs.readFileSync(path.join(__dirname, '../build/Utils.js'));

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
        var result = fs.writeFileSync(path.join(__dirname, '../build/Utils.js'), string);

    }
});
// 重写结束

console.log("构建了如下的包:");
console.log(buildModules);