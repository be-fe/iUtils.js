define(['src/modules/array/indexOf'], function (indexOf) {

    describe('array', function () {

        describe('#indexOf', function () {

            it('indexOf([1, 2, 3, 4] , 3) should return true', function () {
                expect(indexOf([1, 2, 3, 4] , 3)).to.be.equal(2);
            });


        });

    });

});