function loadRepos() {
	let username = document.querySelector("input").value
	const unorderedList = document.querySelector("ul")

	fetch(`https://api.github.com/users/${username}/repos`)
		.then(res => res.json())
		.then(res => {
			unorderedList.innerHTML = ""
			console.log(res)
			if (res.message) {
				unorderedList.appendChild(createListItem(res.message, res.documentation_url));
				return
			};

			res.forEach(element => {
				unorderedList.appendChild(createListItem(element.full_name, element.html_url))
			});
		});


	function createListItem(text, href) {
		let listItem = document.createElement("li");
		let anchor = document.createElement("a");
		anchor.textContent = text;
		anchor.href = href;
		listItem.appendChild(anchor);

		return listItem
	}
}