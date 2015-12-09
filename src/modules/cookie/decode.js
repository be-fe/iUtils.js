define(function (require, exports, module) {

    function decode(value) {
        try {
            return decodeURIComponent(value);
        } catch (e) {
            debug('error `decode(%o)` - %o', value, e)
        }
    }

    module.exports = decode;

});