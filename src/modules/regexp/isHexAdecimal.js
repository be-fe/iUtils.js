/**
 * @file isHexAdecimal.js
 */
define(function (require, exports, module) {

    var reg = /^[0-9a-fA-F]+$/;

    /**
     * @return Boolean
     * @params String str
     */
    var isHexAdecimal = function (str) {
        return reg.test(str);
    }

    module.exports = isHexAdecimal;
});