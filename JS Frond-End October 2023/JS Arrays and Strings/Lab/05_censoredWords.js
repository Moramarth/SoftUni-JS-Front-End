function censorWord(textToProcess, wordToCensor) {
    while (textToProcess.includes(wordToCensor)) {
        textToProcess = textToProcess.replace(wordToCensor, "*".repeat(wordToCensor.length));
    }
    console.log(textToProcess);
}