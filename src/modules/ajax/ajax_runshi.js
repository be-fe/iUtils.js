(function (global, factory) {
    if (typeof define === 'function' && define['amd']) {
	    define(function () {
	        return factory;
	    });
	} else if (typeof require === 'function' && typeof module === 'object' && module && typeof exports === 'object' && exports) {
	    module.exports = factory;
	} else if (true) {
	    global['lib_core_io_ajax'] = factory;
	}
})(this || window, (function (factory) {
    var component = {};
    var require = function (key) {
        if (!component[key]) {
            var module = {exports: {}};
            factory[key].call(module.exports, require, module.exports, module);
            component[key] = module.exports;
        }
        return component[key];
    };
    return require('lib/core/io/ajax');
})({
    'lib/core/io/getXHR': function (require, exports, module) {
	    
		module.exports = function () {
		
		    var _XHR = false;
		
		    try {
		
		        _XHR = new XMLHttpRequest();
		
		    }
		
		    catch (try_MS) {
		
		        try {
		
		            _XHR = new ActiveXObject("Msxml2.XMLHTTP");
		
		        }
		
		        catch (other_MS) {
		
		            try {
		
		                _XHR = new ActiveXObject("Microsoft.XMLHTTP");
		
		            }
		
		            catch (failed) {
		
		                _XHR = false;
		
		            }
		
		        }
		
		    }
		
		    return _XHR;
		
		};
		
		
	},
	'lib/core/obj/parseParam': function (require, exports, module) {
	    
		module.exports = function (oSource, oParams, isown) {
		
		    var key, obj = {};
		
		    oParams = oParams || {};
		
		    for (key in oSource) {
		
		        obj[key] = oSource[key];
		
		        if (oParams[key] != null) {
		
		            if (isown) {
		
		                if (oSource.hasOwnProperty(key)) {
		
		                    obj[key] = oParams[key];
		
		                }
		
		            }
		
		            else {
		
		                obj[key] = oParams[key];
		
		            }
		
		        }
		
		    }
		
		    return obj;
		
		};
		
		
	},
	'lib/core/str/parseURL': function (require, exports, module) {
	    module.exports = function (url) {
		
		    var parse_url = /^(?:([A-Za-z]+):(\/{0,3}))?([0-9.\-A-Za-z]+\.[0-9A-Za-z]+)?(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
		
		    var names = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];
		
		    var results = parse_url.exec(url);
		
		    var that = {};
		
		    for (var i = 0, len = names.length; i < len; i += 1) {
		
		        that[names[i]] = results[i] || '';
		
		    }
		
		    return that;
		
		};
		
		
	},
	'lib/core/str/trim': function (require, exports, module) {
	    
		module.exports = function (str) {
		
		    if (typeof str !== 'string') {
		
		        throw 'trim parameter must be a string!';
		
		    }
		
		    var len = str.length;
		
		    var s = 0;
		
		    var reg = /(\u3000|\s|\t|\u00A0)/;
		
		    while (s < len) {
		
		        if (!reg.test(str.charAt(s))) {
		
		            break;
		
		        }
		
		        s += 1;
		
		    }
		
		    while (len > s) {
		
		        if (!reg.test(str.charAt(len - 1))) {
		
		            break;
		
		        }
		
		        len -= 1;
		
		    }
		
		    return str.slice(s, len);
		
		};
		
		
	},
	'lib/core/json/queryToJson': function (require, exports, module) {
	    
		var trim = require('lib/core/str/trim');
		
		module.exports = function (QS, isDecode) {
		
		    var _Qlist = trim(QS).split("&");
		
		    var _json = {};
		
		    var _fData = function (data) {
		
		        if (isDecode) {
		
		            return decodeURIComponent(data);
		
		        }
		
		        else {
		
		            return data;
		
		        }
		
		    };
		
		    for (var i = 0, len = _Qlist.length; i < len; i++) {
		
		        if (_Qlist[i]) {
		
		            var _hsh = _Qlist[i].split("=");
		
		            var _key = _hsh[0];
		
		            var _value = _hsh[1];
		
		            if (_hsh.length < 2) {
		
		                _value = _key;
		
		                _key = '$nullName';
		
		            }
		
		            if (!_json[_key]) {
		
		                _json[_key] = _fData(_value);
		
		            }
		
		            else {
		
		                if (Object.prototype.toString.call(_json[_key]) !== '[object Array]') {
		
		                    _json[_key] = [_json[_key]];
		
		                }
		
		                _json[_key].push(_fData(_value));
		
		            }
		
		        }
		
		    }
		
		    return _json;
		
		};
		
		
	},
	'lib/core/json/jsonToQuery': function (require, exports, module) {
	    
		module.exports = function (o) {
		
		    var s = [], e = encodeURIComponent;
		
		    for (var i in o) {
		
		        if (o[i] != null && o[i] !== '') {
		
		            s.push(e(i) + '=' + e(o[i]));
		
		        }
		
		    }
		
		    return s.join('&');
		
		};
		
		
	},
	'lib/core/util/URL': function (require, exports, module) {
	    
		var parseParam = require('lib/core/obj/parseParam');
		
		var parseURL = require('lib/core/str/parseURL');
		
		var queryToJson = require('lib/core/json/queryToJson');
		
		var jsonToQuery = require('lib/core/json/jsonToQuery');
		
		module.exports = function (sURL, args) {
		
		    var opts = parseParam({
		
		        'isEncodeQuery': false,
		
		        'isEncodeHash': false
		
		    }, args || {});
		
		    var that = {};
		
		    var url_json = parseURL(sURL);
		
		    var query_json = queryToJson(url_json.query);
		
		    var hash_json = queryToJson(url_json.hash);
		
		    that.setParam = function (sKey, sValue) {
		
		        query_json[sKey] = sValue;
		
		        return this;
		
		    };
		
		    that.getParam = function (sKey) {
		
		        return query_json[sKey];
		
		    };
		
		    that.setParams = function (oJson) {
		
		        for (var key in oJson) {
		
		            that.setParam(key, oJson[key]);
		
		        }
		
		        return this;
		
		    };
		
		    that.setHash = function (sKey, sValue) {
		
		        hash_json[sKey] = sValue;
		
		        return this;
		
		    };
		
		    that.getHash = function (sKey) {
		
		        return hash_json[sKey];
		
		    };
		
		    that.valueOf = that.toString = function () {
		
		        var url = [];
		
		        var query = jsonToQuery(query_json, opts.isEncodeQuery);
		
		        var hash = jsonToQuery(hash_json, opts.isEncodeQuery);
		
		        if (url_json.scheme != '') {
		
		            url.push(url_json.scheme + ':');
		
		            url.push(url_json.slash);
		
		        }
		
		        if (url_json.host != '') {
		
		            url.push(url_json.host);
		
		            if (url_json.port != '') {
		
		                url.push(':');
		
		                url.push(url_json.port);
		
		            }
		
		        }
		
		        url.push('/');
		
		        url.push(url_json.path);
		
		        if (query != '') {
		
		            url.push('?' + query);
		
		        }
		
		        if (hash != '') {
		
		            url.push('#' + hash);
		
		        }
		
		        return url.join('');
		
		    };
		
		    return that;
		
		};
		
		
	},
	'lib/core/func/empty': function (require, exports, module) {
	    
		module.exports = function () {};
	},
	'lib/core/json/stringToJson': function (require, exports, module) {
	    
		var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
		
		module.exports = function (text, reviver) {
		
		    if (window.JSON && window.JSON.parse) {
		
		        return window.JSON.parse(text, reviver);
		
		    }
		
		    var j;
		
		    function walk(holder, key) {
		
		        var k, v, value = holder[key];
		
		        if (value && typeof value === 'object') {
		
		            for (k in value) {
		
		                if (Object.prototype.hasOwnProperty.call(value, k)) {
		
		                    v = walk(value, k);
		
		                    if (v !== undefined) {
		
		                        value[k] = v;
		
		                    }
		
		                    else {
		
		                        delete value[k];
		
		                    }
		
		                }
		
		            }
		
		        }
		
		        return reviver.call(holder, key, value);
		
		    }
		
		    text = String(text);
		
		    cx.lastIndex = 0;
		
		    if (cx.test(text)) {
		
		        text = text.replace(cx, function (a) {
		
		            return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
		
		        });
		
		    }
		
		    if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
		
		        j = eval('(' + text + ')');
		
		        return typeof reviver === 'function' ? walk({
		
		            '': j
		
		        }, '') : j;
		
		    }
		
		    throw new SyntaxError('JSON.parse');
		
		};
		
		
	},
	'lib/core/io/ajax': function (require, exports, module) {
	    
		var getXHR = require('lib/core/io/getXHR');
		
		var parseParam = require('lib/core/obj/parseParam');
		
		var URL = require('lib/core/util/URL');
		
		var jsonToQuery = require('lib/core/json/jsonToQuery');
		
		var emptyFunc = require('lib/core/func/empty');
		
		var stringToJson = require('lib/core/json/stringToJson');
		
		module.exports = function (opts) {
		
		    var opts = parseParam({
		
		        'url': '',
		
		        'charset': 'UTF-8',
		
		        'timeout': 30 * 1000,
		
		        'args': {},
		
		        'onComplete': null,
		
		        'onTimeout': emptyFunc,
		
		        'uniqueID': null,
		
		        'onFail': emptyFunc,
		
		        'method': 'get',
		
		        'asynchronous': true,
		
		        'header': {},
		
		        'isEncode': false,
		
		        'responseType': 'json',
		
		        'nocache': false
		
		    }, opts);
		
		    if (opts.url == '') {
		
		        throw new Error('Ajax need url in parameters object');
		
		    }
		
		    var tm;
		
		    var trans = getXHR();
		
		    var cback = function () {
		
		        if (trans.readyState == 4) {
		
		            clearTimeout(tm);
		
		            var data = '';
		
		            if (opts['responseType'] === 'xml') {
		
		                data = trans.responseXML;
		
		            } else if (opts['responseType'] === 'text') {
		
		                data = trans.responseText;
		
		            } else {
		
		                try {
		
		                    if (trans.responseText && typeof trans.responseText === 'string') {
		
		                        data = stringToJson(trans.responseText);
		
		                    } else {
		
		                        data = {};
		
		                    }
		
		                } catch (exp) {
		
		                    data = opts['url'] + 'return error : data error';
		
		                }
		
		            }
		
		            if (trans.status == 200) {
		
		                if (opts['onComplete'] != null) {
		
		                    opts['onComplete'](data);
		
		                }
		
		            } else if (trans.status == 0) {
		
		            } else {
		
		                if (opts['onFail'] != null) {
		
		                    opts['onFail'](data, trans);
		
		                }
		
		            }
		
		        }
		
		        else {
		
		            if (opts['onTraning'] != null) {
		
		                opts['onTraning'](trans);
		
		            }
		
		        }
		
		    };
		
		    trans.onreadystatechange = cback;
		
		    if (!opts['header']['Content-Type']) {
		
		        opts['header']['Content-Type'] = 'application/x-www-form-urlencoded';
		
		    }
		
		    if (!opts['header']['X-Requested-With']) {
		
		        opts['header']['X-Requested-With'] = 'XMLHttpRequest';
		
		    }
		
		    if (opts['method'].toLocaleLowerCase() == 'get') {
		
		        var url = URL(opts['url'], {
		
		            'isEncodeQuery': opts['isEncode']
		
		        });
		
		        url.setParams(opts['args']);
		
		        opts.nocache && url.setParam('__rnd', new Date().valueOf());
		
		        trans.open(opts['method'], url.toString(), opts['asynchronous']);
		
		        try {
		
		            for (var k in opts['header']) {
		
		                trans.setRequestHeader(k, opts['header'][k]);
		
		            }
		
		        } catch (exp) {
		
		        }
		
		        trans.send('');
		
		    }
		
		    else {
		
		        trans.open(opts['method'], opts['url'], opts['asynchronous']);
		
		        try {
		
		            for (var k in opts['header']) {
		
		                trans.setRequestHeader(k, opts['header'][k]);
		
		            }
		
		        } catch (exp) {
		
		        }
		
		        trans.send(jsonToQuery(opts['args'], opts['isEncode']));
		
		    }
		
		    if (opts['timeout']) {
		
		        tm = setTimeout(function () {
		
		            try {
		
		                trans.abort();
		
		                opts['onTimeout']({}, trans);
		
		                opts['onFail']({}, trans);
		
		            } catch (exp) {
		
		            }
		
		        }, opts['timeout']);
		
		    }
		
		    return trans;
		
		};
		
		
	}
}));