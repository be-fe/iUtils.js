define(function (require, exports, module) {

    var storage = window.localStorage;
    if (storage) {
        console.log('This browser supports localStorage');
    } else {
        alert('This browser does NOT support localStorage');
    }

    var LocalStorage = {

        showStorage: function () {
            var result = [];
            for (var i = 0; i < storage.length; i++) {
                console.log(storage.key(i) + " : " + storage.getItem(storage.key(i)) + "<br>");
                result.push(storage.getItem(storage.key(i)));
            }
            return result;
        },

        addStorage: function (sValueQueue) {
            var arr = sValueQueue.split(",");
            for (var i = 0; i < storage.length; i++) {
                var ar = storage.getItem(storage.key(i)).split(",");
                if (ar[1] == arr[1] && ar[2] == arr[2]) {
                    console.log(ar[1]);
                    console.log(ar[2]);
                    console.log(arr[1]);
                    console.log(arr[2]);
                    return; //停止执行，不添加这个值
                }
            }
            storage.setItem(storage.length + 1, sValueQueue);
        },

        clearStorage: function () {
            storage.clear();
        },

        getLength: function () {
            return storage.length;
        },

        getItem: function (index) {
            return storage.getItem(storage.key(index));
        }

    }

    module.exports = LocalStorage;


});