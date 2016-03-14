define(['src/modules/ajax/ajaxJsonp'], function (ajaxJsonp) {

    // real 模式, 和真实的 ajax 环境没有任何差别,可以在 ajax 接口完毕的情况下使用,以及测试ajax 函数本身
    describe('ajaxJsonp real test', function () {

        it('It will response a obj', function (done) {

            var data = {result: '我是远程js带来的数据'};

            ajaxJsonp('http://localhost:3000/jsonp', {'hello': 'hello', 'world': 'world'}, function (res) {
                console.log('ajaxJsonp real return value:' + res);
                //res.should.deep.equal(data);
                res.result.should.equal('我是远程js带来的数据');
                done();
            });

        });

    });

});