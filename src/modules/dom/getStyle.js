/**
 * @file getStyle.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from https://github.com/oneuijs/oui-dom-utils
 * @api Function
 * @return String
 * @params HTMLElement el, String att, String style
 * @runtime Browser Window, Require JS
 * @dependencies none
 */
define(function (require, exports, module) {

    var getComputedStyle = require('./getComputedStyle');

    var getStyle = function (el, att, style) {
        style = style || el.style;

        var val = '';

        if (style) {
            val = style[att];

            if (val === '') {
                val = getComputedStyle(el, att);
            }
        }

        return val;
    }

    module.exports = getStyle;

});