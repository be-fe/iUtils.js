define(['src/modules/url/stringfyQueryString'], function (stringfyQueryString) {

    describe('url', function () {

        describe('#stringfyQueryString', function () {
            var obj1 = {
                productCode: 'water',
                cityCode: '289',
                filed2: '1',
                billKey: '0114'
            };
            it('stringfyQueryString("' + JSON.stringify(obj1) + '") should return true', function () {
                expect(stringfyQueryString(obj1)).to.be.equal('productCode=water&cityCode=289&filed2=1&billKey=0114');
            });

            var obj2 = {
                name: '中文名',
                billKey: '0114'
            };
            it('stringfyQueryString("' + JSON.stringify(obj2) + '") should return true', function () {
                expect(stringfyQueryString(obj2)).to.be.equal('name=%E4%B8%AD%E6%96%87%E5%90%8D&billKey=0114');
            });
            
        });

    });

});