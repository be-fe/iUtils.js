/**
 * Created by leiquan on 15/12/1.
 */

define(function (require, exports, module) {

    var WebCamera = function (sVideoElementId, sCanvasElementId, sButtonElementId) {
        var video = document.getElementById(sVideoElementId);
        //video config
        var videoConfig = {
            "video": true,
            "audio": true
        };
        var canvas = document.getElementById(sCanvasElementId);
        var context = canvas.getContext("2d");
        var button = document.getElementById(sButtonElementId);
        //errorCallback
        var errorCallback = function (error) {
            console.log("Video capture error: ", error.code);
        };
        //start the camera
        this.start = function () {
            if (navigator.getUserMedia) { // Standard
                navigator.getUserMedia(videoConfig, function (stream) {
                    video.src = stream;
                    video.play();
                }, errorCallback);
            } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
                navigator.webkitGetUserMedia(videoConfig, function (stream) {
                    video.src = window.webkitURL.createObjectURL(stream);
                    video.play();
                }, errorCallback);
            } else if (navigator.mozGetUserMedia) { // Firefox-prefixed
                navigator.mozGetUserMedia(videoConfig, function (stream) {
                    video.src = window.URL.createObjectURL(stream);
                    video.play();
                }, errorCallback);
            }
            button.addEventListener("click", function () {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
            }, false);
        }
    }


    module.exports =  WebCamera;


});