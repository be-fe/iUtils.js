/**
 * @file insertAfter.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from https://github.com/oneuijs/oui-dom-utils
 * @api Function
 * @return null
 * @param HTMLElement newEl, HTMLElement targetEl
 * @runtime Browser Window, Require JS
 */
define(function (require, exports, module) {

    var insertAfter = function (newEl, targetEl) {
        var parent = targetEl.parentNode;

        if (parent.lastChild === targetEl) {
            parent.appendChild(newEl);
        } else {
            parent.insertBefore(newEl, targetEl.nextSibling);
        }
    }


    module.exports = insertAfter;


});