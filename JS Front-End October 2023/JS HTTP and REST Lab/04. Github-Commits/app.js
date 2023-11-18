function loadCommits() {
    const username = document.querySelector("#username").value;
    const repository = document.querySelector("#repo").value;
    const unorderedList = document.querySelector("ul")

    fetch(`https://api.github.com/repos/${username}/${repository}/commits`).then(res => {
        unorderedList.innerHTML = ""
        if (res.status !== 200) {

            unorderedList.appendChild(
                createListItem(`Error: ${res.status} (Not Found)`)
            );
            return
        }
        return res.json()
    }).then(res => {
        if (!res) return;

        res.forEach(element => {
            unorderedList.appendChild(
                createListItem(`${element.commit.author.name}: ${element.commit.message}`)
            );
        });
    });

    function createListItem(text) {
        let newListItem = document.createElement("li");
        newListItem.textContent = text;
        return newListItem
    }
}