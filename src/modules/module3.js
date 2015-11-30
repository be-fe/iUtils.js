/**
 * Created by leiquan on 15/11/30.
 */

// 存在依赖的函数式定义
define(["./module1",], function(module1) {

    console.log("这是在module3里面调用module1,打印他的名字:" + module1.name);

        return {
            name: "module3",
        }
    }
);