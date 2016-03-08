define(['src/modules/ajax/ajaxGet'], function (ajaxGet) {

    // ajax 测试需要本地启动服务器
    describe('ajax', function () {


        //    beforeEach(function() {
        //        jasmine.Ajax.install();
        //    });
        //
        //    afterEach(function() {
        //        jasmine.Ajax.uninstall();
        //    });
        //
        //    it("specifying response when you need it", function() {
        //        var doneFn = jasmine.createSpy("success");
        //
        //        var xhr = new XMLHttpRequest();
        //        xhr.onreadystatechange = function(args) {
        //            if (this.readyState == this.DONE) {
        //                doneFn(this.responseText);
        //            }
        //        };
        //
        //        xhr.open("GET", "/some/cool/url");
        //        xhr.send();
        //
        //        expect(jasmine.Ajax.requests.mostRecent().url).toBe('/some/cool/url');
        //        expect(doneFn).not.toHaveBeenCalled();
        //
        //        jasmine.Ajax.requests.mostRecent().respondWith({
        //            "status": 200,
        //            "contentType": 'text/plain',
        //            "responseText": 'awesome response'
        //        });
        //        expect(doneFn).toHaveBeenCalledWith('awesome response');
        //    });
        //
        //    it("allows responses to be setup ahead of time", function () {
        //        var doneFn = jasmine.createSpy("success");
        //        jasmine.Ajax.stubRequest('/another/url').andReturn({
        //            "responseText": 'immediate response'
        //        });
        //        var xhr = new XMLHttpRequest();
        //        xhr.onreadystatechange = function(args) {
        //            if (this.readyState == this.DONE) {
        //                doneFn(this.responseText);
        //            }
        //        };
        //        xhr.open("GET", "/another/url");
        //        xhr.send();
        //        expect(doneFn).toHaveBeenCalledWith('immediate response');
        //    });
        //
        //it("allows use in a single spec", function() {
        //    var doneFn = jasmine.createSpy('success');
        //    jasmine.Ajax.withMock(function() {
        //        var xhr = new XMLHttpRequest();
        //        xhr.onreadystatechange = function(args) {
        //            if (this.readyState == this.DONE) {
        //                doneFn(this.responseText);
        //            }
        //        };
        //
        //        xhr.open("GET", "/some/cool/url");
        //        xhr.send();
        //
        //        expect(doneFn).not.toHaveBeenCalled();
        //
        //        jasmine.Ajax.requests.mostRecent().respondWith({
        //            "status": 200,
        //            "responseText": 'in spec response'
        //        });
        //
        //        expect(doneFn).toHaveBeenCalledWith('in spec response');
        //    });
        //});

        //it("should make a real AJAX request", function () {
        //
        //    var callback = jasmine.createSpy();
        //    getProduct(callback);
        //
        //    waitsFor(function() {
        //        return callback.callCount > 0;
        //    });
        //
        //    runs(function() {
        //        expect(callback).toHaveBeenCalled();
        //    });
        //
        //});
        //
        //function getProduct(callback) {
        //    ajaxGet('http://localhost:3000/ajax?test=test', {
        //                'hello': '你好',
        //                'world': '世界'
        //            }, callback);
        //}


        it("can perform a successful ajax request on resource blah.html", function () {

            var asyncCallComplete, result;

            // asyncCallComplete is set to true when the ajax call is complete
            asyncCallComplete = false;

            // result stores the result of the successful ajax call
            result = null;

            // SECTION 1 - call asynchronous function

            //ajaxGet('http://localhost:3000/ajax?test=test', {
            //    'hello': '你好',
            //    'world': '世界'
            //}, function (res) {
            //    asyncCallComplete = true;
            //    result = res;
            //    expect(result.hello).to.be.equal('您好');
            //}, function () {
            //    asyncCallComplete = true;
            //    // expect(result).not.toBeNull();
            //    //expect(result.hello).to.be.equal('您好');
            //});


           expect(true).to.be(false);


            //runs(function() {
            //    return $.ajax('/blah.html', {
            //        type: 'GET',
            //        success: function(data) {
            //            asyncCallComplete = true;
            //            result = data;
            //        },
            //        error: function() {
            //            asyncCallComplete = true;
            //        }
            //    });
            //});

            //// SECTION 2 - wait for the asynchronous call to complete
            //waitsFor(function() {
            //    return asyncCallComplete !== false;
            //});
            //
            //// SECTION 3 - perform tests
            //return runs(function() {
            //    return expect(result).not.toBeNull();
            //});
            //
        });

    });


    //beforeEach(function() {
    //    jasmine.Ajax.requests.when = function (url) {
    //        return this.filter("/jquery/ajax")[0];
    //    };
    //    jasmine.Ajax.install();
    //});
    //
    //
    //it("#ajaxGet", function () {
    //
    //    var result;
    //
    //    ajaxGet('http://localhost:3000/ajax?test=test', {
    //        'hello': '你好',
    //        'world': '世界'
    //    }, function (res) {
    //        result = res;
    //        console.log('这是测试里面的 ajax 返回的数据:' + res);
    //    });
    //
    //    jasmine.Ajax.requests.when("http://localhost:3000/ajax?test=test").response({
    //        "status": 200,
    //        "contentType": 'text/plain',
    //        "responseText": 'data from mock ajax'
    //    });
    //
    //    expect(result).toEqual('data from mock ajax');
    //});


});