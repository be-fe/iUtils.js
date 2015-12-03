/**
 * Created by leiquan on 15/11/30.
 */

var Utils = require('./../../server/public/build/Utils');

var arr = [1,2,3];

console.log("初始数组为:" + arr);


Utils.Array.remove(arr,1);

console.log("操作后的数组为:" + arr);