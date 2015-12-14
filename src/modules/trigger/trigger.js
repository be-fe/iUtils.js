/**
 * @file trigger.js
 * @from https://github.com/RolfKoenders/Trigger
 */
define(function (require, exports, module) {


    var trigger = function () {
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

    trigger.extend = function (obj) {

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

    /**
     *
     * @param fn || null
     * @returns 一个拥有on, off, trigger的Trigger对象
     */
    var setTrigger = function (fn) {

        var Trigger;
        if (!fn) {
            Trigger = function () {
            };
        } else {
            Trigger = fn;
        }

        trigger.extend(Trigger);
        return new Trigger();
    }

    module.exports = setTrigger;

});