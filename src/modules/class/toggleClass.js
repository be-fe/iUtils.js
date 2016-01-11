/**
 * @file toggleClass.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from self
 * @api Function
 * @return null
 * @params HTMLElement obj, String  cls
 * @runtime Browser Window, Require JS
 */
define(function (require, exports, module) {

    var hasClass = require('./hasClass');

    var toggleClass = function (obj, cls) {
        if (hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
        }
        else {
            obj.className += " " + cls;
        }
    }

    module.exports = toggleClass;


});
