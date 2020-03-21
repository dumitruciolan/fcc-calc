import React from 'react';
import '../App.scss';

// buttons and operators details
const data = [
  { id: "add", value: "+" },
  { id: "subtract", value: "-" },
  { id: "clear", value: "C" },
  { id: "multiply", value: "*" },
  { id: "divide", value: "/" },
  { id: "zero", value: "0" },
  { id: "one", value: "1" },
  { id: "two", value: "2" },
  { id: "three", value: "3" },
  { id: "four", value: "4" },
  { id: "five", value: "5" },
  { id: "six", value: "6" },
  { id: "seven", value: "7" },
  { id: "eight", value: "8" },
  { id: "nine", value: "9" },
  { id: "equals", value: "=" },
  { id: "decimal", value: "." }
];

// button component
const Button = ({ id, handleClick, value }) => (
  <button className="button" id={id} onClick={() => handleClick(value)}>
    {value}
  </button>
);

const History = ({ data, clearHistory }) => (
  <div>
    <div id="history">{data}</div>
    {/* clear history button */}
    <button
      className="btn btn-outline-danger"
      onClick={clearHistory}
    >
      Clear History
    </button>
  </div>
)

// main component
class CalcV11 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      currentNumber: "0",
      hasOperator: false, // to check for multiple operators
      hasDecimal: false, // to check for multiple decimal points
      isNegative: false // to check if the number is negative
    };
  }

  handleClick = buttonName => {
    let { currentNumber, hasOperator, isNegative, history } = this.state;

    switch (true) {
      //handle the numbers
      case buttonName === "0" ||
        buttonName === "1" ||
        buttonName === "2" ||
        buttonName === "3" ||
        buttonName === "4" ||
        buttonName === "5" ||
        buttonName === "6" ||
        buttonName === "7" ||
        buttonName === "8" ||
        buttonName === "9":
        // replace the zero if another number is typed
        if (this.state.currentNumber !== "0") {
          currentNumber += buttonName;
          // adding multiple operators
          hasOperator = false;
        } else {
          currentNumber = buttonName;
        }
        break;
      // handle the operators
      case buttonName === "+" ||
        buttonName === "-" ||
        buttonName === "*" ||
        buttonName === "/":
        // check if an operator is already at the end
        if (!hasOperator) {
          currentNumber += buttonName;
          hasOperator = true;
          this.setState({ hasDecimal: false });
        } else {
          // handling the multiple operators
          let lastNumber = currentNumber.slice(currentNumber.length - 1);
          if (
            buttonName === "-" &&
            !isNegative &&
            lastNumber !== "-" &&
            lastNumber !==
              currentNumber.slice(
                currentNumber.length - 2,
                currentNumber.length - 1
              ) &&
            lastNumber !==
              currentNumber.slice(
                currentNumber.length - 3,
                currentNumber.length - 2
              ) &&
            lastNumber !==
              currentNumber.slice(
                currentNumber.length - 4,
                currentNumber.length - 3
              ) &&
            lastNumber !==
              currentNumber.slice(
                currentNumber.length - 5,
                currentNumber.length - 4
              )
          ) {
            currentNumber += buttonName;
            isNegative = true;
          } else {
            const newNumber = currentNumber.slice(0, currentNumber.length - 1);
            currentNumber = newNumber;
            currentNumber += buttonName;
            isNegative = false;
          }
        }
        break;
      // handle clear button
      case buttonName === "C":
        currentNumber = "0";
        hasOperator = false;
        this.setState({ hasDecimal: false });
        break;
      // handle equals button (evaluates the stored string)
      case buttonName === "=":
        let calculation = currentNumber;
        currentNumber = eval(currentNumber);
        hasOperator = false;
        // avoid duplicates and append the elements to history
        if (currentNumber !== calculation) {
          history += `${calculation} = ${currentNumber} ${"\n"}`;
        }
        this.setState({ hasDecimal: true });
        break;
      //handle decimal button
      case buttonName === ".":
        if (!this.state.hasDecimal) {
          currentNumber += ".";
          this.setState({ hasDecimal: true });
        }
    }
    this.setState({ hasOperator, currentNumber, isNegative, history });
  };

  render() {
    return (
      <div id="container">
        <h3>v1.1</h3>
        <span>
          <div id="calculator">
            {/* screen display component */}
            <div id="display">{this.state.currentNumber}</div>
            {/* buttons mapping from data array */}
            {data.map(d => (
              <Button
                id={d.id}
                value={d.value}
                handleClick={this.handleClick}
              />
            ))}
          </div>
        </span>
        {/* history pane */}
        <span>
          <p>Thanks for using me! Your past results:</p>
          <History
            data={this.state.history}
            clearHistory={() => this.setState({ history: "" })}
          />
          
        </span>
      </div>
    );
  }
}

export default CalcV11;
