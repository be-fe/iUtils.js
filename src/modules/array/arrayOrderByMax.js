/**
 * @file arrayByMax.js
 */
define(function (require, exports, module) {

    /**
     * @return Boolean
     * @params Array arr, Number dx
     */
    var arrayByMax = function (aArray) {

        aArray.sort(function (num1, num2) {
            return num2 - num1;
        });
    }

    module.exports = arrayByMax;

});