function fligthSchedule(nestedArrays) {
    const airportSector = nestedArrays[0].slice();
    const statusChanges = nestedArrays[1].slice();
    const keyword = nestedArrays[2][0];

    const airport = airportSector.reduce((acc, curr) => {
        let info = curr.split(" ");
        if (info.length == 2) [sector, destination] = info;
        else {
            [sector, ...rest] = info;
            destination = rest.join(" ");
        }
        acc[sector] = {
            Destination: destination,
            Status: null
        }
        return acc
    }, {})

    statusChanges.map((info) => {
        let [sector, status] = info.split(" ");
        if (Object.keys(airport).includes(sector)) {
            airport[sector].Status = status;
        }
    })


    Object.values(airport).forEach((value) => {
        if (value.Status === null && keyword === "Ready to fly") {
            value.Status = "Ready to fly"
            console.log(value)
        } else if (value.Status !== null && keyword === "Cancelled") console.log(value)
    });

}