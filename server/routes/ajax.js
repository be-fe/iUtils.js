var express = require('express');
var router = express.Router();
var querystring = require("querystring");

var formidable = require('formidable');
var fs = require('fs');


/* 主页处理 */
router.get('/', function (req, res, next) {

    res.writeHead(200, {'Access-Control-Allow-Origin': '*'});
    res.end("Hello, world!");

});

router.post('/', function (req, res, next) {

    var form = new formidable.IncomingForm();
    console.log("about to parse");

    form.uploadDir = "./temp";//必须设置
    form.keepExtensions = true;
    form.multiples = true;

    form.parse(req, function (error, fields, files) {
            console.log("parsing done");
            console.log(error);
            console.log(fields);
            console.log(files);
        }
    );

    form.on('progress', function (bytesReceived, bytesExpected) {
        console.log('上传进度:');
        console.log(bytesReceived / bytesExpected);
    });
    form.on('file', function (name, file) {
        console.log(name);
        console.log(file);
        fs.renameSync(file.path, "./TEMP/999.png");
    });

    form.on('field', function (name, value) {
        console.log(name + ':' + value);
    });

    form.on('end', function () {
        res.writeHead(200, {"Access-Control-Allow-Origin": "*", "Content-Type": "text/html"});
        res.write("Hello world!");
        res.end();
    });


});

module.exports = router;