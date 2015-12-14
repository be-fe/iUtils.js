/**
 * @file width.js
 */

define(function (require, exports, module) {

    var getComputedStyles = require('./getComputedStyle');

    /**
     * @return
     */

    var closest = function (el, selector) {

        var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

        while (el) {
            if (matchesSelector.call(el, selector)) {
                return el;
            } else {
                el = el.parentElement;
            }
        }
        return null;

    }

    module.exports = closest;

});