////////////////////////////////
// MINI DC
////////////////////////////////
var readline = require('readline');
var _ = require('lodash');
var stack = [];

// Constructor for readline function
var read = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Initial prompt for User Input
read.prompt();


// Event handler for new line input by User
read.on('line', function(line) {
  // Logic begins here

  // Parse multiple commands per user input
  var array = line.trim().split(' ');

  // Iterate through each command per line
  for (var command in array) {

    switch(array[command]) {

      // Allow program to gracefully exit
      case 'exit':
        process.exit(0);
        break;

      // prints value of top element on stack. no alternation
      case 'p':
        if (_.isEmpty(stack)) {
          return console.log("stack empty");
        }
        console.log(stack[stack.length-1]);
        break;

      // pops top element and prints
      case 'n':
        if (_.isEmpty(stack)) {
          return console.log("stack empty");
        }
        console.log(stack.pop());
        break;

      // prints all in reverse order. no alteration
      case 'f':
        for (var i = stack.length-1; i >= 0; i--) {
          console.log(stack[i]);
        }
        break;

      // pops two values and adds them. pushes result into stack
      case '+':
        if (_.isEmpty(stack)) {
          return console.log("stack empty");
        }

        var i = parseInt(stack.pop());

        if (_.isEmpty(stack)) {
          stack.push(i);  // make sure we restore previous state
          return console.log("stack empty");
        }

        var j = parseInt(stack.pop());

        stack.push(i+j);
        break;

      // pops two values and subtracts them. pushes result into stack
      case '-':
        if (_.isEmpty(stack)) {
          return console.log("stack empty");
        }
        var i = parseInt(stack.pop());
        if (_.isEmpty(stack)) {
          stack.push(i);  // make sure we restore previous state
          return console.log("stack empty");
        }
        var j = parseInt(stack.pop());
        var res = j-i;
        stack.push(res);
        break;

      // pops two values and multiplies them. pushes result into stack
      case '*':
        if (_.isEmpty(stack)) {
          return console.log("stack empty");
        }
        var i = parseInt(stack.pop());
        if (_.isEmpty(stack)) {
          stack.push(i);  // make sure we restore previous state
          return console.log("stack empty");
        }
        var j = parseInt(stack.pop());
        stack.push(i*j);
        break;

      // pops two values, divides 2nd from 1st multiplies them. pushes result into stack
      case '/':
        if (_.isEmpty(stack)) {
          return console.log("stack empty");
        }
        var i =parseInt(stack.pop());
        if (_.isEmpty(stack)) {
          stack.push(i);  // make sure we restore previous state
          return console.log("stack empty");
        }
        var j =parseInt(stack.pop());
        var res = j / i;
        stack.push(res);
        break;

      default:
        var neg = false;
        if (array[command].charAt(0) == "_") {
          neg = true;
          array[command] = array[command].split('_')[1];
        }

        if (!isNaN(parseInt(array[command]))) {
          if (neg) {
            stack.push(-1 * array[command]);
          } else {
            stack.push(array[command]);
          }
        } else {
          console.log("unimplemented");
        }
        break;
    }
  }

  // Consecutive prompt for User Input
  read.prompt();

}).on('close', function() {
  // Exit
  process.exit(0);
});