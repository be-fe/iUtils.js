/**
 * @file outerHeightWithMargin.js
 */

define(function (require, exports, module) {


    var getComputedStyle = require('./getComputedStyle');

    /**
     * @return Number
     */

    var outerHeightWithMargin = function (el) {
        var height = el.offsetHeight;
        const style = getComputedStyle(el);

        height += (parseFloat(style.marginTop) || 0) + (parseFloat(style.marginBottom) || 0);
        
        return height;
    }

    module.exports = outerHeightWithMargin;

});