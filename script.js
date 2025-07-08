let input = document.getElementById("inputBox");
let buttons = document.querySelectorAll("button");

let evalString = "";
let displayString = "";

function formatIndianNumber(numStr) {
  const parts = numStr.split(".");
  let intPart = parts[0];
  let decPart = parts.length > 1 ? "." + parts[1] : "";

  let last3 = intPart.slice(-3);
  let other = intPart.slice(0, -3);
  if (other !== "") {
    last3 = "," + last3;
  }

  let formatted = other.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + last3 + decPart;
  return formatted;
}

function updateDisplay() {
  let formattedDisplay = displayString.replace(/\d+(\.\d+)?/g, (match) => {
    return formatIndianNumber(match);
  });
  input.value = formattedDisplay;
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const btnText = e.target.innerHTML;
    handleInput(btnText);
  });
});

function handleInput(btnText) {
  if (btnText === "=") {
    try {
      const result = eval(evalString);
      evalString = result.toString();
      displayString = evalString.replace(/\*/g, "x");
      updateDisplay();
    } catch (error) {
      input.value = "Error";
      evalString = "";
      displayString = "";
    }
  } else if (btnText === "AC") {
    evalString = "";
    displayString = "";
    input.value = "";
  } else if (btnText === "DEL") {
    evalString = evalString.slice(0, -1);
    displayString = displayString.slice(0, -1);
    updateDisplay();
  } else {
    if (btnText === "x") {
      evalString += "*";
      displayString += "x";
    } else {
      evalString += btnText;
      displayString += btnText;
    }
    updateDisplay();
  }
}

document.addEventListener("keydown", (e) => {
  if (e.repeat) return;

  const key = e.key;

  if (key === "Enter") {
    e.preventDefault();
    handleInput("=");
  } else if (key === "Backspace") {
    handleInput("DEL");
  } else if (key === "Delete") {
    handleInput("AC");
  } else if (key === "*") {
    handleInput("x");
  } else if (
    [
      "+",
      "-",
      "/",
      "%",
      ".",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ].includes(key)
  ) {
    handleInput(key);
  }
});
