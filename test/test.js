var should = require("should");

describe('minidc', function() {
  describe('logic', function() {

    // test name
    it('minidc 1 1 + = 2', function() {
      // call setup
      var i = 1 + 2;

      // expected results
      i.should.equal(4);
    });

    xit('should xxxxxx 2', function(){
      var i = 1 + 3;
      i.should.equal();
    });
  });

  describe('domain', function() {
    it('minidc should be callable', function(){
      var i = 1 + 1;
      i.should.equal(2);
    });
  });
})