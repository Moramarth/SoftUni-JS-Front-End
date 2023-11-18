function bitcoinMining(numbersArray) {
    const bitcoinCost = 11949.16
    const goldValue = 67.51


    let bitcoinCount = 0;
    let firstDayToBuyBitcoin;
    let money = 0;

    for (let i = 1; i <= numbersArray.length; i++) {

        minedGold = numbersArray[i - 1];
        if (i % 3 == 0) minedGold *= 0.70;

        money += minedGold * goldValue

        if (money >= bitcoinCost) {
            canBuyCount = parseInt(money / bitcoinCost)
            bitcoinCount += canBuyCount
            money -= canBuyCount * bitcoinCost

            if (!firstDayToBuyBitcoin) firstDayToBuyBitcoin = i;
        }
    }

    console.log(`Bought bitcoins: ${bitcoinCount}`);
    if (firstDayToBuyBitcoin) {
        console.log(`Day of the first purchased bitcoin: ${firstDayToBuyBitcoin}`)
    }
    console.log(`Left money: ${money.toFixed(2)} lv.`)
}