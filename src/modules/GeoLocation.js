define(function (require, exports, module) {

    var GeoLocation = {

        getDistance : function (latitude1, longitude1, latitude2, longitude2) {
            // R is the radius of the earth in kilometers 地球半径
            var R = 6371;
            var deltaLatitude = toRadians(latitude2 - latitude1);
            var deltaLongitude = toRadians(longitude2 - longitude1);
            latitude1 = toRadians(latitude1);
            latitude2 = toRadians(latitude2);
            var a = Math.sin(deltaLatitude / 2) *
                Math.sin(deltaLatitude / 2) +
                Math.cos(latitude1) *
                Math.cos(latitude2) *
                Math.sin(deltaLongitude / 2) *
                Math.sin(deltaLongitude / 2);
            var c = 2 * Math.atan2(Math.sqrt(a),
                    Math.sqrt(1 - a));
            var d = R * c;
            return d;
        }
    }
    module.exports =  GeoLocation;


});