/*
 * from https://github.com/component/ie/blob/master/index.js
 */
define(function (require, exports, module) {

    var toString = Object.prototype.toString;

    var typeIsBuffer = require('./typeIsBuffer');

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

        if (val === null) return 'null';
        if (val === undefined) return 'undefined';
        if (val !== val) return 'nan';
        if (val && val.nodeType === 1) return 'element';

        if (typeIsBuffer(val)) return 'buffer';

        val = val.valueOf
            ? val.valueOf()
            : Object.prototype.valueOf.apply(val);

        return typeof val;
    }


    module.exports = getType;

});