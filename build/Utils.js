(function (ns, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        window[ns] = factory();
    }
})('Utils', function () {
    var say = {};
    say = function (exports) {
        var say = function () {
            console.log('我是雷全');
        };
        exports = say;
        return exports;
    }(say);

    return {say: say}
});