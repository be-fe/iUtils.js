(function (ns, factory) {if (typeof define === 'function' && define.amd) {define(factory);}else if (typeof module === 'object' && module.exports) {module.exports = factory();}else {window[ns] = factory();}})('Utils', function () {

/*
 * from https://github.com/component/ie/blob/master/index.js
 */
var cookie_decode = {}, cookie_encode = {}, cookie_parse = {}, cookie_getAllCookie = {}, cookie_getCookieByName = {}, cookie_setCookie = {};
cookie_decode = function (exports) {
  function decode(value) {
    try {
      return decodeURIComponent(value);
    } catch (e) {
      debug('error `decode(%o)` - %o', value, e);
    }
  }
  exports = decode;
  return exports;
}(cookie_decode);
cookie_encode = function (exports) {
  function encode(value) {
    try {
      return encodeURIComponent(value);
    } catch (e) {
      console.log('cookie encode 失败,原始值:' + value + '错误:' + e);
    }
  }
  exports = encode;
  return exports;
}(cookie_encode);
cookie_parse = function (exports) {
  var decode = cookie_decode;
  function parse(str) {
    var obj = {};
    var pairs = str.split(/ *; */);
    var pair;
    if ('' == pairs[0])
      return obj;
    for (var i = 0; i < pairs.length; ++i) {
      pair = pairs[i].split('=');
      obj[decode(pair[0])] = decode(pair[1]);
    }
    return obj;
  }
  exports = parse;
  return exports;
}(cookie_parse);
cookie_getAllCookie = function (exports) {
  var parse = cookie_parse;
  function getAllCookie() {
    var str;
    try {
      str = document.cookie;
    } catch (err) {
      if (typeof console !== 'undefined' && typeof console.error === 'function') {
        console.error(err.stack || err);
      }
      return {};
    }
    return parse(str);
  }
  exports = getAllCookie;
  return exports;
}(cookie_getAllCookie);
cookie_getCookieByName = function (exports) {
  var getAllCookie = cookie_getAllCookie;
  function getCookieByName(name) {
    return getAllCookie()[name];
  }
  exports = getCookieByName;
  return exports;
}(cookie_getCookieByName);
cookie_setCookie = function (exports) {
  var encode = cookie_encode;
  function setCookie(name, value, options) {
    options = options || {};
    var str = encode(name) + '=' + encode(value);
    if (null == value)
      options.maxage = -1;
    if (options.maxage) {
      options.expires = new Date(+new Date() + options.maxage);
    }
    if (options.path)
      str += '; path=' + options.path;
    if (options.domain)
      str += '; domain=' + options.domain;
    if (options.expires)
      str += '; expires=' + options.expires.toUTCString();
    if (options.secure)
      str += '; secure';
    document.cookie = str;
  }
  exports = setCookie;
  return exports;
}(cookie_setCookie);

return {decode:cookie_decode,encode:cookie_encode,getAllCookie:cookie_getAllCookie,getCookieByName:cookie_getCookieByName,parse:cookie_parse,setCookie:cookie_setCookie}
});