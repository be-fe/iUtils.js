define(function (require, exports, module) {

    var cookie = require('./cookie');

    var s = cookie.getCookie('hehe');

    var CookieIsArray = function () {
        console.log(s);
        alert(Array.isArray(s));
    }

    module.exports = CookieIsArray;

});