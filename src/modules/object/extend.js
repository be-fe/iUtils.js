/**
 * @file extend.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from self
 * @api Function
 * @return Object  child
 * @params Object  parent
 * @runtime Browser Window, Require JS, Node.js
 * @dependencies none
 */
define(function (require, exports, module) {

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

    module.exports = extend;

});