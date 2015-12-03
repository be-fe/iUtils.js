/**
 * Created by leiquan on 15/12/1.
 */

define(function (require, exports, module) {

    var URL = {

        getParam: function(paramName) {
            var paramValue = '';
            var isFound = false;
            var location = window.location;
            if (location.search.indexOf('?') === 0 && location.search.indexOf('=') > 1) {
                var arrSource = unescape(location.search).substring(1, location.search.length).split('&');
                var i = 0;
                while (i < arrSource.length && !isFound) {
                    if (arrSource[i].indexOf('=') > 0) {
                        if (arrSource[i].split('=')[0].toLowerCase() === paramName.toLowerCase()) {
                            paramValue = arrSource[i].split('=')[1];
                            isFound = true;
                        }
                    }
                    i++;
                }
            }
            return paramValue;
        },

    };

    module.exports = URL;


});
