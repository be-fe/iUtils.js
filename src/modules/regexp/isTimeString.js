/**
 * Created by leiquan on 15/12/11.
 */
define(function (require, exports, module) {

    var reg = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/;

    var isTimeString = function (str) {
        return reg.test(str);
    }

    module.exports = isTimeString;
});