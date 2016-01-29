define(['src/modules/string/trim'], function (trim) {

    describe('trim', function () {

        describe('#trim', function () {

            it('trim(" nihao ") should return "return"', function () {
                expect(trim(" nihao ")).to.be.equal('nihao');
            });

            it('trim(" nihao ", "left") should return "return"', function () {
                expect(trim(" nihao ", "left")).to.be.equal('nihao ');
            });

            it('trim(" nihao ", "right") should return "return"', function () {
                expect(trim(" nihao ", "right")).to.be.equal(' nihao');
            });

            it('trim("ni hao") should return "ni hao"', function () {
                expect(trim("ni hao")).to.be.equal('ni hao');
            });

        });

    });

});