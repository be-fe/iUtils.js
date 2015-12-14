/**
 * @file width.js
 */

define(function (require, exports, module) {

    /**
     * @return
     */

    var outerHeight = function (el) {
        return el.offsetWidth;
    }

    module.exports = outerHeight;

});