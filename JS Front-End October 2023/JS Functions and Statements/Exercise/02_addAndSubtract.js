function addAndSubtract(x, y, z) {
    function sum() {
        return x + y
    }

    function subtract() {
        return sum() - z
    }

    console.log(subtract())
}