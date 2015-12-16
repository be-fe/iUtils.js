;(function() {
/**
 * @file getIEVersion.js
 */
var device_getIEVersion = {}, device_getOS = {}, device_isChrome = {}, device_isIE = {};
device_getIEVersion = function (exports) {
  /**
   * @return Number
   */
  function getIEVersion() {
    for (var v = 3, el = document.createElement('b'),
        // empty array as loop breaker (and exception-avoider) for non-IE and IE10+
        all = el.all || []; // i tag not well-formed since we know that IE5-IE9 won't mind
      el.innerHTML = '<!--[if gt IE ' + ++v + ']><i><![endif]-->', all[0];);
    // return the documentMode for IE10+ compatibility
    // non-IE will get undefined
    return v > 4 ? v : document.documentMode;
  }
  exports = getIEVersion;
  return exports;
}(device_getIEVersion);
device_getOS = function (exports) {
  /**
   * @return String
   */
  function getOS() {
    var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
    var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
    var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';
    if (/mac/i.test(appVersion)) {
      return 'MacOSX';
    }
    if (/win/i.test(appVersion)) {
      return 'windows';
    }
    if (/linux/i.test(appVersion)) {
      return 'linux';
    }
    if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) {
      return 'ios';
    }
    if (/android/i.test(userAgent)) {
      return 'android';
    }
    if (/win/i.test(appVersion) && /phone/i.test(userAgent)) {
      return 'windowsPhone';
    }
  }
  exports = getOS;
  return exports;
}(device_getOS);
device_isChrome = function (exports) {
  /**
   * @return Boolean
   */
  function isChrome() {
    var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
    var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
    var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';
    return /chrome|chromium/i.test(userAgent) && /google inc/.test(vendor);
  }
  exports = isChrome;
  return exports;
}(device_isChrome);
device_isIE = function (exports) {
  /**
   * @return Boolean
   */
  function isIE() {
    var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
    is.ie = function (version) {
      if (!version) {
        return /msie/i.test(userAgent) || 'ActiveXObject' in window;
      }
      if (version >= 11) {
        return 'ActiveXObject' in window;
      }
      return new RegExp('msie ' + version).test(userAgent);
    };
  }
  exports = isIE;
  return exports;
}(device_isIE);
}());