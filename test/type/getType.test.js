define(['src/modules/type/getType'], function (getType) {

    describe('type', function () {

        describe('#getType', function () {

            it('getType(new Date) should return "date"', function () {
                expect(getType(new Date)).to.be.equal('date');
            });

            it('getType({}) should return "object"', function () {
                expect(getType({})).to.be.equal('object');
            });

            it('getType(null) should return "null"', function () {
                expect(getType(null)).to.be.equal('null');
            });

            it('getType(undefined) should return "undefined"', function () {
                expect(getType(undefined)).to.be.equal('undefined');
            });

            it('getType("12345") should return "string"', function () {
                expect(getType('12345')).to.be.equal('string');
            });

            it('getType(false) should return "boolean"', function () {
                expect(getType(false)).to.be.equal('boolean');
            });

            it('getType(999) should return "number"', function () {
                expect(getType(999)).to.be.equal('number');
            });

            it('getType(getType) should return "function"', function () {
                expect(getType(getType)).to.be.equal('function');
            });

            it('getType(/[1-9]/i) should return "regexp"', function () {
                expect(getType(/[1-9]/i)).to.be.equal('regexp');
            });

            it('getType(/[1-9]/i) should return "regexp"', function () {
                expect(getType((function () {
                    return arguments
                })())).to.be.equal('arguments');
            });

            it('getType([1, 2, 3, 4]) should return "array"', function () {
                expect(getType([1, 2, 3, 4])).to.be.equal('array');
            });

            it('getType(document.createElement("li")) should return "element"', function () {
                expect(getType(document.createElement('div'))).to.be.equal('element');
            });

            it('getType(NaN) should return "undefined"', function () {
                expect(getType(NaN)).to.be.equal('nan');
            });

            it('getType(new TypeError) should return "error"', function () {
                expect(getType(new Error('Ups! Something wrong...'))).to.be.equal('error');
            });


        });

    });

});