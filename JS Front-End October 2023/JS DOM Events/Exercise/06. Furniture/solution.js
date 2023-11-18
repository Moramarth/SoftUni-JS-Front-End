function solve() {
  let [inputBox, outputBox] = Array.from(document.querySelectorAll("textarea"));
  let [generateBtn, buyBtn] = Array.from(document.querySelectorAll("button"));

  generateBtn.addEventListener("click", generateFurniture);
  buyBtn.addEventListener("click", handleBuyRequest);

  function generateFurniture() {
    let input = JSON.parse(inputBox.value);

    input.forEach(element => {
      let imgField = createImg(element.img);
      let itemName = fillTextContent(element.name);
      let itemPrice = fillTextContent(Number(element.price));
      let itemDecorationFactor = fillTextContent(Number(element.decFactor));
      let checkbox = createCheckox();

      let tableRow = document.createElement("tr");
      let tableData = wrapInTableData(
        imgField,
        itemName,
        itemPrice,
        itemDecorationFactor,
        checkbox)

      for (let element of tableData) {
        tableRow.appendChild(element)
      }

      document.querySelector("tbody").appendChild(tableRow);
    });

    function createImg(src) {
      field = document.createElement("img");
      field.src = src;
      return field
    };

    function fillTextContent(content) {
      item = document.createElement("p");
      item.textContent = content;
      return item
    };

    function createCheckox() {
      checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      return checkbox
    };

    function wrapInTableData(...items) {
      result = [];
      for (let item of items) {
        let td = document.createElement("td");
        td.appendChild(item);
        result.push(td);
      };

      return result
    };
  };

  function handleBuyRequest() {
    let targetCheckboxes = Array.from(document.querySelectorAll("input[type=checkbox]:checked"));

    let buyRequest = targetCheckboxes.reduce((acc, curr) => {
      let currentRow = curr.parentElement.parentElement;
      let rowData = currentRow.children;

      acc.furnitureNames.push(rowData[1].textContent);
      acc.totalPrice += Number(rowData[2].textContent);
      acc.averageDecorationFactor += Number(rowData[3].textContent) / targetCheckboxes.length;

      return acc
    }, {
      furnitureNames: [],
      totalPrice: 0,
      averageDecorationFactor: 0
    });


    outputBox.textContent = generateOutput(buyRequest);

    function generateOutput(buyRequest) {
      let output = ""

      output += `Bought furniture: ${buyRequest.furnitureNames.join(", ")}\n`;
      output += `Total price: ${buyRequest.totalPrice.toFixed(2)}\n`;
      output += `Average decoration factor: ${buyRequest.averageDecorationFactor}`

      return output
    };
  };

}