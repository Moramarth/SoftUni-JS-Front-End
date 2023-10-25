function sumDigits(number) {
    let digits = [];
    let sum = 0;

    if (number === 0) {
        console.log("true");
        console.log(sum);
    } else {
        while (number != 0) {
            digits.push(number % 10);
            number = Math.trunc(number / 10);
        }

        if (Math.min(...digits) === Math.max(...digits)) console.log("true");
        else console.log("false");

        digits.forEach(element => {
            sum += element
        });
        console.log(sum);
    };
}