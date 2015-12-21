/**
 * @file encode.js
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

    var encode = function (str) {
        try {
            return encodeURIComponent(str);
        } catch (e) {
            return str;
        }
    };

    module.exports = encode;

});