let firstOperand = "";
let secondOperand = "";
let currentOperand = null;
let resetAll = false;

const scrn = document.querySelector(".calculator-screen");
const numberBtns = document.querySelectorAll("[data-number]");
const operatorBtns = document.querySelectorAll("[data-operator]");
const equalsBtn = document.querySelector(".equal-sign");
const clearScrn = document.querySelector(".all-clear");

window.addEventListener("keydown", handleKeyboardInput);
equalsBtn.addEventListener("click", evaluate);
clearScrn.addEventListener("click", clear);

numberBtns.forEach((button) => {
  button.addEventListener("click", () => appendNum(button.value));
});
operatorBtns.forEach((button) => {
  button.addEventListener("click", () => setOperation(button.value));
});

function appendNum(number) {
  if (scrn.value === "0" || resetAll) {
    scrn.value = number;
    resetAll = false;
  } else {
    scrn.value += number;
  }
}

function clear() {
  scrn.value = "0";
  firstOperand = "";
  secondOperand = "";
  currentOperand = null;
  resetAll = false;
}

function setOperation(operator) {
  if (currentOperand !== null) evaluate();
  firstOperand = scrn.value;
  currentOperand = operator;
  resetAll = true;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNum(e.key);
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "Escape" || e.key === "Backspace") clear();
  if (["+", "-", "*", "/"].includes(e.key)) setOperation(e.key);
}

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
  return a / b;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      if (b === 0) {
        alert("You can't divide by 0!");
        return null;
      }
      return divide(a, b);
    default:
      return null;
  }
}
function evaluate() {
  if (currentOperand === null || resetAll) return;
  secondOperand = scrn.value;
  scrn.value = roundResult(operate(currentOperand, firstOperand, secondOperand));
  currentOperand = null;
  resetAll = true;
}