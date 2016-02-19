define(['src/modules/class/toggleClass', 'src/modules/class/hasClass'], function (toggleClass, hasClass) {

    describe('class', function () {

        describe('#toggleClass', function () {
        	var ele = document.createElement('div')
        	ele.className = 'main';
            it('toggleClass(<div class="main"></div>, "main") should return false', function () {
            	toggleClass(ele, 'main');
                expect(hasClass(ele, 'main')).to.be.equal(false);
            });

            it('toggleClass(<div></div>, "main") should return true', function () {
            	toggleClass(ele, 'main');
                expect(hasClass(ele, 'main')).to.be.equal(true);
            });
            
            ele.className = 'test main';
            it('toggleClass(<div class="test main"></div>, "main") should return false', function () {
            	toggleClass(ele, 'main');
                expect(hasClass(ele, 'main')).to.be.equal(false);
            });

            it('toggleClass(<div class="test"></div>, "main") should return true', function () {
            	toggleClass(ele, 'main');
                expect(hasClass(ele, 'main')).to.be.equal(true);
            });

        });

    });

});
