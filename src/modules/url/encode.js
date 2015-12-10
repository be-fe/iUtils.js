define(function (require, exports, module) {


    var encode = function (str) {
        try {
            return encodeURIComponent(str);
        } catch (e) {
            return str;
        }
    };

    module.exports = encode;

});