/**
 * Created by leiquan on 15/11/30.
 */
require.config({
    baseUrl: 'js'
});
define(['b'], function(b) {

    console.log("这里是模块c,依赖了模块b");

    console.log('这里是在c.js里面打印b的颜色:' + b.color);
    return {
        color: b.color,
        width: 'c的宽度为120px'
    };
});
