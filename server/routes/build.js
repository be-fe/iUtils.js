var express = require('express');
var router = express.Router();
var process = require('child_process');
var fs = require('fs');
var path = require('path');



var amdclean = require('amdclean');
var requirejs = require('requirejs');

var stream = require('stream');

var childProcess = require('child_process');

var nodeList = require('../config.node.js');
var browserList = require('../config.browser.js');

var counterA = 0;

router.get('/', function (req, res, next) {

    counterA++;
    console.log('访问次数:' + counterA);

    // 先看有没有 type,如果有,则优先处理 type
    var type = req.query.type;

    console.log('type:' + type);

    if (type) {
        console.log('这里处理 type');

        if (type == 'node') {
            //res.writeHead(200, {"Access-Control-Allow-Origin": "*", "Content-Type": "text/html"});
            //res.end("打包 node 平台下的库!" + nodeList);

            var fileHandle = childProcess.fork('./server/routes/fileHandle.js');

            fileHandle.on('message', function (string) {

                console.log('@@@' + string.substring(string.length - 20,string.length - 10));

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

                fileHandle.kill();
            });

            fileHandle.send({'moduleArr':nodeList, 'min': 'dev'});

        } else if (type == 'browser') {
            var fileHandle = childProcess.fork('./server/routes/fileHandle.js');

            fileHandle.on('message', function (string) {

                console.log('@@@' + string.substring(string.length - 20,string.length - 10));

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

                fileHandle.kill();
            });

            fileHandle.send({'moduleArr':browserList, 'min': 'dev'});
        }

    } else {
        var moduleArr = req.query.module.split(',');
        var min = req.query.select ? req.query.select : '';


        console.log(__dirname);
        var fileHandle = childProcess.fork('./server/routes/fileHandle.js');

        fileHandle.on('message', function (string) {

            console.log('@@@' + string.substring(string.length - 20,string.length - 10));

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

            fileHandle.kill();
        });

        fileHandle.send({'moduleArr':moduleArr, 'min': min});
    }



});

router.post('/', function(req, res, next) {
    res.writeHead(200, {"Access-Control-Allow-Origin": "*", "Content-Type": "text/html"});
    res.end("Hello dog! post test!");
});

module.exports = router;