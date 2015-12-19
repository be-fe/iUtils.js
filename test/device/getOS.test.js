define(['src/modules/device/getOS'], function (getOS) {

    describe('device', function () {

        describe('#getOS', function () {

            it('getType() should return "mac"', function () {
                expect(getOS()).to.be.equal('MacOSX');
            });

        });

    });

});