import React from 'react';
import { useState } from 'react';
import '../App.scss';
import History from './History';
import {
  calculatorButtons,
  actionDenied,
  resetStack,
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
  const [stack, setStack] = useState([]);
  const [tempStack, setTempStack] = useState('');

  const triggerError = () => {
    setError(true)

    setTimeout(() => {
      setError(false)
    }, 500)
  }

  const handleClick = button => {
    const lastChar = display.slice(display.length-1)

    // reset display
    if(button === "C") {
      setDisplay('0')
      setTempStack('')
      setStack([])

      return
    }

    if(resetStack(lastChar, button)){
      stack.push(tempStack)
      setStack(stack)

      setTempStack('')
    }

    // check for illegal actions
    if(actionDenied(display, button)){
      triggerError()

      return
    }
    // if display === 0 then overwrite
    if(display === '0'){
      setDisplay(button)
      setTempStack(tempStack + button)

      return
    }

    if(button === "="){
      const result = eval(display)
      history.push(display + ' = ' + result)
      setHistory(history)
      setDisplay('0')
      setTempStack('')
      return
    }

    setTempStack(tempStack + button)
    setDisplay(display + button)
  }

  return(
    <div id="container">
      <h3>v1.1</h3>
      <span>
        tempStack: { tempStack } <br />
        stack length: { stack.length }
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
