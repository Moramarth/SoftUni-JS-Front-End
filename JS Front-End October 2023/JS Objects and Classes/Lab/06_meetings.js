function schedule(stringsArray) {
    let meetings = stringsArray.reduce((acc, curr) => {
        [day, nameOfPerson] = curr.split(" ");
        if (acc[day]) console.log(`Conflict on ${day}!`);
        else {
            acc[day] = nameOfPerson;
            console.log(`Scheduled for ${day}`)

        }
        return acc
    }, {})

    Object.entries(meetings).forEach(([key, value]) => {
        console.log(`${key} -> ${value}`);
    })
}