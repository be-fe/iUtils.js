/**
 * @file typeIsBuffer.js
 * @from https://github.com/feross/is-buffer/blob/master/index.js
 */
define(function (require, exports, module) {

    var toString = Object.prototype.toString;

    /**
     * @return Boolean
     * @params Object obj
     */
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
