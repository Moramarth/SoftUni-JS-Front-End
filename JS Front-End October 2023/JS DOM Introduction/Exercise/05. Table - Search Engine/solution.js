function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      const searchPattern = document.getElementById("searchField").value;
      const dataCells = Array.from(document.querySelectorAll("tbody td"));

      const rows = Array.from(document.querySelectorAll("tbody tr"))

      rows.forEach(row => row.classList.remove("select"));

      dataCells.forEach(cell => {
         if (cell.textContent.includes(searchPattern)) {
            cell.parentElement.classList.add("select")
         };
      });
   };
}