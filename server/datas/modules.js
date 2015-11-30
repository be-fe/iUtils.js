/**
 * Created by leiquan on 15/11/30.
 */
var fs = require('fs');
var path = require('path');

exports.getModules = function () {

    var files = fs.readdirSync(path.join(__dirname, '../../src/modules/'));

    var newArr = [];
    for (var i =0; i < files.length; i++) {
        newArr.push(files[i].substring(0, files[i].length - 3));
    }

    return newArr;

}