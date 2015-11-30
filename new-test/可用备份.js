(function (ns, factory) {

    // AMD环境
    if (typeof define === "function" && define.amd) {
        define(factory);
    }

    // Node环境
    else if (typeof module === "object" && module.exports) {
        module.exports = factory();
    }

    // 全局环境
    else {
        window[ns] = factory();
        console.log(factory().sing)
    }

})('Utils', function () {




//;(function() {
/**
 * Created by leiquan on 15/11/30.
 */





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


//}());

    return {
        sing: sing
    }

});