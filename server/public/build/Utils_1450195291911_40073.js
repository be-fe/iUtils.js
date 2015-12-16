;(function() {
/**
 * @file arrayEqual.js
 * @from https://github.com/component/array-equal
 */
var array_arrayEqual = {}, array_arrayOrderByMax = {}, array_arrayOrderByMin = {}, array_arrayRemove = {}, array_indexof = {};
array_arrayEqual = function (exports) {
  /**
   * @return Boolean
   * @params Array arr1, Array arr2
   */
  var arrayEqual = function (arr1, arr2) {
    var length = arr1.length;
    if (arguments.length !== 2)
      return false;
    if (length !== arr2.length)
      return false;
    for (var i = 0; i < length; i++)
      if (arr1[i] !== arr2[i])
        return false;
    return true;
  };
  exports = arrayEqual;
  return exports;
}(array_arrayEqual);
array_arrayOrderByMax = function (exports) {
  /**
   * @return Boolean
   * @params Array arr, Number dx
   */
  var arrayOrderByMax = function (aArray) {
    aArray.sort(function (num1, num2) {
      return num2 - num1;
    });
  };
  exports = arrayOrderByMax;
  return exports;
}(array_arrayOrderByMax);
array_arrayOrderByMin = function (exports) {
  /**
   * @return
   * @params Array arr, Number dx
   */
  var arrayOrderByMin = function (aArray) {
    aArray.sort(function (num1, num2) {
      return num1 - num2;
    });
  };
  exports = arrayOrderByMin;
  return exports;
}(array_arrayOrderByMin);
array_arrayRemove = function (exports) {
  /**
   * @return Boolean
   * @params Array arr, Number dx
   */
  var arrayRemove = function (arr, dx) {
    if (isNaN(dx) || dx > this.length) {
      return false;
    }
    arr.splice(dx, 1);
  };
  exports = arrayRemove;
  return exports;
}(array_arrayRemove);
array_indexof = function (exports) {
  /**
   * @return Number
   * @params Array arr, Object obj
   */
  var indexOf = function (arr, obj) {
    if (arr.indexOf)
      return arr.indexOf(obj);
    for (var i = 0; i < arr.length; ++i) {
      if (arr[i] === obj)
        return i;
    }
    return -1;
  };
  exports = indexOf;
  return exports;
}(array_indexof);
}());