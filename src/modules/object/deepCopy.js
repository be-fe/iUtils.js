/**
 * @file deepCopy.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from self
 * @api Function
 * @return Object  child
 * @params Object  parent
 * @runtime Browser Window, Require JS, Node.js

 */
define(function (require, exports, module) {

    // 深拷贝
    function deepCopy(parent, child) {
        var defaultWrapper = (toString.call(parent) === '[object Array]') ? [] : {};
        var child = child || defaultWrapper;
        for (var i in parent) {
            if (toString.call(parent[i]) === '[object Object]') {
                child[i] = {};
                this.deepCopy(parent[i], child[i]);
            }
            else if (toString.call(parent[i]) === '[object Array]') {
                child[i] = [];
                this.deepCopy(parent[i], child[i]);
            } 
            else {
                child[i] = parent[i];
            }
        }
        return child;
    }

    module.exports = deepCopy;

});