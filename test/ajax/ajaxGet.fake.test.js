define(['src/modules/ajax/ajaxGet', '../__Lib/sinon-1.12.2'], function (ajaxGet, sinon) {

    // fake 模式,是制造一个虚假的 ajax 请求,来返回设定的参数, 以达到在特定返回值下测试内部逻辑是否正确,以及没有接口的时候来模拟
    describe('ajaxGet fake test', function () {

        beforeEach(function () {
            this.xhr = sinon.useFakeXMLHttpRequest();
            this.requests = [];
            this.xhr.onCreate = function (xhr) {
                this.requests.push(xhr);
            }.bind(this);
        });

        afterEach(function () {
            this.xhr.restore();
        });

        it('It will response  "{"hello":"world"}" ', function (done) {

            var data = {hello: 'bug'};
            var dataJson = JSON.stringify(data);

            ajaxGet('http://localhost:3000/ajax?test=test', {
                'hello': '你好',
                'world': '世界'
            }, 'text', {'test': 'abc'}, function (res) {

                console.log('ajaxGet fake return value:' + res);
                res.should.deep.equal(dataJson);
                done();

            });

            this.requests[0].respond(200, {'Content-Type': 'text/json'}, dataJson);

        });

    });

});