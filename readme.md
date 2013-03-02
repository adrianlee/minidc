Minidc ‐ Modelled aftertheUNIX command line tool “dc”

A reverse‐polish calculatorstores numbers on a stack. Entering a number
pushesit on the stack. Arithmetic operations pop arguments offthe stack
and push the results.

## Usage
`$ node minidc`

## Run Test
`$ mocha --reporter spec`

## Commands
Command | Description
--- | ---
P | Prints the value on the top of the stack, without altering the stack.
n | Prints the value on the top of the stack, popping it off.
f | Prints the entire contents of the stack without altering anything.
+ | Pops two values off the stack, adds them, and pushes the result.
‐ | Pops two values off the stack, subtractst he first one popped from the second one popped, and pushes the result.
* | Pops two values, multiplies them, and pushes the result.
/ | Pops two values, divides the second one popped from the first one popped, and pushes the result.

