function factorialDivision(x, y) {
    function calculateFactorial(number) {
        let sum = 1;
        for (let i = 1; i <= number; i++) {
            sum *= i;
        }
        return sum;
    }

    factorialX = calculateFactorial(x);
    factorialY = calculateFactorial(y);

    console.log((factorialX / factorialY).toFixed(2));
}