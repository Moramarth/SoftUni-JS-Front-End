function pascalCaseSplitter(string) {
    let words = string.split(/(?=[A-Z])/);

    console.log(words.join(", "));

}