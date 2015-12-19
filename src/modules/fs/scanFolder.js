/**
 * @file scanFolder.js
 * @auther leiquan
 * @date 2015-12-18
 * @from self
 * @return Object
 * @params String path
 * @runtime node
 * @dependencies fs
 */
define(function (require, exports, module) {

    var scanFolder = function (path) {

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


    module.exports = scanFolder;

});