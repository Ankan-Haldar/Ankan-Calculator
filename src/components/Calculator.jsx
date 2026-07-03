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

  const handleClick = (btn) => {
    if (btn === "AC") {
      setInput("");
      return;
    }

    if (btn === "C") {
      setInput(input.slice(0, -1));
      return;
    }

    if (btn === "=") {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput("Error");
      }
      return;
    }

    setInput(input + btn);
  };

  return (
    <div className={`calculator ${theme}`}>
      <div className="top-bar">
        <h3>Calculator</h3>

        <button
          className="theme-btn"
          onClick={() =>
            setTheme(theme === "light" ? "dark" : "light")
          }
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </div>

      <div className="display">
        <div className="result">
          {input || "0"}
        </div>
      </div>

      <div className="buttons">
        {buttons.map((btn) => (
          <button
            key={btn}
            className={
              ["+", "-", "*", "/", "="].includes(btn)
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