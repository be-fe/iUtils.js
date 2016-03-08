chai.should();

describe('MyAPI', function () {

    beforeEach(function () {
        this.xhr = sinon.useFakeXMLHttpRequest();

        this.requests = [];
        this.xhr.onCreate = function (xhr) {
            this.requests.push(xhr);
        }.bind(this);
    });

    afterEach(function () {
        this.xhr.restore();
    });


    //Tests etc. go here
    it('should parse fetched data as JSON', function (done) {
        var data = {foo: 'bar'};
        var dataJson = JSON.stringify(data);

        myapi.get(function (err, result) {
            result.should.deep.equal(data);
            done();
        });

        this.requests[0].respond(200, {'Content-Type': 'text/json'}, dataJson);
    });


});