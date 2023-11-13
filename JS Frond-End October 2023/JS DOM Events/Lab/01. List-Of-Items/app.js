function addItem() {

    let textInput = document.getElementById("newItemText");
    let newListItem = document.createElement("li");

    newListItem.textContent = textInput.value;
    document.getElementById("items").appendChild(newListItem);

    textInput.value = "";
}