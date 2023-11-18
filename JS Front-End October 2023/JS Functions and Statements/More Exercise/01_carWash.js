function carWash(commands) {
    let cleanPercent = 0;

    const cleanStatus = {
        soap: (cleanPercent) => cleanPercent + 10,
        water: (cleanPercent) => cleanPercent * 1.20,
        'vacuum cleaner': (cleanPercent) => cleanPercent * 1.25,
        mud: (cleanPercent) => cleanPercent * 0.9
    }

    for (let command of commands) {
        cleanPercent = cleanStatus[command](cleanPercent);
    }

    console.log(`The car is ${cleanPercent.toFixed(2)}% clean.`)
}