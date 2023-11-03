class Storage {
    constructor(capacity) {
        this.capacity = capacity
        this.storage = []
        this.totalCost = 0
    }

    addProduct(input) {
        this.storage.push(input)
        this.capacity -= input.quantity
        this.totalCost += input.quantity * input.price
    }

    getProducts() {
        return this.storage.map((product) => JSON.stringify(product)).join("\n").trim()
    }
}