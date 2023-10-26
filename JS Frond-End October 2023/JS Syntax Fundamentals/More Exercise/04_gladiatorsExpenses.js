function gladiatorsExpenses(lostFigths, helmetPrice, swordPrice, shieldPrice, armorPrice) {
    let expenses = 0;
    let brokenShieldCount = 0
    if (lostFigths) {
        for (let i = 1; i <= lostFigths; i++) {
            if (i % 2 == 0) expenses += helmetPrice;
            if (i % 3 == 0) expenses += swordPrice;
            if (i % 2 == 0 && i % 3 == 0) {
                expenses += shieldPrice;
                brokenShieldCount += 1;
                if (brokenShieldCount % 2 == 0) expenses += armorPrice;
            }
        }
    }
    console.log(`Gladiator expenses: ${expenses.toFixed(2)} aureus`)
}