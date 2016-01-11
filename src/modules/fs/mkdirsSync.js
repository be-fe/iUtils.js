/**
 * @file mkdirsSync.js
 * @auther leiquan
 * @date 2015-12-18
 * @from self
 * @api Function
 * @return Bollean
 * @params NodeMoudle FileSystem fs, NodeMoudle path path, String dirname, String mode
 * @runtime Node.js
 */
define(function (require, exports, module) {


    var mkdirsSync = function (fs, path, dirname, mode) {


        if (fs.existsSync(dirname)) {
            return true;
        } else {
            if (mkdirsSync(path.dirname(dirname), mode)) {
                fs.mkdirSync(dirname, mode);
                return true;
            }
        }
    }


    module.exports = mkdirsSync;

});