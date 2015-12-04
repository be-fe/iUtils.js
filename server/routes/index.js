var express = require('express');
var router = express.Router();

var modules = require('../datas/modules');

/* 主页处理,返回列表供用户选择来构建 */

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Utils.js', modules: modules.getModules()});
});

module.exports = router;
