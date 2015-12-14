/**
 * @file arrayRemove.js
 */
define(function (require, exports, module) {

    /**
     * @return Boolean
     * @params Array arr, Number dx
     */
    var arrayRemove = function (arr, dx) {

        if (isNaN(dx) || dx > this.length) {
            return false;
        }
        arr.splice(dx, 1);
    }

    module.exports = arrayRemove;

});