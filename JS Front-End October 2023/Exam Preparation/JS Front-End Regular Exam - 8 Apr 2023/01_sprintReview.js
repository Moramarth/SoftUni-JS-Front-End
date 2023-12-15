function sprintReview(initialArray) {
    const initialStateDataCount = initialArray.shift()
    const initialData = initialArray.slice(0, initialStateDataCount)
    const commands = initialArray.slice(initialStateDataCount)

    const commandsMap = {
        "Add New": addNewTask,
        "Change Status": changeStatus,
        "Remove Task": removeTask,
    }

    const taskStatusPointsMap = {
        "ToDo": 0,
        "In Progress": 0,
        "Code Review": 0,
        "Done": 0
    }

    const sprint = initialData.reduce((acc, curr) => {
        const [assignee, ...rest] = curr.split(":")

        const task = processTaskData(rest)

        if (acc.hasOwnProperty(assignee)) {
            acc[assignee].push(task)
        } else {
            acc[assignee] = [task]
        }
        return acc
    }, {})

    for (const data of commands) {
        const [command, ...rest] = data.split(":")
        commandsMap[command](rest)
    }

    generateOutput()

    function processTaskData(data) {
        const [
            taskId,
            title,
            status,
            estimatedPoints
        ] = data
        const task = {
            taskId,
            title,
            status,
            estimatedPoints,
        }

        return task
    }

    function addNewTask(data) {
        const assignee = data.shift()


        if (sprint.hasOwnProperty(assignee)) {
            const task = processTaskData(data)
            sprint[assignee].push(task)
        } else {
            console.log(`Assignee ${assignee} does not exist on the board!`)
        }
    }

    function changeStatus(data) {
        const [assignee, taskId, newStatus] = data;

        if (!sprint.hasOwnProperty(assignee)) {
            console.log(`Assignee ${assignee} does not exist on the board!`)

        } else if (!sprint[assignee].find(task => task.taskId == taskId)) {
            console.log(`Task with ID ${taskId} does not exist for ${assignee}!`)
        } else {
            sprint[assignee].find(task => task.taskId == taskId).status = newStatus
        }
    }

    function removeTask(data) {
        [assignee, index] = data
        index = Number(index)
        if (!sprint.hasOwnProperty(assignee)) {
            console.log(`Assignee ${assignee} does not exist on the board!`)
        } else if (index < 0 || index >= sprint[assignee].length) {
            console.log("Index is out of range!")
        } else {
            sprint[assignee].splice(index, 1)
        }
    }

    function generateOutput() {

        Object.values(sprint).map(value => value.map(task => {
            taskStatusPointsMap[task.status] += Number(task.estimatedPoints)
        }))

        console.log(`ToDo: ${taskStatusPointsMap["ToDo"]}pts`)
        console.log(`In Progress: ${taskStatusPointsMap["In Progress"]}pts`)
        console.log(`Code Review: ${taskStatusPointsMap["Code Review"]}pts`)
        console.log(`Done Points: ${taskStatusPointsMap["Done"]}pts`)

        if (taskStatusPointsMap["Done"] >= taskStatusPointsMap["ToDo"]
            + taskStatusPointsMap["In Progress"]
            + taskStatusPointsMap["Code Review"]
        ) console.log("Sprint was successful!")
        else console.log("Sprint was unsuccessful...")
       }
}

sprintReview([
    '0',
    'Kiril:BOP-1213:Fix Typo:Done:1',
    'Peter:BOP-1214:New Products Page:In Progress:2',
    'Mariya:BOP-1215:Setup Routing:ToDo:8',
    'Georgi:BOP-1216:Add Business Card:Code Review:3',
    'Add New:Sam:BOP-1237:Testing Home Page:Done:3',
    'Change Status:Georgi:BOP-1216:Done',
    'Change Status:Will:BOP-1212:In Progress',
    'Remove Task:Georgi:3',
    'Change Status:Mariya:BOP-1215:Done',
]

)