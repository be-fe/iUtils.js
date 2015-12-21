/**
 * @file mkdirsSync.js
 * @auther leiquan
 * @date 2015-12-18
 * @from self
 * @api Function
 * @return Bollean
 * @params String dirname, mode
 * @runtime Node.js
 * @dependencies fs
 */
define(function (require, exports, module) {


    var mkdirsSync = function (dirname, mode) {
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