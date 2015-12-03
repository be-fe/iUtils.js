/**
 * Created by leiquan on 15/12/1.
 */

define(function (require, exports, module) {

    var gettype = Object.prototype.toString

    var Type = {

        isString: function (o) {
            return gettype.call(o) == "[object String]";
        },

        isNumber: function (o) {
            return gettype.call(o) == "[object Number]";
        },

        isBoolean: function (o) {
            return gettype.call(o) == "[object Boolean]";
        },

        isFunction: function (o) {
            return gettype.call(o) == "[object Function]";
        },


        isUndefined: function (o) {
            return gettype.call(o) == "[object Undefined]";
        },

        isObj: function (o) {
            return gettype.call(o) == "[object Object]";
        },

        isArray: function (o) {
            return gettype.call(o) == "[object Array]";
        },

        isNULL: function (o) {
            return gettype.call(o) == "[object Null]";
        },

        //isDocument: function (o) {
        //    return gettype.call(o) == "[object Document]" || [object HTMLDocument];
        //}

    }

    module.exports = Type;


});
