/**
 * @file hasClass.js
 */
define(function (require, exports, module) {

    /**
     * @return Boolean
     * @params HTMLElement obj, String  cls
     */
    var hasClass = function (obj, cls) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }

    module.exports = hasClass;


});