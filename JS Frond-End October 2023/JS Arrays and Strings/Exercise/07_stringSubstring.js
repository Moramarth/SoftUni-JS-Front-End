function stringSubstring(wordToSearch, textToProcess) {
    textToProcess = textToProcess.toLowerCase()
    textToProcess = textToProcess.split(' ')

    if (textToProcess.includes(wordToSearch)) {
        console.log(wordToSearch);
    } else {
        console.log(`${wordToSearch} not found!`)
    }
}