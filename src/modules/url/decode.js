/**
 * @file decode.js
 * @auther leiquan
 * @date 2015-12-1
 * @from self
 * @api Function
 * @return String
 * @params String str
 * @runtime Browser Window, Require JS, Node.js
 * @dependencies none
 */
define(function (require, exports, module) {

    var decode = function (str) {
        try {
            return decodeURIComponent(str.replace(/\+/g, ' '));
        } catch (e) {
            return str;
        }
    }

    module.exports = decode;

});