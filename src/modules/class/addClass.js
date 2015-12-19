/**
 * @file addClass.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from self
 * @return null
 * @params HTMLElement obj, String  cls
 * @runtime Browser Window, Require JS
 * @dependencies none
 */

define(function (require, exports, module) {

    var hasClass = require('./hasClass');

    var addClass = function (obj, cls) {
        if (!hasClass(obj, cls)) {
            obj.className += ' ' + cls;
        }
    }


    module.exports = addClass;


});