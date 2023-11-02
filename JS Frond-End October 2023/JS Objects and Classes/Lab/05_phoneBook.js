function phoneBook(stringsArray) {
    let phoneBook = stringsArray.reduce((acc, curr) => {
        [key, value] = curr.split(" ");
        acc[key] = value;
        return acc
    }, {})

    Object.keys(phoneBook).forEach((key) => {
        console.log(`${key} -> ${phoneBook[key]}`)
    })
}