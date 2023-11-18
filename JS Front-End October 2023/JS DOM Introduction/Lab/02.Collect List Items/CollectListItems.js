function extractText() {
    let  textToExtract = Array.from(document.getElementsByTagName("li"));
    
    let text = textToExtract.map( element => {
        return element.textContent
    }).join("\n");

    document.getElementById("result").textContent = text;
}