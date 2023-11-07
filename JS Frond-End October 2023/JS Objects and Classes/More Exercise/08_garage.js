function garage(stringsArray) {
    const garage = {};

    stringsArray.map((element) => {
        [garageNumber, carInfo] = element.split(" - ");

        let car = carInfo.split(", ").reduce((acc, curr) => {
            [key, value] = curr.split(": ")
            acc[key] = value;
            return acc
        }, {})

        if (Object.keys(garage).includes(garageNumber)) {
            garage[garageNumber].push(car);

        } else {
            garage[garageNumber] = [car];
        }
    })

    Object.keys(garage).map((garageNumber) => {
        console.log(`Garage № ${garageNumber}`)
        garage[garageNumber].map((car) => {
            let output = [];
            Object.keys(car).map((key) => output.push(`${key} - ${car[key]}`))
            console.log(`--- ${output.join(", ")}`)
        })
    })
}