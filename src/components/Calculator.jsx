import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState("light");

  const buttons = [
    "AC",
    "C",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "00",
    "0",
    ".",
    "=",
  ];

  const operators = ["+", "-", "*", "/"];

  const calculateExpression = (expression) => {
    if (!expression) {
      return 0;
    }

    // Allow only calculator-safe characters
    if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
      throw new Error("Invalid expression");
    }

    // Remove operator from the end
    let cleanExpression = expression;

    while (
      operators.includes(
        cleanExpression[cleanExpression.length - 1]
      )
    ) {
      cleanExpression = cleanExpression.slice(0, -1);
    }

    if (!cleanExpression) {
      return 0;
    }

    // Avoid direct eval warning
    const calculate = new Function(
      `"use strict"; return (${cleanExpression})`
    );

    const result = calculate();

    if (!Number.isFinite(result)) {
      throw new Error("Invalid result");
    }

    return Number.isInteger(result)
      ? result
      : parseFloat(result.toFixed(8));
  };

  const handlePercentage = () => {
    if (!input || input === "Error") {
      return;
    }

    try {
      const value = calculateExpression(input);
      const percentage = value / 100;

      setInput(percentage.toString());
    } catch {
      setInput("Error");
    }
  };

  const handleDecimal = () => {
    if (input === "Error") {
      setInput("0.");
      return;
    }

    const parts = input.split(/[+\-*/]/);
    const currentNumber = parts[parts.length - 1];

    if (currentNumber.includes(".")) {
      return;
    }

    if (
      input === "" ||
      operators.includes(input[input.length - 1])
    ) {
      setInput(input + "0.");
    } else {
      setInput(input + ".");
    }
  };

  const handleOperator = (operator) => {
    if (input === "Error") {
      setInput("");
      return;
    }

    if (!input) {
      if (operator === "-") {
        setInput("-");
      }

      return;
    }

    const lastCharacter = input[input.length - 1];

    if (operators.includes(lastCharacter)) {
      setInput(input.slice(0, -1) + operator);
    } else {
      setInput(input + operator);
    }
  };

  const handleClick = (btn) => {
    // Clear everything
    if (btn === "AC") {
      setInput("");
      return;
    }

    // Delete last character
    if (btn === "C") {
      if (input === "Error") {
        setInput("");
      } else {
        setInput(input.slice(0, -1));
      }

      return;
    }

    // Percentage
    if (btn === "%") {
      handlePercentage();
      return;
    }

    // Decimal
    if (btn === ".") {
      handleDecimal();
      return;
    }

    // Operators
    if (operators.includes(btn)) {
      handleOperator(btn);
      return;
    }

    // Calculate result
    if (btn === "=") {
      if (!input || input === "Error") {
        return;
      }

      try {
        const result = calculateExpression(input);
        setInput(result.toString());
      } catch {
        setInput("Error");
      }

      return;
    }

    // Number input after error
    if (input === "Error") {
      setInput(btn);
      return;
    }

    // Add number
    setInput(input + btn);
  };

  return (
    <div className={`calculator ${theme}`}>
      <div className="top-bar">
        <h3>Calculator</h3>

        <button
          className="theme-btn"
          onClick={() =>
            setTheme((currentTheme) =>
              currentTheme === "light"
                ? "dark"
                : "light"
            )
          }
          aria-label="Toggle theme"
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </div>

      <div className="display">
        <div className="result">{input || "0"}</div>
      </div>

      <div className="buttons">
        {buttons.map((btn) => (
          <button
            key={btn}
            className={
              operators.includes(btn) || btn === "="
                ? "operator"
                : ""
            }
            onClick={() => handleClick(btn)}
          >
            {btn === "*" ? "×" : btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;