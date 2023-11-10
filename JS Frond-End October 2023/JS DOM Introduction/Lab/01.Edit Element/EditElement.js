function editElement(referenceToHTML, match, replacer) {
    let textInElement = referenceToHTML.textContent;
    const pattern = new RegExp(match, "g");

    textInElement = textInElement.replace(pattern, replacer);
    
    referenceToHTML.textContent = textInElement;
}