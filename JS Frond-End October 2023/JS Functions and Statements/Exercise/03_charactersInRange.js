function charactersInRange(firstChar, secondChar) {
    const firstASCIICode = firstChar.charCodeAt(0);
    const secondASCIICode = secondChar.charCodeAt(0);

    let output = "";

    start = Math.min(firstASCIICode, secondASCIICode);
    end = Math.max(firstASCIICode, secondASCIICode);

    for (let i = start + 1; i < end; i++) {
        output += String.fromCharCode(i) + " "
    }

    console.log(output.trim())
}