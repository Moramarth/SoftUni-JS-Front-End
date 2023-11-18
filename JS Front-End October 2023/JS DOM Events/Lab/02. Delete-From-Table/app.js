function deleteByEmail() {
    const searchPattern = document.querySelector("input").value;
    const resultElement = document.getElementById("result");

    let anyRowIsDeleted = false;

    const emailFields = Array.from(document.querySelectorAll("tbody td:nth-child(even)"));

    for (let field of emailFields) {
        if (field.textContent === searchPattern) {
            field.parentElement.remove()
            anyRowIsDeleted = true
        }
    };

    if (anyRowIsDeleted) resultElement.textContent = "Deleted.";
    else resultElement.textContent = "Not found.";
}