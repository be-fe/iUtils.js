/**
 * @file typeIsBuffer.js
 * @auther leiquan
 * @date 2015-12-1
 * @from https://github.com/feross/is-buffer/blob/master/index.js
 * @return Boolean
 * @params Object obj
 * @runtime Browser Window, Require JS, Node.js
 * @dependencies none
 */

define(function (require, exports, module) {

    var toString = Object.prototype.toString;

    function typeIsBuffer(obj) {
        return !!(obj != null &&
        (obj._isBuffer || // For Safari 5-7 (missing Object.prototype.constructor)
            (obj.constructor &&
            typeof obj.constructor.isBuffer === 'function' &&
            obj.constructor.isBuffer(obj))
        ))
    }


    module.exports = typeIsBuffer;

});
