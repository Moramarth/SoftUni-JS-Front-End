function lockedProfile() {
    let toggleButtons = Array.from(document.querySelectorAll("button"));

    for (let button of toggleButtons) {
        button.addEventListener("click", handleButtonClick)
    };

    function handleButtonClick(event) {
        let currentBtn = event.target
        let hiddenFields = Array
            .from(event.target.parentElement.children)
            .filter(element => element.id.includes("HiddenFields"))[0];
        const isHidden = currentBtn.textContent === "Show more";
        const isLocked = checkIfLocked(currentBtn);

        if (!isLocked) {
            currentBtn.textContent = isHidden ? "Hide it" : "Show more";
            hiddenFields.style.display = isHidden ? "block" : "none";
        };
    };

    function checkIfLocked(button) {
        let lockedStatus = Array.from(button.parentElement.children)
            .filter(element => (element.value === "lock" && element.type === "radio"))[0];
        return lockedStatus.checked
    };
}