define(['src/modules/regexp/isTimeString'], function (isTimeString) {

    describe('regexp', function () {

        describe('#isTimeString', function () {

            it('isTimeString("2015-11-11") should return true ', function () {
                expect(isTimeString("2015-11-11")).to.be.equal(false);
            });

            it('isTimeString("20:10:10") should return true ', function () {
                expect(isTimeString("20:10:10")).to.be.equal(true);
            });

        });

    });

});