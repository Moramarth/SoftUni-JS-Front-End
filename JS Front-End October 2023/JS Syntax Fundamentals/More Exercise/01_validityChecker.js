function validityChecker(pointAX, pointAY, pointBX, pointBY) {
    let validation, x1, y1; 
    let x2 = 0, y2 = 0;

    for (let i = 1; i <= 3; i++) {
        if (i == 1) {
            x1 = pointAX;
            y1 = pointAY;
        } else if (i == 2) {
            x1 = pointBX;
            y1 = pointBY;
        } else {
            x1 = pointAX;
            y1 = pointAY;
            x2 = pointBX;
            y2 = pointBY;
        }

        validation = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
        if (Number.isInteger(validation)) console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is valid`);
        else console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is invalid`);
    }
}