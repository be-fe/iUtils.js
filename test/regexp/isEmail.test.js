define(['src/modules/regexp/isEmail'], function (isEmail) {

    describe('regexp', function () {

        describe('#isEmail', function () {

            it('isEmail("leiquanlive.com") should return true ', function () {
                expect(isEmail("leiquanlive.com")).to.be.equal(false);
            });

            it('isEmail("leiquan@live.com") should return true ', function () {
                expect(isEmail("leiquan@live.com")).to.be.equal(true);
            });

        });

    });

});