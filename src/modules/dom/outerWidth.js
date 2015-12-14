/**
 * @file outerWidth.js
 */

define(function (require, exports, module) {

    /**
     * @return Number
     */

    var outerWidth = function (el) {
        return el.offsetWidth;
    }

    module.exports = outerWidth;

});