function arrayRotation(startingArray, numberOfRotations) {

    for (let i = 0; i < numberOfRotations; i++) {
        element = startingArray.shift();
        startingArray.push(element);
    }

    console.log(startingArray.join(" "))
}