function simpleCalculator(firstNumber, secondNumber, operator) {

    const calculator = {
        multiply: (x, y) => (x * y),
        divide: (x, y) => (x / y),
        add: (x, y) => (x + y),
        subtract: (x, y) => (x - y),
    }

    console.log(calculator[operator](firstNumber, secondNumber));
}