function cats(stringsArray) {
    class Cat {
        constructor(name, age) {
            this.name = name
            this.age = age
        }

        meow() {
            console.log(`${this.name}, age ${this.age} says Meow`)
        }

    }

    // let catsArray = []

    for (let element of stringsArray) {
        [catName, catAge] = element.split(" ")
        // catsArray.push(new Cat(catName, catAge))
        let cat = new Cat(catName, catAge)
        cat.meow()
    }

    // for (let cat of catsArray) {
    //     cat.meow()
    // }
}