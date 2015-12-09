define(function (require, exports, module) {

    function encode(value) {
        try {
            return encodeURIComponent(value);
        } catch (e) {
            console.log('cookie encode 失败,原始值:' + value + '错误:' + e);
        }
    }

    module.exports = encode;

});