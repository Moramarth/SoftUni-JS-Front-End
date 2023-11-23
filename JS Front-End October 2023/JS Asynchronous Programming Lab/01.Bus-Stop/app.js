async function getInfo() {
    const desiredID = document.querySelector("#stopId").value;
    const resultTitle = document.querySelector("#stopName");
    const resultList = document.querySelector("#buses");
    resultList.innerHTML = "";

    try {
        response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${desiredID}`);
        parsedData = await response.json();

        resultTitle.textContent = parsedData.name
        Object.entries(parsedData.buses).forEach(([busId, time]) => {
            let listItem = document.createElement("li")
            listItem.textContent = `Bus ${busId} arrives in ${time} minutes`
            resultList.appendChild(listItem)
        })
    } catch (_) {
        resultTitle.textContent = "Error"
    }
}