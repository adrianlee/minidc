var should = require("should");
var child_process = require('child_process');

var _ = require('lodash');

//p , n , f , + , - , * ,/

function runtest (cb) {
  return child_process.exec('node minidc', {cwd:'/Users/adrianlee/Dropbox/AssignmentB/code/', stdio: 'inherit'}, cb);
}

describe('minidc', function() {

  //Test for +

  describe('logic', function() {

    // test name
    it('minidc 1 1 + = 2', function(done) {
      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

        // expected result
        results.should.equal(2);
        done();
      });

      child.stdin.write('1\n');
      child.stdin.write('1\n');
      child.stdin.write('+\n');
      child.stdin.write('p\n');
      child.stdin.write('exit\n');
    });

    it('minidc 1 1 - = 0', function(done) {
      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));
        results.should.equal(0);
        done();
      });

      child.stdin.write('1\n');
      child.stdin.write('1\n');
      child.stdin.write('-\n');
      child.stdin.write('p\n');
      child.stdin.write('exit\n');
    });
  });

  xdescribe('domain', function() {
    it('minidc should be callable', function(){
      var i = 1 + 1;
      i.should.equal(2);
    });
  });

});