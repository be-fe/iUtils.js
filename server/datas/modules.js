/**
 * Created by leiquan on 15/11/30.
 */
var fs = require('fs');
var path = require('path');

exports.getModules = function () {


    function scanFolder(path) {

        var fileList = [];
        var folderList = [];

        var walk = function (path, fileList, folderList) {
            files = fs.readdirSync(path);
            files.forEach(function (item) {
                var tmpPath = path + '/' + item,
                    stats = fs.statSync(tmpPath);

                if (stats.isDirectory()) {
                    walk(tmpPath, fileList, folderList);
                    folderList.push(tmpPath);
                } else {
                    fileList.push(tmpPath);
                }
            });
        };

        walk(path, fileList, folderList);

        return {
            'files': fileList,
            'folders': folderList
        }
    }


    var result = scanFolder(path.join(__dirname, '../../src/modules/'));


    var newArr = [];

    for (var i = 0; i < result.files.length; i++) {

        if (path.extname(result.files[i]) === '.js') {
            newArr.push(path.relative(path.join(__dirname, '../../src/modules'), result.files[i].substring(0, result.files[i].length - 3)));
        }

    }

    return newArr;

}