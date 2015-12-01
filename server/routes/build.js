var express = require('express');
var router = express.Router();
var process = require('child_process');
var fs = require('fs');
var path = require('path');

/* 根据参数个性化生成Utils.js */
router.get('/', function (req, res, next) {

    // res.send("正在为你构建代码,请稍候...");

    var arr = req.query.module.split(',');

    console.log(arr);


    var content = fs.readFileSync(path.join(__dirname, '../../gulpfile.js'));

    var string = content.toString();

    var arrString = '[';

    for (var i = 0; i < arr.length; i++) {
        arrString = arrString + "'" + arr[i] + "',";
    }
    var newArrString = arrString.substring(0, arrString.length - 1);
    newArrString += ']';



    string = string.replace('var buildModules = [];', "var buildModules = " + newArrString + ";");

    fs.writeFileSync(path.join(__dirname, '../../gulpfile.js'), string);


    res.cookie('modules', arr.toString());
    res.cookie('string', "var buildModules = " + newArrString + ";");

    res.render('build', {title: 'Utils.js'});

    //var childProcess = process.exec('gulp build',
    //    function (error, stdout, stderr) {
    //        if (error !== null) {
    //            //console.log('exec error: ' + error);
    //        } else {
    //            console.log(stdout);
    //        }
    //    });
    //
    //childProcess.on("close", function () {
    //
    //    var package = fs.readFileSync(path.join(__dirname, '../public/build/Utils.js'));
    //
    //    //res.send(package.toString());
    //
    //    // res.redirect('/download')
    //
    //
    //    // 重置字符串
    //    string = string.replace("var buildModules = " + newArrString + ";", 'var buildModules = [];');
    //
    //    fs.writeFileSync(path.join(__dirname, '../../gulpfile.js'), string);
    //
    //
    //});


});

module.exports = router;

