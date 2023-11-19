const apiURL = "http://localhost:3030/jsonstore/messenger";
const authorInput = document.querySelector("input[name=author]");
const contentInput = document.querySelector("input[name=content]");

function attachEvents() {
    const submitBtn = document.querySelector("#submit");
    const refreshBtn = document.querySelector("#refresh");

    submitBtn.addEventListener("click", createNewMessage);
    refreshBtn.addEventListener("click", displayAllMessages);

}
function createNewMessage() {
    let newMessage = JSON.stringify({
        author: authorInput.value,
        content: contentInput.value
    })
    fetch(`${apiURL}`, {
        method: "POST",
        body: newMessage,
        headers: {
            "Content-Type": "application/json"
        }
    })

    authorInput.value = "";
    contentInput.value = "";
}

async function displayAllMessages() {
    let textarea = document.querySelector("textarea")
    let allMessages = await ((await fetch(`${apiURL}`)).json());

    let output = Object.values(allMessages).map(msg =>
        `${msg.author}: ${msg.content}`
    ).join("\n")

    textarea.textContent = output
}
attachEvents();