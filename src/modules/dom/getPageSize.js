/**
 * @file getPageSize.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from https://github.com/oneuijs/oui-dom-utils
 * @api Function
 * @return Object
 * @params HTMLElement el,
 * @runtime Browser Window, Require JS
 */

define(function (require, exports, module) {

    var getPageSize = function () {

        var xScroll, yScroll;

        if (window.innerHeight && window.scrollMaxY) {
            xScroll = window.innerWidth + window.scrollMaxX;
            yScroll = window.innerHeight + window.scrollMaxY;
        } else {
            if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
                xScroll = document.body.scrollWidth;
                yScroll = document.body.scrollHeight;
            } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
                xScroll = document.body.offsetWidth;
                yScroll = document.body.offsetHeight;
            }
        }

        var windowWidth, windowHeight;

        if (self.innerHeight) { // all except Explorer
            if (document.documentElement.clientWidth) {
                windowWidth = document.documentElement.clientWidth;
            } else {
                windowWidth = self.innerWidth;
            }
            windowHeight = self.innerHeight;
        } else {
            if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
                windowWidth = document.documentElement.clientWidth;
                windowHeight = document.documentElement.clientHeight;
            } else {
                if (document.body) { // other Explorers
                    windowWidth = document.body.clientWidth;
                    windowHeight = document.body.clientHeight;
                }
            }
        }

        var pageHeight, pageWidth;

        // for small pages with total height less then height of the viewport
        if (yScroll < windowHeight) {
            pageHeight = windowHeight;
        } else {
            pageHeight = yScroll;
        }
        // for small pages with total width less then width of the viewport
        if (xScroll < windowWidth) {
            pageWidth = xScroll;
        } else {
            pageWidth = windowWidth;
        }

        return {
            pageWidth: pageWidth,
            pageHeight: pageHeight,
            windowWidth: windowWidth,
            windowHeight: windowHeight
        };

    }

    module.exports = getPageSize;


});