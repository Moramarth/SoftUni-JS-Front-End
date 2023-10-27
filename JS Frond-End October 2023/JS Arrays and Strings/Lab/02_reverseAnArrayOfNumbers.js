function reverseAnArray(count, numbersArray) {
    let newArray = [];

    for (let i = 0; i < count; i++) {
        newArray.push(numbersArray[i]);
    }

    console.log(newArray.reverse().join(" "))
}