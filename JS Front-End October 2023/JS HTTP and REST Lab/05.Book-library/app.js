const tableBody = document.querySelector("tbody");
const apiURL = "http://localhost:3030/jsonstore/collections/books"
const titleInput = document.querySelector("input[name=title]");
const authorInput = document.querySelector("input[name=author]");
let allBooksData;
let bookIDForEditing;
let submitBtn = document.querySelector("#form button");

function attachEvents() {
  document.querySelector("#loadBooks").addEventListener("click", loadAllBooks);
  submitBtn.addEventListener("click", handleSubmission)

}

async function loadAllBooks() {
  const booksData = await fetch(apiURL);
  allBooksData = await booksData.json();
  tableBody.innerHTML = "";
  Object.values(allBooksData).map(book => {
    const row = createTableRow(book);
    tableBody.appendChild(row);
  })

  clearInput()
}


function createTableRow(bookInfo) {
  let newRow = document.createElement("tr");

  let title = document.createElement("td");
  title.textContent = bookInfo.title;
  newRow.appendChild(title);

  let author = document.createElement("td");
  author.textContent = bookInfo.author;
  newRow.appendChild(author);


  let newDataCell = document.createElement("td");
  newDataCell.appendChild(createActionBtn("Edit"));
  newDataCell.appendChild(createActionBtn("Delete"));
  newRow.appendChild(newDataCell);

  return newRow
}

function createActionBtn(text) {
  let newActionBtn = document.createElement("button")
  newActionBtn.textContent = text

  if (text === "Edit") newActionBtn.addEventListener("click", editBookInfo);
  else newActionBtn.addEventListener("click", deleteBook);

  return newActionBtn
}

function editBookInfo(event) {
  submitBtn.textContent = "Save";
  bookID = processCurrentRow(event.target);
  bookIDForEditing = bookID;

  titleInput.value = allBooksData[bookID].title
  authorInput.value = allBooksData[bookID].author
}

function deleteBook(event) {
  let bookID = processCurrentRow(event.target)
  fetch(`${apiURL}/${bookID}`, { method: "DELETE" });

}

function processCurrentRow(btn) {
  let currentRow = btn.parentElement.parentElement;
  let bookTitle = currentRow.querySelector("td:first-child").textContent;
  let bookID = Object.keys(allBooksData).filter(key => allBooksData[key].title === bookTitle)[0];

  return bookID
}

function handleSubmission() {
  const isEditing = submitBtn.textContent === "Save"

  if (isEditing) {

    let editedBook = handleBookData();
    if (!editedBook) return;

    fetch(`${apiURL}/${bookIDForEditing}`, {
      method: "PUT",
      body: editedBook,
      headers: {
        "Content-Type": "application/json"
      }
    })

    submitBtn.textContent = "Submit";
    clearInput()
    return
  }

  let newBook = handleBookData()

  if (!newBook) return;
  fetch(apiURL, {
    method: "POST",
    body: newBook,
    headers: {
      "Content-Type": "application/json"
    }
  });

  clearInput()


}

function handleBookData() {
  let BookTitle = titleInput.value;
  let BookAuthor = authorInput.value;

  if (!BookAuthor || !BookTitle) return;

  return JSON.stringify({
    title: BookTitle,
    author: BookAuthor
  })
}

function clearInput() {
  titleInput.value = "";
  authorInput.value = "";
}

attachEvents();