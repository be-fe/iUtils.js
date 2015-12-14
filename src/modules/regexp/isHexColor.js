/**
 * Created by leiquan on 15/12/11.
 */
define(function (require, exports, module) {

    var reg = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

    var isHexColor = function (str) {
        return reg.test(str);
    }

    module.exports = isHexColor;
});