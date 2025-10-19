function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;     
}

function multiply(a, b) {
  return a * b; 
}

function divide(a, b) {
  if (b === 0) {
    return "Error: cannot divide by zero";
  }
  return a / b; 
}

let firstNumber = null; 
let secondNumber = null; 
let currentOperator = null; 

function operate(operator, a, b)  {
  a = Number(a);
  b = Number(b);
  
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      return null; 
  }
}

console.log(operate('+', 3, 5)); // 8
console.log(operate('*', 4, 2)); // 8

const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
let displayValue = "";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if ((value >= '0' && value <= '9') || value === '.') {
      displayValue += value;
      display.textContent = displayValue; 
    }
  });
});