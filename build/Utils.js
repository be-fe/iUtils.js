(function (ns, factory) {if (typeof define === 'function' && define.amd) {define(factory);}else if (typeof module === 'object' && module.exports) {module.exports = factory();}else {window[ns] = factory();}})('Utils', function () {

/*
 *  author: xieyu33333
 */
var time_parseTime = {}, time_judgeTime = {};
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

return {judgeTime:time_judgeTime,parseTime:time_parseTime}
});