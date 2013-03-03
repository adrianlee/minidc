var should = require("should");
var child_process = require('child_process');

var _ = require('lodash');

//p , n , f , + , - , * ,/

function runtest (cb) {
  return child_process.exec('node minidc', {cwd:'/Users/adrianlee/Dropbox/AssignmentB/code/', stdio: 'inherit'}, cb);
}

describe('minidc', function() {

  describe('logic', function() {

  //Function: 'p' : Prints value top of stack ; without altering it

    //Test1:To see if 'p' prints 1st number of stack of N numbers
    it('minidc 1 2 3 p', function(done) {

      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

        // expected result
        results.should.equal(3);
        done();
      });

      child.stdin.write('1\n');
      child.stdin.write('2\n');
      child.stdin.write('3\n');
      child.stdin.write('p\n');
      child.stdin.write('exit\n');
    });

    //Test2: - To see if 'p' returns 'stack empty' on an empty stack
    xit('minidc p', function(done) {

      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

        // expected result
        results.should.equal("empty stack");
        done();
      });

      child.stdin.write('p\n');
      child.stdin.write('exit\n');
    });

  //Function: 'n' : - Prints value top of stack ; popping it off

    //Test1:To see if 'n' prints 1st number of stack of N numebrs and pops it off
    xit('minidc 1 2 3 n p', function(done) {

      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results1 = parseInt(_.last(stdout.split('\n')[0].split(' ')));
        var results2 = parseInt(_.last(stdout.split('\n')[0].split(' '))); // this is to confirm the pop

        // expected result
        results1.should.equal(3);
        results2.should.equal(2);

        done();
      });

      child.stdin.write('1\n');
      child.stdin.write('2\n');
      child.stdin.write('3\n');
      child.stdin.write('p\n');
      child.stdin.write('n\n');
      child.stdin.write('exit\n');
    });

    //Test2: - To see if 'n' returns 'stack empty' on an empty stack
    xit('minidc p', function(done) {

      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

        // expected result
        results.should.equal("empty stack");
        done();
      });

      child.stdin.write('n\n');
      child.stdin.write('exit\n');
    });

  //Function: 'f' : - Prints entire content of stack without altering it

    //Test1:To see if 'f' prints entire contents of stack
    xit('minidc 4 5 6 7 f', function(done) {

      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

        // expected result
        results.should.equal(7 6 5 4); //**** needs to be returned like this 7654****
        done();
      });

      child.stdin.write('7\n');
      child.stdin.write('6\n');
      child.stdin.write('5\n');
      child.stdin.write('4\n');
      child.stdin.write('f\n');
      child.stdin.write('exit\n');
    });

    //Test2: - To see if 'n' returns nothing on an empty stack
    xit('minidc p', function(done) {

      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

        // expected result
        results.should.equal("");
        done();
      });

      child.stdin.write('f\n');
      child.stdin.write('exit\n');
    });


  //Function: '+' : pops 2 values of the stack, 1st + 2nd , pushes the result


    //Test1:To see if 2 numbers are added
    xit('minidc 1 1 + p = 2', function(done) {
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

    //Test2:To see if 2 numbers are added
    xit('minidc 1 + 2 p = stack empty', function(done) {
      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

        // expected result
        results.should.equal("stack empty");
        done();
      });

      child.stdin.write('1\n');
      child.stdin.write('+\n');
      child.stdin.write('2\n');
      child.stdin.write('p\n');
      child.stdin.write('exit\n');
    });


    //Test3:To see if 2 numbers are added
    xit('minidc + 1 2 p = stack empty', function(done) {
      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

        // expected result
        results.should.equal("stack empty");
        done();
      });

      child.stdin.write('+\n');
      child.stdin.write('1\n');
      child.stdin.write('2\n');
      child.stdin.write('p\n');
      child.stdin.write('exit\n');
    });

    //Test4: Addition with negative numbers
    xit('minidc _1 2 + p = 1', function(done) {
      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

        // expected result
        results.should.equal(1);
        done();
      });

      child.stdin.write('_1\n');
      child.stdin.write('2\n');
      child.stdin.write('+\n');
      child.stdin.write('p\n');
      child.stdin.write('exit\n');
    });

    //Test5: Addition with decimal numbers
    xit('minidc 1 2.1 + p = 3.1', function(done) {
      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

        // expected result
        results.should.equal(3.1);
        done();
      });

      child.stdin.write('1\n');
      child.stdin.write('2.1\n');
      child.stdin.write('+\n');
      child.stdin.write('p\n');
      child.stdin.write('exit\n');
    });



    //Function: '-' : pops 2 values of the stack, 2nd - 1st , pushes the result

    //Test1:To see if 2 numbers are subracted
    xit('minidc 1 1 - p = 0', function(done) {
      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

        // expected result
        results.should.equal(0);
        done();
      });

      child.stdin.write('1\n');
      child.stdin.write('1\n');
      child.stdin.write('-\n');
      child.stdin.write('p\n');
      child.stdin.write('exit\n');
    });

    //Test2:To see if 2 numbers are subtracted
    xit('minidc 1 - 2 p = stack empty', function(done) {
      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

        // expected result
        results.should.equal("stack empty");
        done();
      });

      child.stdin.write('1\n');
      child.stdin.write('-\n');
      child.stdin.write('2\n');
      child.stdin.write('p\n');
      child.stdin.write('exit\n');
    });


    //Test3:To see if 2 numbers are subtracted
    xit('minidc - 1 2 p = stack empty', function(done) {
      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

        // expected result
        results.should.equal("stack empty");
        done();
      });

      child.stdin.write('-\n');
      child.stdin.write('1\n');
      child.stdin.write('2\n');
      child.stdin.write('p\n');
      child.stdin.write('exit\n');
    });

    //Test4: Subtraction with negative numbers
    xit('minidc _1 2 - p = -3', function(done) {
      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

        // expected result
        results.should.equal(-3);
        done();
      });

      child.stdin.write('_1\n');
      child.stdin.write('2\n');
      child.stdin.write('-\n');
      child.stdin.write('p\n');
      child.stdin.write('exit\n');
    });

    //Test5: Subtraction with decimal numbers
    xit('minidc 1 2.1 - p = -1.1', function(done) {
      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

        // expected result
        results.should.equal(-1.1);
        done();
      });

      child.stdin.write('1\n');
      child.stdin.write('2.1\n');
      child.stdin.write('-\n');
      child.stdin.write('p\n');
      child.stdin.write('exit\n');
    });

    //Function: '*' : pops 2 values of the stack, 1st  *2nd , pushes the result

    //Test1:To see if 2 numbers are multiplied
    xit('minidc 2 5 * p = 10', function(done) {
      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

        // expected result
        results.should.equal(10);
        done();
      });

      child.stdin.write('2\n');
      child.stdin.write('5\n');
      child.stdin.write('*\n');
      child.stdin.write('p\n');
      child.stdin.write('exit\n');
    });

    //Test2:To see if 2 numbers are multiplied
    xit('minidc 1 * 2 p = stack empty', function(done) {
      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

        // expected result
        results.should.equal("stack empty");
        done();
      });

      child.stdin.write('1\n');
      child.stdin.write('*\n');
      child.stdin.write('2\n');
      child.stdin.write('p\n');
      child.stdin.write('exit\n');
    });


    //Test3:To see if 2 numbers are multiplied
    xit('minidc * 1 2 p = stack empty', function(done) {
      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

        // expected result
        results.should.equal("stack empty");
        done();
      });

      child.stdin.write('*\n');
      child.stdin.write('1\n');
      child.stdin.write('2\n');
      child.stdin.write('p\n');
      child.stdin.write('exit\n');
    });

    //Test4: Multiplication with negative numbers
    xit('minidc _2 _2 * p = 4', function(done) {
      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

        // expected result
        results.should.equal(4);
        done();
      });

      child.stdin.write('_2\n');
      child.stdin.write('_2\n');
      child.stdin.write('*\n');
      child.stdin.write('p\n');
      child.stdin.write('exit\n');
    });

    //Test5: Multiplication with decimal numbers
    xit('minidc 1.1 2.1 * p', function(done) {
      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

        // expected result
        results.should.equal(2.3);
        done();
      });

      child.stdin.write('1.1\n');
      child.stdin.write('2.1\n');
      child.stdin.write('*\n');
      child.stdin.write('p\n');
      child.stdin.write('exit\n');
    });


    //Function: '/' : pops 2 values of the stack, 2nd / 1st , pushes the result

    //Test1:To see if 2 numbers are divided
    xit('minidc 10 5 / p = 2', function(done) {
      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

        // expected result
        results.should.equal(2);
        done();
      });

      child.stdin.write('10\n');
      child.stdin.write('5\n');
      child.stdin.write('/\n');
      child.stdin.write('p\n');
      child.stdin.write('exit\n');
    });

    //Test2:To see if 2 numbers are divided
    xit('minidc 1 / 2 p = stack empty', function(done) {
      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

        // expected result
        results.should.equal("stack empty");
        done();
      });

      child.stdin.write('1\n');
      child.stdin.write('/\n');
      child.stdin.write('2\n');
      child.stdin.write('p\n');
      child.stdin.write('exit\n');
    });


    //Test3:To see if 2 numbers are divided
    xit('minidc / 1 2 p = stack empty', function(done) {
      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

        // expected result
        results.should.equal("stack empty");
        done();
      });

      child.stdin.write('/\n');
      child.stdin.write('1\n');
      child.stdin.write('2\n');
      child.stdin.write('p\n');
      child.stdin.write('exit\n');
    });

    //Test4: Division with negative numbers
    xit('minidc _2 _2 / p = 1', function(done) {
      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

        // expected result
        results.should.equal(1);
        done();
      });

      child.stdin.write('_2\n');
      child.stdin.write('_2\n');
      child.stdin.write('/\n');
      child.stdin.write('p\n');
      child.stdin.write('exit\n');
    });

    //Test5: Division with decimal numbers
    xit('minidc 2.2 1.1 / p', function(done) {
      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

        // expected result
        results.should.equal(2);
        done();
      });

    //Test5: Division by 0
    xit('minidc 2 0 / p', function(done) {
      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

        // expected result
        results.should.equal("divide by zero");
        done();
      });


      child.stdin.write('2\n');
      child.stdin.write('0\n');
      child.stdin.write('/\n');
      child.stdin.write('p\n');
      child.stdin.write('exit\n');
    });

    //Test5: Division from 0
    xit('minidc 0 2 / p', function(done) {
      // call setup
      var child = runtest(function (err, stdout, stderr) {
        var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

        // expected result
        results.should.equal(0);
        done();
      });


      child.stdin.write('0\n');
      child.stdin.write('2\n');
      child.stdin.write('/\n');
      child.stdin.write('p\n');
      child.stdin.write('exit\n');
    });

  });

// Test for ? ***************************************************???
  xdescribe('domain', function() {
    it('minidc should be callable', function(){
      var i = 1 + 1;
      i.should.equal(2);
    });
  });

});