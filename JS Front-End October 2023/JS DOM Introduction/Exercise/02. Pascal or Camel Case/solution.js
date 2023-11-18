function solve() {
  let output = "Error!"
  const command = document.getElementById("naming-convention").value;

  if (command !== "Camel Case" && command !== "Pascal Case") {
    document.getElementById("result").textContent = output;
    return;
  };

  let textToConvert = (document.getElementById("text").value).split(" ");
  let firstword = textToConvert.shift().toLowerCase();
  output = firstword;

  let wordsArray = textToConvert.map(word => {
    return formatWordFirstIsUpper(word)
  });

  if (command === "Pascal Case") {
    output = formatWordFirstIsUpper(firstword);
  };

  output += wordsArray.join("");
  document.getElementById("result").textContent = output;

  function formatWordFirstIsUpper(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase()
  }
}