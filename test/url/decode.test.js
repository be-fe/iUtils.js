define(['src/modules/url/decode'], function (decode) {

    describe('url', function () {

        describe('#decode', function () {
        	var url = 'http://m1-art-familytest01.m1.baidu.com:8680/index?productCode=BaiduWalletLife_water&serviceCode=cebank_life_water_shanghai_qp_code&cityCode=289&filed2=1&billKey=0114090090003602000017209';
            it('decode("' + url + '")', function () {
            	
            	expect(decode(url)).to.be.equal(true);
            });
            

        });

    });

});