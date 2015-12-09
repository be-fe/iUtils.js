/**
 * Created by leiquan on 15/12/1.
 */
define(function (require, exports, module) {

    function getDevicePlatform() {

        var ua = navigator.userAgent;

        if (/mac/i.test(ua)) {
            return 'mac';
        }
        if (/win/i.test(ua)) {
            return 'windows'
        }

        if (/linux/i.test(ua)) {
            return 'linux';
        }

        if (/iphone/i.test(ua)) {
            return 'iphone';
        }

        if (/ipad/i.test(ua)) {
            return 'ipad';
        }

        if (/ipod/i.test(ua)) {
            return 'ipod';
        }

        if (/android/i.test(ua)) {
            return 'android';
        }

    }

    module.exports = getDevicePlatform;

});