/**
 * @file getComputedStyles.js
 */

define(function (require, exports, module) {

    /**
     * @return CssStyle
     */

    var getComputedStyle = function (el) {
        return el.ownerDocument.defaultView.getComputedStyle(el, null);
    }


    module.exports = getComputedStyle;


});