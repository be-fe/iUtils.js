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
define(function (require, exports, module) {

    function randomNumber(min, max) {

        return Math.floor(min + Math.random() * (max - min));

    }

    module.exports = randomNumber;
});