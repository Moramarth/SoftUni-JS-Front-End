function printDNA(numberOfRows) {
    const pattern = [
        ["A", "T"],
        ["C", "G"],
        ["T", "T"],
        ["A", "G"],
        ["G", "G"],
    ];

    for (let i = 0; i < numberOfRows; i++) {
        [x, y] = pattern[i % pattern.length]

        if (i % 4 === 0) console.log(`**${x}${y}**`);
        else if (i % 2 === 0) console.log(`${x}----${y}`);
        else console.log(`*${x}--${y}*`);
    }
}