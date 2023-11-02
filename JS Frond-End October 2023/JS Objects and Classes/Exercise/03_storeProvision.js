function storeProvision(firstArray, secondArray) {
    const stock = {};

    for (let i = 0; i < firstArray.length - 1; i += 2) {
        stock[firstArray[i]] = Number(firstArray[i + 1]);
    };

    for (let i = 0; i < secondArray.length - 1; i += 2) {
        if (stock.hasOwnProperty(secondArray[i])) stock[secondArray[i]] += Number(secondArray[i + 1]);
        else stock[secondArray[i]] = Number(secondArray[i + 1]);
    };

    Object.entries(stock).forEach(([key, value]) => {
        console.log(`${key} -> ${value}`);
    });

}