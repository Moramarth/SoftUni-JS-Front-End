function addItem() {
    let anchorTag = document.createElement("a");
    anchorTag.textContent = "[Delete]";
    anchorTag.href = "#";
    anchorTag.addEventListener("click", deleteItem);

    let itemToAdd = document.getElementById("newItemText").value;

    let newListItem = createListItem(itemToAdd);
    document.querySelector('ul').appendChild(newListItem);

    function createListItem(itemToAdd) {
        let listItem = document.createElement("li");
        listItem.textContent = itemToAdd;
        listItem.appendChild(anchorTag);
        return listItem
    };

    function deleteItem(event) {
        let clickedItem = event.target;
        clickedItem.parentElement.remove();
    };
}