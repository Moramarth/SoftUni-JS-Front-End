const apiEndpoint = 'http://localhost:3030/jsonstore/tasks/'


// inputs
const foodInput = document.querySelector('#food');
const timeInput = document.querySelector('#time');
const caloriesInput = document.querySelector('#calories');

const addMealBtn = document.querySelector('#add-meal');
const editMealBtn = document.querySelector('#edit-meal');
const loadBtn = document.querySelector('#load-meals');

const mealsList = document.querySelector('#list');

loadBtn.addEventListener('click', loadAllMeals);
addMealBtn.addEventListener('click', addMeal);
editMealBtn.addEventListener('click', editMeal);

async function loadAllMeals() {
    clearMealsList()
    const meals = await ((await fetch(apiEndpoint)).json())

    Object.values(meals).map(meal => processMeal(meal))
}

function processMeal(meal) {
    const mealElement = document.createElement('div')
    mealElement.classList.add('meal')

    const foodHeaderElement = document.createElement('h2')
    foodHeaderElement.textContent = meal.food

    const timeHeaderElement = document.createElement('h3')
    timeHeaderElement.textContent = meal.time

    const caloriesHeaderElement = document.createElement('h3')
    caloriesHeaderElement.textContent = meal.calories

    const mealBtnsWrapper = document.createElement('div')
    mealBtnsWrapper.setAttribute('id', 'meal-buttons')

    const changeBtn = document.createElement('button')
    changeBtn.classList.add('change-meal')
    changeBtn.textContent = 'Change'
    changeBtn.addEventListener('click', handleChangeRequest)
    changeBtn.dataset.id = meal._id

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete-meal')
    deleteBtn.textContent = 'Delete'
    deleteBtn.addEventListener('click', handleDeleteRequest)
    deleteBtn.dataset.id = meal._id

    mealBtnsWrapper.appendChild(changeBtn)
    mealBtnsWrapper.appendChild(deleteBtn)

    mealElement.appendChild(foodHeaderElement)
    mealElement.appendChild(timeHeaderElement)
    mealElement.appendChild(caloriesHeaderElement)
    mealElement.appendChild(mealBtnsWrapper)

    mealsList.appendChild(mealElement)

}

function clearMealsList() {
    mealsList.innerHTML = ''
}

function clearInputs() {
    foodInput.value = ''
    timeInput.value = ''
    caloriesInput.value = ''
}

function changeBtnStatus() {
    addMealBtn.disabled = !addMealBtn.disabled
    editMealBtn.disabled = !editMealBtn.disabled
}

async function addMeal(event) {
    event.preventDefault()
    if (!foodInput.value || !timeInput.value || !caloriesInput.value) return;
    
    const newMeal = JSON.stringify({
        food: foodInput.value,
        time: timeInput.value,
        calories: caloriesInput.value,
    })

    await fetch(apiEndpoint, {
        method: 'POST',
        body: newMeal,
        headers: {
            'Content-type': 'application/json'
        }
    })

    await loadAllMeals().then(clearInputs())
    
}

async function editMeal(event) {
    event.preventDefault()

    const editedMeal = JSON.stringify({
        food: foodInput.value,
        time: timeInput.value,
        calories: caloriesInput.value,
        _id: foodInput.dataset.id
    })



    await fetch(`${apiEndpoint}${foodInput.dataset.id}`, {
        method: 'PUT',
        body: editedMeal,
        headers: {
            'Content-type': 'application/json'
        }
    })
    foodInput.dataset.id = ""

    await loadAllMeals()

    changeBtnStatus()
    clearInputs()

}

async function handleChangeRequest(event) {
    const container = event.target.parentElement.parentElement
    container.remove()

    const meals = await ((await fetch(apiEndpoint)).json())
    const currentMeal = Object.values(meals).find(meal => meal._id === event.target.dataset.id)

    foodInput.value = currentMeal.food
    timeInput.value = currentMeal.time
    caloriesInput.value = currentMeal.calories
    foodInput.dataset.id = currentMeal._id

    changeBtnStatus()
}

async function handleDeleteRequest(event) {
    await fetch(`${apiEndpoint}${event.target.dataset.id}`, {
        method: "DELETE"
    })

    await loadAllMeals()
}