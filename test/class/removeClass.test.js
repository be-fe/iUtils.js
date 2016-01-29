define(['src/modules/class/removeClass', 'src/modules/class/hasClass'], function (removeClass, hasClass) {

    describe('class', function () {

        describe('#removeClass', function () {

            it('removeClass(<div></div>, "main") should return false', function () {
            	var ele = document.createElement('div');
            	removeClass(ele, 'main');
                expect(hasClass(ele, 'main')).to.be.equal(false);
            });

            it('removeClass(<div class="main"></div>, "main") should return false', function () {
            	var ele = document.createElement('div');
            	ele.className = 'main';
            	removeClass(ele, 'main');
                expect(hasClass(ele, 'main')).to.be.equal(false);
            });
            
            it('removeClass(<div class="man"></div>, "main") should return true', function () {
            	var ele = document.createElement('div');
            	ele.className = 'man';
            	removeClass(ele, 'main');
                expect(hasClass(ele, 'man')).to.be.equal(true);
            });

        });

    });

});
