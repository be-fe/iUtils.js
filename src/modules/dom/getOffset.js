/**
 * @file getOffset.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from https://github.com/oneuijs/oui-dom-utils
 * @return @return Object
 * @params HTMLElement el,
 * @runtime Browser Window, Require JS
 * @dependencies none
 */

define(function (require, exports, module) {

    var getOffset = function (el) {

        var html = el.ownerDocument.documentElement;
        var box = {top: 0, left: 0};

        // If we don't have gBCR, just use 0,0 rather than error
        // BlackBerry 5, iOS 3 (original iPhone)
        if (typeof el.getBoundingClientRect !== 'undefined') {
            box = el.getBoundingClientRect();
        }

        return {
            top: box.top + window.pageYOffset - html.clientTop,
            left: box.left + window.pageXOffset - html.clientLeft
        };
    }


    module.exports = getOffset;


});