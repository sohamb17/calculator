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
let firstOperand = '';
let operator = '';
let secondOperand = '';
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if(display.value === 'Syntax Error') {
            display.value = '';
            display.setAttribute('style', 'text-align: end');
        }
        if(button.textContent !== 'C') {
            if(button.textContent !== '=') {
                display.value += button.textContent;
            }
            if((button.textContent >=0 && button.textContent <= 9) || button.textContent === '.') {
                if(button.textContent === '.') {
                    button.disabled = true;
                }
                if(!operator) {
                    firstOperand += button.textContent;
                } else if(operator === '=') {
                    display.value = button.textContent;
                    firstOperand = button.textContent;
                    operator = '';
                } else {
                    secondOperand += button.textContent;
                }
            } else {
                decimal.disabled = false;
                if(button.textContent === '+' || button.textContent === '-' || button.textContent === '*' || button.textContent === '/') {
                    if(!secondOperand) {
                        operator = button.textContent;
                    } else {
                        display.value = operate(parseFloat(firstOperand), operator, parseFloat(secondOperand));
                        display.value += button.textContent;
                        firstOperand = operate(parseFloat(firstOperand), operator, parseFloat(secondOperand));
                        operator = button.textContent;
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
                    secondOperand = '';
                }
            }
        } else {
            display.value = '';
            firstOperand = '';
            operator = '';
            secondOperand = '';
            decimal.disabled = false;
        }
    });
});
