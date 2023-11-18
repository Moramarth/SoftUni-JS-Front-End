function wordsTracker(stringsArray) {
    let [words, ...stringsToCheck] = stringsArray
    const wordsObj = []
    words.split(" ").map((word) => {
        wordsObj.push({
            word: word,
            counter: 0,
        });
    })

    wordsObj.map((obj) => {
        for (let string of stringsToCheck) {
            if (obj.word === string) obj.counter++;
        }
    });

    wordsObj.sort((a, b) => b.counter - a.counter).map((obj) => {
        console.log(`${obj.word} - ${obj.counter}`)
    })
}