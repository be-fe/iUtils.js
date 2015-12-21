/**
 * @file arrayOrderByMin.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from self
 * @api Function
 * @return Array
 * @params Array arr, Number dx
 * @runtime Browser Window, Require JS
 * @dependencies none
 */
define(function (require, exports, module) {

    var arrayOrderByMin = function (aArray) {

        aArray.sort(function (num1, num2) {
            return num1 - num2;
        });
    }

    module.exports = arrayOrderByMin;

});