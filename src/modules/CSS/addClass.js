define(function (require, exports, module) {

    var hasClass = require('./hasClass');

    var addClass = function (obj, cls) {
        if (!hasClass(obj, cls)) {
            obj.className += ' ' + cls;
        }
    }


    module.exports = addClass;


});