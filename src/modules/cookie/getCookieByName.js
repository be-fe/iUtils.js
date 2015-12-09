define(function (require, exports, module) {


    var getAllCookie = require('./getAllCookie');

    function getCookieByName(name) {
        return getAllCookie()[name];
    }

    module.exports = getCookieByName;

});