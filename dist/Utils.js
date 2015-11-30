/**
 * Created by leiquan on 15/11/30.
 */

(function (name, factory) {

    // AMD环境
    if (typeof define === "function" && define.amd) {
        define(factory);
    }

    // Node环境
    else if (typeof module === "object" && module.exports) {
        module.exports = factory();
    }

    // 全局环境
    else {
        this[name] = factory();
    }

})('Utils', function () {


    /**
     * 测试包
     *
     * Examples:
     *
     *      common.module1("你好");
     *
     * @param {String} value
     * @returns {null}
     *
     * @api public
     * */
    function module1(value) {
        console.log(value);
    }

    return {
        version: "1.0",
        auther: 'leiquan@baidu.com',
        licience: 'MIT',
        module1: module1
    }

});