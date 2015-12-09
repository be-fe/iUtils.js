(function (ns, factory) {if (typeof define === 'function' && define.amd) {define(factory);}else if (typeof module === 'object' && module.exports) {module.exports = factory();}else {window[ns] = factory();}})('Utils', function () {

/*
 * from https://github.com/component/ie/blob/master/index.js
 */
var type_typeIsBuffer = {}, type_getType = {}, ajax_parseJsonToQuery = {};
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
ajax_parseJsonToQuery = function (exports) {
  var getType = type_getType;
  var parseJsonToQuery = function (json) {
    var queryString = '';
    if (getType(json) === 'object') {
      for (var key in json) {
        var value = json[key];
        console.log('key:' + key + ',value:' + value);
        queryString = queryString + key + '=' + value + '&';
      }
      // 去掉最后一个的&
      queryString = queryString.substring(0, queryString.length - 1);
      console.log(queryString);
      return queryString;
    } else {
      console.log('传入参数不正确');
    }
  };
  exports = parseJsonToQuery;
  return exports;
}(ajax_parseJsonToQuery);

return {parseJsonToQuery:ajax_parseJsonToQuery}
});