/**
 * @file getPosition.js
 */

define(function (require, exports, module) {

    /**
     * @return Object
     */

    var getPosition = function (el) {
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

    module.exports = getPosition;

});