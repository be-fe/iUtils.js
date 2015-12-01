(function (ns, factory) {if (typeof define === 'function' && define.amd) {define(factory);}else if (typeof module === 'object' && module.exports) {module.exports = factory();}else {window[ns] = factory();}})('Utils', function () {
var cookie = {}, cookieIsArray = {}, say = {}, sing = {};
cookie = function (exports) {
  var cookie = function () {
    this.setCookie = function (sName, value, iExpireDays) {
      var oDate = new Date();
      oDate.setDate(oDate.getDate() + iExpireDays);
      document.cookie = sName + '=' + value + ';expires=' + oDate;
    };
    this.getCookie = function (sName) {
      var arr = document.cookie.split('; ');
      for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=');
        if (arr2[0] == sName) {
          return arr2[1];
        }
      }
      return '';
    };
    this.removeCookie = function (sName) {
      this.setCookie(sName, '', -1);
    };
  };
  exports = new cookie();
  return exports;
}(cookie);
cookieIsArray = function (exports, _cookie_) {
  var cookie = _cookie_;
  var s = cookie.getCookie('hehe');
  var cookieIsArray = function () {
    console.log(s);
    alert(Array.isArray(s));
  };
  exports = cookieIsArray;
  return exports;
}(cookieIsArray, cookie);
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

return {cookieIsArray:cookieIsArray,sing:sing}
});