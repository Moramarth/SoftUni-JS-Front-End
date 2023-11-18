function printNthElement(stringsArray, number) {
    let newArray = [];

    for (let i = 0; i < stringsArray.length; i += number) {
        newArray.push(stringsArray[i]);
    }

    return newArray
}