var express = require('express');
var router = express.Router();


/* 主页处理 */
router.get('/', function (req, res, next) {

    res.writeHead(200, {'Access-Control-Allow-Origin': '*'});
    res.end("Hello, world!");

});

router.post('/', function (req, res, next) {

    res.writeHead(200, {'Access-Control-Allow-Origin': '*'});
    res.end("Hello, world!");

});

module.exports = router;