(function (global, ns, factory) {

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
        global[ns] = factory(global);
    }

})(window?window:this, 'Utils', function () {


    function module1(value) {
        console.log(value);
    }

    return {
        module1: module1
    }

});