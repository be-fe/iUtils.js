var express = require('express');
var router = express.Router();
var process = require('child_process');
var fs = require('fs');
var path = require('path');

var amdclean = require('amdclean');
var requirejs = require('requirejs');

var stream = require('stream');

var myTime;


var Queue = require('promise-queue');

var maxConcurrent = 1;
var maxQueue = Infinity;
var queue = new Queue(maxConcurrent, maxQueue);


/* 根据参数个性化生成Utils.js */

var counterA = 0;
var counterB = 0;

var handle = function (req, res, next) {


}

router.get('/', function (req, res, next) {

    myTime = Date.now() + '_' + Math.floor(Math.random() * 99999 + 10000);

    counterA++;
    console.log("开始(同步代码开始):" + counterA);

    var p1 = new Promise(function (resolve, reject) {

        counterB++;
        console.log("Promise开始(异步代码开始)" + counterB);

        var moduleArr = req.query.module.split(',');
        var string = '';
        for (var i = 0; i < moduleArr.length; i++) {
            var tempString = '';
            tempString = '"' + moduleArr[i];
            tempString = tempString + '",';
            string += tempString;
        }

        string = string.substring(0, string.length - 1);


        // 这里在代码内,重写gulp的过程
        requirejs.optimize({
            'findNestedDependencies': true,
            'baseUrl': 'src/modules/',
            'optimize': 'none',
            'include': moduleArr,
            'out': 'server/public/build/Utils_' + myTime + '.js',
            'onModuleBundleComplete': function (data) {

                var outputFile = data.path;

                fs.writeFileSync(outputFile, amdclean.clean({
                    'filePath': outputFile
                }));


                var data = fs.readFileSync(path.join(__dirname, '../public/build/Utils_' + myTime + '.js'));

                var string = data.toString();
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
                // console.log("这里打印的是追加操作的数组:" + newString);
                string = string + newString;
                // 后容器
                var after = "\n});";
                string = string + after;

                console.log(string.substring(string.length - 20, string.length));

                process.nextTick(arguments.callee);
                //resolve(string);

            }
        });


    });

    // 定义当promise被满足时应做什么
    p1.then(function (string) {

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

        //rs.on('end', function () {
        //    var fileRealPath = path.join(__dirname, '../public/build/Utils_' + myTime + '.js');
        //    // console.log(fileRealPath);
        //    //fs.unlink(fileRealPath, function () {
        //    //    console.log("文件已删除");
        //    //});
        //    // console.log('文件已经删除~');
        //});

        console.log("Promise被满足了(异步代码结束)");
    });

});

module.exports = router;