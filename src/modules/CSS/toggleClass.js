/**
 * Created by leiquan on 15/12/1.
 */

define(function (require, exports, module) {

    var hasClass = require('./hasClass');

    var toggleClass = function (obj, cls) {
        if (hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
        }
        else {
            obj.className += " " + cls;
        }
    }

    module.exports = toggleClass;


});