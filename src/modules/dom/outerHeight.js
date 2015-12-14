/**
 * @file outerHeight.js
 */

define(function (require, exports, module) {

    /**
     * @return Number
     */

    var outerHeight = function (el) {
        return el.offsetHeight;
    }

    module.exports = outerHeight;

});