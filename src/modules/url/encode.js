/**
 * @file encode.js
 */

define(function (require, exports, module) {


    /**
     * @return String
     * @params String str
     */
    var encode = function (str) {
        try {
            return encodeURIComponent(str);
        } catch (e) {
            return str;
        }
    };

    module.exports = encode;

});