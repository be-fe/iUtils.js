/**
 * @file isDateString.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from https://github.com/arasatasaygin/is.js
 * @return Boolean
 * @params String str
 * @runtime Browser Window, Require JS, Node.js
 * @dependencies none
 */

define(function (require, exports, module) {

    var reg = /^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2}$/;

    var isDateString = function (str) {
        return reg.test(str);
    }

    module.exports = isDateString;
});