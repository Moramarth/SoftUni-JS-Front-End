function signCheck(firstNumber, secondNumber, thirdNumber) {

    let numbers = [firstNumber, secondNumber, thirdNumber]
    let negativeCount = 0;

    if (numbers.every(number => number < 0)) console.log("Negative");
    else if (numbers.every(number => number > 0)) console.log("Positive");
    else {
        for (number of numbers) {
            if (number < 0) negativeCount += 1;
        }

        if (negativeCount === 1) console.log("Negative");
        else console.log("Positive");
    }
}