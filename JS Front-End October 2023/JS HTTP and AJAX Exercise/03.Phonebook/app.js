const apiURL = "http://localhost:3030/jsonstore/phonebook";
const phoneBookList = document.querySelector("#phonebook");
const personInput = document.querySelector("#person");
const phoneInput = document.querySelector("#phone");

function attachEvents() {
    const loadBtn = document.querySelector("#btnLoad");
    const createBtn = document.querySelector("#btnCreate");

    loadBtn.addEventListener("click", loadPhoneBook);
    createBtn.addEventListener("click", createNewContact);
};

async function loadPhoneBook() {
    phoneBookList.innerHTML = "";
    let phoneBook = await ((await fetch(`${apiURL}`)).json());

    Object.values(phoneBook).map(contact => {
        let newListItem = document.createElement("li");
        newListItem.textContent = `${contact.person}: ${contact.phone}`;
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.id = contact._id;
        deleteBtn.addEventListener("click", deleteContact);
        newListItem.appendChild(deleteBtn);
        phoneBookList.appendChild(newListItem);
    });

};

async function createNewContact() {
    let newContact = JSON.stringify({
        person: personInput.value,
        phone: phoneInput.value
    });

    await fetch(`${apiURL}`, {
        method: "POST",
        body: newContact
    });
    phoneInput.value = "";
    personInput.value = "";
    loadPhoneBook();
};

async function deleteContact(event) {
    let toDelete = event.target.id;
    await fetch(`${apiURL}/${toDelete}`, { method: "DELETE" });

    loadPhoneBook();
};

attachEvents();