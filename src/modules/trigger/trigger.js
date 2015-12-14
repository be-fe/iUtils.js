/**
 * @file trigger.js
 */
define(function (require, exports, module) {


    var trigger = function (obj) {
    };

    trigger.prototype.on = function (eventName, func) {
        this._listeners = this._listeners || {};
        this._listeners[eventName] = this._listeners[eventName] || [];
        this._listeners[eventName].push(func);
    };

    trigger.prototype.off = function (eventName, func) {
        this._listeners = this._listeners || {};
        this._listeners[eventName].splice(this._listeners[eventName].indexOf(func), 1);
    };

    trigger.prototype.trigger = function (eventName) {

        this._listeners = this._listeners || {};

        var dataArgument = arguments[1] ? arguments[1] : null;

        this._listeners[eventName].forEach(function (ev) {
            if (dataArgument) {
                ev.call(this, dataArgument);
            } else {
                ev.call(this);
            }
        });

    };

    // 将on, off, trigger附加到对象上
    trigger.extends = function (obj) {

        var functions = [
            'on',
            'off',
            'trigger'
        ];

        functions.forEach(function (func) {
            if (typeof obj === 'function') {
                obj.prototype[func] = trigger.prototype[func];
            } else {
                obj[func] = trigger.prototype[func];
            }
        });

    };


    module.exports = trigger;

});