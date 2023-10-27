function revealWords(wordsString, textToProcess) {
    words = wordsString.split(", ");

    for (let word of words) {
        textToProcess = textToProcess.replace("*".repeat(word.length), word);
    }

    console.log(textToProcess);
}