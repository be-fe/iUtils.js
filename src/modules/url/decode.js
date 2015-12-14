/**
 * @file decode.js
 */

define(function (require, exports, module) {

    /**
     * @return String
     * @params String str
     */
    var decode = function (str) {
        try {
            return decodeURIComponent(str.replace(/\+/g, ' '));
        } catch (e) {
            return str;
        }
    }

    module.exports = decode;

});