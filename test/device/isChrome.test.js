define(['src/modules/device/isChrome'], function (isChrome) {

    describe('device', function () {

        describe('#isChrome', function () {

            it('isChrome() should return true ', function () {
                expect(isChrome()).to.be.equal(true);
            });

        });

    });

});