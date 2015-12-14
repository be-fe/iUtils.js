/**
 * @file arrayEqual.js
 * @from https://github.com/component/array-equal
 */
define(function (require, exports, module) {

    /**
     * @return Boolean
     * @params Array arr1, Array arr2
     */
    var arrayEqual = function(arr1, arr2) {
      var length = arr1.length
      if (length !== arr2.length) return false
      for (var i = 0; i < length; i++)
        if (arr1[i] !== arr2[i])
          return false
      return true
    }

    module.exports = arrayEqual;
})