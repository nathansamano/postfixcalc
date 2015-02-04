/* Nathan Samano
 * Algorithms
 * Postfix Calculator - Single Digit Integers
 * 1/30/15
 */

load('stack.js');

var equation = readline();
print("This is what I typed: " + equation + equation.length);

// Convert Infix to Postfix
// i.e.  5 + 4  * 3 / 2 - 1 * 2 =>  5 4 3 * 2 / + 1 2 * -
// i.e. 5 + 4 * 3 / (2 - 1) * 2 =>  5 4 3 * 2 1 - / 2 * +
function convert(eq) {
  var stack  = new Stack();
  var pfix = [];

  // traverse equation
  for (var i = 0; i < eq.length; i++) {
    print('Loop # ' + i);
    // 1. print operands as they arrive
    if (eq[i] >= '0' && eq[i] <= '9') {
      pfix = pfix + eq[i];
      print('pfix: ' + pfix);
    } // if
    // 2. if the stack is empty or contains a left paren on top
    // push the incoming operator onto the stack
    else if (stack.length() == 0 || stack.peek() == '(') {
      print('Step 2');
      stack.push(eq[i]);
    } // else if
    // 3. if the incoming symbol is a left paren, push it on that stack
    else if (eq[i] == '(') {
      print('Step 3');
      stack.push(eq[i]);
    } // else if
    // 4. if the incoming symbol is a right paren, pop the stack and
    // print the operators until left paren. Discard the pair of parens
    else if (eq[i] == ')') {
      print('Step 4');
      while (stack.peek() != '(') {
        pfix = pfix + stack.pop();
      } // while
      stack.pop(); // '('
    } // else if
    // 5. if the incoming symbol has higher precedence than the top of 
    // the stack push it on the stack
    else if (precedenceOf(eq[i]) < precedenceOf(stack.peek())) {
      print('Step 5');
      stack.push(eq[i]);
    } // else if
    // 6. if the incoming symbol has equal precedence with the top of the stack,
    // use association. If the association is left to right, pop and print
    // the top of the stack and then push the incoming operator.
    // If the association is right to left, push the incoming operator
    else if (precedenceOf(eq[i]) == precedenceOf(stack.peek())) {
      print('Step 6');
      if (stack.peek() == '-' || stack.peek() == '/' || 
          stack.peek() == '+' || stack.peek() == '*') {
        pfix = pfix + stack.pop();
	stack.push(eq[i]);
      } // if
      else { // this calculator will not use right to left association
        stack.push(eq[i]);
      } // else
    } // else if
    // 7. if the incoming symbol has lower precedence than than the symbol
    // on top of the stack, pop the stack and print the top operator.
    // Then test the incoming operator against the new top of stack.
    else if (precedenceOf(eq[i]) > precedenceOf(stack.peek())) {
      print('Step 7' + 'eq[i]= ' + eq[i]);
      while (stack.length() != 0) {
        pfix = pfix + stack.pop();
      } // while
      i--;
      print('Step 7 End');
    } // else if
  } // for

  // 8. at the end of the expression,
  // pop and print all the operators on the stack
  print('Step 8' + 'stack.length=' + stack.length());
  while (stack.length() != 0) {
    pfix = pfix + stack.pop();
  } // while

print('Postfix Expression: ' + pfix);
print('pfix.length= ' + pfix.length);

return pfix;

} // convert()

// order of operations
var precedenceMap = {
  '*': 1,
  '/': 1,
  '+': 2,
  '-': 2,
};

// find precedence or return 3
function precedenceOf(c) {
  return precedenceMap[c] || 3;
}

print('Answer: ' + calcpfix(convert(equation)));

// Postfix Calculation
function calcpfix(pfix) {
  var stack  = new Stack();
  var answer;

  // traverse pfix
  for (var i = 0; i < pfix.length; i++) {
    // if number push on stack
    if (pfix[i] >= 0 && pfix[i] <= 9) {
      stack.push(pfix[i]);
    } // if
    else { // operation
      var op1 = parseInt(stack.pop()); 
      var op2 = parseInt(stack.pop());
      print('op1=' + op1 + ' op2= ' + op2);
      switch(pfix[i]) {
        case ('+'): answer = op2 + op1;
		    break;
	case ('-'): answer = op2 - op1;
		    break;
	case ('*'): answer = op2 * op1;
		    break;
	case ('/'): answer = op2 / op1;
		    break; 
      } // switch
      print(answer);
      stack.push(answer);
    } // else
  } // for
  return stack.pop();
} // calcpfix

