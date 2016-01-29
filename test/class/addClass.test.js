define(['src/modules/class/addClass', 'src/modules/class/hasClass'], function (addClass, hasClass) {

    describe('class', function () {

        describe('#addClass', function () {

            it('addClass(<div></div>, "main") should return true', function () {
            	var ele = document.createElement('div');
            	addClass(ele, 'main');
                expect(hasClass(ele, 'main')).to.be.equal(true);
            });

            it('addClass(<div class="main"></div>, "main") should return true', function () {
            	var ele = document.createElement('div');
            	ele.className = 'main';
            	addClass(ele, 'main');
                expect(hasClass(ele, 'main')).to.be.equal(true);
            });
            

        });

    });

});
