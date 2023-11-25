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
  Object.entries(allBooksData).map(([_id, book]) => {
    const row = createTableRow(_id, book);
    tableBody.appendChild(row);
  })

  clearInput()
}


function createTableRow(_id, bookInfo) {
  let newRow = document.createElement("tr");

  let title = document.createElement("td");
  title.textContent = bookInfo.title;
  newRow.appendChild(title);

  let author = document.createElement("td");
  author.textContent = bookInfo.author;
  newRow.appendChild(author);


  let newDataCell = document.createElement("td");
  newDataCell.appendChild(createActionBtn("Edit", _id));
  newDataCell.appendChild(createActionBtn("Delete", _id));
  newRow.appendChild(newDataCell);

  return newRow
}

function createActionBtn(text, _id) {
  let newActionBtn = document.createElement("button")
  newActionBtn.textContent = text
  newActionBtn.setAttribute("data-id", _id)

  if (text === "Edit") newActionBtn.addEventListener("click", editBookInfo);
  else newActionBtn.addEventListener("click", deleteBook);

  return newActionBtn
}

function editBookInfo(event) {
  submitBtn.textContent = "Save";
  bookID = event.target.dataset.id
  console.log(bookID)
  bookIDForEditing = bookID;

  titleInput.value = allBooksData[bookID].title
  authorInput.value = allBooksData[bookID].author
}

function deleteBook(event) {
  let bookID = processCurrentRow(event.target)
  fetch(`${apiURL}/${bookID}`, { method: "DELETE" });

}

function handleSubmission(event) {
  event.preventDefault()
  const isEditing = submitBtn.textContent === "Save"

  if (isEditing) {

    let editedBook = handleBookData();
    editedBook._id = bookIDForEditing

    if (!editedBook) return;

    fetch(`${apiURL}/${bookIDForEditing}`, {
      method: "PUT",
      body: JSON.stringify(editedBook),
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
    body: JSON.stringify(newBook),
    headers: {
      "Content-Type": "application/json"
    }
  });

  clearInput()


}

function handleBookData(book) {
  let BookTitle = titleInput.value;
  let BookAuthor = authorInput.value;

  if (!BookAuthor || !BookTitle) return;

  return {
    title: BookTitle,
    author: BookAuthor
  }
}

function clearInput() {
  titleInput.value = "";
  authorInput.value = "";
}

attachEvents();