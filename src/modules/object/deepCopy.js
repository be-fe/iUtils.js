define(function (require, exports, module) {

    // 深拷贝
    function deepCopy(parent, child) {
        var child = child || {};
        for (var i in parent) {
            if (typeof parent[i] === 'object') {
                child[i] = (parent[i].constructor === Array) ? [] : {}; //新建数组或者object来达到目的
                clone(parent[i], child[i]);
            } else {
                child[i] = parent[i];
            }
        }
        return child;
    }

    module.exports = deepCopy;

});