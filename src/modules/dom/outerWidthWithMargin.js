/**
 * @file width.js
 */

define(function (require, exports, module) {


    var getComputedStyle = require('./getComputedStyle');

    /**
     * @return
     */

    var outerWidthWithMargin = function (el) {
        var width = el.offsetWidth;
        const style = getComputedStyle(el);

        width += (parseFloat(style.marginLeft) || 0) + (parseFloat(style.marginRight) || 0);
        return width;
    }

    module.exports = outerWidthWithMargin;

});