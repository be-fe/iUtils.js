var express = require('express');
var router = express.Router();

/* 根据参数个性化生成Utils.js */
router.get('/', function (req, res, next) {


    var arr = req.query.module.split(',');

    console.log(arr);

    res.send('要打包的文件为:' + req.query.module);

    //这里要拼接文件啦,拼接文件是否要检查依赖呢?

});

module.exports = router;

