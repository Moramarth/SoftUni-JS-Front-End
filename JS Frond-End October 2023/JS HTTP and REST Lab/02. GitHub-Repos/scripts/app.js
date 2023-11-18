function loadRepos() {
   fetch("https://api.github.com/users/testnakov/repos")
      .then(res => res.text())
      .then(res => document.querySelector("#res").textContent = res);
}