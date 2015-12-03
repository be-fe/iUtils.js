/**
 * Created by leiquan on 15/11/30.
 */

var Utils = require('./../../server/public/build/Utils');

console.log("检测null是否为null:" + Utils.Type.isNULL(null));
console.log("检测233是否为number:" + Utils.Type.isNumber(233));

console.log("检测[1,2,3]是否为数组:" + Utils.Type.isArray([1,2,3]));
console.log("检测'888'是否为字符串:" + Utils.Type.isString('888'));

console.log("检测false是否为Boolean:" + Utils.Type.isBoolean(false));
console.log("检测function () {}是否为Function:" + Utils.Type.isFunction(function () {}));

console.log("检测Undefined是否为Undefined:" + Utils.Type.isUndefined(undefined));
console.log("检测{}是否为Object:" + Utils.Type.isObj({}));