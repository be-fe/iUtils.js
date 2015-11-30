(function (ns, factory) {if (typeof define === 'function' && define.amd) {define(factory);}else if (typeof module === 'object' && module.exports) {module.exports = factory();}else {window[ns] = factory();}})('Utils', function () {
var say = {}, sing = {};
say = function (exports) {
  var say = function () {
    console.log('我是雷全');
  };
  exports = say;
  return exports;
}(say);
sing = function (exports, _say_) {
  var say = _say_;
  var sing = function () {
    say();
    console.log('王鹤在唱歌');
  };
  exports = sing;
  return exports;
}(sing, say);

return {sing:sing}
});