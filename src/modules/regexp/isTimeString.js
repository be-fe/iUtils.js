/**
 * @file isTimeString.js
 */
define(function (require, exports, module) {

    var reg = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/;

    /**
     * @return Boolean
     * @params String str
     */
    var isTimeString = function (str) {
        return reg.test(str);
    }

    module.exports = isTimeString;
});