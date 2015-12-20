define(['src/modules/device/isIE'], function (isIE) {

    describe('device', function () {

        describe('#isIE', function () {

            it('isIE() should return true ', function () {
                expect(isIE()).to.be.equal(false);
            });

        });

    });

});