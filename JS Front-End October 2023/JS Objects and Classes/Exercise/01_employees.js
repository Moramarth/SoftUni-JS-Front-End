function employees(stringsArr) {
    const employeesInfo = stringsArr.reduce((acc, curr) => {
        acc[curr] = curr.length
        return acc
    }, {});

    Object.entries(employeesInfo).forEach(([key, value]) => {
        console.log(`Name: ${key} -- Personal Number: ${value}`)
    })
}