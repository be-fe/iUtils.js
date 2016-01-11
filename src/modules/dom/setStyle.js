/**
 * @file setStyle.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from https://github.com/oneuijs/oui-dom-utils
 * @api Function
 * @return null
 * @param HHTMlElement node, String att, String val, String style
 * @runtime Browser Window, Require JS
 */
define(function (require, exports, module) {

    var getComputedStyle = require('./getComputedStyle');

    var setStyle = function (node, att, val, style) {

        var reUnit = /width|height|top|left|right|bottom|margin|padding/i;
        style = style || node.style;

        if (style) {
            if (val === null || val === '') { // normalize unsetting
                val = '';
            } else if (!isNaN(Number(val)) && reUnit.test(att)) { // number values may need a unit
                val += 'px';
            }

            if (att === '') {
                att = 'cssText';
                val = '';
            }

            style[att] = val;
        }
    }

    module.exports = setStyle;

});