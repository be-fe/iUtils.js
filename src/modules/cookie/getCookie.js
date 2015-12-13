define(function (require, exports, module) {


    var getCookies = require('./getCookies');

    /*
     * @return String
     * @params String  name
     */
    function getCookie(name) {
        return getCookies()[name];
    }

    module.exports = getCookie;

});