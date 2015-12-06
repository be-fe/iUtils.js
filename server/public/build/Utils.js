(function (ns, factory) {if (typeof define === 'function' && define.amd) {define(factory);}else if (typeof module === 'object' && module.exports) {module.exports = factory();}else {window[ns] = factory();}})('Utils', function () {

/*
 * from https://github.com/component/array-equal
 */
var arrayEqual = {};
arrayEqual = function (exports) {
  var arrayEqual = function (arr1, arr2) {
    var length = arr1.length;
    if (length !== arr2.length)
      return false;
    for (var i = 0; i < length; i++)
      if (arr1[i] !== arr2[i])
        return false;
    return true;
  };
  exports = arrayEqual;
  return exports;
}(arrayEqual);

return {arrayEqual:arrayEqual}
});