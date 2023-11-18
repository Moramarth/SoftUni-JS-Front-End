function create(words) {

   let container = document.getElementById("content");

   for (let word of words) {
      let currentParagraph = document.createElement("p");
      let currentDiv = document.createElement("div");

      currentParagraph.textContent = word;
      currentParagraph.style.display = "none";

      currentDiv.appendChild(currentParagraph);
      currentDiv.addEventListener("click", makeTextVisible);

      container.appendChild(currentDiv);
   };

   function makeTextVisible(event) {
      event.target.children[0].style.display = "block"
   };
}