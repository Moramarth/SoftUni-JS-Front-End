function ages(number) {
    let output;
    // if (number < 0) {
    //     output = "out of bounds";
    // } else if (number <= 2) {
    //     output = "baby";
    // } else if (number <= 13) {
    //     output = "child";
    // } else if (number <= 19) {
    //     output = "teenager";
    // } else if (number <= 65) {
    //     output = "adult";
    // } else {
    //     output = "elder";
    // }
    if (number < 0) output = "out of bounds";
    else if (number <= 2) output = "baby";
    else if (number <= 13) output = "child";
    else if (number <= 19) output = "teenager";
    else if (number <= 65) output = "adult";
    else output = "elder";
    console.log(output)
}