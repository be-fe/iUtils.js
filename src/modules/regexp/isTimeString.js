/**
 * @file isTimeString.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from https://github.com/arasatasaygin/is.js
 * @api Function
 * @return Boolean
 * @params String str
 * @runtime Browser Window, Require JS, Node.js
 * @dependencies none
 */
define(function (require, exports, module) {

    var reg = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/;

    var isTimeString = function (str) {
        return reg.test(str);
    }

    module.exports = isTimeString;
});