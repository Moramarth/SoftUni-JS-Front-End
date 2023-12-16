function cafeteria(initialArray) {
    const baristasCount = initialArray.shift();

    const team = initialArray.slice(0, baristasCount);

    const commands = initialArray.slice(baristasCount);

    const actionsMap = {
        Prepare: prepareCoffee,
        'Change Shift': changeShift,
        Learn: learnSkill,
    }

    const employees = team.reduce((acc, curr) => {
        const [name, shift, skills] = curr.split(" ")
        const coffeeTypes = skills.split(",")
        acc[name] = {
            shift,
            coffeeTypes,
        }
        return acc
    }, {})

    for (const command of commands) {
        if (command === "Closed")
            break;

        info = command.split(" / ")
        const toDo = info.shift()

        actionsMap[toDo](info)

    }
    generateOutput()

    function prepareCoffee(info) {
        const [name, shift, coffeeType] = info

        if (employees[name].shift === shift &&
            employees[name].coffeeTypes.find(coffee => coffee === coffeeType))
            console.log(`${name} has prepared a ${coffeeType} for you!`);
        else console.log(`${name} is not available to prepare a ${coffeeType}.`)
    }

    function changeShift(info) {
        const [name, newShift] = info
        employees[name].shift = newShift
        console.log(`${name} has updated his shift to: ${newShift}`)
    }

    function learnSkill(info) {
        const [name, skill] = info
        if (employees[name].coffeeTypes.find(coffee => coffee === skill))
        console.log(`${name} knows how to make ${skill}.`);
    else {
        employees[name].coffeeTypes.push(skill)
        console.log(`${name} has learned a new coffee type: ${skill}.`)
    }
    }

    function generateOutput() {
        Object.entries(employees).map( ([key, value]) => {

            console.log(`Barista: ${key}, Shift: ${value.shift}, Drinks: ${value.coffeeTypes.join(", ")}`)
        })
    }

}


cafeteria(['4',
'Alice day Espresso,Cappuccino',
'Bob night Latte,Mocha',
'Carol day Americano,Mocha',
'David night Espresso',
'Prepare / Alice / day / Espresso',
'Change Shift / Bob / day',
'Learn / Carol / Latte',
'Prepare / Bob / night / Latte',
'Learn / David / Cappuccino',
'Prepare / Carol / day / Cappuccino',
'Change Shift / Alice / night',
 'Learn / Bob / Mocha',
'Prepare / David / night / Espresso',
'Closed']

)