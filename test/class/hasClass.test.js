define(['src/modules/class/hasClass'], function (hasClass) {

    describe('class', function () {

        describe('#hasClass', function () {

            it('hasClass(<div class="main"></div>, "main") should return true', function () {
            	var ele = document.createElement('div');
            	ele.className = 'main';
                expect(hasClass(ele, 'main')).to.be.equal(true);
            });
            it('hasClass(<div class="main test"></div>, "main") should return true', function () {
            	var ele = document.createElement('div');
            	ele.className = 'main test';
                expect(hasClass(ele, 'main')).to.be.equal(true);
            });
            
            it('hasClass(<div></div>, "main") should return false', function () {
            	var ele = document.createElement('div');
                expect(hasClass(ele, 'main')).to.be.equal(false);
            });
            it('hasClass(<div class="man test"></div>, "main") should return false', function () {
            	var ele = document.createElement('div');
            	ele.className = 'man, test';
                expect(hasClass(ele, 'main')).to.be.equal(false);
            });

        });

    });

});
