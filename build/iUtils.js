(function (ns, factory) {
    if (typeof define === "function" && define.amd) {
        define(factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else {
        window[ns] = factory();
    }
})("iUtils", function () {

    /**
     * @file randomNumber.js
     * @auther leiquan<leiquan@baidu.com>
     * @date 2015-12-1
     * @from self
     * @api Function
     * @return Number
     * @params Number  min, Number max
     * @runtime Browser Window, Require JS, Node.js
     * @dependencies none
     */
    var random_randomNumber = {};
    random_randomNumber = function (exports) {
        function randomNumber(min, max) {
            return Math.floor(min + Math.random() * (max - min));
        }

        exports = randomNumber;
        return exports;
    }(random_randomNumber);

    return {randomNumber: random_randomNumber}
});