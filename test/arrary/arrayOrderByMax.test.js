define(['src/modules/array/arrayOrderByMax'], function (arrayOrderByMax) {

    describe('array', function () {

        describe('#arrayOrderByMax', function () {

            it('arrayOrderByMax([1, 2, 3, 4])', function () {
                expect(arrayOrderByMax([1, 2, 3, 4])).to.be.equal([1, 3, 2, 1]);
            });


        });

    });

});