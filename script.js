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

let firstNumber = "";
let secondNumber = "";
let currentOperator = null; 
let resultdisplayed = false;

function operate(operator, a, b)  {
  a = Number(a);
  b = Number(b);
  
  switch (operator) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: return null; 
  }
}

const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
let displayValue = "";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;
    
    if (button.classList.contains("backspace")) {
  if (displayValue.length > 1) {
    // remove last character
    displayValue = displayValue.slice(0, -1);
  } else {
    // reset to "0" if everything deleted
    displayValue = "0";
  }

  display.textContent = displayValue;
  return;
}

    // Numbers and decimals
    if ((value >= '0' && value <= '9') || value === '.') {
  // prevent multiple decimals
  if (value === '.' && displayValue.includes('.')) return;

  if (resultdisplayed) {
    displayValue = "";
    resultdisplayed = false;
  }

  // Replace "0" instead of appending to it
  if (displayValue === "0" && value !== ".") {
    displayValue = value;
  } else {
    displayValue += value;
  }

  display.textContent = displayValue;
  return;
}

    // Operators
    if (['+', '-', '*', '/'].includes(value)) {
      if (firstNumber && currentOperator && displayValue) {
        secondNumber = displayValue; 
        const result = operate(currentOperator, firstNumber, secondNumber);
        display.textContent = roundResult(result);
        firstNumber = result;
      } else {
        firstNumber = displayValue;
      }
      currentOperator = value; 
      displayValue = "";
      return;
    }

    // Equals
    if (value === '=') {
      if (firstNumber && currentOperator && displayValue) {
        secondNumber = displayValue; 
        const result = operate(currentOperator, firstNumber, secondNumber);
        display.textContent = roundResult(result);
        firstNumber = result;
        displayValue = "";
        currentOperator = null; 
        resultdisplayed = true;
      }
      return;
    }

    // Clear
    if (value.toLowerCase() === 'clear') {
      firstNumber = "";
      secondNumber = "";
      currentOperator = null; 
      displayValue = "";
      display.textContent = '0';
    }
  });
});

function roundResult(num) {
  if (typeof num === "string") {
    return num; // handle divide by zero message 
  }
  return Math.round(num * 1000) / 1000; // round to 3 decimal places 
}