const display = document.getElementById("display");
const codeToggle = document.getElementById("codeModeToggle");

let expression = "";
let codeEntry = "";

function updateDisplay() {
  display.value = codeToggle.checked ? (codeEntry || "0") : (expression || "0");
}

function clearAll() {
  expression = "";
  codeEntry = "";
  updateDisplay();
}

function openGames() {
  window.location.href = "games.html";
}

function safeEvaluate(input) {
  const allowed = /^[0-9+\-*/(). MathPIE]*$/;
  if (!allowed.test(input)) throw new Error("Invalid characters");
  return Function('"use strict"; return (' + input + ')')();
}

function trimDecimal(value) {
  if (!Number.isFinite(value)) return "Error";
  return Number(value.toFixed(12)).toString();
}

function simplifySqrt(n) {
  if (!Number.isFinite(n) || n < 0) return "Invalid";

  const decimal = Math.sqrt(n);

  if (Number.isInteger(decimal)) {
    return decimal.toString();
  }

  if (!Number.isInteger(n)) {
    return "√(" + n + ") ≈ " + trimDecimal(decimal);
  }

  let largestSquare = 1;

  for (let i = 2; i * i <= n; i++) {
    const square = i * i;
    if (n % square === 0) largestSquare = square;
  }

  const outside = Math.sqrt(largestSquare);
  const inside = n / largestSquare;

  if (outside === 1) {
    return "√" + inside + " ≈ " + trimDecimal(decimal);
  }

  return outside + "√" + inside + " ≈ " + trimDecimal(decimal);
}

function addValue(value) {
  if (codeToggle.checked) {
    if (!/^[0-9]$/.test(value)) return;

    codeEntry += value;
    updateDisplay();

    if (codeEntry === "0000") {
      setTimeout(openGames, 120);
    }

    if (codeEntry.length >= 4 && codeEntry !== "0000") {
      setTimeout(() => {
        codeEntry = "";
        updateDisplay();
      }, 250);
    }

    return;
  }

  expression += value;
  updateDisplay();
}

function addFunction(fn) {
  if (fn === "sqrt") {
    if (expression && !expression.includes("√")) {
      expression = "√(" + expression + ")";
    } else {
      expression += "√";
    }
    updateDisplay();
    return;
  }

  const map = {
    sin: "Math.sin((Math.PI/180)*",
    cos: "Math.cos((Math.PI/180)*",
    tan: "Math.tan((Math.PI/180)*",
    log: "Math.log10(",
    ln: "Math.log("
  };

  expression += map[fn];
  updateDisplay();
}

function evaluateSqrtExpression() {
  let valueText = null;

  if (expression.startsWith("√(") && expression.endsWith(")")) {
    valueText = expression.slice(2, -1);
  } else if (expression.startsWith("√")) {
    valueText = expression.slice(1);
  } else if (expression.endsWith("√")) {
    valueText = expression.slice(0, -1);
  }

  if (valueText === null || valueText.trim() === "") return false;

  const value = safeEvaluate(valueText);
  expression = simplifySqrt(value);
  updateDisplay();
  return true;
}

function runEquals() {
  if (codeToggle.checked) {
    if (codeEntry === "0000") openGames();
    else clearAll();
    return;
  }

  try {
    if (evaluateSqrtExpression()) return;

    const result = safeEvaluate(expression);
    expression = trimDecimal(result);
    updateDisplay();
  } catch {
    expression = "";
    display.value = "Error";
  }
}

document.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    const action = button.dataset.action;
    const fn = button.dataset.fn;

    try {
      if (value) addValue(value);
      if (fn && !codeToggle.checked) addFunction(fn);
      if (action === "clear") clearAll();

      if (action === "backspace") {
        if (codeToggle.checked) codeEntry = codeEntry.slice(0, -1);
        else expression = expression.slice(0, -1);
        updateDisplay();
      }

      if (action === "square" && !codeToggle.checked) {
        expression = "(" + expression + ")**2";
        updateDisplay();
      }

      if (action === "power" && !codeToggle.checked) {
        expression += "**";
        updateDisplay();
      }

      if (action === "percent" && !codeToggle.checked) {
        expression = "(" + expression + ")/100";
        updateDisplay();
      }

      if (action === "equals") runEquals();
    } catch {
      clearAll();
      display.value = "Error";
    }
  });
});

codeToggle.addEventListener("change", clearAll);

document.addEventListener("keydown", event => {
  const key = event.key;

  if (/^[0-9]$/.test(key)) addValue(key);

  if (!codeToggle.checked && "+-*/().".includes(key)) {
    expression += key;
    updateDisplay();
  }

  if (!codeToggle.checked && (key === "r" || key === "R")) {
    addFunction("sqrt");
  }

  if (key === "Enter") runEquals();

  if (key === "Backspace") {
    if (codeToggle.checked) codeEntry = codeEntry.slice(0, -1);
    else expression = expression.slice(0, -1);
    updateDisplay();
  }

  if (key === "Escape") clearAll();
});
