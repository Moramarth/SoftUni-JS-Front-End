function signCheck(firstNumber, secondNumber, thirdNumber) {

    let numbers = [firstNumber, secondNumber, thirdNumber]
    let negativeCount = 0;

    for (number of numbers) {
        if (number < 0) negativeCount += 1;
    }

    if (negativeCount % 2 === 1) console.log("Negative");
    else console.log("Positive");
}
