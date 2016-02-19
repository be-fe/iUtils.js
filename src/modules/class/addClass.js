/**
 * @file addClass.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from self
 * @api Function
 * @return null
 * @params HTMLElement ele, String  cls
 * @runtime Browser Window, Require JS
 */

define(function (require, exports, module) {

    var hasClass = require('./hasClass');

    var addClass = function (ele, cls) {
        if (!hasClass(ele, cls)) {
            ele.className += ' ' + cls;
        }
    }


    module.exports = addClass;


});