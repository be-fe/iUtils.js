/**
 * Created by leiquan on 15/12/1.
 */

define(function (require, exports, module) {


    var getType = require('../type/getType');

    var parseJsonToQuery = function (json) {

        var queryString = '';

        if (getType(json) === 'object') {

            for (var key in json) {

                var value = json[key];

                queryString = queryString + key + '=' + value + '&';

            }

            // 去掉最后一个的&
            queryString = queryString.substring(0, queryString.length - 1);

            return queryString;


        } else {
            console.log("传入参数不正确");
        }


    };


    module.exports = parseJsonToQuery;


});