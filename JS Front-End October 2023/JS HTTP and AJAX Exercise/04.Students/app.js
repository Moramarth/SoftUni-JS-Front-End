const apiURL = "http://localhost:3030/jsonstore/collections/students";
const tableBody = document.querySelector("tbody");
const firstNameInput = document.querySelector("input[name=firstName");
const lastNameInput = document.querySelector("input[name=lastName");
const facultyNumberInput = document.querySelector("input[name=facultyNumber");
const gradeInput = document.querySelector("input[name=grade");


function attachEvents() {
  loadAllStudents()

  document.querySelector("#submit").addEventListener("click", createStudent)
}

async function loadAllStudents() {
  tableBody.innerHTML = ""
  let studentData = await ((await fetch(`${apiURL}`)).json())

  Object.values(studentData).map(student => {
    let currentRow = document.createElement("tr");

    currentRow.appendChild(createTableData(student.firstName));
    currentRow.appendChild(createTableData(student.lastName));
    currentRow.appendChild(createTableData(student.facultyNumber));
    currentRow.appendChild(createTableData(student.grade));

    tableBody.append(currentRow)
  })
}

function createTableData(data) {
  let newTD = document.createElement("td")
  newTD.textContent = data
  return newTD
}

async function createStudent() {
  if (!firstNameInput.value
    || !lastNameInput.value
    || !facultyNumberInput.value
    || !gradeInput.value
  ) return;

  let newStudent = JSON.stringify({
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    facultyNumber: facultyNumberInput.value,
    grade: gradeInput.value
  });

  await fetch(`${apiURL}`, {
    method: "POST",
    body: newStudent
  })

  clearFormFields();
  loadAllStudents();
}

function clearFormFields() {
  firstNameInput.value = "";
  lastNameInput.value = "";
  facultyNumberInput.value = "";
  gradeInput.value = ""
}

attachEvents();