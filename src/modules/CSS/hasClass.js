define(function (require, exports, module) {

    var hasClass = function (obj, cls) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }

    module.exports = hasClass;


});