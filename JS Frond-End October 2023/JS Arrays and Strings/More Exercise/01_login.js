function login(stringsArray) {
    username = stringsArray[0]

    for (let i = 1; i <= 4; i++) {
        currentTry = (stringsArray[i].split("")).reverse();
        if (currentTry.join("") === username) {
            console.log(`User ${username} logged in.`);
            break;
        } else {
            if (i === 4) {
                console.log(`User ${username} blocked!`);
                break;
            }
            console.log("Incorrect password. Try again.");
        }
    }
}