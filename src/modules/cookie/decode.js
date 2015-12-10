define(function (require, exports, module) {

    function decode(value) {
        try {
            return decodeURIComponent(value);
        } catch (e) {
            console.log(e);
        }
    }

    module.exports = decode;

});