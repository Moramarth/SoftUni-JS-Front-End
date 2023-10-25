function princtAndSum(firstNumber, secondNumber) {
    let sequence = []
    let total_sum = 0;
    if (firstNumber < secondNumber) {
        for (let i = firstNumber; i <= secondNumber; i++) {
            total_sum += i;
            sequence.push(i)
        }
    } else {
        for (let i = firstNumber; i >= secondNumber; i--) {
            total_sum += i;
            sequence.push(i)
        }
    }
    console.log(sequence.join(" "))
    console.log(`Sum: ${total_sum}`)
}