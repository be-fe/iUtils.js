/**
 * @file deepCopy.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from self
 * @return Object  child
 * @params Object  parent
 * @runtime Browser Window, Require JS, Node.js
 * @dependencies none
 */
define(function (require, exports, module) {

    // 深拷贝
    function deepCopy(parent, child) {
        var child = child || {};
        for (var i in parent) {
            if (typeof parent[i] === 'object') {
                child[i] = (parent[i].constructor === Array) ? [] : {}; //新建数组或者object来达到目的
                deepCopy(parent[i], child[i]);
            } else {
                child[i] = parent[i];
            }
        }
        return child;
    }

    module.exports = deepCopy;

});