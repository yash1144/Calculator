const buttons = [
    "AC",
    "DEL",
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
    ".",
    "0",
    "=",
];


function appendChild(value) {
    const display = document.getElementById("display")
    if (value === "=") {
        try {
            display.value = evaluate(display.value)
        } catch (error) {}
    } else if (value === "AC") {
        display.value = ""
    } else if (value === "DEL") {
        display.value = display.value.slice(0, -1)
    } else {
        display.value += value
    }
}


function evaluate(expression) {
    expression = expression.replace(`\s+/g`, "")

    let result = 0
    let operator = "+"
    let currentNumber = ""

    for (let i = 0; i < expression.length; i++) {
        const char = expression[i]

        if (/\d/.test(char) || char === ".") {
            currentNumber += char
        } else if (["+", "-", "*", "/", "%"].includes(char)) {
            if (currentNumber) {
                result = performOpration(result, parseFloat(currentNumber), operator)
                currentNumber = ""
            }
            operator = char
        }
    }
    if (currentNumber) {
        result = performOpration(result, parseFloat(currentNumber), operator)
    }
    return result
}




function performOpration(a, b, operator) {
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return b !== 0 ? a / b : "error";
        case "%":
            return a * (b / 100);

    }
}


function createButton(value) {
    const button = document.createElement("button")
    button.innerHTML = value
    button.addEventListener("click", () => appendChild(value))
    return button
}


function setUpCalc() {
    const buttonContainer = document.getElementById("buttons")

    buttons.forEach((value) => {
        const button = createButton(value)
        buttonContainer.appendChild(button)
    })
}

setUpCalc()