/**
 * Created by leiquan on 15/12/1.
 */

define(function (require, exports, module) {

    var UA = {
        os: /windows/i.test(window.navigator.userAgent) ? 'PC' : 'MAC',
    };

    module.exports = UA;


});
