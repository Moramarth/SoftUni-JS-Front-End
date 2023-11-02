function addressBook(stringsArray) {
    let book = stringsArray.reduce((acc, curr) => {
        [person, address] = curr.split(":");
        acc[person] = address;
        return acc
    }, {})

    Object.keys(book).sort().forEach((key) => {
        console.log(`${key} -> ${book[key]}`)
    })
}