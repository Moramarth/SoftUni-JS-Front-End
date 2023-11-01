function palindromeValidator(arrayOfIntegers) {
    const arrayToString = arrayOfIntegers.map(String);

    for (let string of arrayToString) {
        if (string === string.split("").reverse().join("")) console.log("true");
        else console.log("false");
    }
}