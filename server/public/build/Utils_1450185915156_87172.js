;(function() {
/**
 * @file deepCopy.js
 * @author leiquan<leiquan@baidu.com>
 */
var object_deepCopy = {}, object_extend = {};
object_deepCopy = function (exports) {
  // 深拷贝
  /**
   * @return Object  child
   * @params Object  parent
   */
  function deepCopy(parent, child) {
    var child = child || {};
    for (var i in parent) {
      if (typeof parent[i] === 'object') {
        child[i] = parent[i].constructor === Array ? [] : {};
        //新建数组或者object来达到目的
        clone(parent[i], child[i]);
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
  /**
   * @return Object  child
   * @params Object  parent
   */
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
}());