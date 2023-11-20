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



//API URLS
const usersURL = "http://localhost:3030/users"
const catchesURL = "http://localhost:3030/data/catches"

addEventTriggers();

document.querySelector("#register-view").innerHTML = "";
document.querySelector("#login-view").innerHTML = "";
document.querySelector("#home-view").innerHTML = "";

let currentUser = {
    email: "guest",
    accessToken: "",
    _id: "",
}
loadHomePage();


function loadHomePage() {


    clearMainContainerHTML();

    document.querySelector("nav p span").textContent = currentUser.email

    if (!currentUser.accessToken) {
        logoutContainer.style.display = "none"
        noLoginContainer.style.display = "inline-block"
    } else {
        noLoginContainer.style.display = "none"
        logoutContainer.style.display = "inline-block"
    }
    let sectionHome = document.createElement("section");
    sectionHome.id = "home-view"
    let p = document.createElement("p")
    p.textContent = "Click to load catches";
    mainContainer.appendChild(p)
    sectionHome.innerHTML += homeView

    mainContainer.appendChild(sectionHome)
    let catchesData = document.querySelector("fieldset#main");
    catchesData.innerHTML = "";
    catchesData.style.border = "none"
    const loadCatchesBtn = document.querySelector("aside button.load");
    loadCatchesBtn.addEventListener("click", loadCatches);

    const addBtn = document.querySelector("aside button.add")
    addBtn.addEventListener("click", createNewCatchItem);

    if (!currentUser.accessToken) {
        addBtn.disabled = true
    } else {
        addBtn.disabled = false
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

    currentUser.accessToken = response.accessToken
    currentUser._id = response._id
    currentUser.email = response.email

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

    currentUser.accessToken = response.accessToken
    currentUser._id = response._id
    currentUser.email = response.email

    loadHomePage()
}

async function logoutUser() {
    let response = await fetch(`${usersURL}/logout`, {
        method: "GET",
        headers: {
            "X-Authorization": currentUser.accessToken
        }
    })

    if (response.status === 204) {
        currentUser = {
            email: "guest",
            accessToken: "",
            _id: "",
        }
        loadHomePage()
    } else {
        return
    }


}

// CRUD
async function loadCatches() {
    mainContainer.querySelector("p").style.display = "none"


    let catchesData = document.querySelector("fieldset#main");
    catchesData.innerHTML = "<legend>Catches</legend>"
    catchesData.style.border = "" //take border from css
    let wrapperInner = document.createElement("div")
    wrapperInner.setAttribute("id", "catches")
    let allCatches = await ((await fetch(catchesURL)).json())


    for (let item of allCatches) {
        wrapperInner.appendChild(createCatchContainer(item))
    }
    catchesData.appendChild(wrapperInner)


}

function createCatchContainer(item) {
    const isOwner = currentUser._id === item._ownerId
    let container = document.createElement("div");
    container.setAttribute("class", "catch")
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
    <input type="number" class="captureTime" value="${item.captureTime}" ${!isOwner ? 'disabled' : ''}>`

    let updateBtn = document.createElement("button");
    updateBtn.textContent = "Update";
    updateBtn.classList.add("update");
    updateBtn.setAttribute("data-id", item._id)
    updateBtn.addEventListener("click", updateCatchInfo)

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete")
    deleteBtn.setAttribute("data-id", item._id)
    deleteBtn.addEventListener("click", deleteCatch)

    if (!isOwner) {
        updateBtn.disabled = true
        deleteBtn.disabled = true
    }

    container.appendChild(updateBtn)
    container.appendChild(deleteBtn)

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
        owner: currentUser._id
    })

    await fetch(catchesURL, {
        method: "POST",
        body: newCatchItem,
        headers: {
            "X-Authorization": currentUser.accessToken
        }
    })
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
    entryToUpdate.owner = currentUser._id


    let result = fetch(`${catchesURL}/${idforUpdate}`, {
        method: "PUT",
        body: JSON.stringify(entryToUpdate),
        headers: {
            "X-Authorization": currentUser.accessToken,
            "Content-Type": "application/json"
        }
    })

    return result.done

}

function deleteCatch(event) {

    let currentBtn = event.target
    let idforDelete = currentBtn.getAttribute("data-id")

    fetch(`${catchesURL}/${idforDelete}`, {
        method: "DELETE",
        headers: {
            "X-Authorization": currentUser.accessToken
        }
    })



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


const validators = {
    email: (email) => {
        let pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

        return pattern.test(email)
    }
}