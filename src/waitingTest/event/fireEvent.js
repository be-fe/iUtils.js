/**
 * @file event.js
 */

define(function (require, exports, module) {

    /**
     * @return Object
     */
    var fireEvent = function (element, eventName) {

        var event; // The custom event that will be created

        if (document.createEvent) {
            event = document.createEvent("HTMLEvents");
            event.initEvent(eventName, true, true);
        } else {
            event = document.createEventObject();
            event.eventType = eventName;
        }

        event.eventName = eventName;

        if (document.createEvent) {
            element.dispatchEvent(event);
        } else {
            element.fireEvent("on" + event.eventType, event);
        }
    }


    module.exports = fireEvent;


});