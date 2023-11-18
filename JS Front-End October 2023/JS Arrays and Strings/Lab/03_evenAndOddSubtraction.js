function evenAndOddSubtraction(numbersArray) {
    let evenSum = 0;
    let oddSum = 0;

    numbersArray.forEach(element => {
        if (element % 2 == 0) evenSum += element;
        else oddSum += element;
    });

    console.log(evenSum - oddSum);
}