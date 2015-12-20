define(['src/modules/array/arrayRemove'], function (arrayRemove) {

    describe('array', function () {

        describe('#arrayRemove', function () {

            it('arrayRemove([1, 2, 3, 4] , 3) should return true', function () {
                var arr = [1, 2, 3, 4];
                arrayRemove(arr, 1);

                expect(arr.length).to.be.equal(3);
            });


        });

    });

});