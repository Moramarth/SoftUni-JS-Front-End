function extract(content) {
    const pattern = /\([^\)\(]+\)/gm;

    initialText = document.getElementById(content).textContent;

    let text = initialText.match(pattern)
        .map(element => element.slice(1, -1))
        .join("; ");

    return text;
}