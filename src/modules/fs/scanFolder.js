/**
 * @file scanFolder.js
 * @auther leiquan
 * @date 2015-12-18
 * @from self
 * @api Function
 * @return Object
 * @params NodeMoudle FileSystem fs, String path
 * @runtime node
 */
define(function (require, exports, module) {

    var scanFolder = function (fs, path) {

        var fileList = [];
        var folderList = [];

        var walk = function (path, fileList, folderList) {
            var files = fs.readdirSync(path);
            files.forEach(function (item) {
                var tmpPath = path + '/' + item;
                var stats = fs.statSync(tmpPath);

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