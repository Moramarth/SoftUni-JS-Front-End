function fruit(fruitName, grams, priceForKilogram) {
    let kilograms = grams / 1000;
    let totalPrice = priceForKilogram * kilograms;
    console.log(`I need $${totalPrice.toFixed(2)} to buy ${kilograms.toFixed(2)} kilograms ${fruitName}.`);
}