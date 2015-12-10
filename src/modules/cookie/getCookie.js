define(function (require, exports, module) {


    var getCookies = require('./getCookies');

    function getCookie(name) {
        return getCookies()[name];
    }

    module.exports = getCookie;

});