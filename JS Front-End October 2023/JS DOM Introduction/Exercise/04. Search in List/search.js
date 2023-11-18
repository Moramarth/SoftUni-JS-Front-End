function search() {
   const towns = Array.from(document.querySelectorAll("#towns li"));

   let resultBox = document.getElementById("result").textContent;
   if (resultBox) {
      towns.map(element =>
         element.style.cssText = "font-weight: normal; text-decoration: none;"
      );
   }

   const searchPattern = document.getElementById("searchText").value;
   let matches = towns.filter(element => element.textContent.includes(searchPattern));
   matches.map(element =>
      element.style.cssText = "font-weight: bold; text-decoration: underline;"
   );

   document.getElementById("result").textContent = `${matches.length} matches found`;
}
