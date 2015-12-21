/**
 * @file arrayRemove.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from self
 * @api Function
 * @return Boolean/null
 * @params Array arr, Number dx
 * @runtime Browser Window, Require JS
 * @dependencies none
 */

define(function (require, exports, module) {
    var arrayRemove = function (arr, dx) {

        if (isNaN(dx) || dx > arr.length) {
            return false;
        }
        arr.splice(dx, 1);
    }

    module.exports = arrayRemove;

});