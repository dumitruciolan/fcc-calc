import React from 'react';
import { useState } from 'react';
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
    <div id="history">
      {data && data.map(calculation => (
        <>
          {calculation}<br />
        </>
      ))}
    </div>
    {/* clear history button */}
    <button
      className="btn btn-outline-danger"
      onClick={clearHistory}
    >
      Clear History
    </button>
  </div>
)

const CalcV11 = () => {
  const [display, setDisplay] = useState('v1.1');
  const [history, setHistory] = useState([]);
  const [hasError, setError] = useState(false);

  const triggerError = () => {
    setError(true)

    setTimeout(() => {
      setError(false)
    }, 500)
  }
  const handleClick = button => {
    console.log(button)

    // reset display
    if(button === "C") {
      setDisplay("0")

      return
    }

    // if display === 0 then overwrite
    if(display === "0"){
      setDisplay(button)

      return
    }

    if(button === "4"){
      triggerError()

      return
    }

    setDisplay(display + button)
  }

  return(
    <div id="container">
      <h3>v1.1</h3>
      <span>
        <div id="calculator">
          {/* screen display component */}
          { /* <div id="display" style={{ backgroundColor: 'red' }}>{display}</div> */ }
          <div id="display" class={hasError ? 'error': ''}>{display}</div>
          {/* buttons mapping from data array */}
          {data.map(d => (
            <Button
              id={d.id}
              value={d.value}
              handleClick={handleClick}
            />
          ))}
        </div>
      </span>
      {/* history pane */}
      <span>
        <p>Thanks for using me! Your past results:</p>
        <History
          data={history}
          clearHistory={() => setHistory()}
        />
      </span>
    </div>
  )
}
// main component
class CalcV111 extends React.Component {
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

  //
  isDigit = ( button ) => {
    if(
      button ===  "0" ||
      button === "1" ||
      button === "2" ||
      button === "3" ||
      button === "4" ||
      button === "5" ||
      button === "6" ||
      button === "7" ||
      button === "8" ||
      button === "9"
    ) return true;

    return false;
  }

  handleClick = button => {
    let { currentNumber, hasOperator, isNegative, history } = this.state;

    switch (true) {
      //handle the numbers
      case this.isDigit(button):
        // replace the zero if another number is typed
        if (this.state.currentNumber !== "0") {
          currentNumber += button;
          // adding multiple operators
          hasOperator = false;
        } else {
          currentNumber = button;
        }
        break;
      // handle the operators
      case button === "+" ||
        button === "-" ||
        button === "*" ||
        button === "/":
        // check if an operator is already at the end
        if (!hasOperator) {
          currentNumber += button;
          hasOperator = true;
          this.setState({ hasDecimal: false });
        } else {
          // handling the multiple operators
          let lastNumber = currentNumber.slice(currentNumber.length - 1);
          if (
            button === "-" &&
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
            currentNumber += button;
            isNegative = true;
          } else {
            const newNumber = currentNumber.slice(0, currentNumber.length - 1);
            currentNumber = newNumber;
            currentNumber += button;
            isNegative = false;
          }
        }
        break;
      // handle clear button
      case button === "C":
        currentNumber = "0";
        hasOperator = false;
        this.setState({ hasDecimal: false });
        break;
      // handle equals button (evaluates the stored string)
      case button === "=":
        let calculation = currentNumber;
        currentNumber = eval(currentNumber);
        hasOperator = false;
        // avoid duplicates and append the elements to history
        if (currentNumber !== calculation) {
          history.push([`${calculation} = ${currentNumber}`]);
        }
        this.setState({ hasDecimal: true });
        break;
      //handle decimal button
      case button === ".":
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
