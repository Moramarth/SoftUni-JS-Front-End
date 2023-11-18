function solve() {
    let table = document.querySelector("table");
    let rows = Array.from(document.querySelectorAll("tbody tr"));
    let firstCol = Array.from(document.querySelectorAll("tbody td:nth-child(1)"));
    let secondCol = Array.from(document.querySelectorAll("tbody td:nth-child(2)"));
    let thirdCol = Array.from(document.querySelectorAll("tbody td:nth-child(3)"));
    let outputField = document.querySelector("#check p");

    let rowsAreCorrect = true;
    let columnsAreCorrect = true;

    let [checkBtn, clearBtn] = Array.from(document.querySelectorAll("button"));

    checkBtn.addEventListener("click", checkGrid);
    clearBtn.addEventListener("click", clearGrid);

    function checkGrid() {
        for (let row of rows) {
            let values = Array.from(row.children).map(child => {
                if (!child.firstElementChild.value) {
                    rowsAreCorrect = false
                };
                return child.firstElementChild.value
            })
            if (values.length !== new Set(values).size) {
                rowsAreCorrect = false;
            }

            if (!rowsAreCorrect) break;
        }

        if (!rowsAreCorrect) {
            generateOutput();
            return
        }

        for (let column of [firstCol, secondCol, thirdCol]) {
            let values = column.map(td => {
                if (!td.firstElementChild.value) {
                    columnsAreCorrect = false
                };
                return td.firstElementChild.value
            })
            if (values.length !== new Set(values).size) {
                columnsAreCorrect = false;
            }

            if (!columnsAreCorrect) break;
        }
        generateOutput()
    }
    function generateOutput() {
        if (!rowsAreCorrect || !columnsAreCorrect) {
            outputField.textContent = "NOP! You are not done yet..."
            outputField.style.color = "red"

            table.style.border = "2px solid red"
        } else {
            outputField.textContent = "You solve it! Congratulations!"
            outputField.style.color = "green"

            table.style.border = "2px solid green"
        }
    }

    function clearGrid() {
        table.style.border = "none"
        outputField.textContent = ""
        Array.from(document.querySelectorAll("tbody td"))
            .map(td => td.firstElementChild.value = "")
    }
}