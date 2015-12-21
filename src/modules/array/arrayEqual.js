/**
 * @file arrayEqual.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from https://github.com/component/array-equal
 * @api Function
 * @return Boolean
 * @params Array arr1, Array arr2
 * @runtime Browser Window, Require JS
 * @dependencies none
 */

define(function (require, exports, module) {

    var arrayEqual = function (arr1, arr2) {
        var length = arr1.length;
        if (arguments.length !== 2) return false;
        if (length !== arr2.length) return false;
        for (var i = 0; i < length; i++)
            if (arr1[i] !== arr2[i])
                return false
        return true
    }

    module.exports = arrayEqual;
})