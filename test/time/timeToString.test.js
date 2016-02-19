define(['src/modules/time/timeToString'], function (timeToString) {

    describe('time', function () {

        describe('#timeToString', function () {
        	var dateStamp = 1453973248099; // 2016-01-28 17:27:28
            it('timeToString() should return yyyy-MM-dd HH:mm:ss', function () {
            	expect(timeToString()).to.match(/^(\d{4})-([0-1]\d)-([0-3]\d)\s([0-5]\d):([0-5]\d):([0-5]\d)$/);
            });
            
            it('timeToString("1453973248099") should return 2016-01-28 17:27:28', function () {
            	expect(timeToString(dateStamp)).to.equal('2016-01-28 17:27:28');
            });

            it('timeToString("1453973248099", "/") should return 2016/01/28 17:27:28', function () {
            	expect(timeToString(dateStamp, '/')).to.equal('2016/01/28 17:27:28');
            });

            it('timeToString("1453973248099", "/", "::") should return 2016/01/28 17::27::28', function () {
            	expect(timeToString(dateStamp,'/', '::')).to.equal('2016/01/28 17::27::28');
            });

            // 1442750400000 2015-09-20 20:00:00
            it('timeToString("1442752200000") should return 2015-09-20 20:00:00', function () {
            	expect(timeToString(1442750400000)).to.equal('2015-09-20 20:00:00');
            });

            // 1445344200000 2015-10-20 20:30:00
            it('timeToString("1445344200000") should return 2015-10-20 20:30:00', function () {
            	expect(timeToString(1445344200000)).to.equal('2015-10-20 20:30:00');
            });

            // 1441062610000 2015-09-01 07:10:10
            it('timeToString("1441062610000") should return 2015-09-01 07:10:10', function () {
            	expect(timeToString(1441062610000)).to.equal('2015-09-01 07:10:10');
            });
        });

    });

});