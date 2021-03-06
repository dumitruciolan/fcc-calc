// buttons and operators details
export const calculatorButtons = [
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

const operators = ['+', '-', '/', '*']

const decimalDenied = (lastChar) => {
  if (lastChar === '.') {
    return true
  }
  return false
}

export const resetStack = (lastChar, button) => {
  if (
    lastChar == parseInt(lastChar) &&
    operators.indexOf(button) > -1
  ){
    // console.log('reset stack');
    return true
  }

  return false
}

export const actionDenied = (display, button) => {
  const lastChar = display.slice(display.length-1)

  // lastChar & button in operators array return true
  if (
    operators.indexOf(lastChar) > -1 &&
    operators.indexOf(button) > -1
  ) return true

  if(display === '0' && operators.indexOf(button) > -1) return true

  if(display === '0' && button === '=') return true

  if(button === '.' && decimalDenied(lastChar)) return true

  return false
}
