/**
 * @file getOffset.js
 */

define(function (require, exports, module) {

    /**
     * @return Object
     */

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