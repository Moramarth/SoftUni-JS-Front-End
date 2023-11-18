function listOfNames(namesArray) {
    let sortedArray = namesArray.sort((a, b) => a.localeCompare(b));
    if (namesArray) {
        for (let i = 0; i < sortedArray.length; i++) {
            console.log(`${i + 1}.${sortedArray[i]}`)
        }
    }
}