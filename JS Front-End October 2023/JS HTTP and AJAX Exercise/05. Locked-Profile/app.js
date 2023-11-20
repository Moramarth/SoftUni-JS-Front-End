const apiURL = "http://localhost:3030/jsonstore/advanced/profiles";
const mainContainer = document.querySelector("#main");
let userCounter = 0;

async function lockedProfile() {
    mainContainer.innerHTML = "";
    let profilesData = await ((await fetch(apiURL)).json());
    Object.values(profilesData)
        .map(profile => {
            let profileContainer = createProfileContainer(profile);
            mainContainer.appendChild(profileContainer);
        });
};

function createProfileContainer(profile) {
    userCounter++;
    let profileContainer = document.createElement("div");
    profileContainer.classList.add("profile");

    profileContainer.appendChild(createImageItem());

    profileContainer.innerHTML += `<label>Lock</label>
        <input type = "radio" name = "user${userCounter}Locked" value = "lock" checked />
    <label>Unlock</label>
    <input type="radio" name="user${userCounter}Locked" value="unlock"><br>
    <hr>
    <label>Username</label>
    <input type="text" name="user${userCounter}Username" value="${profile.username}" disabled readonly />`;

    profileContainer.appendChild(createExtraInfoContainer(profile));
    profileContainer.appendChild(createToggleButton());

    return profileContainer
};

function createImageItem() {
    let imgItem = document.createElement("img");
    imgItem.src = "./iconProfile2.png";
    imgItem.classList.add("userIcon");
    return imgItem
};

function createExtraInfoContainer(profile) {
    let extraInfoContainer = document.createElement("div");
    extraInfoContainer.style.display = "none";
    extraInfoContainer.classList.add(`user${userCounter}Username`);
    extraInfoContainer.appendChild(document.createElement("hr"));

    extraInfoContainer.innerHTML += `<label>Email:</label>
    <input type="email" name="user${userCounter}Email" value="${profile.email}" disabled readonly />
    <label>Age:</label>
    <input type="email" name="user${userCounter}Age" value="${profile.age}" disabled readonly />`;

    return extraInfoContainer
};

function createToggleButton() {
    let toggleBtn = document.createElement("button");
    toggleBtn.addEventListener("click", toggleInfo);
    toggleBtn.textContent = "Show more";

    return toggleBtn
};

function toggleInfo(event) {
    let currentBtn = event.target
    let hiddenFields = currentBtn.parentElement.querySelector("div");

    const isHidden = currentBtn.textContent === "Show more";
    const isLocked = checkIfLocked(currentBtn);

    if (!isLocked) {
        currentBtn.textContent = isHidden ? "Hide it" : "Show more";
        hiddenFields.style.display = isHidden ? "block" : "none";
    };
};

function checkIfLocked(button) {
    let lockedStatus = button.parentElement.querySelector("input[value=lock]");
    return lockedStatus.checked
};