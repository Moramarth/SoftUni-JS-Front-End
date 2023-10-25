function cookingByNumbers(number, command1, command2, command3, command4, command5) {
    let startingNumber = Number(number);
    const commands = [command1, command2, command3, command4, command5];

    commands.forEach(element => {
        switch (element) {
            case "chop":
                startingNumber = startingNumber / 2
                break;
            case "dice":
                startingNumber = Math.sqrt(startingNumber)
                break;
            case "spice":
                startingNumber += 1
                break;
            case "bake":
                startingNumber *= 3
                break;
            case "fillet":
                startingNumber = startingNumber - startingNumber * 0.2
                break;
        }
        console.log(startingNumber)
    });
}