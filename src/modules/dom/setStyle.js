/**
 * @file width.js
 */

define(function (require, exports, module) {

    var getComputedStyle = require('./getComputedStyle');

    /**
     * @param
     * @return
     */

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