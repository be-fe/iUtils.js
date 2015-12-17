var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var Remarkable = require('remarkable');


/* 主页处理,返回列表供用户选择来构建 */

router.get('/', function (req, res, next) {

    var type = req.query.type;
    var module = req.query.module;

    if (type == 'code') {
        // 拼接路径
        var p = path.join(__dirname, '../../src/modules/' + module + '.js');
        var content = fs.readFileSync(p);
        var css = '<link href="/css/prism.css" rel="stylesheet">';
        var js = '<script src="/js/prism.js"></script>';
        var newContent = '<pre><code class="language-javascript">' + content.toString() + '</code></pre>';
        newContent = css + newContent + js;
        res.send(newContent);
    } else if (type == 'doc') {

        // 文档在目录下,因此要分离斜线

        // 两种情况,目录和文件
        if (module.indexOf('/') > -1) {
            var arr = module.split('/');
            var p = path.join(__dirname, '../../src/modules/' + arr[0]);
            console.log(p);
        } else {
            var p = path.join(__dirname, '../../src/modules/' + module);
            console.log(p);
        }

        var css = '<link href="/css/markdownstyle/GitHub2.css" rel="stylesheet">';

        // 这个目录下是否有readme.md,有显示,没有,显示默认的

        try {
            p = path.join(p, '/README.md');
            var data = fs.readFileSync(p).toString();
            var md = new Remarkable();
            res.send(md.render(data));
        } catch (e) {
            console.log(e);
            var data = '<div style="width: 100%; height:50%; padding-top:20px; text-align:center; margin: 0;"><h3>目前没有文档~</h3></div>';
            res.send(data);
        }


    } else if (type == 'default') {

        if (module == 'code') {
            res.send('<style>html{ padding: 5px;}html,body{height: 100%; overflow: hidden}</style><div style="width: 100%; height:50%; padding-top:20px; text-align:center;background-color: #272822;color: white; margin: 0;height: 100%;">选择模块进行代码预览~</div>');
        } else {
            res.send('<div style="width: 100%; height:50%; padding-top:20px; text-align:center; margin: 0;"><h3>目前没有文档~</h3></div>');
        }
    }


});

module.exports = router;
