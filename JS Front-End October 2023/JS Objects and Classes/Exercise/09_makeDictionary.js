function makeDictionary(jsonStringsArray) {
    const myDictionary = {};

    jsonStringsArray.map((element) => {
        currentObj = JSON.parse(element);
        key = Object.keys(currentObj)[0];
        myDictionary[key] = currentObj[key];
    })

    const sortedDict = Object.keys(myDictionary).sort();

    for (let element of sortedDict) {
        console.log(`Term: ${element} => Definition: ${myDictionary[element]}`);
    }
}