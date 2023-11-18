function countStringOccurrences(text, string) {
    words = text.split(" ");
    let count = 0;

    for (let word of words) {
        if (word == string) count += 1;
    };

    console.log(count);
}