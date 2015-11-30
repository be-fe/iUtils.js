(function (ns, factory) {if (typeof define === 'function' && define.amd) {define(factory);}else if (typeof module === 'object' && module.exports) {module.exports = factory();}else {window[ns] = factory();}})('Utils', function () {
var other = {};
other = function (exports) {
  var other = function () {
    console.log('这是other方法!!!');
  };
  exports = other;
  return exports;
}(other);

return {other:other}
});