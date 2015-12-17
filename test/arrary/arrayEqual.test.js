define(['src/modules/array/arrayEqual'], function (arrayEqual) {

    describe('array', function () {

        describe('#arrayEqual', function () {

            it('arrayEqual([1, 2, 3, 4] , [1, 2, 3, 4]) should return true', function () {
                expect(arrayEqual([1, 2, 3, 4], [1, 2, 3, 4])).to.be.equal(true);
            });

            it('arrayEqual([1, 2, 3, 5] , [1, 2, 3, 4]) should return false', function () {
                expect(arrayEqual([1, 2, 3, 5], [1, 2, 3, 4])).to.be.equal(false);
            });

            it('arrayEqual([1, 2, 3, 5] , [1, 2, 3, 4]) should return false', function () {
                expect(arrayEqual([1, 2, 3, 5])).to.be.equal(false);
            });

            it('arrayEqual([1, 2, 3, 4, 5] , [1, 2, 3, 4]) should return false', function () {
                expect(arrayEqual([1, 2, 3, 4, 5], [1, 2, 3, 5])).to.be.equal(false);
            });


        });

    });

});