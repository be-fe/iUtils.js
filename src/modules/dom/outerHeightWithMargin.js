/**
 * @file outerHeightWithMargin.js
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

    var outerHeightWithMargin = function (el) {
        var height = el.offsetHeight;
        const style = getComputedStyle(el);

        height += (parseFloat(style.marginTop) || 0) + (parseFloat(style.marginBottom) || 0);

        return height;
    }

    module.exports = outerHeightWithMargin;

});