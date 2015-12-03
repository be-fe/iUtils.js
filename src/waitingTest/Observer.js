/**
 * Created by leiquan on 15/12/1.
 */


define(function (require, exports, module) {

    var Observer = {
        //订阅
        addSubscriber: function (callback) {
            this.subscribers[this.subscribers.length] = callback;
        },
        //退订
        removeSubscriber: function (callback) {
            for (var i = 0; i < this.subscribers.length; i++) {
                if (this.subscribers[i] === callback) {
                    delete (this.subscribers[i]);
                }
            }
        },
        //发布
        publish: function (what) {
            for (var i = 0; i < this.subscribers.length; i++) {
                if (typeof this.subscribers[i] === 'function') {
                    this.subscribers[i](what);
                }
            }
        },
        // 将对象o具有观察者功能
        make: function (o) {
            for (var i in this) {
                o[i] = this[i];
                o.subscribers = [];
            }
        }
    };

    module.exports = Observer;


});