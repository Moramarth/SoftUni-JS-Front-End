const apiURL = "http://localhost:3030/jsonstore/tasks/"

const toDoSection = document.querySelector("#todo-section ul")
const InProgressSection = document.querySelector("#in-progress-section ul")
const codeReviewSection = document.querySelector("#code-review-section ul")
const doneSection = document.querySelector("#done-section ul")

const setByStatus = {
    "ToDo": {
        section: toDoSection,
        btnText: "Move to In Progress",
        nextStatus: "In Progress",
    },
    "In Progress": {
        section: InProgressSection,
        btnText: "Move to Code Review",
        nextStatus: "Code Review",
    },
    "Code Review": {
        section: codeReviewSection,
        btnText: "Move to Done",
        nextStatus: "Done",
    },
    "Done": {
        section: doneSection,
        btnText: "Close",
        nextStatus: null,
    },

}

function attachEvents() {
    document.querySelector("#load-board-btn").addEventListener("click", loadTasks)
    document.querySelector("#create-task-btn").addEventListener("click", addTask)
}

async function loadTasks() {
    clearTaskSections()
    let tasks = await ((await fetch(apiURL)).json())
    console.log(tasks)
    Object.values(tasks).map(task => separateSections(task))
}

async function addTask() {
    let taskTitle = document.querySelector("#title")
    let taskDescription = document.querySelector("#description")

    let newTask = JSON.stringify({
        title: taskTitle.value,
        description: taskDescription.value,
        status: "ToDo"
    })
    await fetch(apiURL, {
        method: "POST",
        body: newTask,
    })
    taskTitle.value = ""
    taskDescription.value = ""
    await loadTasks()
}

function separateSections(task) {

    let listItem = document.createElement("li")
    listItem.classList.add("task")
    listItem.innerHTML = `<h3>${task.title}</h3><p>${task.description}</p><button>${setByStatus[task.status].btnText}</button>`
    let actionBtn = listItem.querySelector("button")
    actionBtn.setAttribute("data-id", task._id)
    actionBtn.addEventListener("click", handleItemChange)


    setByStatus[task.status].section.appendChild(listItem)

}
async function handleItemChange(event) {
    let currentTask = await ((await fetch(`${apiURL}${event.target.dataset.id}`)).json())

    if (currentTask.status === "Done") {
        await closeTask(currentTask._id)
        return true
    };

    currentTask.status = setByStatus[currentTask.status].nextStatus

    await fetch(`${apiURL}${event.target.dataset.id}`, {
        method: "PATCH",
        body: JSON.stringify({
            currentTask
        })

    })
    await loadTasks()
}

async function closeTask(taskID) {
    await fetch(`${apiURL}${taskID}`, {
        method: "DELETE",
    })

    await loadTasks()
}

function clearTaskSections() {
    Object.values(setByStatus).map(value => value.section.textContent = "")
}


attachEvents();