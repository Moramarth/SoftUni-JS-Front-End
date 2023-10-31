function orders(product, quantity) {

    const productPrice = {
        coffee: 1.5,
        water: 1,
        coke: 1.4,
        snacks: 2,
    }

    console.log((productPrice[product] * quantity).toFixed(2))
}