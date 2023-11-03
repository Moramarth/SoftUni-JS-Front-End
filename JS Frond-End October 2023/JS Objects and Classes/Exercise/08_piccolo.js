function parkingLot(carInfo) {
    let parking = [];

    carInfo.map((car) => {
        [command, plateNumber] = car.split(", ")
        if (command === "IN" && !parking.includes(plateNumber)) parking.push(plateNumber);
        else if (command === "OUT" && parking.indexOf(plateNumber) >= 0) {
            parking.splice(parking.indexOf(plateNumber), 1)

        }
    })

    if (parking.length != 0) console.log(parking.sort().join("\n").trim());
    else console.log("Parking Lot is Empty");
}