function colorize() {
   let rows = Array.from(document.querySelectorAll("tr:nth-child(even)"));

   rows.map(row => row.style.background = "teal")
}