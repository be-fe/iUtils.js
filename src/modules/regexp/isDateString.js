/**
 * @file isDateString.js
 */
define(function (require, exports, module) {

    var reg = /^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2}$/;

    /**
     * @return Boolean
     * @params String str
     */
    var isDateString = function (str) {
        return reg.test(str);
    }

    module.exports = isDateString;
});