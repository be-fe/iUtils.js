define(['src/modules/ajax/ajaxGet'], function (ajaxGet) {

    // real 模式, 和真实的 ajax 环境没有任何差别,可以在 ajax 接口完毕的情况下使用,以及测试ajax 函数本身
    describe('ajaxGet real test', function () {

        it('It will response "Hello, world!"', function (done) {

            ajaxGet('http://localhost:3000/ajax?test=test', {
                'hello': '你好',
                'world': '世界'
            }, 'text', {'test': 'abc'}, function (res) {

                console.log('ajaxGet real return value:' + res);
                res.should.equal('Hello, world!');
                done();

            });

        });

    });

});