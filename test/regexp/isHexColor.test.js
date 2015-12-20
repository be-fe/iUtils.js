define(['src/modules/regexp/isHexColor'], function (isHexColor) {

    describe('regexp', function () {

        describe('#HexColor', function () {


            it('isHexColor("#333333") should return true ', function () {
                expect(isHexColor("#333333")).to.be.equal(true);
            });

        });

    });

});