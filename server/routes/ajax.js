var express = require('express');
var router = express.Router();
var querystring = require("querystring");

var formidable = require('formidable');
var fs = require('fs');
var path = require('path');


/* 主页处理 */
router.get('/', function (req, res, next) {

    //res.writeHead(200, {
    //    'Access-Control-Allow-Origin': '*',
    //    'Access-Control-Allow-Methods': '*',
    //    'Access-Control-Allow-Headers': 'test'
    //}); 要放在外层

    res.end("Hello, world!");

});

router.post('/', function (req, res, next) {


    // 纯post

    console.log(req.body);


    // post 文件 formdata

    //var form = new formidable.IncomingForm();
    //console.log("about to parse~~~");
    //
    //form.uploadDir = path.join(__dirname, "../temp");//必须设置
    //form.keepExtensions = true;
    //form.multiples = true;
    //form.encoding = 'utf-8';
    //
    //form.parse(req, function (error, fields, files) {
    //        console.log("parsing done");
    //        //console.log('error:' + error);
    //        //console.log('fields:' + fields);
    //        //console.log('files:' + files);
    //    }
    //);
    //
    //form.on('progress', function (bytesReceived, bytesExpected) {
    //    console.log('上传进度:');
    //    console.log(bytesReceived / bytesExpected);
    //});
    //
    //form.on('fileBegin', function(name, file) {
    //    console.log('文件传输已经开始, 文件名:' + name);
    //});
    //form.on('file', function (name, file) {
    //    console.log('name:' + name);
    //    console.log('file:' + file);
    //
    //    fs.renameSync(file.path,  path.join(__dirname, "../upload/888.jpg"));
    //});
    //
    //form.on('field', function (name, value) {
    //    console.log(name + ':' + value);
    //});
    //
    //form.on('end', function () {
    //    res.writeHead(200, {"Access-Control-Allow-Origin": "*", "Content-Type": "text/html"});
    //    res.write("Hello world!");
    //    res.end();
    //});

    // 纯post的返回值
    res.writeHead(200, {"Access-Control-Allow-Origin": "*", "Content-Type": "text/html"});
    res.end("Hello dog!");


});

module.exports = router;