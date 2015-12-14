/**
 * @file isHexColor.js
 */
define(function (require, exports, module) {

    var reg = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

    /**
     * @return Boolean
     * @params String str
     */
    var isHexColor = function (str) {
        return reg.test(str);
    }

    module.exports = isHexColor;
});