define(['src/modules/time/parseTime'], function (parseTime) {

    describe('time', function () {

        describe('#parseTime', function () {
            it('parseTime() should return undefined', function () {
            	expect(parseTime()).to.be.an('undefined');
            });
            
            /*it('parseTime("123123") should throw an error ', function () {
            	expect(parseTime(123123)).to.throw(Error);
            });*/

        	it('parseTime("1454049411885") should return 1454049411885 ', function () {
            	expect(parseTime(1454049411885)).to.be.equal(1454049411885);
            });
            
            it('parseTime("1454049411") should return 1454049411000 ', function () {
            	expect(parseTime(1454049411)).to.be.equal(1454049411000);
            });
            it('parseTime("2015/12/01 12:34:20") should return 1448944460000 ', function () {
            	expect(parseTime("2015/12/01 12:34:20")).to.be.equal(1448944460000);
            });
            it('parseTime("2015/12/01") should return 1448899200000 ', function () {
            	expect(parseTime("2015/12/01")).to.be.equal(1448899200000);
            });
            it('parseTime("2015-12-01 12:34:20") should return 1448944460000 ', function () {
            	expect(parseTime("2015-12-01 12:34:20")).to.be.equal(1448944460000);
            });
            /*it('parseTime("20151201") should return 1448899200000 ', function () {
            	expect(parseTime("20151201")).to.be.equal(1448899200000);
            });*/
        });

    });

});