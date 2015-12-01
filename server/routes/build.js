var express = require('express');
var router = express.Router();
var process = require('child_process');
var fs = require('fs');
var path = require('path');

/* 根据参数个性化生成Utils.js */
router.get('/', function (req, res, next) {

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


    // res.cookie('modules', arr.toString());
    res.cookie('string', "var buildModules = " + newArrString + ";");

    res.render('build', {title: 'Utils.js'});


});

module.exports = router;

