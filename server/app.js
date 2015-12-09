var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

// 模板引擎设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
ejs = require('ejs'), app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// icon设置
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 路径处理
var IndexRoutes = require('./routes/index');
var buildRoutes = require('./routes/build');
var downloadRoutes = require('./routes/download');
var ajaxRoutes = require('./routes/ajax');
var contentRoutes = require('./routes/content');
var jsonpRoutes = require('./routes/jsonp');
app.use('/', IndexRoutes);
app.use('/build', buildRoutes);
app.use('/download', downloadRoutes);
app.use('/ajax', ajaxRoutes);
app.use('/jsonp', jsonpRoutes);

// 调试信息
app.use(logger('dev'));

// 捕获404错误并且传递错误
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 生产环境打印错误信息,上线环境需要注释
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// 线上环境只提示错误码
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
