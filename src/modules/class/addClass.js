define(function (require, exports, module) {

    var hasClass = require('./hasClass');

    /*
     * @params HTMLElement obj, String  cls
     */
    var addClass = function (obj, cls) {
        if (!hasClass(obj, cls)) {
            obj.className += ' ' + cls;
        }
    }


    module.exports = addClass;


});