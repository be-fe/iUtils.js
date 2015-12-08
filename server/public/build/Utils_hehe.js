;(function() {
/*
 *  author: xieyu33333
 */
var time_parseTime = {};
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
}());