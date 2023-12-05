const mainContainer = document.querySelector("main");
const registerForm = document.querySelector("#register-view").innerHTML;
const loginForm = document.querySelector("#login-view").innerHTML;
const homeView = document.querySelector("#home-view").innerHTML;


//navbar links containers
const logoutContainer = document.querySelector("#user");
const noLoginContainer = document.querySelector("#guest");

//navbar links anchors
const homePageRedirectBtn = document.querySelector("a#home");
const logoutBtn = document.querySelector("a#logout");
const loginRedirectBtn = document.querySelector("a#login");
const registerRedirectBtn = document.querySelector("a#register");

const addBtn = document.querySelector("aside button.add")


//API URLS
const usersURL = "http://localhost:3030/users"
const catchesURL = "http://localhost:3030/data/catches"

addEventTriggers();

document.querySelector("#views").innerHTML = "";

loadHomePage();


function loadHomePage() {

    const accessToken = sessionStorage.getItem("accessToken")
    const loggedUserEmail = sessionStorage.getItem("loggedUser");

    if (loggedUserEmail) {
        document.querySelector("nav p span").textContent = loggedUserEmail;
    } else {
        document.querySelector("nav p span").textContent = "guest";
    }

    if (accessToken) {
        noLoginContainer.style.display = "none"
        logoutContainer.style.display = "inline-block"

    } else {
        logoutContainer.style.display = "none"
        noLoginContainer.style.display = "inline-block"

    }

    mainContainer.innerHTML = homeView
    const addBtn = document.querySelector("aside button.add")
    addBtn.addEventListener("click", createNewCatchItem);
    clearCatchesContainer();

    // let sectionHome = document.querySelector("main section");
    // let p = document.createElement("p")
    // p.textContent = "Click to load catches";
    // mainContainer.insertBefore(p, secttionHome)

    const loadCatchesBtn = document.querySelector("aside button.load");
    loadCatchesBtn.addEventListener("click", loadCatches);

    if (accessToken) {
        addBtn.disabled = false
    } else {
        addBtn.disabled = true
    }

}

// register functions
function loadRegisterPage() {
    clearMainContainerHTML()
    let sectionRegister = document.createElement("section");
    sectionRegister.id = "register-view"
    sectionRegister.innerHTML = registerForm
    mainContainer.appendChild(sectionRegister);
    const registerRequestBtn = document.querySelector("#register button");
    registerRequestBtn.addEventListener("click", requestRegister);
}

async function requestRegister(event) {
    event.preventDefault()

    let message = document.querySelector("form#register p")

    const data = new FormData(document.querySelector("form#register"));
    const { email, password, rePass } = Object.fromEntries(data);

    if (!email || !password || !rePass) {
        message.textContent = "Please fill all fields"
        setTimeout(() => message.textContent = "", 1500)
        return
    }

    if (!validators.email(email)) {
        message.textContent = "Please enter a valid email"
        setTimeout(() => message.textContent = "", 1500)
        return
    }

    if (password !== rePass) {
        message.textContent = "Passwords don`t match"
        setTimeout(() => message.textContent = "", 1500)
        return

    }

    let newUser = JSON.stringify({
        email: email,
        password: password
    })

    let response = await (((await fetch(`${usersURL}/register`, {
        method: "POST",
        body: newUser
    })).json()))

    if (response.code) {
        message.textContent = response.message
        setTimeout(() => message.textContent = "", 1500)
        return
    }

    sessionStorage.setItem("accessToken", response.accessToken);
    sessionStorage.setItem("loggedUser", response.email);
    sessionStorage.setItem("id", response._id);

    loadHomePage()
}


//log in functions
function loadLoginPage() {
    clearMainContainerHTML()

    let sectionLogin = document.createElement("section");
    sectionLogin.id = "login-view"
    sectionLogin.innerHTML = loginForm
    mainContainer.appendChild(sectionLogin);
    const loginRequestBtn = document.querySelector("#login button");
    loginRequestBtn.addEventListener("click", requestLogIn);
}

async function requestLogIn(event) {
    event.preventDefault()

    let message = document.querySelector("form#login p")

    const data = new FormData(document.querySelector("form#login"));
    const { email, password } = Object.fromEntries(data);

    if (!email || !password) {
        message.textContent = "Please fill all fields"
        setTimeout(() => message.textContent = "", 1500)
        return
    }

    let requestUser = JSON.stringify({
        email: email,
        password: password
    })

    let response = await (((await fetch(`${usersURL}/login`, {
        method: "POST",
        body: requestUser
    })).json()))

    if (response.code) {
        message.textContent = response.message
        setTimeout(() => message.textContent = "", 1500)
        return
    }

    sessionStorage.setItem("accessToken", response.accessToken);
    sessionStorage.setItem("loggedUser", response.email);
    sessionStorage.setItem("id", response._id);

    loadHomePage()
}

async function logoutUser() {
    await fetch(`${usersURL}/logout`, {
        method: "GET",
        headers: {
            "X-Authorization": sessionStorage.getItem("accessToken")
        }
    })


    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("loggedUser");
    sessionStorage.removeItem("id");
    loadHomePage()


}

// CRUD
async function loadCatches() {
    clearCatchesContainer()
    let wrapperInner = document.querySelector("fieldset#main div")
    wrapperInner.setAttribute("id", "catches")
    let allCatches = await ((await fetch(catchesURL)).json())


    for (let item of allCatches) {
        wrapperInner.appendChild(createCatchContainer(item))
    }
}

function createCatchContainer(item) {
    const isOwner = sessionStorage.getItem("id") === item._ownerId
    let container = document.createElement("div");
    container.classList.add("catch")
    container.innerHTML = `<label>Angler</label>
    <input type="text" class="angler" value="${item.angler}" ${!isOwner ? 'disabled' : ''}>
    <label>Weight</label>
    <input type="text" class="weight" value="${item.weight}" ${!isOwner ? 'disabled' : ''}>
    <label>Species</label>
    <input type="text" class="species" value="${item.species}" ${!isOwner ? 'disabled' : ''}>
    <label>Location</label>
    <input type="text" class="location" value="${item.location}" ${!isOwner ? 'disabled' : ''}>
    <label>Bait</label>
    <input type="text" class="bait" value="${item.bait}" ${!isOwner ? 'disabled' : ''}>
    <label>Capture Time</label>
    <input type="number" class="captureTime" value="${item.captureTime}" ${!isOwner ? 'disabled' : ''}>
    <button class="update" data-id="${item._id}" ${!isOwner ? 'disabled' : ''}>Update</button>
    <button class="delete" data-id="${item._id}" ${!isOwner ? 'disabled' : ''}>Delete</button>`

    // let updateBtn = document.createElement("button");
    // updateBtn.textContent = "Update";
    // updateBtn.classList.add("update");
    // updateBtn.setAttribute("data-id", item._id)
    let updateBtn = container.querySelector(".update")
    updateBtn.addEventListener("click", updateCatchInfo)

    // let deleteBtn = document.createElement("button");
    // deleteBtn.textContent = "Delete";
    // deleteBtn.classList.add("delete")
    // deleteBtn.setAttribute("data-id", item._id)
    let deleteBtn = container.querySelector(".delete")
    deleteBtn.addEventListener("click", deleteCatch)

    // if (!isOwner) {
    //     updateBtn.disabled = true
    //     deleteBtn.disabled = true
    // }

    // container.appendChild(updateBtn)
    // container.appendChild(deleteBtn)

    return container
}

async function createNewCatchItem(event) {
    event.preventDefault()

    const data = new FormData(document.querySelector("form#addForm"));
    const details = Object.fromEntries(data)
    if (Object.values(details).some(value => value == "")) {
        return
    }

    let newCatchItem = JSON.stringify({
        angler: details.angler,
        weight: details.weight,
        species: details.species,
        location: details.location,
        bait: details.bait,
        captureTime: details.captureTime,
        owner: sessionStorage.getItem("id")
    })

    await fetch(catchesURL, {
        method: "POST",
        body: newCatchItem,
        headers: {
            "X-Authorization": sessionStorage.getItem("accessToken"),
            "Content-Type": "application/json"
        }
    })
    await loadCatches();
}

async function updateCatchInfo(event) {
    let currentBtn = event.target
    let idforUpdate = currentBtn.getAttribute("data-id")
    let container = currentBtn.parentElement

    let fields = Array.from(container.getElementsByTagName("input"))


    let entryToUpdate = fields.reduce((acc, curr) => {
        acc[curr.className] = curr.value
        return acc
    }, {})
    entryToUpdate.owner = sessionStorage.getItem("id")


    fetch(`${catchesURL}/${idforUpdate}`, {
        method: "PUT",
        body: JSON.stringify(entryToUpdate),
        headers: {
            "X-Authorization": sessionStorage.getItem("accessToken"),
            "Content-Type": "application/json"
        }
    })

    await loadCatches()

}

async function deleteCatch(event) {
    const response = await fetch(
        `http://localhost:3030/data/catches/${event.target.dataset.id}`,
        {
            method: "DELETE",
            headers: {
                "X-Authorization": sessionStorage.getItem("accessToken"),
            },
        }
    );

    if (!response.ok) {
        throw new Error(response.statusText);
    } else {
        await loadCatches();
    }
}

// utilities
function addEventTriggers() {
    homePageRedirectBtn.addEventListener("click", loadHomePage);
    logoutBtn.addEventListener("click", logoutUser)
    loginRedirectBtn.addEventListener("click", loadLoginPage);
    registerRedirectBtn.addEventListener("click", loadRegisterPage);

}

function clearMainContainerHTML() {
    mainContainer.innerHTML = ""
}

function clearCatchesContainer() {
    const catchesDivElem = document.getElementById("catches");
    if (catchesDivElem) {
        Array.from(catchesDivElem.children).forEach((child) => child.remove());
    }

}


const validators = {
    email: (email) => {
        let pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

        return pattern.test(email)
    }
}