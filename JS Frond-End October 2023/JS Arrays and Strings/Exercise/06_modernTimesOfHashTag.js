function hastagFinder(textToProcess) {
    const constraint = /(#[A-Za-z]+)/gm
    let words = textToProcess.match(constraint);

    for (let word of words) {
        word = word.replace("#", "");
        console.log(word);
    }

}