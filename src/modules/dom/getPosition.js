/**
 * @file width.js
 */

define(function (require, exports, module) {

    var getComputedStyle = require('./getComputedStyle');

    /**
     * @return
     */

    var getStyle = function (el) {
        if (!el) {
            return {
                left: 0,
                top: 0
            };
        }

        return {
            left: el.offsetLeft,
            top: el.offsetTop
        };
    }

    module.exports = getStyle;

});