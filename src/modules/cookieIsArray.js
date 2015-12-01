define(function (require, exports, module) {

    var Cookie = require('./cookie');



    var CookieIsArray = function (name) {
        var s = Cookie.getCookie(name);
        console.log(s);
        alert(Array.isArray(s.split(',')));
    }

    module.exports = CookieIsArray;

});