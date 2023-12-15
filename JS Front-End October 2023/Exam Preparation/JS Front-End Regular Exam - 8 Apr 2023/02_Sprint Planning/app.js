window.addEventListener('load', solve);

function solve() {
    const totalPointsField = document.querySelector("#total-sprint-points")
    const hiddenField = document.querySelector('#task-id')
    const createBtn = document.querySelector("#create-task-btn")
    const deleteBtn = document.querySelector("#delete-task-btn")
    const tasksSection = document.querySelector('#tasks-section')

    //input fields
    const titleInput = document.querySelector('#title');
    const descriptionInput = document.querySelector('#description');
    const labelInput = document.querySelector('#label');
    const pointsInput = document.querySelector('#points');
    const assigneeInput = document.querySelector('#assignee');

    const labelsMap = {
        "Feature": {
            class: 'feature',
            icon: '&#8865'
        },
        "Low Priority Bug": {
            class: 'low-priority',
            icon: '&#9737'
        },
        "High Priority Bug": {
            class: 'high-priority',
            icon: '&#9888'
        },
    }

    let articleIdCounter = 0
    let totalPoints = 0

    evaluateTotalPoints()

    createBtn.addEventListener('click', createTask)
    deleteBtn.addEventListener('click', deleteTask)

    function createTask(event) {
        event.preventDefault()

        if (titleInput.value === ""
            || descriptionInput.value === ""
            || labelInput.value === ""
            || pointsInput.value === ""
            || assigneeInput.value === ""
        ) return;


        const articleData = {
            title: titleInput.value,
            description: descriptionInput.value,
            label: labelInput.value,
            points: pointsInput.value,
            assignee: assigneeInput.value,
        }

        const article = handleArticleCreation(articleData)
        tasksSection.appendChild(article)
        evaluateTotalPoints()
        clearInputFields()

    }

    function deleteTask(event) {
        event.preventDefault()
        article = document.querySelector(`#${hiddenField.textContent}`)
        article.remove()
        totalPoints -= Number(pointsInput.value)
        toggleDisabledStatus()
        evaluateTotalPoints()
        clearInputFields()
        
        
    }
    function handleArticleCreation(articleData) {
        articleIdCounter++
        totalPoints += Number(articleData.points)
        const taskDeleteBtn = document.createElement('button')
        taskDeleteBtn.textContent = 'Delete'
        taskDeleteBtn.addEventListener('click', handleDeleteRequest)

        const actionElement = document.createElement('div')
        actionElement.classList.add("task-card-actions")
        actionElement.appendChild(taskDeleteBtn)

        const assignedToElement = document.createElement('div')
        actionElement.classList.add("task-card-assignee")
        assignedToElement.textContent = `Assigned to: ${articleData.assignee}`

        const pointsElement = document.createElement('div')
        actionElement.classList.add("task-card-points")
        pointsElement.textContent = `Estimated at ${articleData.points} pts`

        const descriptionElement = document.createElement('p')
        descriptionElement.classList.add('task-card-description')
        descriptionElement.textContent = `${articleData.description}`

        const titleElement = document.createElement('h3')
        titleElement.classList.add('task-card-title')
        titleElement.textContent = articleData.title

        const labelElement = document.createElement('div')
        labelElement.classList.add('task-card-label')
        labelElement.classList.add(labelsMap[articleData.label].class)
        labelElement.innerHTML = `${articleData.label} ${labelsMap[articleData.label].icon}`

        const articleElement = document.createElement('article')
        articleElement.classList.add('task-card')
        articleElement.setAttribute("id", `task-${articleIdCounter}`)

        articleElement.appendChild(labelElement)
        articleElement.appendChild(titleElement)
        articleElement.appendChild(descriptionElement)
        articleElement.appendChild(pointsElement)
        articleElement.appendChild(assignedToElement)
        articleElement.appendChild(actionElement)

        return articleElement

        function handleDeleteRequest(event) {
            event.preventDefault()
            titleInput.value = articleData.title
            descriptionInput.value = articleData.description
            labelInput.value = articleData.label
            pointsInput.value = articleData.points
            assigneeInput.value = articleData.assignee

            toggleDisabledStatus()

            hiddenField.textContent = articleElement.id
        };
    };


    function evaluateTotalPoints() {
        totalPointsField.textContent = `Total Points ${totalPoints}pts`
    };

    function clearInputFields() {
        titleInput.value = ""
        descriptionInput.value = ""
        labelInput.value = ""
        pointsInput.value = ""
        assigneeInput.value = ""
        hiddenField.textContent = ""
    }
    function toggleDisabledStatus() {
        titleInput.disabled = !titleInput.disabled
        descriptionInput.disabled = !descriptionInput.disabled
        labelInput.disabled = !labelInput.disabled
        pointsInput.disabled = !pointsInput.disabled
        assigneeInput.disabled = !assigneeInput.disabled
        createBtn.disabled = !createBtn.disabled
        deleteBtn.disabled = !deleteBtn.disabled
    }
}