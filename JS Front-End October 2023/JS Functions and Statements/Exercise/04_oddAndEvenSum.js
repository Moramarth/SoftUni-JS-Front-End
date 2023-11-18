function oddAndEvenSum(integer) {
    const digits = integer.toString().split("").map(Number);
    let evenSum = 0;
    let oddSum = 0;

    for (let digit of digits) {
        if (digit % 2 == 0) evenSum += digit;
        else oddSum += digit;
    }

    console.log(`Odd sum = ${oddSum}, Even sum = ${evenSum}`);
}