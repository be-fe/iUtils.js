define(function (require, exports, module) {

    var cookie = require('./cookie');

    var s = cookie.getCookie('hehe');

    var cookieIsArray = function () {
        alert(Array.isArray(s));
    }

    module.exports = cookieIsArray;

});