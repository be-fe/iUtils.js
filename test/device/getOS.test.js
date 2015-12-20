define(['src/modules/device/getOS'], function (getOS) {

    describe('device', function () {

        describe('#getOS', function () {

            it('getOS() should return "mac"', function () {
                expect(getOS()).to.be.equal('MacOSX');
            });

        });

    });

});