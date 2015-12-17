var express = require('express');
var router = express.Router();


/* 主页处理 */
router.get('/', function (req, res, next) {

    var callback = req.query.callback;

    res.end('' + callback + '({"result":"我是远程js带来的数据"});');

});

module.exports = router;