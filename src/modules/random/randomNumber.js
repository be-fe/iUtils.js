/**
 * @file randomNumber
 * @author leiquan<leiquan@baidu.com>
 */

define(function (require, exports, module) {

    /**
     * @return Number
     * @params Number  min, Number max
     */
    function randomNumber(min, max) {

        return Math.floor(min + Math.random() * (max - min));

    }

    module.exports = randomNumber;
});