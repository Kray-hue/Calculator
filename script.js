const display = document.getElementById("display");
const history = document.getElementById("history");
const clear = document.getElementById("clear");
const percent = document.getElementById("percent");
const divide = document.getElementById("divide");
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");
const multiply = document.getElementById("multiply");
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");
const subtract = document.getElementById("subtract");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const add = document.getElementById("add");
const zero = document.getElementById("zero");
const decimal = document.getElementById("decimal");
const toggleSign = document.getElementById("toggle-sign");
const equals = document.getElementById("equals");

let num1 = "";
let num2 = "";
let operator = "";
let result = "";

const setDisplay = (val) => {
    if (display.tagName === "INPUT") {
        display.value = val;
    } else {
        display.innerText = val;
    }
};

const setHistory = (val) => {
    if (history.tagName === "INPUT") {
        history.value = val;
    } else {
        history.innerText = val;
    }
}

clear.addEventListener('click', () => {
    setDisplay(""); 
    setHistory("");
    display.placeholder = "";
    num1 = "";
    num2 = "";
    operator = "";
    result = "";
});

[zero, one, two, three, four, five, six, seven, eight, nine].forEach(number => {
    number.addEventListener('click', () => {
        const val = number.innerText.trim();
        if (result !== "" && operator === "") {
            num1 = "";
            result = "";
        }
        if (operator === "") {
            num1 += val;
            setDisplay(num1);
        } else {
            num2 += val;
            setDisplay(num2);
        }
    });
});

decimal.addEventListener('click', () => {
    if (operator === "") {
        if (!num1.includes(".")) {
            num1 += ".";
            setDisplay(num1);
        }
    } else {
        if (!num2.includes(".")) {
            num2 += ".";
            setDisplay(num2);
        }
    }
});

toggleSign.addEventListener('click', () => {
    if (operator === "" && num1 !== "") {
        num1 = (parseFloat(num1) * -1).toString();
        setDisplay(num1);
    } else if (num2 !== "") {
        num2 = (parseFloat(num2) * -1).toString();
        setDisplay(num2);
    }
});

[add, subtract, multiply, divide].forEach(operation => {
    operation.addEventListener('click', () => {
        const op = operation.innerText.trim();
        if (num1 !== "") {
            if (num2 !== "") {
                setHistory(`${num1} ${op} ${num2}`);
            } else {
                setHistory(`${num1} ${op}`);
            }
        } else {
            setHistory("");
        }
        if (num1 !== "" && num2 !== "" && operator !== "") {
            setHistory()
            calculate();
        }
        if (num1 !== "") {
            operator = op;
            setDisplay(op);
        }
    });
});

percent.addEventListener('click', () => {
    if (num1 !== "" && operator === "") {
        num1 = (parseFloat(num1) / 100).toString();
        setDisplay(num1);
    }
});

const calculate = () => {
    if (num1 !== "" && num2 !== "" && operator !== "") {
        switch(operator.trim()){
            case "+":
                result = parseFloat(num1) + parseFloat(num2);
                break;
            case "-":
                result = parseFloat(num1) - parseFloat(num2);
                break;
            case "*":
                result = parseFloat(num1) * parseFloat(num2);
                break;
            case "/":
                result = parseFloat(num1) / parseFloat(num2);
                break;
        }
        setHistory(`${num1} ${operator} ${num2} `);
        setDisplay(result);
        num1 = result.toString();
        num2 = "";
        operator = "";
    }
};

equals.addEventListener('click', () => {
    calculate();
});