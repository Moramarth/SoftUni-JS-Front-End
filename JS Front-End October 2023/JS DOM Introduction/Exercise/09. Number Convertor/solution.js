function solve() {
    addOptions();
    document.querySelector("button").addEventListener("click", onClick);

    const converter = {
        binary: (decimalNumber) => (decimalNumber >>> 0).toString(2),
        hexadecimal: (decimalNumber) => decimalNumber.toString(16).toUpperCase()
    };

    function addOptions() {
        let selectMenuTo = document.getElementById("selectMenuTo");
        let option = document.createElement("option");

        let firstOption = selectMenuTo.children[0]
        firstOption.textContent = "Binary"
        firstOption.value = "binary"

        option.textContent = "Hexadecimal"
        option.value = "hexadecimal"

        selectMenuTo.appendChild(option)

        console.log("bugtest")
    };

    function onClick() {
        const decimalNumber = Number(document.getElementById("input").value)

        let selectMenuTo = document.getElementById("selectMenuTo");
        let convertTo = selectMenuTo.value

        document.getElementById("result").value = converter[convertTo](decimalNumber)
    };
}