var express = require('express');
var router = express.Router();
var process = require('child_process');
var fs = require('fs');
var path = require('path');

/* 根据参数个性化生成Utils.js */

router.get('/', function (req, res, next) {

    var moduleArr = req.query.module.split(',');

    // 重写config.js

    var string = '';

    for (var i = 0; i < moduleArr.length; i++) {
        var tempString = '';
        tempString = '"' + moduleArr[i];
        tempString = tempString + '",';
        string += tempString;
    }

    string = string.substring(0, string.length - 1);

    fs.writeFileSync(path.join(__dirname, '../../config.js'), 'module.exports=[' + string + '];');

    res.render('build', {title: 'Utils.js'});


});

module.exports = router;

