var express = require('express');
var router = express.Router();
var process = require('child_process');
var fs = require('fs');
var path = require('path');

var amdclean = require('amdclean');
var requirejs = require('requirejs');

var stream = require('stream');

var childProcess = require('child_process');

var counterA = 0;

router.get('/', function (req, res, next) {

    counterA++;
    console.log('访问次数:' + counterA);

    var moduleArr = req.query.module.split(',');

    console.log(path);
    var fileHandle = childProcess.fork('./server/routes/fileHandle.js');

    fileHandle.on('message', function (string) {

        console.log(string);

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

    fileHandle.send(moduleArr);

});


module.exports = router;