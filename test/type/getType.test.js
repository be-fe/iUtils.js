define(['src/modules/type/getType'], function (getType) {

    describe('type', function () {

        describe('#getType', function () {

            it('getType([1, 2, 3, 4]) should return "array"', function () {
                expect(getType([1, 2, 3, 4])).to.be.equal('array');
            });

            it('getType("12345") should return "string"', function () {
                expect(getType('12345')).to.be.equal('string');
            });

            it('getType(/[1-9]/i) should return "regexp"', function () {
                expect(getType(/[1-9]/i)).to.be.equal('regexp');
            });

            it('getType(999) should return "number"', function () {
                expect(getType(999)).to.be.equal('number');
            });

            it('getType(new TypeError) should return "error"', function () {
                expect(getType(new TypeError)).to.be.equal('error');
            });

            it('getType(new Date) should return "date"', function () {
                expect(getType(new Date)).to.be.equal('date');
            });

            it('getType(null) should return "null"', function () {
                expect(getType(null)).to.be.equal('null');
            });

            it('getType(undefined) should return "undefined"', function () {
                expect(getType(undefined)).to.be.equal('undefined');
            });

            it('getType(NaN) should return "undefined"', function () {
                expect(getType(NaN)).to.be.equal('nan');
            });

            it('getType(document.createElement("li")) should return "element"', function () {
                expect(document.createElement('li')).to.be.equal('element');
            });

            function testError(x) {
                try {
                    if (x == "")    throw new TypeError;
                }
                catch (err) {
                    it('getType(err) should return "error"', function () {
                        expect(getType(err)).to.be.equal('error');
                    });
                }
            }

            testError('');

            function testArguments(hi) {
                it('getType(arguments) should return "arguments"', function () {
                    expect(getType(arguments)).to.be.equal('arguments');
                });
            }

            testArguments('hi');


        });

    });

});