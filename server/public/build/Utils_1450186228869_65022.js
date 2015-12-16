;(function() {
/**
 * @file decode.js
 */
var url_decode = {}, cookie_parseCookie = {}, cookie_getCookies = {}, cookie_getCookie = {}, url_encode = {}, cookie_setCookie = {};
url_decode = function (exports) {
  /**
   * @return String
   * @params String str
   */
  var decode = function (str) {
    try {
      return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
      return str;
    }
  };
  exports = decode;
  return exports;
}(url_decode);
cookie_parseCookie = function (exports) {
  var decode = url_decode;
  /**
   * @return Object
   * @params String  str
   */
  function parseCookie(str) {
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
  exports = parseCookie;
  return exports;
}(cookie_parseCookie);
cookie_getCookies = function (exports) {
  var parse = cookie_parseCookie;
  /**
   * @return Object
   */
  function getCookies() {
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
  exports = getCookies;
  return exports;
}(cookie_getCookies);
cookie_getCookie = function (exports) {
  var getCookies = cookie_getCookies;
  /**
   * @return String
   * @params String  name
   */
  function getCookie(name) {
    return getCookies()[name];
  }
  exports = getCookie;
  return exports;
}(cookie_getCookie);
url_encode = function (exports) {
  /**
   * @return String
   * @params String str
   */
  var encode = function (str) {
    try {
      return encodeURIComponent(str);
    } catch (e) {
      return str;
    }
  };
  exports = encode;
  return exports;
}(url_encode);
cookie_setCookie = function (exports) {
  var encode = url_encode;
  /**
   * @return Object
   * @params String  name, String  value, Object  options,
   */
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
}());