/**
 * @file arrayOrderByMin.js
 */
define(function (require, exports, module) {

    /**
     * @return
     * @params Array arr, Number dx
     */
    var arrayOrderByMin = function (aArray) {

        aArray.sort(function (num1, num2) {
            return num1 - num2;
        });
    }

    module.exports = arrayOrderByMin;

});