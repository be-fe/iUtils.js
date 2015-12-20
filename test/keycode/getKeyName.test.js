define(['src/modules/keycode/getKeyName'], function (getKeyName) {

    describe('keycode', function () {

        describe('#getKeyName', function () {

            it('getKeyName(13) should return "return"', function () {
                expect(getKeyName(13)).to.be.equal('Enter');
            });

        });

    });

});