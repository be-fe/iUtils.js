define(function (require, exports, module) {

    function encode(value) {
        try {
            return encodeURIComponent(value);
        } catch (e) {
            console.log(e);
        }
    }

    module.exports = encode;

});