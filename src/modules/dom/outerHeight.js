/**
 * @file width.js
 */

define(function (require, exports, module) {

    /**
     * @return
     */

    var outerHeight = function (el) {
        return el.offsetHeight;
    }

    module.exports = outerHeight;

});