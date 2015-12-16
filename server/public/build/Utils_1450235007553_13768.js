;(function() {
/**
 * @file hasClass.js
 */
var class_hasClass = {}, class_addClass = {}, class_removeClass = {}, class_toggleClass = {}, string_trim = {};
class_hasClass = function (exports) {
  /**
   * @return Boolean
   * @params HTMLElement obj, String  cls
   */
  var hasClass = function (obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  };
  exports = hasClass;
  return exports;
}(class_hasClass);
class_addClass = function (exports) {
  var hasClass = class_hasClass;
  /**
   * @params HTMLElement obj, String  cls
   */
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
  /**
   * @params HTMLElement obj, String  cls
   */
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
  /**
   * @params HTMLElement obj, String  cls
   */
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
string_trim = function (exports) {
  /**
   * @return String
   * @params String string, String leftOrRight
   */
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
}());