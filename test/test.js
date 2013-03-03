////////////////////////////////
// TEST SUITE
////////////////////////////////
var should = require("should");
var child_process = require('child_process');
var _ = require('lodash');

// Create A Seperate Process for DC
function dc (cb) {
  return child_process.exec('node dc', {
    cwd:'/Users/adrianlee/Dropbox/AssignmentB/code/',
      stdio: 'inherit'
    }, cb);
}

// Test Suite
describe('minidc test suite', function() {
  // Test Domain Logic
  describe('domain logic', function() {
    // Test 0
    // To see if program runs without crashing or timing out
    it('Test 0 - able to exec minidc', function(done) {

      // Call setup
      var call = function (err, stdout, stderr) {
        // Expected result
        should.not.exist(err);
        done();
      };

      var child = dc(call);

      child.stdin.write('exit\n');

    });

    // Test 1
    // Be able to accept user input and exit gracefully
    it('Test 1 - able to accept user input', function(done) {

      // Call setup
      var call = function (err, stdout, stderr) {
        // Expected result
        should.not.exist(err);
        should.exist(stdout);
        done();
      };

      // Exec Call
      var child = dc(call);

      // Input
      child.stdin.write('1\n');
      child.stdin.write('2\n');
      child.stdin.write('exit\n');

    });

    /****************************************************************
      Function: 'p' : Prints value top of stack ; without altering it
    *****************************************************************/
    describe('function p', function() {
      it('Test 2a - \'p\' prints 1st number at top of stack', function(done) {

        // Call setup
        var call = function (err, stdout, stderr) {
          should.not.exist(err);
          should.exist(stdout);
          var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

          // Expected result
          results.should.equal(3);
          done();
        };

        // Exec Call
        var child = dc(call);

        // Input
        child.stdin.write('1\n');
        child.stdin.write('2\n');
        child.stdin.write('3\n');
        child.stdin.write('p\n');
        child.stdin.write('exit\n');

      });

      it('Test 2b - \'p\' returns \'stack empty\' on an empty stack', function(done) {
        // Call setup
        var call = function (err, stdout, stderr) {
          should.not.exist(err);
          should.exist(stdout);
          var results = _.last(stdout.split('\n')[0].split(' '));

          // Expected result
          results.should.equal("empty");
          done();
        };

        // Exec Call
        var child = dc(call);

        // Input
        child.stdin.write('p\n');
        child.stdin.write('exit\n');

      });
    });

    /****************************************************************
      Function: 'n' : Prints value top of stack ; popping it off
    *****************************************************************/
    describe('function n', function() {
      it('Test 3a - \'n\' prints 1st number of stack of N numebrs and pops it off', function(done) {
        // Call Setup
        var call = function (err, stdout, stderr) {
          var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

          // Expected Result
          results.should.equal(2);

          done();
        };

        // Execute Call
        var child = dc(call);

        // Input
        child.stdin.write('1\n');
        child.stdin.write('2\n');
        child.stdin.write('n\n');
        child.stdin.write('exit\n');

      });

      it('Test 3b - \'n\' returns \'stack empty\' on an empty stack', function(done) {
        // Call Setup
        var call = function (err, stdout, stderr) {
          var results = _.last(stdout.split('\n')[0].split(' '));

          // Expected Result
          results.should.equal("empty");

          done();
        };

        // Execute Call
        var child = dc(call);

        // Input
        child.stdin.write('n\n');
        child.stdin.write('exit\n');

      });
    });


    /****************************************************************
      Function: 'f' : Prints entire content of stack without altering it
    *****************************************************************/
    describe('function f', function() {
      it('Test 4a - \'f\' prints entire contents of stack', function(done) {
        // Call Setup
        var call = function (err, stdout, stderr) {
          var results = [];
          results.push(_.last(stdout.split('\n')[0].split(' ')));
          results.push(stdout.split('\n')[1]);
          results.push(stdout.split('\n')[2]);
          results.push(stdout.split('\n')[3]);
          results.push(stdout.split('\n')[4]);
          results.push(stdout.split('\n')[5]);

          // Expected Result
          parseInt(results.pop()).should.equal(1);
          parseInt(results.pop()).should.equal(2);
          parseInt(results.pop()).should.equal(3);
          parseInt(results.pop()).should.equal(4);
          parseInt(results.pop()).should.equal(5);
          parseInt(results.pop()).should.equal(6);

          done();
        };

        // Execute Call
        var child = dc(call);

        // Input
        child.stdin.write('1\n');
        child.stdin.write('2\n');
        child.stdin.write('3\n');
        child.stdin.write('4\n');
        child.stdin.write('5\n');
        child.stdin.write('6\n');
        child.stdin.write('f\n');
        child.stdin.write('exit\n');
      });

      it('Test 4b - \'f\' returns nothing on an empty stack', function(done) {
        // Call Setup
        var call = function (err, stdout, stderr) {
          var results = _.last(stdout.split('\n')[0].split(' '));

          // Expected Result
          results.should.equal("");

          done();
        };

        // Execute Call
        var child = dc(call);

        // Input
        child.stdin.write('f\n');
        child.stdin.write('exit\n');

      });
    });


    /****************************************************************
      Function: '+' :  pops 2 values of the stack, 1st + 2nd , pushes the result
    *****************************************************************/
    describe('function +', function() {
      it('Test 5a - \'+\' last two 2 numbers are added and pushed back', function(done) {
        // Call Setup
        var call = function (err, stdout, stderr) {
          var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

          // Expected Result
          results.should.equal(2);

          done();
        };

        // Execute Call
        var child = dc(call);

        // Input
        child.stdin.write('1\n');
        child.stdin.write('1\n');
        child.stdin.write('+\n');
        child.stdin.write('p\n');
        child.stdin.write('exit\n');
      });

      it('Test 5b - \'+\' returns empty stack with 0 elements in stack', function(done) {
        // Call Setup
        var call = function (err, stdout, stderr) {
          var results = _.last(stdout.split('\n')[0].split(' '));

          // Expected Result
          results.should.equal("empty");

          done();
        };

        // Execute Call
        var child = dc(call);

        // Input
        child.stdin.write('+\n');
        child.stdin.write('exit\n');
      });

      it('Test 5c - \'+\' returns empty stack w/ 1 elements in stack; restores state', function(done) {
        // Call Setup
        var call = function (err, stdout, stderr) {
          var results = _.last(stdout.split('\n')[0].split(' '));

          // Expected Result
          results.should.equal("empty");

          done();
        };

        // Execute Call
        var child = dc(call);

        // Input
        child.stdin.write('1\n');
        child.stdin.write('+\n');
        child.stdin.write('exit\n');
      });

    });

    /****************************************************************
      Function: '-' :  pops 2 values of the stack, 2nd - 1st , pushes the result
    *****************************************************************/
    describe('function -', function() {
      it('Test 6a - \'-\' last two 2 numbers are subtracted and pushed back', function(done) {
        // Call Setup
        var call = function (err, stdout, stderr) {
          var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

          // Expected Result
          results.should.equal(0);

          done();
        };

        // Execute Call
        var child = dc(call);

        // Input
        child.stdin.write('1\n');
        child.stdin.write('1\n');
        child.stdin.write('-\n');
        child.stdin.write('p\n');
        child.stdin.write('exit\n');
      });

      it('Test 6b - \'-\' returns empty stack with 0 elements in stack', function(done) {
        // Call Setup
        var call = function (err, stdout, stderr) {
          var results = _.last(stdout.split('\n')[0].split(' '));

          // Expected Result
          results.should.equal("empty");

          done();
        };

        // Execute Call
        var child = dc(call);

        // Input
        child.stdin.write('-\n');
        child.stdin.write('exit\n');
      });

      it('Test 6c - \'-\' returns empty stack w/ 1 elements in stack; restores state', function(done) {
        // Call Setup
        var call = function (err, stdout, stderr) {
          var results = _.last(stdout.split('\n')[0].split(' '));

          // Expected Result
          results.should.equal("empty");

          done();
        };

        // Execute Call
        var child = dc(call);

        // Input
        child.stdin.write('1\n');
        child.stdin.write('-\n');
        child.stdin.write('exit\n');
      });

    });


    /****************************************************************
      Function: '*' :  pops 2 values of the stack, 1st * 2nd , pushes the result
    *****************************************************************/
    describe('function *', function() {
      it('Test 7a - \'*\' last two numbers are multiplied and pushed back', function(done) {
        // Call Setup
        var call = function (err, stdout, stderr) {
          var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

          // Expected Result
          results.should.equal(10);

          done();
        };

        // Execute Call
        var child = dc(call);

        // Input
        child.stdin.write('2\n');
        child.stdin.write('5\n');
        child.stdin.write('*\n');
        child.stdin.write('p\n');
        child.stdin.write('exit\n');
      });

      it('Test 7b - \'*\' returns empty stack with 0 elements in stack', function(done) {
        // Call Setup
        var call = function (err, stdout, stderr) {
          var results = _.last(stdout.split('\n')[0].split(' '));

          // Expected Result
          results.should.equal("empty");

          done();
        };

        // Execute Call
        var child = dc(call);

        // Input
        child.stdin.write('*\n');
        child.stdin.write('exit\n');
      });

      it('Test 7c - \'*\' returns empty stack w/ 1 elements in stack; restores state', function(done) {
        // Call Setup
        var call = function (err, stdout, stderr) {
          var results = _.last(stdout.split('\n')[0].split(' '));

          // Expected Result
          results.should.equal("empty");

          done();
        };

        // Execute Call
        var child = dc(call);

        // Input
        child.stdin.write('99\n');
        child.stdin.write('*\n');
        child.stdin.write('exit\n');
      });
    });


    /****************************************************************
      Function: '*' :  pops 2 values of the stack, 1st / 2nd , pushes the result
    *****************************************************************/
    describe('function /', function() {
      it('Test 8a - \'/\' last two numbers are divided and pushed back', function(done) {
        // Call Setup
        var call = function (err, stdout, stderr) {
          var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

          // Expected Result
          results.should.equal(2);

          done();
        };

        // Execute Call
        var child = dc(call);

        // Input
        child.stdin.write('10\n');
        child.stdin.write('5\n');
        child.stdin.write('/\n');
        child.stdin.write('p\n');
        child.stdin.write('exit\n');
      });

      it('Test 8b - \'/\' returns empty stack with 0 elements in stack', function(done) {
        // Call Setup
        var call = function (err, stdout, stderr) {
          var results = _.last(stdout.split('\n')[0].split(' '));

          // Expected Result
          results.should.equal("empty");

          done();
        };

        // Execute Call
        var child = dc(call);

        // Input
        child.stdin.write('/\n');
        child.stdin.write('exit\n');
      });

      it('Test 8c - \'/\' returns empty stack w/ 1 elements in stack; restores state', function(done) {
        // Call Setup
        var call = function (err, stdout, stderr) {
          var results = _.last(stdout.split('\n')[0].split(' '));

          // Expected Result
          results.should.equal("empty");

          done();
        };

        // Execute Call
        var child = dc(call);

        // Input
        child.stdin.write('123\n');
        child.stdin.write('/\n');
        child.stdin.write('exit\n');
      });
    });

  });

  // Test Input Syntax
  describe('input syntax', function() {
    describe('allow multiple input per line', function() {
      it('Test 9a - simple input\'1 1 + p\'', function(done) {
        // Call Setup
        var call = function (err, stdout, stderr) {
          var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

          // Expected Result
          results.should.equal(2);

          done();
        };

        // Execute Call
        var child = dc(call);

        // Input
        child.stdin.write('1 1 + p\n');
        child.stdin.write('exit\n');
      });

      it('Test 9b - complex input \'4123 42 + 423 - 124 123 745 * 242 / n n p\'', function(done) {
        // Call Setup
        var call = function (err, stdout, stderr) {
          var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

          // Expected Result
          results.should.equal(378);

          done();
        };

        // Execute Call
        var child = dc(call);

        // Input
        child.stdin.write('4123 42 + 423 - 124 123 745 * 242 / n n p\n');
        child.stdin.write('exit\n');
      });
    });

    describe('do not allow unknown commands', function() {
      it('Test 10a - reject follow commands a b c d e g h i j k l m n o q r s t u v w x y z', function(done) {
        // Call Setup
        var call = function (err, stdout, stderr) {
          var results = _.last(stdout.split('\n')[0].split(' '));

          // Expected Result
          results.should.equal("unimplemented");

          done();
        };

        // Execute Call
        var child = dc(call);

        // Input
        child.stdin.write('a b c d e g h i j k l m n o q r s t u v w x y z\n');
        child.stdin.write('exit\n');
      });

      it('Test 10b - reject 1a a1 aa aabb bb11aa 1b1a 123asd $%^&* ( # @ % !', function(done) {
        // Call Setup
        var call = function (err, stdout, stderr) {
          var results = _.last(stdout.split('\n')[0].split(' '));

          // Expected Result
          results.should.equal("unimplemented");

          done();
        };

        // Execute Call
        var child = dc(call);

        // Input
        child.stdin.write('ca a1 aa aabb bb11aa d4d1b1a d123asd $%^&* ( # @ % !\n');
        child.stdin.write('exit\n');
      });

      it('Test 10c - reject duplicate operators ** */ ++ -- ++', function(done) {
        // Call Setup
        var call = function (err, stdout, stderr) {
          var results = _.last(stdout.split('\n')[0].split(' '));

          // Expected Result
          results.should.equal("unimplemented");

          done();
        };

        // Execute Call
        var child = dc(call);

        // Input
        child.stdin.write('** */ ++ -- ++\n');
        child.stdin.write('exit\n');
      });
    });
  });

  // Test Parameter Types and Numbers
  describe('paramaters types and numbers', function() {
    describe('handle negative numbers', function() {
      it('Test 11a - accept negative input', function(done) {
        // Call Setup
        var call = function (err, stdout, stderr) {
          var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

          // Expected Result
          results.should.equal(-1);

          done();
        };

        // Execute Call
        var child = dc(call);

        // Input
        child.stdin.write('_1\n');
        child.stdin.write('p\n');
        child.stdin.write('exit\n');
      });


      it('Test 11b - negative number operation; -100 * -100 = 10000', function(done) {
        // Call Setup
        var call = function (err, stdout, stderr) {
          var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

          // Expected Result
          results.should.equal(10000);

          done();
        };

        // Execute Call
        var child = dc(call);

        // Input
        child.stdin.write('_100\n');
        child.stdin.write('_100\n');
        child.stdin.write('*\n');
        child.stdin.write('p\n');
        child.stdin.write('exit\n');
      });
    });

    describe('handle decimal numbers', function() {
      it('Test 12a - accept decimal input', function(done) {
        // Call Setup
        var call = function (err, stdout, stderr) {
          var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

          // Expected Result
          results.should.equal(1.0);

          done();
        };

        // Execute Call
        var child = dc(call);

        // Input
        child.stdin.write('1.0\n');
        child.stdin.write('p\n');
        child.stdin.write('exit\n');
      });

      it('Test 12b - accept decimal operations; 5 / 2 = 2.5', function(done) {
        // Call Setup
        var call = function (err, stdout, stderr) {
          var results = parseFloat(_.last(stdout.split('\n')[0].split(' ')));

          // Expected Result
          results.should.equal(2.5);

          done();
        };

        // Execute Call
        var child = dc(call);

        // Input
        child.stdin.write('5\n');
        child.stdin.write('2\n');
        child.stdin.write('/\n');
        child.stdin.write('p\n');
        child.stdin.write('exit\n');
      });
    });

    describe('handle large numbers', function() {
      it('Test 13a - accept large input', function(done) {
        // Call Setup
        var call = function (err, stdout, stderr) {
          var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));

          // Expected Result
          results.should.equal(1394857039245703295872092348522394857320948572392345);

          done();
        };

        // Execute Call
        var child = dc(call);

        // Input
        child.stdin.write('1394857039245703295872092348522394857320948572392345\n');
        child.stdin.write('p\n');
        child.stdin.write('exit\n');
      });

      it('Test 13b - accept large number operations', function(done) {
        // Call Setup
        var call = function (err, stdout, stderr) {
          var results = parseFloat(_.last(stdout.split('\n')[0].split(' ')));

          // Expected Result
          results.should.equal(1.7227757709138437e+81);

          done();
        };

        // Execute Call
        var child = dc(call);

        // Input
        child.stdin.write('1394857039245703295872092348522394857320948572392345\n');
        child.stdin.write('1235091283509218375091238571235\n');
        child.stdin.write('*\n');
        child.stdin.write('n\n');
        child.stdin.write('exit\n');
      });


      it('Test 13c - accept large stack size operations', function(done) {
        // Call Setup
        var call = function (err, stdout, stderr) {
          var results = parseInt(_.last(stdout.split('\n')[0].split(' ')));
          // Expected Result
          results.should.equal(1152921504606847000);

          done();
        };

        // Execute Call
        var child = dc(call);

        // Input
        child.stdin.write('1\n');
        for (var i = 0; i < 100000; i++) {
          child.stdin.write('2\n');
          child.stdin.write('*\n');
        }
        child.stdin.write('p\n');
        child.stdin.write('exit\n');
      });
    });
  });
});