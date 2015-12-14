/**
 * @file getStyle.js
 */

define(function (require, exports, module) {

    var getComputedStyle = require('./getComputedStyle');

    /**
     * @return String
     */

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