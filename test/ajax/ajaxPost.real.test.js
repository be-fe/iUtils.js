define(['src/modules/ajax/ajaxPost'], function (ajaxPost) {

    // real 模式, 和真实的 ajax 环境没有任何差别,可以在 ajax 接口完毕的情况下使用,以及测试ajax 函数本身
    describe('ajaxPost real test', function () {

        it('It will response "Hello dog!", the param type is obj.', function (done) {

            ajaxPost('http://localhost:3000/ajax', {
                'hello': '呵呵哒',
                'world': '世界'
            }, 'text', null, {'test': 'abc'}, function (res) {

                console.log('ajaxPost real return value:' + res);
                res.should.equal('Hello dog!');
                done();

            });

        });

        it('It will also response "Hello dog!", the param type is string.', function (done) {

            ajaxPost('http://localhost:3000/ajax', '{hi:"hehe"}', 'text', null, {'test': 'abc'}, function (res) {

                console.log('ajaxPost real return value:' + res);
                res.should.equal('Hello dog!');
                done();

            });

        });

        it('It will also response "Hello dog!", the param type is string, multipart/form-data', function (done) {

            ajaxPost('http://localhost:3000/ajax', '{hi:"hehe"}', 'text', 'multipart/form-data', {'test': 'abc'}, function (res) {

                console.log('ajaxPost real return value:' + res);
                res.should.equal('Hello dog!');
                done();

            });

        });

    });

});