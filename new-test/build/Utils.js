
/**
 * Created by leiquan on 15/11/30.
 */
var say = {}, sing = {}, other = {};
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
other = function (exports) {
  var other = function () {
    console.log('这是other方法!!!');
  };
  exports = other;
  return exports;
}(other);
