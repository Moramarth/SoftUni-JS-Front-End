function unmiqueSequences(stringsArray) {
    let uniqueArrays = []

    for (let data of stringsArray) {
        data = JSON.parse(data).sort((a, b) => b - a);
        if (uniqueArrays.length === 0) uniqueArrays.push(data);
        else if (!(JSON.stringify(uniqueArrays).includes(JSON.stringify(data)))) {
            uniqueArrays.push(data)
        };

    };

    for (let element of uniqueArrays.sort((a, b) => a.length - b.length)) {
        console.log(`[${element.join(", ")}]`);
    };
}