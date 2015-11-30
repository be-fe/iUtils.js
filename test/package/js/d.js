/**
 * Created by leiquan on 15/11/30.
 */

require.config({
    baseUrl:'js'
});

define(['c'],function(c){

    console.log("这里是模块d");

    console.log('这里是d.js,打印c的颜色和宽度:'+c.color+','+c.width);
});
