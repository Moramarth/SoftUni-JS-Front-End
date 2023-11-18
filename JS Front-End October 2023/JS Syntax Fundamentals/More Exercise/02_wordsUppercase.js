function wordsUppercase(string) {
    const regex = /\w+/gm;
    const words = string.match(regex);
    let wordsUpper = [];

    words.forEach(element => {
        wordsUpper.push(element.toUpperCase())
    });

    console.log(wordsUpper.join(", "))
}