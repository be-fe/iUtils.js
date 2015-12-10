define(['src/modules/type/typeIsBuffer'], function (typeIsBuffer) {

    describe('type', function () {

        describe('#typeIsBuffer', function () {

            it('typeIsBuffer(new Buffer) should return "true"', function () {
                expect(typeIsBuffer(new ArrayBuffer)).to.be.equal(true);
            });

        });

    });

});