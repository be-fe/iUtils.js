/**
 * @file arrayByMax.js
 */
define(function (require, exports, module) {

    /**
     * @return Boolean
     * @params Array arr, Number dx
     */
    var arrayOrderByMax = function (aArray) {

        aArray.sort(function (num1, num2) {
            return num2 - num1;
        });
    }

    module.exports = arrayOrderByMax;

});