function sortingNumbers(numbersArray) {
    numbersArray = numbersArray.sort((a, b) => (a - b));
    let sortedFunArray = []

    let loops = parseInt((numbersArray.length / 2))
    for (let i = 0; i <= loops; i++) {
        sortedFunArray.push(numbersArray.shift());
        if (numbersArray.length != 0) sortedFunArray.push(numbersArray.pop());
    }

    return sortedFunArray;
}