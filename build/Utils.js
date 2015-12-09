(function (ns, factory) {if (typeof define === 'function' && define.amd) {define(factory);}else if (typeof module === 'object' && module.exports) {module.exports = factory();}else {window[ns] = factory();}})('Utils', function () {

/**
 * @file randomNumber
 * @author leiquan<leiquan@baidu.com>
 */
var random_randomNumber = {}, ajax_ajax = {}, ajax_ajaxFile = {}, ajax_ajaxGet = {}, ajax_ajaxJsonp = {}, ajax_ajaxPost = {}, array_arrayEqual = {}, array_indexOf = {}, cookie_decode = {}, cookie_encode = {}, cookie_parseCookie = {}, cookie_getAllCookie = {}, cookie_getCookieByName = {}, cookie_setCookie = {}, css_hasClass = {}, css_addClass = {}, css_getElementByClassName = {}, css_removeClass = {}, css_toggleClass = {}, ie_getIEVersion = {}, keycode_getKeyNameByKeycode = {}, time_parse = {}, time_betweenTime = {}, time_formatTime = {}, time_getDate = {}, time_getDayArray = {}, time_getDayInWeek = {}, time_getMonthArray = {}, time_getWeekArray = {}, time_getWeekNumber = {}, time_getYearArray = {}, time_parseTime = {}, time_judgeTime = {}, type_typeIsBuffer = {}, type_getType = {}, ua_getDevicePlatform = {}, url_parsePort = {}, url_parseURL = {}, url_isCrossDomain = {};
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
      // key:value
      type: 'text',
      // text, json, xml
      formData: null,
      //xmlHttpRequest 2.0 可利用formData对象来上传文件
      successCallback: function (data) {
      },
      failCallback: function () {
      }
    };
    // 更新option
    for (var pro in userOptions) {
      options[pro] = userOptions[pro];
    }
    var method = options.method;
    var url = options.url;
    var params = options.params;
    var type = options.type;
    var formData = options.formData;
    var successCallback = options.successCallback;
    var failCallback = options.failCallback;
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
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
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
          if (successCallback) {
            successCallback(returnValue);
          }
        } else {
          if (failCallback) {
            failCallback(returnValue);
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
    if ('GET' === method.toUpperCase()) {
      url += '?' + formateParams;
      xmlhttp.open(method, url, true);
      xmlhttp.send(null);
    } else if ('POST' === method.toUpperCase()) {
      xmlhttp.open(method, url, true);
      // 如果是POST提交，设置请求头信息
      xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xmlhttp.send(formateParams);
    } else if ('JSONP' === method.toUpperCase()) {
      var callbackName = 'jsonp' + randomNumber(1000, 9999);
      // 创建script来请求jsonp
      var head = document.getElementsByTagName('head')[0] || document.documentElement;
      var script = document.createElement('script');
      url += '?' + formateParams;
      script.src = url + '&callback=' + callbackName;
      head.insertBefore(script, head.firstChild);
      window[callbackName] = function (data) {
        if (successCallback) {
          successCallback(data);
        }
        delete window[callbackName];
        head.removeChild(script);
      };
    } else if ('FILE' === method.toUpperCase()) {
      xmlhttp.open('post', url, true);
      // xmlhttp.setRequestHeader("Content-Type", "multipart/form-data");
      xmlhttp.send(formData);
    }
  };
  exports = myAjax;
  return exports;
}(ajax_ajax);
ajax_ajaxFile = function (exports) {
  var ajax = ajax_ajax;
  // 注意,file对象要append到formData对象中
  var ajaxFile = function (url, formData, successCallback, failCallback) {
    ajax({
      method: 'file',
      url: url,
      formData: formData,
      type: 'text',
      successCallback: successCallback,
      failCallback: failCallback
    });
  };
  exports = ajaxFile;
  return exports;
}(ajax_ajaxFile);
ajax_ajaxGet = function (exports) {
  var ajax = ajax_ajax;
  var ajaxGet = function (url, params, successCallback, failCallback) {
    ajax({
      method: 'get',
      url: url,
      params: params,
      type: 'text',
      successCallback: successCallback,
      failCallback: failCallback
    });
  };
  exports = ajaxGet;
  return exports;
}(ajax_ajaxGet);
ajax_ajaxJsonp = function (exports) {
  var ajax = ajax_ajax;
  var ajaxJsonp = function (url, params, successCallback, failCallback) {
    ajax({
      method: 'jsonp',
      url: url,
      params: params,
      type: 'text',
      successCallback: successCallback,
      failCallback: failCallback
    });
  };
  exports = ajaxJsonp;
  return exports;
}(ajax_ajaxJsonp);
ajax_ajaxPost = function (exports) {
  var ajax = ajax_ajax;
  var ajaxPost = function (url, params, successCallback, failCallback) {
    ajax({
      method: 'post',
      url: url,
      params: params,
      type: 'text',
      successCallback: successCallback,
      failCallback: failCallback
    });
  };
  exports = ajaxPost;
  return exports;
}(ajax_ajaxPost);
array_arrayEqual = function (exports) {
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
}(array_arrayEqual);
array_indexOf = function (exports) {
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
}(array_indexOf);
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
cookie_parseCookie = function (exports) {
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
}(cookie_parseCookie);
cookie_getAllCookie = function (exports) {
  var parse = cookie_parseCookie;
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
css_hasClass = function (exports) {
  var hasClass = function (obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  };
  exports = hasClass;
  return exports;
}(css_hasClass);
css_addClass = function (exports) {
  var hasClass = css_hasClass;
  var addClass = function (obj, cls) {
    if (!hasClass(obj, cls)) {
      obj.className += ' ' + cls;
    }
  };
  exports = addClass;
  return exports;
}(css_addClass);
css_getElementByClassName = function (exports) {
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
}(css_getElementByClassName);
css_removeClass = function (exports) {
  var hasClass = css_hasClass;
  var removeClass = function (obj, cls) {
    if (hasClass(obj, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      obj.className = obj.className.replace(reg, ' ');
    }
  };
  exports = removeClass;
  return exports;
}(css_removeClass);
css_toggleClass = function (exports) {
  var hasClass = css_hasClass;
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
}(css_toggleClass);
ie_getIEVersion = function (exports) {
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
}(ie_getIEVersion);
keycode_getKeyNameByKeycode = function (exports) {
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
    this.getKeyNameByKeycode = function (keycode) {
      if (self.keyCodeMap[keycode]) {
        return self.keyCodeMap[keycode];
      } else {
        console.log('Unknow Key(Key Code:' + keycode + ')');
        return '';
      }
    };
  };
  exports = new keyCodeHelper().getKeyNameByKeycode;
  return exports;
}(keycode_getKeyNameByKeycode);
time_parse = function (exports) {
  var DATE_PATTERN = /^(\d{4})\D*(\d{2})\D*(\d{2})/;
  var DATE_DAYS = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六'
  ];
  var parse = function (day) {
    var len = ('' + day).length;
    if (len <= 11 && DATE_PATTERN.test(day)) {
      var arr = ('' + day).match(DATE_PATTERN);
      return Date.parse(arr[2] + '/' + arr[3] + '/' + arr[1]);
    } else if (len >= 12) {
      return day;
    }
  };
  exports = parse;
  return exports;
}(time_parse);
time_betweenTime = function (exports) {
  var parse = time_parse;
  var betweenTime = function (day1, day2) {
    return Math.abs((parse(day1) - parse(day2)) / 86400000);
  };
  exports = betweenTime;
  return exports;
}(time_betweenTime);
time_formatTime = function (exports) {
  var parse = time_parse;
  var formatTime = function (day, pattern) {
    var source = new Date(parse(day));
    function replacer(patternPart, result) {
      pattern = pattern.replace(patternPart, result);
    }
    // 对目标数字进行0补齐处理
    var pad = function (source, length) {
      var pre = '';
      var negative = source < 0;
      var string = String(Math.abs(source));
      if (string.length < length) {
        pre = new Array(length - string.length + 1).join('0');
      }
      return (negative ? '-' : '') + pre + string;
    };
    var year = source.getFullYear();
    var month = source.getMonth() + 1;
    var date2 = source.getDate();
    replacer(/yyyy/g, pad(year, 4));
    replacer(/yy/g, pad(parseInt(year.toString().slice(2), 10), 2));
    replacer(/MM/g, pad(month, 2));
    replacer(/M/g, month);
    replacer(/dd/g, pad(date2, 2));
    replacer(/d/g, date2);
    return pattern;
  };
  exports = formatTime;
  return exports;
}(time_formatTime);
time_getDate = function (exports) {
  var parse = time_parse;
  var formatTime = time_formatTime;
  var getDate = function (day, num, pattern) {
    num = num || 0;
    pattern = pattern || 'yyyyMMdd';
    return formatTime(parse(day) + 1000 * 60 * 60 * 24 * num, pattern);
  };
  exports = getDate;
  return exports;
}(time_getDate);
time_getDayArray = function (exports) {
  var parse = time_parse;
  var getDate = time_getDate;
  var betweenTime = time_betweenTime;
  var getDayArray = function (day1, day2, n, pattern) {
    pattern = pattern || 'yyyyMMdd';
    var all = betweenTime(day1, day2);
    if (all <= n) {
      n = all;
    }
    var arr = [];
    var cur = 0;
    var i = 0;
    var step = n > 1 ? n - 1 : all;
    var part = Math.floor(all / step);
    var residue = all % n;
    // 记录差值
    arr.push(getDate(day1, 0, pattern));
    for (; i < step; i++) {
      cur += part;
      cur += residue-- > 0 ? 1 : 0;
      arr.push(getDate(day1, cur, pattern));
    }
    return arr;
  };
  exports = getDayArray;
  return exports;
}(time_getDayArray);
time_getDayInWeek = function (exports) {
  var parse = time_parse;
  var startDay = 1;
  var DATE_DAYS = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六'
  ];
  var getDayInWeek = function (day) {
    var index = new Date(parse(day)).getDay();
    var k = startDay === 1 ? index === 0 ? 6 : index - 1 : index;
    return {
      k: k,
      v: DATE_DAYS[index]
    };
  };
  exports = getDayInWeek;
  return exports;
}(time_getDayInWeek);
time_getMonthArray = function (exports) {
  var parse = time_parse;
  var getMonthArray = function (day1, day2) {
    var date1 = new Date(parse(day1));
    var date2 = new Date(parse(day2));
    if (date1 > date2) {
      var date = date1;
      date1 = date2;
      date2 = date;
    }
    var year1 = date1.getFullYear();
    var year2 = date2.getFullYear();
    var month1 = date1.getMonth() + 1;
    var month2 = date2.getMonth() + 1;
    var arr = [];
    var i = year1;
    var j = month1;
    var jj = (year2 - year1) * 12 + month2;
    for (; i <= year2; i++) {
      for (; j <= jj; j++) {
        arr.push(i + '' + (j > 9 ? j : '0' + j));
        if (j === 12) {
          j = 1;
          jj -= 12;
          break;
        }
      }
    }
    return arr;
  };
  exports = getMonthArray;
  return exports;
}(time_getMonthArray);
time_getWeekArray = function (exports) {
  var parse = time_parse;
  var getDate = time_getDate;
  var getDayInWeek = time_getDayInWeek;
  var betweenTime = time_betweenTime;
  var getWeekArray = function (day1, day2) {
    day1 = getDate(day1, 0);
    day2 = getDate(day2, 0);
    var dy1 = getDayInWeek(day1);
    var k1 = dy1.k;
    var output = [];
    var start = 6 - k1;
    var max = betweenTime(day1, day2) + 1;
    var i = 1;
    var len = max - start;
    if (start > max) {
      return [day1 + '|' + day2];
    }
    output.push(day1 + '|' + getDate(day1, start));
    for (; i <= len; i += 7) {
      var startday = getDate(day1, start + i);
      var endday = getDate(day1, start + i + 6);
      if (startday > day2) {
        break;
      }
      if (endday > day2) {
        endday = day2;
      }
      output.push(startday + '|' + endday);
    }
    return output;
  };
  exports = getWeekArray;
  return exports;
}(time_getWeekArray);
time_getWeekNumber = function (exports) {
  var parse = time_parse;
  var getWeekNumber = function (day1, day2) {
    var date1 = new Date(parse(day1));
    var date2 = new Date(parse(day2));
    var date0 = new Date(date1.getFullYear(), 0, 1);
    var d1 = Math.round((date1.getTime() - date0.getTime() + (date0.getDay() - date1.getDay()) * (24 * 60 * 60 * 1000)) / 86400000);
    var d2 = Math.round((date2.getTime() - date0.getTime() + (date0.getDay() - date2.getDay()) * (24 * 60 * 60 * 1000)) / 86400000);
    return Math.ceil(d2 / 7) - Math.ceil(d1 / 7);
  };
  exports = getWeekNumber;
  return exports;
}(time_getWeekNumber);
time_getYearArray = function (exports) {
  var parse = time_parse;
  var getYearArray = function (day1, day2) {
    var year1 = new Date(parse(day1)).getFullYear();
    var year2 = new Date(parse(day2)).getFullYear();
    var arr = [];
    var i = year1;
    if (year1 > year2) {
      i = year2;
      year2 = year1;
    }
    for (; i <= year2; i++) {
      arr.push(i);
    }
    return arr;
  };
  exports = getYearArray;
  return exports;
}(time_getYearArray);
time_parseTime = function (exports) {
  /*
   * @return number
   * @params string/number/obj
   */
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
  /*
   * @return obj
   * @params string/number/obj
   */
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
type_typeIsBuffer = function (exports) {
  var toString = Object.prototype.toString;
  // code borrowed from https://github.com/feross/is-buffer/blob/master/index.js
  function typeIsBuffer(obj) {
    return !!(obj != null && (obj._isBuffer || obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)));
  }
  exports = typeIsBuffer;
  return exports;
}(type_typeIsBuffer);
type_getType = function (exports) {
  var toString = Object.prototype.toString;
  var typeIsBuffer = type_typeIsBuffer;
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
    if (typeIsBuffer(val))
      return 'buffer';
    val = val.valueOf ? val.valueOf() : Object.prototype.valueOf.apply(val);
    return typeof val;
  };
  exports = getType;
  return exports;
}(type_getType);
ua_getDevicePlatform = function (exports) {
  function getDevicePlatform() {
    var ua = navigator.userAgent;
    if (/mac/i.test(ua)) {
      return 'mac';
    }
    if (/win/i.test(ua)) {
      return 'windows';
    }
    if (/linux/i.test(ua)) {
      return 'linux';
    }
    if (/iphone/i.test(ua)) {
      return 'iphone';
    }
    if (/ipad/i.test(ua)) {
      return 'ipad';
    }
    if (/ipod/i.test(ua)) {
      return 'ipod';
    }
    if (/android/i.test(ua)) {
      return 'android';
    }
  }
  exports = getDevicePlatform;
  return exports;
}(ua_getDevicePlatform);
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

return {ajax:ajax_ajax,ajaxFile:ajax_ajaxFile,ajaxGet:ajax_ajaxGet,ajaxJsonp:ajax_ajaxJsonp,ajaxPost:ajax_ajaxPost,arrayEqual:array_arrayEqual,indexOf:array_indexOf,decode:cookie_decode,encode:cookie_encode,getAllCookie:cookie_getAllCookie,getCookieByName:cookie_getCookieByName,parseCookie:cookie_parseCookie,setCookie:cookie_setCookie,addClass:css_addClass,getElementByClassName:css_getElementByClassName,hasClass:css_hasClass,removeClass:css_removeClass,toggleClass:css_toggleClass,getIEVersion:ie_getIEVersion,getKeyNameByKeycode:keycode_getKeyNameByKeycode,randomNumber:random_randomNumber,betweenTime:time_betweenTime,formatTime:time_formatTime,getDate:time_getDate,getDayArray:time_getDayArray,getDayInWeek:time_getDayInWeek,getMonthArray:time_getMonthArray,getWeekArray:time_getWeekArray,getWeekNumber:time_getWeekNumber,getYearArray:time_getYearArray,judgeTime:time_judgeTime,parse:time_parse,parseTime:time_parseTime,getType:type_getType,typeIsBuffer:type_typeIsBuffer,getDevicePlatform:ua_getDevicePlatform,isCrossDomain:url_isCrossDomain,parsePort:url_parsePort,parseURL:url_parseURL}
});