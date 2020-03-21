import React from 'react';
import { useState } from 'react';
import '../App.scss';
import History from './History';
import {
  calculatorButtons,
  actionDenied,
} from './helpers'

// button component
const Button = ({ id, handleClick, value }) => (
  <button className="button" id={id} onClick={() => handleClick(value)}>
    {value}
  </button>
);

const CalcV11 = () => {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState([]);
  const [hasError, setError] = useState(false);

  const triggerError = () => {
    setError(true)

    setTimeout(() => {
      setError(false)
    }, 500)
  }

  const handleClick = button => {
    // console.log('display: ', display)
    // console.log('button: ', button)

    // reset display
    if(button === "C") {
      setDisplay('0')

      return
    }

    if(actionDenied(display, button)){
      triggerError()

      return
    }

    // if display === 0 then overwrite
    if(display === '0'){
      setDisplay(button)

      return
    }

    if(button === "="){
      const result = eval(display)

      history.push(display + ' = ' + result)
      setHistory(history)
      setDisplay('0')

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
          {calculatorButtons.map(d => (
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

export default CalcV11;
