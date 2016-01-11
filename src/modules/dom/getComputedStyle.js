/**
 * @file getComputedStyle.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from https://github.com/oneuijs/oui-dom-utils
 * @api Function
 * @return CssStyle
 * @params HTMLElement el
 * @runtime Browser Window, Require JS
 */

define(function (require, exports, module) {

    var getComputedStyle = function (el) {
        return el.ownerDocument.defaultView.getComputedStyle(el, null);
    }


    module.exports = getComputedStyle;


});