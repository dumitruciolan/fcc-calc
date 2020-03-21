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

export const actionDenied = (display, button) => {
  const lastChar = display.slice(display.length-1)

  console.log('lastChar', lastChar);
  console.log('button', button);
  // lastChar & button in operators array return true
  if (
    operators.indexOf(lastChar) > -1 &&
    operators.indexOf(button) > -1
  ) return true

  if (display === '0' && operators.indexOf(button) > -1) return true

  if (display === '0' && button === '=') return true

  return false
}
