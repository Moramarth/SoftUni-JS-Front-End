function spiceMustFlow(maximumYield) {
    let daysCount = 0;
    let harvestedSpice = 0;

    while (maximumYield >= 100) {
        harvestedSpice += maximumYield;
        maximumYield -= 10;
        harvestedSpice -= 26
        daysCount += 1
    }
    
    harvestedSpice -= 26

    console.log(daysCount);
    console.log(Math.max(0, harvestedSpice));
}