/* Nathan Samano
 * Algorithms
 * Postfix Calculator
 * 1/30/15
 */

load('stack.js');

var equation = readline();
print("This is what I typed: " + equation + equation.length);

// Convert Infix to Postfix
// i.e. (5 + 4) * 3 / 2 - 1 * 2 =>  5 4 + 3 * 2 / 1 2 * -
function convert(eq) {
  var operands  = new Stack();
  var operators = new Stack();

  // run through each index value of equation
  for (var i = 0; i < eq.length; i++) {
    print('this is arr[i]: ' + eq[i]);
    // if number
    if (eq[i] >= '0' && eq[i] <= '9') {
      print('operand push' + operands.push(eq[i]));
    } // if
    // else if operator
    else if (eq[i] == '+' || eq[i] == '-' ||
	     eq[i] == '*' || eq[i] == '/') {
      print('operator push' + operators.push(eq[i]));
    } // else if
    // else not a number or operator
    else {
      continue;
    } // else
  } // for
  print("operands: " + operands.dataStore);
  print("oerators: " + operators.dataStore);

} // convert()

convert(equation);

// Postfix Calculation



