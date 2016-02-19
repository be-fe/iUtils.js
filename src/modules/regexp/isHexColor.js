/**
 * @file isHexColor.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from https://github.com/arasatasaygin/is.js
 * @api Function
 * @return Boolean
 * @params String str
 * @runtime Browser Window, Require JS, Node.js

 */
define(function (require, exports, module) {

    var reg = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

    var isHexColor = function (str) {
        return reg.test(str);
    }

    module.exports = isHexColor;
});