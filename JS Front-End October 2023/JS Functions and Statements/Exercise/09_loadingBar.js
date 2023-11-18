function loadingBar(percentege) {
    if (percentege === 100) {
        console.log("100% Complete");
        console.log("[" + "%".repeat(10) + "]");
    } else {
        console.log(`${percentege}% [${"%".repeat(percentege / 10)}${".".repeat(10 - percentege / 10)}]`);
        console.log("Still loading...");
    }
}