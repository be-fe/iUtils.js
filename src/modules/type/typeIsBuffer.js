/*
 * from https://github.com/component/ie/blob/master/index.js
 */
define(function (require, exports, module) {

    var toString = Object.prototype.toString;

    // code borrowed from https://github.com/feross/is-buffer/blob/master/index.js
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
