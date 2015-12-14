/**
 * @file toggleClass.js
 */
define(function (require, exports, module) {

    var hasClass = require('./hasClass');

    /**
     * @params HTMLElement obj, String  cls
     */
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
