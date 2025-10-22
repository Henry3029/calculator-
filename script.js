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
let resultDisplayed = false;  

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
let displayValue = "0";  

buttons.forEach(button => {  
  button.addEventListener("click", () => handleInput(button));  
});  

function handleInput(button) {  
  const value = button.textContent;  

  // ----- Backspace -----
  if (button.classList.contains("backspace")) {  
    if (displayValue.length > 1) {  
      displayValue = displayValue.slice(0, -1);  
    } else {  
      displayValue = "0";  
    }  
    display.textContent = displayValue;  
    return;  
  }  

  // ----- Numbers & Decimals -----
  if ((value >= '0' && value <= '9') || value === '.') {  
    if (value === '.' && displayValue.includes('.')) return;  

    if (resultDisplayed) {  
      displayValue = "";  
      resultDisplayed = false;  
    }  

    if (displayValue === "0" && value !== ".") {  
      displayValue = value;  
    } else {  
      displayValue += value;  
    }  

    display.textContent = displayValue;  
    return;  
  }  

  // ----- Operators -----
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

  // ----- Equals -----
  if (value === '=') {  
    if (firstNumber && currentOperator && displayValue) {  
      secondNumber = displayValue;   
      const result = operate(currentOperator, firstNumber, secondNumber);  
      display.textContent = roundResult(result);  
      firstNumber = result;  
      displayValue = "";  
      currentOperator = null;   
      resultDisplayed = true;  
    }  
    return;  
  }  

  // ----- Clear -----
  if (value.toLowerCase() === 'clear') {  
    firstNumber = "";  
    secondNumber = "";  
    currentOperator = null;   
    displayValue = "0";  
    display.textContent = '0';  
  }  
}  

function roundResult(num) {  
  if (typeof num === "string") return num;  
  return Math.round(num * 1000) / 1000;  
}  

// ----- Keyboard Support -----
document.addEventListener("keydown", (event) => {  
  const key = event.key;  

  // Numbers & Decimals  
  if ((key >= "0" && key <= "9") || key === ".") {  
    handleInput({ textContent: key });  
    return;  
  }  

  // Operators  
  if (['+', '-', '*', '/'].includes(key)) {  
    handleInput({ textContent: key });  
    return;  
  }  

  // Equals (Enter or =)  
  if (key === '=' || key === 'Enter') {  
    handleInput({ textContent: '=' });  
    return;  
  }  

  // Clear (Escape or C)  
  if (key === 'Escape' || key.toLowerCase() === 'c') {  
    handleInput({ textContent: 'clear' });  
    return;  
  }  

  // Backspace  
  if (key === 'Backspace') {  
    handleInput({ textContent: '‹', classList: { contains: (cls) => cls === "backspace" } });  
  }  
});