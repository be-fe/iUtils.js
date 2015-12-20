define(['src/modules/array/arrayOrderByMax'], function (arrayOrderByMax) {

    describe('array', function () {

        describe('#arrayOrderByMax', function () {

            it('[4, 3, 2, 1]', function () {
                var arr = [1, 2, 3, 4];
                arrayOrderByMax(arr);
                expect(arr[0]).to.be.equal(4);
            });


        });

    });

});