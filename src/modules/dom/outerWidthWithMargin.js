/**
 * @file outerWidthWithMargin.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from https://github.com/oneuijs/oui-dom-utils
 * @return Number
 * @param HTMLElement el
 * @runtime Browser Window, Require JS
 * @dependencies none
 */
define(function (require, exports, module) {

    var getComputedStyle = require('./getComputedStyle');

    var outerWidthWithMargin = function (el) {
        var width = el.offsetWidth;
        const style = getComputedStyle(el);

        width += (parseFloat(style.marginLeft) || 0) + (parseFloat(style.marginRight) || 0);
        return width;
    }

    module.exports = outerWidthWithMargin;

});