define(['src/modules/regexp/isUrl'], function (isUrl) {

    describe('regexp', function () {

        describe('#isUrl', function () {

            it('isURL("http://leiquan.me") should return true ', function () {
                expect(isUrl("http://leiquan.me")).to.be.equal(true);
            });

            it('isURL("http://leiquan.me") should return true ', function () {
                expect(isUrl("http:/leiquan.me")).to.be.equal(false);
            });

        });

    });

});