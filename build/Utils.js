(function (ns, factory) {if (typeof define === 'function' && define.amd) {define(factory);}else if (typeof module === 'object' && module.exports) {module.exports = factory();}else {window[ns] = factory();}})('Utils', function () {

/**
 * @file randomNumber.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from self
 * @return Number
 * @params Number  min, Number max
 * @runtime Browser Window, Require JS, Node.js
 * @dependencies none
 */
var random_randomNumber = {}, ajax_ajax = {}, ajax_ajaxFile = {}, ajax_ajaxGet = {}, ajax_ajaxJsonp = {}, ajax_ajaxPost = {}, array_arrayEqual = {}, array_arrayOrderByMax = {}, array_arrayOrderByMin = {}, array_arrayRemove = {}, array_indexof = {}, class_hasClass = {}, class_addClass = {}, class_removeClass = {}, class_toggleClass = {}, url_decode = {}, cookie_parseCookie = {}, cookie_getCookies = {}, cookie_getCookie = {}, url_encode = {}, cookie_setCookie = {}, device_getIEVersion = {}, device_getOS = {}, device_isChrome = {}, device_isIE = {}, dom_closest = {}, dom_forceReflow = {}, dom_getComputedStyle = {}, dom_getDocumentScrollTop = {}, dom_getElementByClassName = {}, dom_getOffset = {}, dom_getPageSize = {}, dom_getPosition = {}, dom_getStyle = {}, dom_height = {}, dom_insertAfter = {}, dom_matches = {}, dom_outerHeight = {}, dom_outerHeightWithMargin = {}, dom_outerWidth = {}, dom_outerWidthWithMargin = {}, dom_removeElement = {}, dom_setDocumentScrollTop = {}, dom_scrollTo = {}, dom_setStyle = {}, dom_width = {}, is_is = {}, jsloader_jsloader = {}, keycode_getKeyName = {}, object_deepCopy = {}, object_extend = {}, random_randomColor = {}, regexp_isEmail = {}, regexp_isHexAdecimal = {}, regexp_isHexColor = {}, regexp_isTimeString = {}, regexp_isUrl = {}, string_trim = {}, time_parseTime = {}, time_judgeTime = {}, trigger_trigger = {}, type_getType = {}, url_parsePort = {}, url_parseURL = {}, url_isCrossDomain = {}, url_parseQueryString = {}, url_stringfyQueryString = {};
random_randomNumber = function (exports) {
  function randomNumber(min, max) {
    return Math.floor(min + Math.random() * (max - min));
  }
  exports = randomNumber;
  return exports;
}(random_randomNumber);
ajax_ajax = function (exports) {
  var randomNumber = random_randomNumber;
  var myAjax = function (userOptions) {
    // 默认值
    var options = {
      method: 'get',
      // get, post,jsonp, file
      url: '',
      params: {},
      // key:value //当method为file的时候,params=formData, xmlHttpRequest 2.0 可利用formData对象来上传文件
      type: 'text',
      // text, json, xml
      contentType: null,
      success: function (data) {
      },
      fail: function () {
      }
    };
    // 更新option
    for (var pro in userOptions) {
      if (userOptions[pro]) {
        options[pro] = userOptions[pro];
      }
    }
    var method = options.method;
    var url = options.url;
    var params = options.params;
    var type = options.type;
    var contentType = options.contentType;
    var success = options.success;
    var fail = options.fail;
    // xhr对象
    var createRequest = function () {
      var xmlhttp;
      try {
        xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');  // IE6以上版本
      } catch (e) {
        try {
          xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');  // IE6以下版本
        } catch (e) {
          try {
            xmlhttp = new XMLHttpRequest();
            if (xmlhttp.overrideMimeType) {
              xmlhttp.overrideMimeType('text/xml');
            }
          } catch (e) {
            alert('您的浏览器不支持Ajax');
          }
        }
      }
      return xmlhttp;
    };
    // 格式化参数
    var formateParameters = function (params) {
      var paramsArray = [];
      var params = params;
      for (var pro in params) {
        var paramValue = params[pro];
        if (method.toUpperCase() === 'GET') {
          paramValue = encodeURIComponent(params[pro]);
        }
        paramsArray.push(pro + '=' + paramValue);
      }
      return paramsArray.join('&');
    };
    // 获取返回值
    var readystatechange = function (xmlhttp) {
      var returnValue;
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200 || xmlhttp.status == 0) {
          switch (type) {
          case 'xml':
            returnValue = xmlhttp.responseXML;
            break;
          case 'json':
            var jsonText = xmlhttp.responseText;
            if (jsonText) {
              returnValue = eval('(' + jsonText + ')');
            }
            break;
          default:
            returnValue = xmlhttp.responseText;
            break;
          }
          if (returnValue) {
            if (success) {
              success(returnValue);
            }
          } else {
            if (fail) {
              fail();
            }
          }
        } else {
          if (fail) {
            fail();
          }
        }
      }
    };
    // 创建XMLHttpRequest对象
    var xmlhttp = createRequest();
    // 设置回调函数
    xmlhttp.onreadystatechange = function () {
      readystatechange(xmlhttp);
    };
    // 格式化参数
    var formateParams = formateParameters(params);
    // 类型判断
    if ('GET' === method.toUpperCase()) {
      url += '?' + formateParams;
      xmlhttp.open('get', url, true);
      xmlhttp.send(null);
    } else if ('POST' === method.toUpperCase()) {
      xmlhttp.open('post', url, true);
      // 如果是POST提交，设置请求头信息
      if (!contentType) {
        contentType = 'application/x-www-form-urlencoded';
      }
      xmlhttp.setRequestHeader('Content-Type', contentType);
      xmlhttp.send(formateParams);
    } else if ('JSONP' === method.toUpperCase()) {
      var callbackName = 'jsonp' + randomNumber(1000, 9999);
      // 创建script来请求jsonp
      var head = document.getElementsByTagName('head')[0] || document.documentElement;
      var script = document.createElement('script');
      url += '?' + formateParams;
      script.src = url + '&callback=' + callbackName;
      head.insertBefore(script, head.firstChild);
      script.onerror = fail();
      window[callbackName] = function (data) {
        if (success) {
          success(data);
        }
        delete window[callbackName];
        head.removeChild(script);
      };
    } else if ('FILE' === method.toUpperCase()) {
      xmlhttp.open('post', url, true);
      xmlhttp.send(params);  //此处params为formData对象
    }
  };
  exports = myAjax;
  return exports;
}(ajax_ajax);
ajax_ajaxFile = function (exports) {
  var ajax = ajax_ajax;
  // 注意,file对象要append到formData对象中,或者从form表单构造formdata,注意不要设置contenttype
  var ajaxFile = function (url, formData, success, fail) {
    ajax({
      method: 'file',
      url: url,
      params: formData,
      type: 'text',
      success: success,
      fail: fail
    });
  };
  exports = ajaxFile;
  return exports;
}(ajax_ajaxFile);
ajax_ajaxGet = function (exports) {
  var ajax = ajax_ajax;
  var ajaxGet = function (url, params, type, success, fail) {
    ajax({
      method: 'get',
      url: url,
      params: params,
      type: type,
      success: success,
      fail: fail
    });
  };
  exports = ajaxGet;
  return exports;
}(ajax_ajaxGet);
ajax_ajaxJsonp = function (exports) {
  var ajax = ajax_ajax;
  var ajaxJsonp = function (url, params, success, fail) {
    ajax({
      method: 'jsonp',
      url: url,
      params: params,
      type: 'text',
      success: success,
      fail: fail
    });
  };
  exports = ajaxJsonp;
  return exports;
}(ajax_ajaxJsonp);
ajax_ajaxPost = function (exports) {
  var ajax = ajax_ajax;
  var ajaxPost = function (url, params, type, contentType, success, fail) {
    ajax({
      method: 'post',
      url: url,
      params: params,
      type: type,
      contentType: contentType,
      success: success,
      fail: fail
    });
  };
  exports = ajaxPost;
  return exports;
}(ajax_ajaxPost);
array_arrayEqual = function (exports) {
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
  var arrayOrderByMax = function (aArray) {
    aArray.sort(function (num1, num2) {
      return num2 - num1;
    });
  };
  exports = arrayOrderByMax;
  return exports;
}(array_arrayOrderByMax);
array_arrayOrderByMin = function (exports) {
  var arrayOrderByMin = function (aArray) {
    aArray.sort(function (num1, num2) {
      return num1 - num2;
    });
  };
  exports = arrayOrderByMin;
  return exports;
}(array_arrayOrderByMin);
array_arrayRemove = function (exports) {
  var arrayRemove = function (arr, dx) {
    if (isNaN(dx) || dx > arr.length) {
      return false;
    }
    arr.splice(dx, 1);
  };
  exports = arrayRemove;
  return exports;
}(array_arrayRemove);
array_indexof = function (exports) {
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
class_hasClass = function (exports) {
  var hasClass = function (obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  };
  exports = hasClass;
  return exports;
}(class_hasClass);
class_addClass = function (exports) {
  var hasClass = class_hasClass;
  var addClass = function (obj, cls) {
    if (!hasClass(obj, cls)) {
      obj.className += ' ' + cls;
    }
  };
  exports = addClass;
  return exports;
}(class_addClass);
class_removeClass = function (exports) {
  var hasClass = class_hasClass;
  var removeClass = function (obj, cls) {
    if (hasClass(obj, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      obj.className = obj.className.replace(reg, ' ');
    }
  };
  exports = removeClass;
  return exports;
}(class_removeClass);
class_toggleClass = function (exports) {
  var hasClass = class_hasClass;
  var toggleClass = function (obj, cls) {
    if (hasClass(obj, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      obj.className = obj.className.replace(reg, ' ');
    } else {
      obj.className += ' ' + cls;
    }
  };
  exports = toggleClass;
  return exports;
}(class_toggleClass);
url_decode = function (exports) {
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
  function getCookie(name) {
    return getCookies()[name];
  }
  exports = getCookie;
  return exports;
}(cookie_getCookie);
url_encode = function (exports) {
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
device_getIEVersion = function (exports) {
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
  function isIE() {
    var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
    return /msie/i.test(userAgent) || 'ActiveXObject' in window;
  }
  exports = isIE;
  return exports;
}(device_isIE);
dom_closest = function (exports) {
  var closest = function (el, selector) {
    var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
      if (matchesSelector.call(el, selector)) {
        return el;
      } else {
        el = el.parentElement;
      }
    }
    return null;
  };
  exports = closest;
  return exports;
}(dom_closest);
dom_forceReflow = function (exports) {
  var forceReflow = function (el) {
    el.offsetHeight;
  };
  exports = forceReflow;
  return exports;
}(dom_forceReflow);
dom_getComputedStyle = function (exports) {
  var getComputedStyle = function (el) {
    return el.ownerDocument.defaultView.getComputedStyle(el, null);
  };
  exports = getComputedStyle;
  return exports;
}(dom_getComputedStyle);
dom_getDocumentScrollTop = function (exports) {
  var getDocumentScrollTop = function () {
    return document.documentElement && document.documentElement.scrollTop || document.body.scrollTop;
  };
  exports = getDocumentScrollTop;
  return exports;
}(dom_getDocumentScrollTop);
dom_getElementByClassName = function (exports) {
  var getElementByClassName = function (node, classname) {
    if (node.getElementsByClassName) {
      // use native implementation if available
      return node.getElementsByClassName(classname);
    } else {
      return function getElementsByClass(searchClass, node) {
        if (node == null)
          node = document;
        var classElements = [], els = node.getElementsByTagName('*'), elsLen = els.length, pattern = new RegExp('(^|\\s)' + searchClass + '(\\s|$)'), i, j;
        //也可以用单词边界：只要两边是\b就可以了，说明这个单词是独立的
        for (i = 0, j = 0; i < elsLen; i++) {
          if (pattern.test(els[i].className)) {
            classElements[j] = els[i];
            j++;
          }
        }
        return classElements;
      }(classname, node);
    }
  };
  exports = getElementByClassName;
  return exports;
}(dom_getElementByClassName);
dom_getOffset = function (exports) {
  var getOffset = function (el) {
    var html = el.ownerDocument.documentElement;
    var box = {
      top: 0,
      left: 0
    };
    // If we don't have gBCR, just use 0,0 rather than error
    // BlackBerry 5, iOS 3 (original iPhone)
    if (typeof el.getBoundingClientRect !== 'undefined') {
      box = el.getBoundingClientRect();
    }
    return {
      top: box.top + window.pageYOffset - html.clientTop,
      left: box.left + window.pageXOffset - html.clientLeft
    };
  };
  exports = getOffset;
  return exports;
}(dom_getOffset);
dom_getPageSize = function (exports) {
  var getPageSize = function () {
    var xScroll, yScroll;
    if (window.innerHeight && window.scrollMaxY) {
      xScroll = window.innerWidth + window.scrollMaxX;
      yScroll = window.innerHeight + window.scrollMaxY;
    } else {
      if (document.body.scrollHeight > document.body.offsetHeight) {
        // all but Explorer Mac
        xScroll = document.body.scrollWidth;
        yScroll = document.body.scrollHeight;
      } else {
        // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
        xScroll = document.body.offsetWidth;
        yScroll = document.body.offsetHeight;
      }
    }
    var windowWidth, windowHeight;
    if (self.innerHeight) {
      // all except Explorer
      if (document.documentElement.clientWidth) {
        windowWidth = document.documentElement.clientWidth;
      } else {
        windowWidth = self.innerWidth;
      }
      windowHeight = self.innerHeight;
    } else {
      if (document.documentElement && document.documentElement.clientHeight) {
        // Explorer 6 Strict Mode
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight;
      } else {
        if (document.body) {
          // other Explorers
          windowWidth = document.body.clientWidth;
          windowHeight = document.body.clientHeight;
        }
      }
    }
    var pageHeight, pageWidth;
    // for small pages with total height less then height of the viewport
    if (yScroll < windowHeight) {
      pageHeight = windowHeight;
    } else {
      pageHeight = yScroll;
    }
    // for small pages with total width less then width of the viewport
    if (xScroll < windowWidth) {
      pageWidth = xScroll;
    } else {
      pageWidth = windowWidth;
    }
    return {
      pageWidth: pageWidth,
      pageHeight: pageHeight,
      windowWidth: windowWidth,
      windowHeight: windowHeight
    };
  };
  exports = getPageSize;
  return exports;
}(dom_getPageSize);
dom_getPosition = function (exports) {
  var getPosition = function (el) {
    if (!el) {
      return {
        left: 0,
        top: 0
      };
    }
    return {
      left: el.offsetLeft,
      top: el.offsetTop
    };
  };
  exports = getPosition;
  return exports;
}(dom_getPosition);
dom_getStyle = function (exports) {
  var getComputedStyle = dom_getComputedStyle;
  var getStyle = function (el, att, style) {
    style = style || el.style;
    var val = '';
    if (style) {
      val = style[att];
      if (val === '') {
        val = getComputedStyle(el, att);
      }
    }
    return val;
  };
  exports = getStyle;
  return exports;
}(dom_getStyle);
dom_height = function (exports) {
  var getComputedStyles = dom_getComputedStyle;
  var height = function (el) {
    const styles = getComputedStyles(el);
    const height = parseFloat(styles.height.indexOf('px') !== -1 ? styles.height : 0);
    const boxSizing = styles.boxSizing || 'content-box';
    if (boxSizing === 'border-box') {
      return height;
    }
    const borderTopWidth = parseFloat(styles.borderTopWidth);
    const borderBottomWidth = parseFloat(styles.borderBottomWidth);
    const paddingTop = parseFloat(styles.paddingTop);
    const paddingBottom = parseFloat(styles.paddingBottom);
    return height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom;
  };
  exports = height;
  return exports;
}(dom_height);
dom_insertAfter = function (exports) {
  var insertAfter = function (newEl, targetEl) {
    var parent = targetEl.parentNode;
    if (parent.lastChild === targetEl) {
      parent.appendChild(newEl);
    } else {
      parent.insertBefore(newEl, targetEl.nextSibling);
    }
  };
  exports = insertAfter;
  return exports;
}(dom_insertAfter);
dom_matches = function (exports) {
  var matches = function (el, selector) {
    return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
  };
  exports = matches;
  return exports;
}(dom_matches);
dom_outerHeight = function (exports) {
  var outerHeight = function (el) {
    return el.offsetHeight;
  };
  exports = outerHeight;
  return exports;
}(dom_outerHeight);
dom_outerHeightWithMargin = function (exports) {
  var getComputedStyle = dom_getComputedStyle;
  var outerHeightWithMargin = function (el) {
    var height = el.offsetHeight;
    const style = getComputedStyle(el);
    height += (parseFloat(style.marginTop) || 0) + (parseFloat(style.marginBottom) || 0);
    return height;
  };
  exports = outerHeightWithMargin;
  return exports;
}(dom_outerHeightWithMargin);
dom_outerWidth = function (exports) {
  var outerWidth = function (el) {
    return el.offsetWidth;
  };
  exports = outerWidth;
  return exports;
}(dom_outerWidth);
dom_outerWidthWithMargin = function (exports) {
  var getComputedStyle = dom_getComputedStyle;
  var outerWidthWithMargin = function (el) {
    var width = el.offsetWidth;
    const style = getComputedStyle(el);
    width += (parseFloat(style.marginLeft) || 0) + (parseFloat(style.marginRight) || 0);
    return width;
  };
  exports = outerWidthWithMargin;
  return exports;
}(dom_outerWidthWithMargin);
dom_removeElement = function (exports) {
  var removeElement = function (el) {
    if (typeof el === 'string') {
      // it's an query string
      [].forEach.call(document.querySelectorAll(el), function (node) {
        node.parentNode.removeChild(node);
      });
    } else if (el.parentNode) {
      // it's an Element
      el.parentNode.removeChild(el);
    } else if (el instanceof NodeList) {
      // it's an array of elements
      [].forEach.call(el, function (node) {
        node.parentNode.removeChild(node);
      });
    } else {
      throw new Error('you can only pass Element, array of Elements or query string as argument');
    }
  };
  exports = removeElement;
  return exports;
}(dom_removeElement);
dom_setDocumentScrollTop = function (exports) {
  var setDocumentScrollTop = function (value) {
    window.scrollTo(0, value);
    return value;
  };
  exports = setDocumentScrollTop;
  return exports;
}(dom_setDocumentScrollTop);
dom_scrollTo = function (exports) {
  var getDocumentScrollTop = dom_getDocumentScrollTop;
  var setDocumentScrollTop = dom_setDocumentScrollTop;
  var scrollTo = function (to, duration) {
    var to = 0;
    var duration = 16;
    if (duration < 0) {
      return;
    }
    var diff = to - getDocumentScrollTop();
    if (diff === 0) {
      return;
    }
    var perTick = diff / duration * 10;
    requestAnimationFrame(function () {
      if (Math.abs(perTick) > Math.abs(diff)) {
        setDocumentScrollTop(getDocumentScrollTop() + diff);
        return;
      }
      setDocumentScrollTop(getDocumentScrollTop() + perTick);
      if (diff > 0 && getDocumentScrollTop() >= to || diff < 0 && getDocumentScrollTop() <= to) {
        return;
      }
      this.scrollTo(to, duration - 16);
    });
  };
  exports = scrollTo;
  return exports;
}(dom_scrollTo);
dom_setStyle = function (exports) {
  var getComputedStyle = dom_getComputedStyle;
  var setStyle = function (node, att, val, style) {
    var reUnit = /width|height|top|left|right|bottom|margin|padding/i;
    style = style || node.style;
    if (style) {
      if (val === null || val === '') {
        // normalize unsetting
        val = '';
      } else if (!isNaN(Number(val)) && reUnit.test(att)) {
        // number values may need a unit
        val += 'px';
      }
      if (att === '') {
        att = 'cssText';
        val = '';
      }
      style[att] = val;
    }
  };
  exports = setStyle;
  return exports;
}(dom_setStyle);
dom_width = function (exports) {
  var getComputedStyles = dom_getComputedStyle;
  var width = function (el) {
    var styles = getComputedStyles(el);
    var width = parseFloat(styles.width.indexOf('px') !== -1 ? styles.width : 0);
    var boxSizing = styles.boxSizing || 'content-box';
    if (boxSizing === 'border-box') {
      return width;
    }
    var borderLeftWidth = parseFloat(styles.borderLeftWidth);
    var borderRightWidth = parseFloat(styles.borderRightWidth);
    var paddingLeft = parseFloat(styles.paddingLeft);
    var paddingRight = parseFloat(styles.paddingRight);
    return width - borderRightWidth - borderLeftWidth - paddingLeft - paddingRight;
  };
  exports = width;
  return exports;
}(dom_width);
is_is = function (exports) {
  // is.js 0.7.4
  // Author: Aras Atasaygin
  function is() {
    // Baseline
    /* -------------------------------------------------------------------------- */
    var root = this || global;
    var previousIs = root.is;
    // define 'is' object and current version
    is = {};
    is.VERSION = '0.7.4';
    // define interfaces
    is.not = {};
    is.all = {};
    is.any = {};
    // cache some methods to call later on
    var toString = Object.prototype.toString;
    var arraySlice = Array.prototype.slice;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    // helper function which reverses the sense of predicate result
    function not(func) {
      return function () {
        return !func.apply(null, arraySlice.call(arguments));
      };
    }
    // helper function which call predicate function per parameter and return true if all pass
    function all(func) {
      return function () {
        var parameters = arraySlice.call(arguments);
        var length = parameters.length;
        if (length === 1 && is.array(parameters[0])) {
          // support array
          parameters = parameters[0];
          length = parameters.length;
        }
        for (var i = 0; i < length; i++) {
          if (!func.call(null, parameters[i])) {
            return false;
          }
        }
        return true;
      };
    }
    // helper function which call predicate function per parameter and return true if any pass
    function any(func) {
      return function () {
        var parameters = arraySlice.call(arguments);
        var length = parameters.length;
        if (length === 1 && is.array(parameters[0])) {
          // support array
          parameters = parameters[0];
          length = parameters.length;
        }
        for (var i = 0; i < length; i++) {
          if (func.call(null, parameters[i])) {
            return true;
          }
        }
        return false;
      };
    }
    // Type checks
    /* -------------------------------------------------------------------------- */
    // is a given value Arguments?
    is.arguments = function (value) {
      // fallback check is for IE
      return is.not.null(value) && (toString.call(value) === '[object Arguments]' || typeof value === 'object' && 'callee' in value);
    };
    // is a given value Array?
    is.array = Array.isArray || function (value) {
      // check native isArray first
      return toString.call(value) === '[object Array]';
    };
    // is a given value Boolean?
    is.boolean = function (value) {
      return value === true || value === false || toString.call(value) === '[object Boolean]';
    };
    // is a given value Date Object?
    is.date = function (value) {
      return toString.call(value) === '[object Date]';
    };
    // is a given value Error object?
    is.error = function (value) {
      return toString.call(value) === '[object Error]';
    };
    // is a given value function?
    is.function = function (value) {
      // fallback check is for IE
      return toString.call(value) === '[object Function]' || typeof value === 'function';
    };
    // is a given value NaN?
    is.nan = function (value) {
      // NaN is number :) Also it is the only value which does not equal itself
      return value !== value;
    };
    // is a given value null?
    is.null = function (value) {
      return value === null;
    };
    // is a given value number?
    is.number = function (value) {
      return is.not.nan(value) && toString.call(value) === '[object Number]';
    };
    // is a given value object?
    is.object = function (value) {
      var type = typeof value;
      return type === 'function' || type === 'object' && !!value;
    };
    // is given value a pure JSON object?
    is.json = function (value) {
      return toString.call(value) === '[object Object]';
    };
    // is a given value RegExp?
    is.regexp = function (value) {
      return toString.call(value) === '[object RegExp]';
    };
    // are given values same type?
    // prevent NaN, Number same type check
    is.sameType = function (value1, value2) {
      if (is.nan(value1) || is.nan(value2)) {
        return is.nan(value1) === is.nan(value2);
      }
      return toString.call(value1) === toString.call(value2);
    };
    // sameType method does not support 'all' and 'any' interfaces
    is.sameType.api = ['not'];
    // is a given value String?
    is.string = function (value) {
      return toString.call(value) === '[object String]';
    };
    // is a given value Char?
    is.char = function (value) {
      return is.string(value) && value.length === 1;
    };
    // is a given value undefined?
    is.undefined = function (value) {
      return value === void 0;
    };
    // Presence checks
    /* -------------------------------------------------------------------------- */
    //is a given value empty? Objects, arrays, strings
    is.empty = function (value) {
      if (is.object(value)) {
        var num = Object.getOwnPropertyNames(value).length;
        if (num === 0 || num === 1 && is.array(value) || num === 2 && is.arguments(value)) {
          return true;
        }
        return false;
      } else {
        return value === '';
      }
    };
    // is a given value existy?
    is.existy = function (value) {
      return value !== null && value !== undefined;
    };
    // is a given value truthy?
    is.truthy = function (value) {
      return is.existy(value) && value !== false && is.not.nan(value) && value !== '' && value !== 0;
    };
    // is a given value falsy?
    is.falsy = not(is.truthy);
    // is a given value space?
    // horizantal tab: 9, line feed: 10, vertical tab: 11, form feed: 12, carriage return: 13, space: 32
    is.space = function (value) {
      if (is.char(value)) {
        var characterCode = value.charCodeAt(0);
        return characterCode > 8 && characterCode < 14 || characterCode === 32;
      } else {
        return false;
      }
    };
    // Arithmetic checks
    /* -------------------------------------------------------------------------- */
    // are given values equal? supports numbers, strings, regexps, booleans
    // TODO: Add object and array support
    is.equal = function (value1, value2) {
      // check 0 and -0 equity with Infinity and -Infinity
      if (is.all.number(value1, value2)) {
        return value1 === value2 && 1 / value1 === 1 / value2;
      }
      // check regexps as strings too
      if (is.all.string(value1, value2) || is.all.regexp(value1, value2)) {
        return '' + value1 === '' + value2;
      }
      if (is.all.boolean(value1, value2)) {
        return value1 === value2;
      }
      return false;
    };
    // equal method does not support 'all' and 'any' interfaces
    is.equal.api = ['not'];
    // is a given number even?
    is.even = function (numb) {
      return is.number(numb) && numb % 2 === 0;
    };
    // is a given number odd?
    is.odd = function (numb) {
      return is.number(numb) && numb % 2 !== 0;
    };
    // is a given number positive?
    is.positive = function (numb) {
      return is.number(numb) && numb > 0;
    };
    // is a given number negative?
    is.negative = function (numb) {
      return is.number(numb) && numb < 0;
    };
    // is a given number above minimum parameter?
    is.above = function (numb, min) {
      return is.all.number(numb, min) && numb > min;
    };
    // above method does not support 'all' and 'any' interfaces
    is.above.api = ['not'];
    // is a given number above maximum parameter?
    is.under = function (numb, max) {
      return is.all.number(numb, max) && numb < max;
    };
    // least method does not support 'all' and 'any' interfaces
    is.under.api = ['not'];
    // is a given number within minimum and maximum parameters?
    is.within = function (numb, min, max) {
      return is.all.number(numb, min, max) && numb > min && numb < max;
    };
    // within method does not support 'all' and 'any' interfaces
    is.within.api = ['not'];
    // is a given number decimal?
    is.decimal = function (numb) {
      return is.number(numb) && numb % 1 !== 0;
    };
    // is a given number integer?
    is.integer = function (numb) {
      return is.number(numb) && numb % 1 === 0;
    };
    // is a given number finite?
    is.finite = isFinite || function (numb) {
      return numb !== Infinity && numb !== -Infinity && is.not.nan(numb);
    };
    // is a given number infinite?
    is.infinite = not(is.finite);
    // Regexp checks
    /* -------------------------------------------------------------------------- */
    // Steven Levithan, Jan Goyvaerts: Regular Expressions Cookbook
    // Scott Gonzalez: Email address validation
    // eppPhone match extensible provisioning protocol format
    // nanpPhone match north american number plan format
    // dateString match m/d/yy and mm/dd/yyyy, allowing any combination of one or two digits for the day and month, and two or four digits for the year
    // time match hours, minutes, and seconds, 24-hour clock
    var regexps = {
      url: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i,
      email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
      creditCard: /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
      alphaNumeric: /^[A-Za-z0-9]+$/,
      timeString: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,
      dateString: /^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2}$/,
      usZipCode: /^[0-9]{5}(?:-[0-9]{4})?$/,
      caPostalCode: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]\s?[0-9][A-Z][0-9]$/,
      ukPostCode: /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/,
      nanpPhone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      eppPhone: /^\+[0-9]{1,3}\.[0-9]{4,14}(?:x.+)?$/,
      socialSecurityNumber: /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/,
      affirmative: /^(?:1|t(?:rue)?|y(?:es)?|ok(?:ay)?)$/,
      hexadecimal: /^[0-9a-fA-F]+$/,
      hexColor: /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
      ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
      ipv6: /^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
      ip: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/
    };
    // create regexp checks methods from 'regexp' object
    for (var regexp in regexps) {
      if (regexps.hasOwnProperty(regexp)) {
        regexpCheck(regexp, regexps);
      }
    }
    function regexpCheck(regexp, regexps) {
      is[regexp] = function (value) {
        return regexps[regexp].test(value);
      };
    }
    // String checks
    /* -------------------------------------------------------------------------- */
    // is a given string include parameter substring?
    is.include = function (str, substr) {
      return str.indexOf(substr) > -1;
    };
    // include method does not support 'all' and 'any' interfaces
    is.include.api = ['not'];
    // is a given string all uppercase?
    is.upperCase = function (str) {
      return is.string(str) && str === str.toUpperCase();
    };
    // is a given string all lowercase?
    is.lowerCase = function (str) {
      return is.string(str) && str === str.toLowerCase();
    };
    // is string start with a given startWith parameter?
    is.startWith = function (str, startWith) {
      return is.string(str) && str.indexOf(startWith) === 0;
    };
    // startWith method does not support 'all' and 'any' interfaces
    is.startWith.api = ['not'];
    // is string end with a given endWith parameter?
    is.endWith = function (str, endWith) {
      return is.string(str) && str.indexOf(endWith) > -1 && str.indexOf(endWith) === str.length - endWith.length;
    };
    // endWith method does not support 'all' and 'any' interfaces
    is.endWith.api = ['not'];
    // is a given string or sentence capitalized?
    is.capitalized = function (str) {
      if (is.not.string(str)) {
        return false;
      }
      var words = str.split(' ');
      var capitalized = [];
      for (var i = 0; i < words.length; i++) {
        capitalized.push(words[i][0] === words[i][0].toUpperCase());
      }
      return is.all.truthy.apply(null, capitalized);
    };
    // is a given string palindrome?
    is.palindrome = function (str) {
      return is.string(str) && str == str.split('').reverse().join('');
    };
    // Time checks
    /* -------------------------------------------------------------------------- */
    var days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday'
    ];
    var months = [
      'january',
      'february',
      'march',
      'april',
      'may',
      'june',
      'july',
      'august',
      'september',
      'october',
      'november',
      'december'
    ];
    // is a given date indicate today?
    is.today = function (obj) {
      var now = new Date();
      var todayString = now.toDateString();
      return is.date(obj) && obj.toDateString() === todayString;
    };
    // is a given date indicate yesterday?
    is.yesterday = function (obj) {
      var now = new Date();
      var yesterdayString = new Date(now.setDate(now.getDate() - 1)).toDateString();
      return is.date(obj) && obj.toDateString() === yesterdayString;
    };
    // is a given date indicate tomorrow?
    is.tomorrow = function (obj) {
      var now = new Date();
      var tomorrowString = new Date(now.setDate(now.getDate() + 1)).toDateString();
      return is.date(obj) && obj.toDateString() === tomorrowString;
    };
    // is a given date past?
    is.past = function (obj) {
      var now = new Date();
      return is.date(obj) && obj.getTime() < now.getTime();
    };
    // is a given date future?
    is.future = not(is.past);
    // is a given dates day equal given dayString parameter?
    is.day = function (obj, dayString) {
      return is.date(obj) && dayString.toLowerCase() === days[obj.getDay()];
    };
    // day method does not support 'all' and 'any' interfaces
    is.day.api = ['not'];
    // is a given dates month equal given monthString parameter?
    is.month = function (obj, monthString) {
      return is.date(obj) && monthString.toLowerCase() === months[obj.getMonth()];
    };
    // month method does not support 'all' and 'any' interfaces
    is.month.api = ['not'];
    // is a given dates year equal given year parameter?
    is.year = function (obj, year) {
      return is.date(obj) && is.number(year) && year === obj.getFullYear();
    };
    // year method does not support 'all' and 'any' interfaces
    is.year.api = ['not'];
    // is the given year a leap year?
    is.leapYear = function (year) {
      return is.number(year) && (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0);
    };
    // is a given date weekend?
    // 6: Saturday, 0: Sunday
    is.weekend = function (obj) {
      return is.date(obj) && (obj.getDay() === 6 || obj.getDay() === 0);
    };
    // is a given date weekday?
    is.weekday = not(is.weekend);
    // is date within given range?
    is.inDateRange = function (obj, startObj, endObj) {
      if (is.not.date(obj) || is.not.date(startObj) || is.not.date(endObj)) {
        return false;
      }
      var givenDate = obj.getTime();
      var start = startObj.getTime();
      var end = endObj.getTime();
      return givenDate > start && givenDate < end;
    };
    // inDateRange method does not support 'all' and 'any' interfaces
    is.inDateRange.api = ['not'];
    // is a given date in last week range?
    is.inLastWeek = function (obj) {
      return is.inDateRange(obj, new Date(new Date().setDate(new Date().getDate() - 7)), new Date());
    };
    // is a given date in last month range?
    is.inLastMonth = function (obj) {
      return is.inDateRange(obj, new Date(new Date().setMonth(new Date().getMonth() - 1)), new Date());
    };
    // is a given date in last year range?
    is.inLastYear = function (obj) {
      return is.inDateRange(obj, new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date());
    };
    // is a given date in next week range?
    is.inNextWeek = function (obj) {
      return is.inDateRange(obj, new Date(), new Date(new Date().setDate(new Date().getDate() + 7)));
    };
    // is a given date in next month range?
    is.inNextMonth = function (obj) {
      return is.inDateRange(obj, new Date(), new Date(new Date().setMonth(new Date().getMonth() + 1)));
    };
    // is a given date in next year range?
    is.inNextYear = function (obj) {
      return is.inDateRange(obj, new Date(), new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
    };
    // is a given date in the parameter quarter?
    is.quarterOfYear = function (obj, quarterNumber) {
      return is.date(obj) && is.number(quarterNumber) && quarterNumber === Math.floor((obj.getMonth() + 3) / 3);
    };
    // quarterOfYear method does not support 'all' and 'any' interfaces
    is.quarterOfYear.api = ['not'];
    // is a given date in daylight saving time?
    is.dayLightSavingTime = function (obj) {
      var january = new Date(obj.getFullYear(), 0, 1);
      var july = new Date(obj.getFullYear(), 6, 1);
      var stdTimezoneOffset = Math.max(january.getTimezoneOffset(), july.getTimezoneOffset());
      return obj.getTimezoneOffset() < stdTimezoneOffset;
    };
    // Environment checks
    /* -------------------------------------------------------------------------- */
    // check if library is used as a Node.js module
    if (typeof window !== 'undefined') {
      // store navigator properties to use later
      var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
      var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
      var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';
      // is current browser chrome?
      is.chrome = function () {
        return /chrome|chromium/i.test(userAgent) && /google inc/.test(vendor);
      };
      // chrome method does not support 'all' and 'any' interfaces
      is.chrome.api = ['not'];
      // is current browser firefox?
      is.firefox = function () {
        return /firefox/i.test(userAgent);
      };
      // firefox method does not support 'all' and 'any' interfaces
      is.firefox.api = ['not'];
      // is current browser internet explorer?
      // parameter is optional
      is.ie = function (version) {
        if (!version) {
          return /msie/i.test(userAgent) || 'ActiveXObject' in window;
        }
        if (version >= 11) {
          return 'ActiveXObject' in window;
        }
        return new RegExp('msie ' + version).test(userAgent);
      };
      // ie method does not support 'all' and 'any' interfaces
      is.ie.api = ['not'];
      // is current browser opera?
      is.opera = function () {
        return /^Opera\//.test(userAgent) || // Opera 12 and older versions
        /\x20OPR\//.test(userAgent);  // Opera 15+
      };
      // opera method does not support 'all' and 'any' interfaces
      is.opera.api = ['not'];
      // is current browser safari?
      is.safari = function () {
        return /safari/i.test(userAgent) && /apple computer/i.test(vendor);
      };
      // safari method does not support 'all' and 'any' interfaces
      is.safari.api = ['not'];
      // is current device ios?
      is.ios = function () {
        return is.iphone() || is.ipad() || is.ipod();
      };
      // ios method does not support 'all' and 'any' interfaces
      is.ios.api = ['not'];
      // is current device iphone?
      is.iphone = function () {
        return /iphone/i.test(userAgent);
      };
      // iphone method does not support 'all' and 'any' interfaces
      is.iphone.api = ['not'];
      // is current device ipad?
      is.ipad = function () {
        return /ipad/i.test(userAgent);
      };
      // ipad method does not support 'all' and 'any' interfaces
      is.ipad.api = ['not'];
      // is current device ipod?
      is.ipod = function () {
        return /ipod/i.test(userAgent);
      };
      // ipod method does not support 'all' and 'any' interfaces
      is.ipod.api = ['not'];
      // is current device android?
      is.android = function () {
        return /android/i.test(userAgent);
      };
      // android method does not support 'all' and 'any' interfaces
      is.android.api = ['not'];
      // is current device android phone?
      is.androidPhone = function () {
        return /android/i.test(userAgent) && /mobile/i.test(userAgent);
      };
      // androidPhone method does not support 'all' and 'any' interfaces
      is.androidPhone.api = ['not'];
      // is current device android tablet?
      is.androidTablet = function () {
        return /android/i.test(userAgent) && !/mobile/i.test(userAgent);
      };
      // androidTablet method does not support 'all' and 'any' interfaces
      is.androidTablet.api = ['not'];
      // is current device blackberry?
      is.blackberry = function () {
        return /blackberry/i.test(userAgent) || /BB10/i.test(userAgent);
      };
      // blackberry method does not support 'all' and 'any' interfaces
      is.blackberry.api = ['not'];
      // is current device desktop?
      is.desktop = function () {
        return is.not.mobile() && is.not.tablet();
      };
      // desktop method does not support 'all' and 'any' interfaces
      is.desktop.api = ['not'];
      // is current operating system linux?
      is.linux = function () {
        return /linux/i.test(appVersion);
      };
      // linux method does not support 'all' and 'any' interfaces
      is.linux.api = ['not'];
      // is current operating system mac?
      is.mac = function () {
        return /mac/i.test(appVersion);
      };
      // mac method does not support 'all' and 'any' interfaces
      is.mac.api = ['not'];
      // is current operating system windows?
      is.windows = function () {
        return /win/i.test(appVersion);
      };
      // windows method does not support 'all' and 'any' interfaces
      is.windows.api = ['not'];
      // is current device windows phone?
      is.windowsPhone = function () {
        return is.windows() && /phone/i.test(userAgent);
      };
      // windowsPhone method does not support 'all' and 'any' interfaces
      is.windowsPhone.api = ['not'];
      // is current device windows tablet?
      is.windowsTablet = function () {
        return is.windows() && is.not.windowsPhone() && /touch/i.test(userAgent);
      };
      // windowsTablet method does not support 'all' and 'any' interfaces
      is.windowsTablet.api = ['not'];
      // is current device mobile?
      is.mobile = function () {
        return is.iphone() || is.ipod() || is.androidPhone() || is.blackberry() || is.windowsPhone();
      };
      // mobile method does not support 'all' and 'any' interfaces
      is.mobile.api = ['not'];
      // is current device tablet?
      is.tablet = function () {
        return is.ipad() || is.androidTablet() || is.windowsTablet();
      };
      // tablet method does not support 'all' and 'any' interfaces
      is.tablet.api = ['not'];
      // is current state online?
      is.online = function () {
        return navigator.onLine;
      };
      // online method does not support 'all' and 'any' interfaces
      is.online.api = ['not'];
      // is current state offline?
      is.offline = not(is.online);
      // offline method does not support 'all' and 'any' interfaces
      is.offline.api = ['not'];
      // is current device supports touch?
      is.touchDevice = function () {
        return 'ontouchstart' in window || 'DocumentTouch' in window && document instanceof DocumentTouch;
      };
      // touchDevice method does not support 'all' and 'any' interfaces
      is.touchDevice.api = ['not'];
    }
    // Object checks
    /* -------------------------------------------------------------------------- */
    // has a given object got parameterized count property?
    is.propertyCount = function (obj, count) {
      if (!is.object(obj) || !is.number(count)) {
        return false;
      }
      if (Object.keys) {
        return Object.keys(obj).length === count;
      }
      var properties = [], property;
      for (property in obj) {
        if (hasOwnProperty.call(obj, property)) {
          properties.push(property);
        }
      }
      return properties.length === count;
    };
    // propertyCount method does not support 'all' and 'any' interfaces
    is.propertyCount.api = ['not'];
    // is given object has parameterized property?
    is.propertyDefined = function (obj, property) {
      return is.object(obj) && is.string(property) && property in obj;
    };
    // propertyDefined method does not support 'all' and 'any' interfaces
    is.propertyDefined.api = ['not'];
    // is a given object window?
    // setInterval method is only available for window object
    is.windowObject = function (obj) {
      return typeof obj === 'object' && 'setInterval' in obj;
    };
    // is a given object a DOM node?
    is.domNode = function (obj) {
      return is.object(obj) && obj.nodeType > 0;
    };
    // Array checks
    /* -------------------------------------------------------------------------- */
    // is a given item in an array?
    is.inArray = function (val, arr) {
      if (is.not.array(arr)) {
        return false;
      }
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === val)
          return true;
      }
      return false;
    };
    // inArray method does not support 'all' and 'any' interfaces
    is.inArray.api = ['not'];
    // is a given array sorted?
    is.sorted = function (arr) {
      if (is.not.array(arr)) {
        return false;
      }
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] > arr[i + 1])
          return false;
      }
      return true;
    };
    // API
    // Set 'not', 'all' and 'any' interfaces to methods based on their api property
    /* -------------------------------------------------------------------------- */
    function setInterfaces() {
      var options = is;
      for (var option in options) {
        if (hasOwnProperty.call(options, option) && is.function(options[option])) {
          var interfaces = options[option].api || [
            'not',
            'all',
            'any'
          ];
          for (var i = 0; i < interfaces.length; i++) {
            if (interfaces[i] === 'not') {
              is.not[option] = not(is[option]);
            }
            if (interfaces[i] === 'all') {
              is.all[option] = all(is[option]);
            }
            if (interfaces[i] === 'any') {
              is.any[option] = any(is[option]);
            }
          }
        }
      }
    }
    setInterfaces();
    // Configuration methods
    // Intentionally added after setInterfaces function
    /* -------------------------------------------------------------------------- */
    // set optional regexps to methods if you think they suck
    is.setRegexp = function (regexp, regexpName) {
      for (var r in regexps) {
        if (hasOwnProperty.call(regexps, r) && regexpName === r) {
          regexps[r] = regexp;
        }
      }
    };
    // change namespace of library to prevent name collisions
    // var preferredName = is.setNamespace();
    // preferredName.odd(3);
    // => true
    is.setNamespace = function () {
      root.is = previousIs;
      return this;
    };
    return is;
  }
  exports = is();
  return exports;
}(is_is);
jsloader_jsloader = function (exports) {
  function jsLoader() {
    // 用作存储脚本信息
    var cache = {};
    // 用作生成不重复的客户端id
    var _cid = 0;
    // 用作存储其他loader实例需要运行的脚本任务
    var processCache = {};
    // 用作储存别名
    window.alias = {};
    // 加载状态标识
    var DONE = 'done';
    var REJECTED = 'rejected';
    var PENDING = 'pending';
    // 获取document,head
    var doc = document;
    var head = doc.head || doc.getElementsByTagName('head')[0] || doc.documentElement;
    /**
     * 产生客户端id
     * @return {Number} [description]
     */
    function cid() {
      return _cid++;
    }
    /**
     * Script对象，储存需要加载的任务的基本信息
     * @param  {String} uri     uri 地址 | 需要执行的函数
     * @param  {String} type    任务类型
     */
    function Script(uri, type) {
      this.uri = uri;
      this.type = type;
      this.cid = cid();
      this.status = PENDING;
    }
    /**
     * 从缓存中获取需要的Script对象
     * 如果没有，新建一个
     * @param  {String} uri     uri 地址 | 需要执行的函数
     * @param  {String} type    任务类型
     * @return {Object}         需要的Script对象
     */
    function get(uri, type) {
      // 如果不存在于缓存中，创建一个新的Script对象
      return cache[uri] || (cache[uri] = new Script(uri, type));
    }
    /**
     * 获取真实地址
     * @param  {String} name [description]
     * @return {[type]}      return uri
     */
    function getAlias(name) {
      return alias[name];
    }
    function getCache(uri, type) {
      var opts = getAlias(uri);
      return opts ? get(opts.uri, opts.type) : get(uri, type);
    }
    // 处理
    var handler = {
      js: jsHandler,
      css: cssHandler,
      fn: fnHandler
    };
    // 对函数的处理
    function fnHandler(context, s) {
      // 函数不需要判断是否为正在加载状态
      try {
        s.uri();
        resolve(context, s);
      } catch (e) {
        s.error = e.message;
        resolve(context, s);
      }
    }
    // 对css请求的处理
    function cssHandler(context, s) {
      // 当其他Loader实体中的任务已经完成时
      if (s.status !== PENDING) {
        resolve(context, s);
        return;
      }
      var link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = s.uri;
      head.appendChild(link);
      resolve(context, s);
    }
    // 对js动态加载的处理
    function jsHandler(context, s) {
      // 处理已完成任务
      if (s.status !== PENDING) {
        resolve(context, s);
        return;
      }
      // 如果非第一个加载，将剩余的任务和任务关联的上下文塞进正在进行的进程中
      if (s.changeState) {
        processCache[s.cid] = processCache[s.cid] || [];
        processCache[s.cid].push({
          loader: context,
          s: s
        });
        return;
      }
      s.changeState = true;
      // 设置超时标志
      var isTimeout = true;
      var script = document.createElement('script');
      script.async = true;
      script.src = s.uri;
      // 如果支持onload事件
      var hasOnload = 'onload' in script;
      if (hasOnload) {
        script.onload = jsOnload;
        script.onerror = function () {
          jsOnload('ScriptError');
        };
      } else {
        script.onreadystatechange = function () {
          if (/loaded|complete/.test(script.readyState)) {
            jsOnload();
          }
        };
      }
      // 如果设置了超时，启动一个计时器
      if (context.timeout) {
        setTimeout(timeoutHandler, context.timeout);
      }
      head.appendChild(script);
      function jsOnload(error) {
        isTimeout = false;
        script.onload = script.onerror = script.onreadystatechange = null;
        head.removeChild(script);
        script = null;
        if (error && typeof error === 'string') {
          s.error = error;
        }
        resolve(context, s);
      }
      function timeoutHandler() {
        if (isTimeout) {
          console.log('timeout');
          jsOnload('RequestTimeout');
        }
      }
    }
    function resolve(loader, s) {
      if (s.error) {
        loader.errors.push(s);
      }
      loader.done();
      var cache = processCache[s.cid];
      if (cache && !cache.length) {
        for (var i = 0, len = cache.length; i < len; i++) {
          cache.shift().loader.done();
        }
      }
    }
    var Loader = function () {
      this.list = [];
      this.errors = [];
      this.timeout = [];
      this.callback = null;
    };
    Loader.prototype.then = function (src, type) {
      if (src === undefined) {
        throw new Error('木有参数');
      }
      //  修正参数
      if (!type) {
        if (typeof src === 'string') {
          if (/\.css$|\.css\?/i.test(src)) {
            type = 'css';
          }
          if (/\.js$|\.js\?/i.test(src)) {
            type = 'js';
          }
        }
        if (typeof src === 'function') {
          type = 'fn';
        }
      }
      type = type || 'js';
      this.list.push(getCache(src, type));
      return this;
    };
    Loader.prototype.done = function (cb) {
      if (this.callback === null) {
        this.callback = cb;
      }
      if (!this.list.length) {
        this.callback && this.callback(this.errors);
        return;
      }
      var script = this.list.shift();
      handler[script.type](this, script);
      if (!this.called) {
        this.called = true;
        return new Loader();
      }
    };
    Loader.prototype.config = function (opts) {
      this.timeout = opts.timeout || 0;
      if (opts.alias && !opts.alias.length) {
        for (var i in alias) {
        }
        for (var i = opts.alias.length - 1; i >= 0; i--) {
          alias[i] = opts.alias[i];
        }
      }
      return this;
    };
    return Loader;
  }
  var Loader = jsLoader();
  exports = new Loader();
  return exports;
}(jsloader_jsloader);
keycode_getKeyName = function (exports) {
  var keyCodeHelper = function () {
    var self = this;
    this.keyCodeMap = {
      8: 'Backspace',
      9: 'Tab',
      13: 'Enter',
      16: 'Shift',
      17: 'Ctrl',
      18: 'Alt',
      19: 'Pause',
      20: 'Caps Lock',
      27: 'Escape',
      32: 'Space',
      33: 'Page Up',
      34: 'Page Down',
      35: 'End',
      36: 'Home',
      37: 'Left',
      38: 'Up',
      39: 'Right',
      40: 'Down',
      42: 'Print Screen',
      45: 'Insert',
      46: 'Delete',
      48: '0',
      49: '1',
      50: '2',
      51: '3',
      52: '4',
      53: '5',
      54: '6',
      55: '7',
      56: '8',
      57: '9',
      65: 'A',
      66: 'B',
      67: 'C',
      68: 'D',
      69: 'E',
      70: 'F',
      71: 'G',
      72: 'H',
      73: 'I',
      74: 'J',
      75: 'K',
      76: 'L',
      77: 'M',
      78: 'N',
      79: 'O',
      80: 'P',
      81: 'Q',
      82: 'R',
      83: 'S',
      84: 'T',
      85: 'U',
      86: 'V',
      87: 'W',
      88: 'X',
      89: 'Y',
      90: 'Z',
      91: 'Windows',
      93: 'Right Click',
      96: 'Numpad 0',
      97: 'Numpad 1',
      98: 'Numpad 2',
      99: 'Numpad 3',
      100: 'Numpad 4',
      101: 'Numpad 5',
      102: 'Numpad 6',
      103: 'Numpad 7',
      104: 'Numpad 8',
      105: 'Numpad 9',
      106: 'Numpad *',
      107: 'Numpad +',
      109: 'Numpad -',
      110: 'Numpad .',
      111: 'Numpad /',
      112: 'F1',
      113: 'F2',
      114: 'F3',
      115: 'F4',
      116: 'F5',
      117: 'F6',
      118: 'F7',
      119: 'F8',
      120: 'F9',
      121: 'F10',
      122: 'F11',
      123: 'F12',
      144: 'Num Lock',
      145: 'Scroll Lock',
      182: 'My Computer',
      183: 'My Calculator',
      186: ';',
      187: '=',
      188: ',',
      189: '-',
      190: '.',
      191: '/',
      192: '`',
      219: '[',
      220: '\\',
      221: ']',
      222: '\''
    };
    /**
     * @return String keyname
     * @params Number  keycode
     */
    this.getKeyName = function (keycode) {
      if (self.keyCodeMap[keycode]) {
        return self.keyCodeMap[keycode];
      } else {
        console.log('Unknow Key(Key Code:' + keycode + ')');
        return '';
      }
    };
  };
  exports = new keyCodeHelper().getKeyName;
  return exports;
}(keycode_getKeyName);
object_deepCopy = function (exports) {
  // 深拷贝
  function deepCopy(parent, child) {
    var child = child || {};
    for (var i in parent) {
      if (typeof parent[i] === 'object') {
        child[i] = parent[i].constructor === Array ? [] : {};
        //新建数组或者object来达到目的
        deepCopy(parent[i], child[i]);
      } else {
        child[i] = parent[i];
      }
    }
    return child;
  }
  exports = deepCopy;
  return exports;
}(object_deepCopy);
object_extend = function (exports) {
  // 浅拷贝,只是拷贝基本类型的数据,把parent有的全部给child.在遇到[]和{}时候会有问题
  var extend = function (parent, child) {
    for (var p in parent) {
      if (parent.hasOwnProperty(p)) {
        child[p] = parent[p];
      }
    }
    child.uber = parent;
    return child;
  };
  exports = extend;
  return exports;
}(object_extend);
random_randomColor = function (exports) {
  function randomColor() {
    var r = function () {
      return Math.floor(Math.random() * 256);
    };
    return 'rgb(' + r() + ',' + r() + ',' + r() + ')';
  }
  exports = randomColor;
  return exports;
}(random_randomColor);
regexp_isEmail = function (exports) {
  var reg = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
  /**
   * @return Boolean
   * @params String str
   */
  var isEmail = function (str) {
    return reg.test(str);
  };
  exports = isEmail;
  return exports;
}(regexp_isEmail);
regexp_isHexAdecimal = function (exports) {
  var reg = /^[0-9a-fA-F]+$/;
  var isHexAdecimal = function (str) {
    return reg.test(str);
  };
  exports = isHexAdecimal;
  return exports;
}(regexp_isHexAdecimal);
regexp_isHexColor = function (exports) {
  var reg = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  var isHexColor = function (str) {
    return reg.test(str);
  };
  exports = isHexColor;
  return exports;
}(regexp_isHexColor);
regexp_isTimeString = function (exports) {
  var reg = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/;
  var isTimeString = function (str) {
    return reg.test(str);
  };
  exports = isTimeString;
  return exports;
}(regexp_isTimeString);
regexp_isUrl = function (exports) {
  var reg = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i;
  var isUrl = function (str) {
    return reg.test(str);
  };
  exports = isUrl;
  return exports;
}(regexp_isUrl);
string_trim = function (exports) {
  var trim = function (string, leftOrRight) {
    if (leftOrRight) {
      if (leftOrRight === 'left') {
        return string.replace(/^\s*/, '');
      } else if (leftOrRight === 'right') {
        return string.replace(/\s*$/, '');
      }
    } else {
      return string.replace(/^\s*|\s*$/g, '');
    }
  };
  exports = trim;
  return exports;
}(string_trim);
time_parseTime = function (exports) {
  var parseTime = function (time) {
    var timeStamp;
    var parseDateDtring = function (dateStr) {
      var newstr = dateStr.replace(/-/g, '/');
      newstr = newstr.replace(/[A-Za-z]|[\u4E00-\u9FA5]+/g, ' ');
      newstr = newstr.replace(/\.\d+$/g, '');
      var date = new Date(newstr);
      if (date.toString() === 'Invalid Date') {
        throw '请提供合法的时间字符串';
      } else {
        return date.getTime();
      }
    };
    if (toString.call(time) === '[object Number]') {
      if ((time + '').length === 13) {
        timeStamp = time;
      } else if ((time + '').length === 10) {
        timeStamp = time * 1000;
      } else {
        throw '请提供合法的时间戳';
      }
    } else if (toString.call(time) === '[object Date]') {
      if (date.toString() === 'Invalid Date') {
        throw '请提供合法的时间对象';
      } else {
        timeStamp = time.getTime();
      }
    } else if (toString.call(time) === '[object String]') {
      timeStamp = parseDateDtring(time);
    }
    return timeStamp;
  };
  exports = parseTime;
  return exports;
}(time_parseTime);
time_judgeTime = function (exports) {
  var parseTime = time_parseTime;
  var _getTimeStr = function (time) {
    var time = new Date(time);
    var Y = time.getFullYear() + '-';
    var M = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) + '-';
    var D = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
    var h = time.getHours() + ':';
    var m = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    return {
      dateStr: Y + M + D,
      timeStr: h + m,
      dateTimeStr: Y + M + D + ' ' + h + m
    };
  };
  var judgeTime = function (time) {
    var timeType;
    var dateStr;
    var timeStr;
    var timeStamp = parseTime(time);
    var now = new Date().getTime();
    var Y = time.getFullYear();
    var y = now.getFullYear();
    var m = now.getMonth();
    var d = now.getDate();
    var zeroStamp = Math.round(new Date(y, m, d, 0, 0, 1).getTime());
    //获得今日0点的时间戳
    var nz = now - zeroStamp;
    var nt = now - timeStamp;
    if (nt < nz) {
      timeType = 'today';
    } else if (nt > nz && nt < 86400000 + nz) {
      timeType = 'yesterday';
    } else if (y - Y === 1) {
      timeType = 'lastYear';
    } else if (y - Y === 0) {
      timeType = 'thisYear';
    }  //添加更多支持：例如上个月，去年，今年
    else {
      timeType = 'normal';
    }
    var timeStrObj = _getTimeStr(time);
    return {
      timeStamp: timeStamp,
      dateStr: timeStrObj.dateStr,
      timeStr: timeStrObj.timeStr,
      dateTimeStr: timeStrObj.dateTimeStr,
      timeType: timeType
    };
  };
  exports = judgeTime;
  return exports;
}(time_judgeTime);
trigger_trigger = function (exports) {
  var trigger = function () {
  };
  trigger.prototype.on = function (eventName, func) {
    this._listeners = this._listeners || {};
    this._listeners[eventName] = this._listeners[eventName] || [];
    this._listeners[eventName].push(func);
  };
  trigger.prototype.off = function (eventName, func) {
    this._listeners = this._listeners || {};
    this._listeners[eventName].splice(this._listeners[eventName].indexOf(func), 1);
  };
  trigger.prototype.trigger = function (eventName) {
    this._listeners = this._listeners || {};
    var dataArgument = arguments[1] ? arguments[1] : null;
    this._listeners[eventName].forEach(function (ev) {
      if (dataArgument) {
        ev.call(this, dataArgument);
      } else {
        ev.call(this);
      }
    });
  };
  trigger.extend = function (obj) {
    var functions = [
      'on',
      'off',
      'trigger'
    ];
    functions.forEach(function (func) {
      if (typeof obj === 'function') {
        obj.prototype[func] = trigger.prototype[func];
      } else {
        obj[func] = trigger.prototype[func];
      }
    });
  };
  var setTrigger = function (fn) {
    var Trigger;
    if (!fn) {
      Trigger = function () {
      };
    } else {
      Trigger = fn;
    }
    trigger.extend(Trigger);
    return new Trigger();
  };
  exports = setTrigger;
  return exports;
}(trigger_trigger);
type_getType = function (exports) {
  var toString = Object.prototype.toString;
  var getType = function (val) {
    switch (toString.call(val)) {
    case '[object Date]':
      return 'date';
    case '[object RegExp]':
      return 'regexp';
    case '[object Arguments]':
      return 'arguments';
    case '[object Array]':
      return 'array';
    case '[object Error]':
      return 'error';
    }
    if (val === null)
      return 'null';
    if (val === undefined)
      return 'undefined';
    if (val !== val)
      return 'nan';
    if (val && val.nodeType === 1)
      return 'element';
    val = val.valueOf ? val.valueOf() : Object.prototype.valueOf.apply(val);
    return typeof val;
  };
  exports = getType;
  return exports;
}(type_getType);
url_parsePort = function (exports) {
  var parsePort = function (protocol) {
    switch (protocol) {
    case 'http:':
      return 80;
    case 'https:':
      return 443;
    default:
      return location.port;
    }
  };
  exports = parsePort;
  return exports;
}(url_parsePort);
url_parseURL = function (exports) {
  var parsePort = url_parsePort;
  var parseURL = function (url) {
    var a = document.createElement('a');
    a.href = url;
    return {
      href: a.href,
      host: a.host || location.host,
      port: '0' === a.port || '' === a.port ? parsePort(a.protocol) : a.port,
      hash: a.hash,
      hostname: a.hostname || location.hostname,
      pathname: a.pathname.charAt(0) != '/' ? '/' + a.pathname : a.pathname,
      protocol: !a.protocol || ':' == a.protocol ? location.protocol : a.protocol,
      search: a.search,
      query: a.search.slice(1)
    };
  };
  exports = parseURL;
  return exports;
}(url_parseURL);
url_isCrossDomain = function (exports) {
  var parseURL = url_parseURL;
  // 是否跨域判断,判断主机名,端口号,和协议.
  var isCrossDomain = function (url) {
    url = parseURL(url);
    var location = parseURL(window.location.href);
    return url.hostname !== location.hostname || url.port !== location.port || url.protocol !== location.protocol;
  };
  exports = isCrossDomain;
  return exports;
}(url_isCrossDomain);
url_parseQueryString = function (exports) {
  var trim = string_trim;
  var pattern = /(\w+)\[(\d+)\]/;
  var encode = url_encode;
  var decode = url_decode;
  var parseQueryString = function (str) {
    if ('string' != typeof str)
      return {};
    str = trim(str);
    if ('' == str)
      return {};
    if ('?' == str.charAt(0))
      str = str.slice(1);
    var obj = {};
    var pairs = str.split('&');
    for (var i = 0; i < pairs.length; i++) {
      var parts = pairs[i].split('=');
      var key = decode(parts[0]);
      var m;
      if (m = pattern.exec(key)) {
        obj[m[1]] = obj[m[1]] || [];
        obj[m[1]][m[2]] = decode(parts[1]);
        continue;
      }
      obj[parts[0]] = null == parts[1] ? '' : decode(parts[1]);
    }
    return obj;
  };
  exports = parseQueryString;
  return exports;
}(url_parseQueryString);
url_stringfyQueryString = function (exports) {
  var trim = string_trim;
  var getType = type_getType;
  var encode = url_encode;
  var decode = url_decode;
  var stringfyQueryString = function (obj) {
    if (!obj)
      return '';
    var pairs = [];
    for (var key in obj) {
      var value = obj[key];
      if ('array' == getType(value)) {
        for (var i = 0; i < value.length; ++i) {
          pairs.push(encode(key + '[' + i + ']') + '=' + encode(value[i]));
        }
        continue;
      }
      pairs.push(encode(key) + '=' + encode(obj[key]));
    }
    return pairs.join('&');
  };
  exports = stringfyQueryString;
  return exports;
}(url_stringfyQueryString);

return {ajax:ajax_ajax,ajaxFile:ajax_ajaxFile,ajaxGet:ajax_ajaxGet,ajaxJsonp:ajax_ajaxJsonp,ajaxPost:ajax_ajaxPost,arrayEqual:array_arrayEqual,arrayOrderByMax:array_arrayOrderByMax,arrayOrderByMin:array_arrayOrderByMin,arrayRemove:array_arrayRemove,indexof:array_indexof,addClass:class_addClass,hasClass:class_hasClass,removeClass:class_removeClass,toggleClass:class_toggleClass,getCookie:cookie_getCookie,getCookies:cookie_getCookies,parseCookie:cookie_parseCookie,setCookie:cookie_setCookie,getIEVersion:device_getIEVersion,getOS:device_getOS,isChrome:device_isChrome,isIE:device_isIE,closest:dom_closest,forceReflow:dom_forceReflow,getComputedStyle:dom_getComputedStyle,getDocumentScrollTop:dom_getDocumentScrollTop,getElementByClassName:dom_getElementByClassName,getOffset:dom_getOffset,getPageSize:dom_getPageSize,getPosition:dom_getPosition,getStyle:dom_getStyle,height:dom_height,insertAfter:dom_insertAfter,matches:dom_matches,outerHeight:dom_outerHeight,outerHeightWithMargin:dom_outerHeightWithMargin,outerWidth:dom_outerWidth,outerWidthWithMargin:dom_outerWidthWithMargin,removeElement:dom_removeElement,scrollTo:dom_scrollTo,setDocumentScrollTop:dom_setDocumentScrollTop,setStyle:dom_setStyle,width:dom_width,is:is_is,jsloader:jsloader_jsloader,getKeyName:keycode_getKeyName,deepCopy:object_deepCopy,extend:object_extend,randomColor:random_randomColor,randomNumber:random_randomNumber,isEmail:regexp_isEmail,isHexAdecimal:regexp_isHexAdecimal,isHexColor:regexp_isHexColor,isTimeString:regexp_isTimeString,isUrl:regexp_isUrl,trim:string_trim,judgeTime:time_judgeTime,parseTime:time_parseTime,trigger:trigger_trigger,getType:type_getType,decode:url_decode,encode:url_encode,isCrossDomain:url_isCrossDomain,parsePort:url_parsePort,parseQueryString:url_parseQueryString,parseURL:url_parseURL,stringfyQueryString:url_stringfyQueryString}
});