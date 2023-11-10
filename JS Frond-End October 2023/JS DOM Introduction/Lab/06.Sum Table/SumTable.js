function sumTable() {
    let prices = Array.from(document.querySelectorAll("td:nth-child(even):not(#sum)"));

    let result = prices.reduce((acc, curr) => {
        return acc + Number(curr.textContent)
    }, 0);
    
    document.getElementById("sum").textContent = result;
}