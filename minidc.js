var readline = require('readline');
var _ = require('lodash');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports = rl;

// rl.setPrompt('dc > ');
rl.prompt();

var stack = [];

rl.on('line', function(line) {
  var array = line.trim().split(' ');
  for (var command in array) {
    switch(array[command]) {
      // prints value of top element on stack. no alternation
      case 'p':
        if (_.isEmpty(stack)) {
          return console.log("stack empty")
        }
        console.log(stack[stack.length-1]);
        break;
      // pops top element and prints
      case 'n':
        if (_.isEmpty(stack)) {
          return console.log("stack empty")
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
        var i = parseInt(stack.pop()) + parseInt(stack.pop());
        stack.push(i);
        break;

      // pops two values and subtracts them. pushes result into stack
      case '-':
        var i =parseInt(stack.pop());
        var j =parseInt(stack.pop());
        var res = j -i;
        stack.push(res);
        break;

      // pops two values and multiplies them. pushes result into stack
      case '*':
        var i = parseInt(stack.pop()) * parseInt(stack.pop());
        stack.push(i);
        break;

      // pops two values and multiplies them. pushes result into stack
      case '*':
        var i = parseInt(stack.pop()) * parseInt(stack.pop());
        stack.push(i);
        break;

      // pops two values, divides 2nd from 1st multiplies them. pushes result into stack
      case '/':
        var i =parseInt(stack.pop());
        var j =parseInt(stack.pop());
        var res = j / i;
        stack.push(res);
        break;

      case 'exit':
        process.exit(0);
        break;

      default:
        if (!isNaN(parseInt(line.trim()))) {
          stack.push(line.trim())
        } else {
          console.log("unimplemented");
        }
        break;
    }
  }
  rl.prompt();
}).on('close', function() {
  console.log('Have a great day!');
  process.exit(0);
});