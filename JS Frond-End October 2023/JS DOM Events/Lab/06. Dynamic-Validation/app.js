function validate() {
    const inputField = document.querySelector("#email");
    inputField.addEventListener("change", handleValidation);

    function handleValidation(event) {
        let currentString = inputField.value;

        if (isValid(currentString)) {
            inputField.classList.remove("error")
        } else {
            inputField.classList.add("error")
        }
    };

    function isValid(string) {
        pattern = /^[a-z]+@[a-z]+\.[a-z]+$/gm

        return pattern.test(string)
    };
}