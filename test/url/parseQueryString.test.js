define(['src/modules/url/parseQueryString'], function (parseQueryString) {

    describe('url', function () {

        describe('#parseQueryString', function () {
        	var url1 = 'http://m1-art-familytest01.m1.baidu.com:8680/index?productCode=BaiduWalletLife_water&serviceCode=cebank_life_water_shanghai_qp_code&cityCode=289&filed2=1&billKey=0114090090003602000017209';
            it('parseQueryString("' + url1 + '") should return true', function () {
            	expect(parseQueryString(url1)).to.eql({
            		productCode: 'BaiduWalletLife_water',
            		serviceCode: 'cebank_life_water_shanghai_qp_code',
            		cityCode: '289',
            		filed2: '1',
            		billKey: '0114090090003602000017209'
            	});
            });
            var url2 = '?productCode=BaiduWalletLife_water&serviceCode=cebank_life_water_shanghai_qp_code&cityCode=289&filed2=1&billKey=0114090090003602000017209';
            it('parseQueryString("' + url2 + '") should return true', function () {
            	expect(parseQueryString(url2)).to.eql({
            		productCode: 'BaiduWalletLife_water',
            		serviceCode: 'cebank_life_water_shanghai_qp_code',
            		cityCode: '289',
            		filed2: '1',
            		billKey: '0114090090003602000017209'
            	});
            });
            var url3 = 'name=%E4%B8%AD%E6%96%87%E5%90%8D&billKey=0114';
            it('parseQueryString("' + url3 + '") should return true', function () {
            	expect(parseQueryString(url3)).to.eql({
            		name: '中文名',
            		billKey: '0114'
            	});
            });
            var url4 = 'productCode=BaiduWalletLife_water';
            it('parseQueryString("' + url4 + '") should return true', function () {
            	expect(parseQueryString(url4)).to.eql({
            		productCode: 'BaiduWalletLife_water'
            	});
            });

            it('just test', function () {
            	var obj = {
            		productCode: "BaiduWalletLife_water",
            		serviceCode: "cebank_life_water_shanghai_qp_code",
            		cityCode: "289",
            		filed2: "1",
            		billKey: "0114090090003602000017209"
            	};

            	expect(obj).to.eql({
            		billKey: '0114090090003602000017209',
            		cityCode: '289',
            		serviceCode: 'cebank_life_water_shanghai_qp_code',
            		filed2: '1',
            		productCode: 'BaiduWalletLife_water'
            	});
            });
        });

    });

});