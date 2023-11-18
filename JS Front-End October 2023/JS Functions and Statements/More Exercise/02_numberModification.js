function numberModification(integer) {
    numberToString = integer.toString();

    function calcAverage() {
        return numberToString
            .split("")
            .map(Number)
            .reduce((total, current) => total + current, 0) / numberToString.length;
    }

    let average = calcAverage();

    while (average < 5) {
        numberToString += "9";
        average = calcAverage();
    }

    console.log(numberToString);
}