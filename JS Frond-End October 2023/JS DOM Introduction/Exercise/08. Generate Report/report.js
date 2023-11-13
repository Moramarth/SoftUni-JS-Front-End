function generateReport() {
    const headers = Array.from(document.querySelectorAll("th"));
    const tableRows = Array.from(document.querySelectorAll("tbody tr"));
    const data = [];

    const isChecked = headers.reduce((acc, curr) => {
        acc[curr.lastChild.name] = curr.lastChild.checked
        return acc
    }, {});

    const checkedData = Object.entries(isChecked)

    tableRows.forEach(row => {
        const loops = row.children.length
        let rowObj = {}
        for (let i = 0; i < loops; i++) {
            let [headerName, headerStatus] = checkedData[i]

            if (headerStatus) {
                rowObj[headerName] = row.children[i].textContent
            };
        };

        if (Object.keys(rowObj).length > 0) {
            data.push(rowObj)
        }
    });

    let output = JSON.stringify(data, null, 2);

    document.getElementById("output").textContent = output
}