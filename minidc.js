// var program = require('commander');

// program
//   .version('0.0.1');

// program.parse(process.argv);


// function getInput() {
//   program.prompt('', function (input) {
//     console.log('%s', input);
//     getInput();
//   });
// }

// getInput();


var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("What do you think of node.js? ", function(answer) {
  // TODO: Log the answer in a database
  console.log("Thank you for your valuable feedback:", answer);

  rl.close();
});