function calculator(firstNumber, operator, secondNumber) {
    let result = eval(firstNumber + operator + secondNumber);
    console.log(result.toFixed(2));
}