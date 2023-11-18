function focused() {
    const inputs = Array.from(document.querySelectorAll("input"));

    inputs.forEach(input => {
        input.addEventListener("focus", handleFocused);
        input.addEventListener("blur", handleBlurred);
    });

    function handleFocused(event) {
        event.target.parentElement.classList.add("focused")
    };

    function handleBlurred(event) {
        event.target.parentElement.classList.remove("focused")
    };

}