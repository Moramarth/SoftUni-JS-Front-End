function catalogue(stringsArray) {
    let letters = {};

    stringsArray.map((product) => {
        let [productName, price] = product.split(" : ");
        let startingLetter = productName[0];
        if (!Object.keys(letters).includes(startingLetter)) letters[startingLetter] = [[productName, Number(price)]];
        else letters[startingLetter].push([productName, Number(price)]);
    });

    Object.entries(letters).sort().forEach(([key, value]) => {
        console.log(key);

        for (let product of value.sort((a, b) => a[0].localeCompare(b[0]))) {
            console.log(`  ${product.join(": ")}`);
        };
    });
}