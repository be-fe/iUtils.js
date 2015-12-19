var express = require('express');
var router = express.Router();
var process = require('child_process');
var fs = require('fs');
var path = require('path');

var amdclean = require('amdclean');
var requirejs = require('requirejs');

var stream = require('stream');

var myTime = Date.now() + '_' + Math.floor(Math.random() * 99999 + 10000);

var counterA = 0;

/* 根据参数个性化生成Utils.js */

router.get('/', function (req, res, next) {

    counterA++;
    console.log("开始(同步代码开始):" + counterA);

    var moduleArr = req.query.module.split(',');

    var string = '';

    for (var i = 0; i < moduleArr.length; i++) {
        var tempString = '';
        tempString = '"' + moduleArr[i];
        tempString = tempString + '",';
        string += tempString;
    }

    string = string.substring(0, string.length - 1);

    //console.log('这里打印请求module ARR:');
    //console.log(moduleArr);

    // 这里在代码内,重写gulp的过程
    requirejs.optimize({
        'findNestedDependencies': true,
        'baseUrl': path.join(__dirname, '../../src/modules/'),
        'optimize': 'uglify',
        'include': moduleArr,
        'out': path.join(__dirname, '../build/Utils.js'),
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
            for (var i = 0; i < moduleArr.length; i++) {

                // 1.将目录替换成下划线,作为返回的函数值
                var tempString = moduleArr[i];
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
            //console.log("这里打印的是追加操作的数组:" + newString);


            string = string + newString;

            // 后容器
            var after = "\n});";

            string = string + after;

            console.log(string.substring(0, 100));


            // 写入返回请求
            var rs = new stream.Readable;
            rs.push(string);
            rs.push(null);

            res.writeHead(200, {
                'Content-Type': 'application/force-download',
                'Content-Disposition': 'attachment; filename=Utils.js',
                'location': '/'
            });

            rs.pipe(res);

            rs.on('end', function () {
                var fileRealPath = path.join(__dirname, '../build/Utils.js');
                //console.log(fileRealPath);
                fs.unlinkSync(fileRealPath);
                //console.log('文件已经删除~');
            });

        }
    });
    // 重写结束


});

module.exports = router;