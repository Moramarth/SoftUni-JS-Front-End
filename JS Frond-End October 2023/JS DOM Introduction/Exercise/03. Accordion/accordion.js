function toggle() {
    let button = document.getElementsByClassName("button")[0];
    let textToToggle = document.getElementById("extra");

    const accordionIsClosed = button.textContent === "More";
    button.textContent = accordionIsClosed ? "Less" : "More";
    textToToggle.style.display = accordionIsClosed ? "block" : "none";
}