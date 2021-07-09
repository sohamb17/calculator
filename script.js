function add(a, b) {
    return Math.round((a + b) * 1000000) / 1000000;
}

function subtract(a, b) {
    return Math.round((a - b) * 1000000) / 1000000;
}

function multiply(a, b) {
    return Math.round((a * b) * 1000000) / 1000000;
}

function divide(a, b) {
    if(b === 0) {
        display.setAttribute('style', 'text-align: center');
        operators.forEach(operator => operator.disabled = true);
        operatorsDisabled = true;
        return 'Syntax Error';
    }
    return Math.round((a / b) * 1000000) / 1000000;
}

function operate(a, operator, b) {
    if(operator === '+') {
        return add(a, b);
    } else if(operator === '-') {
        return subtract(a, b);
    } else if(operator === '*') {
        return multiply(a, b);
    } else if(operator === '/') {
        return divide(a, b);
    }
}

const buttonsContainer = document.querySelector('#buttons-container');
const buttons = buttonsContainer.querySelectorAll('button');
const display = document.querySelector('#display');
const decimal = document.querySelector('#decimal');
const operators = document.querySelectorAll('.operator')

let firstOperand = '';
let operator = '';
let secondOperand = '';
let operatorsDisabled = true;

operators.forEach(operator => {
    if(!firstOperand) {
        operator.disabled = true;
    }
    operatorsDisabled = true;
});

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if(button.textContent !== '=') {
            operators.forEach(operator => operator.disabled = false);
            operatorsDisabled = false;
        }
        if(display.value === 'Syntax Error') {
            display.value = '';
            firstOperand = '';
            display.setAttribute('style', 'text-align: end');
        }
        if(button.textContent !== 'C') {
            if(button.textContent === 'X') {
                display.value = display.value.substring(0, display.value.length - 1);
                if(!operator) {
                    if(firstOperand[firstOperand.length - 1] === '.') {
                        decimal.disabled = false;
                    }
                    firstOperand = firstOperand.substring(0, firstOperand.length - 1);
                } else if(operator === '=') {
                    if(`${firstOperand}`[`${firstOperand}`.length - 1] === '.') {
                        decimal.disabled = false;
                    }
                    firstOperand = `${firstOperand}`.substring(0, `${firstOperand}`.length - 1);
                    operator = '';
                } else if(!secondOperand) {
                    operator = ''
                } else {
                    if(secondOperand[secondOperand.length - 1] === '.') {
                        decimal.disabled = false;
                    }
                    secondOperand = secondOperand.substring(0, secondOperand.length - 1);
                }
                operators.forEach(operator => {
                    if(!firstOperand) {
                        operator.disabled = true;
                    }
                    operatorsDisabled = true;
                });
            } else {
                if(button.textContent !== '=' && button.textContent !== '.') {
                    display.value += button.textContent;
                }
                if((button.textContent >= 0 && button.textContent <= 9) || button.textContent === '.') {
                    if(button.textContent === '.') {
                        button.disabled = true;
                        if(!operator || secondOperand) {
                            display.value += '.';
                        }
                    }
                    if(!operator) {
                        if(!firstOperand && button.textContent === '.') {
                            firstOperand = '0';
                            display.value = '0.';
                        }
                        firstOperand += button.textContent;
                    } else if(operator === '=') {
                        if(button.textContent === '.') {
                            firstOperand = '0.';
                            display.value = '0.';
                        } else {
                            firstOperand = button.textContent;
                            display.value = button.textContent;
                        }
                        operator = '';
                    } else {
                        if(!secondOperand && button.textContent === '.') {
                            secondOperand = '0';
                            display.value += '0.';
                        }
                        secondOperand += button.textContent;
                        operators.forEach(operator => operator.disabled = false);
                        operatorsDisabled = false;
                    }
                } else {
                    decimal.disabled = false;
                    if(button.textContent === '+' || button.textContent === '-' || button.textContent === '*' || button.textContent === '/') {
                        if(!secondOperand) {
                            operator = button.textContent;
                            operators.forEach(operator => operator.disabled = true);
                            operatorsDisabled = true;
                        } else {
                            display.value = operate(parseFloat(firstOperand), operator, parseFloat(secondOperand));
                            display.value += button.textContent;
                            firstOperand = operate(parseFloat(firstOperand), operator, parseFloat(secondOperand));
                            operator = button.textContent;
                            operators.forEach(operator => operator.disabled = true);
                            operatorsDisabled = true;
                            secondOperand = '';
                        }
                    } else if(button.textContent === '=' && firstOperand && secondOperand) {
                        display.value = operate(parseFloat(firstOperand), operator, parseFloat(secondOperand));
                        firstOperand = operate(parseFloat(firstOperand), operator, parseFloat(secondOperand));
                        operator = '=';
                        secondOperand = '';
                    } else if(button.textContent === '=' && firstOperand && operator){
                        display.value = 'Syntax Error';
                        display.setAttribute('style', 'text-align: center;');
                        firstOperand = '';
                        operator = '';
                        operators.forEach(operator => operator.disabled = true);
                        operatorsDisabled = true;
                        secondOperand = '';
                        
                    }
                }
            }
        } else {
            display.value = '';
            firstOperand = '';
            operator = '';
            secondOperand = '';
            decimal.disabled = false;
            operators.forEach(operator => operator.disabled = true);
            operatorsDisabled = true;
        }
    });
});

display.addEventListener('keydown', (e) => {
   /* if(e.key === '=' || e.key === 'Enter' || e.key === 'C' || e.key === 'X' || e.key === 'Backspace' || (e.key === '.' && decimal.disabled) || ((e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') && operatorsDisabled)) {
       e.preventDefault();
   } */
   if(!((e.key >= '0' && e.key <= '9') || ((e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') && !operatorsDisabled)/*  || (e.key === '.' && !decimal.disabled) */)) {
       e.preventDefault();
   }
});

display.addEventListener('keydown', (e) => {
    if((e.key >= '0' && e.key <= '9') || e.key === '=' || e.key === 'Enter' || e.key === 'C' || e.key === 'X' || e.key === 'Backspace' || e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' || e.key === '.') {
        if(firstOperand || !(e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')) {
            if(e.key !== '=' && e.key !== 'Enter') {
                operators.forEach(operator => operator.disabled = false);
                operatorsDisabled = false;
            }
            if(display.value === 'Syntax Error') {
                display.value = '';
                firstOperand = '';
                display.setAttribute('style', 'text-align: end');
            }
            if(e.key !== 'C') {
                if(e.key === 'X' || e.key === 'Backspace') {
                    display.value = display.value.substring(0, display.value.length - 1);
                    if(!operator) {
                        if(firstOperand[firstOperand.length - 1] === '.') {
                            decimal.disabled = false;
                        }
                        firstOperand = firstOperand.substring(0, firstOperand.length - 1);
                    } else if(operator === '=') {
                        if(`${firstOperand}`[`${firstOperand}`.length - 1] === '.') {
                            decimal.disabled = false;
                        }
                        firstOperand = `${firstOperand}`.substring(0, `${firstOperand}`.length - 1);
                        operator = '';
                    } else if(!secondOperand) {
                        operator = ''
                    } else {
                        if(secondOperand[secondOperand.length - 1] === '.') {
                            decimal.disabled = false;
                        }
                        secondOperand = secondOperand.substring(0, secondOperand.length - 1);
                    }
                    operators.forEach(operator => {
                        if(!firstOperand) {
                            operator.disabled = true;
                        }
                        operatorsDisabled = true;
                    });
                } else {
                    if((e.key >= '0' && e.key <= '9') || e.key === '.') {
                        if(e.key === '.' && !decimal.disabled) {
                            decimal.disabled = true;
                            if(!operator) {
                                if(!firstOperand) {
                                    firstOperand = '0';
                                    display.value = '0';
                                }
                                firstOperand += e.key;
                                display.value += e.key;
                            } else {
                                if(!secondOperand) {
                                    secondOperand = '0';
                                    display.value += '0';
                                }
                                secondOperand += e.key;
                                display.value += e.key;
                                operators.forEach(operator => operator.disabled = false);
                                operatorsDisabled = false;
                            }
                        }
                        if(!decimal.disabled || e.key !== '.') {
                            if(!operator) {
                                firstOperand += e.key;
                            } else if(operator === '=') {
                                display.value = '';
                                firstOperand = e.key;
                                operator = '';
                            } else {
                                secondOperand += e.key;
                                operators.forEach(operator => operator.disabled = false);
                                operatorsDisabled = false;
                            }
                        }
                    } else {
                        decimal.disabled = false;
                        if((e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') && !operatorsDisabled) {
                            if(!secondOperand) {
                                operator = e.key;
                                operators.forEach(operator => operator.disabled = true);
                                operatorsDisabled = true;
                            } else {
                                display.value = operate(parseFloat(firstOperand), operator, parseFloat(secondOperand));
                                firstOperand = operate(parseFloat(firstOperand), operator, parseFloat(secondOperand));
                                operator = e.key;
                                operators.forEach(operator => operator.disabled = true);
                                operatorsDisabled = true;
                                secondOperand = '';
                            }
                        } else if((e.key === '=' || e.key === 'Enter') && firstOperand && secondOperand) {
                            display.value = operate(parseFloat(firstOperand), operator, parseFloat(secondOperand));
                            firstOperand = operate(parseFloat(firstOperand), operator, parseFloat(secondOperand));
                            operator = '=';
                            secondOperand = '';
                        } else if((e.key === '=' || e.key === 'Enter') && firstOperand && operator){
                            display.value = 'Syntax Error';
                            display.setAttribute('style', 'text-align: center;');
                            firstOperand = '';
                            operator = '';
                            operators.forEach(operator => operator.disabled = true);
                            operatorsDisabled = true;
                            secondOperand = '';
                        }
                    }
                }
            } else {
                display.value = '';
                firstOperand = '';
                operator = '';
                secondOperand = '';
                decimal.disabled = false;
                operators.forEach(operator => operator.disabled = true);
                operatorsDisabled = true;
            }
        }
    }
});