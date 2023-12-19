function solve() {
    const textBox = document.querySelector('#info span')
    const departBtn = document.querySelector('#depart')
    const arriveBtn = document.querySelector('#arrive')

    const stopInfo = {
        name: 'Depot',
        next: 'depot'
    }

    async function depart() {

        changeBtnStatus()

        const nextStop = await ((await fetch(`http://localhost:3030/jsonstore/bus/schedule/${stopInfo.next}`)).json())
        stopInfo.name = nextStop.name
        stopInfo.next = nextStop.next
        textBox.textContent = `Next stop ${stopInfo.name}`

    }

    async function arrive() {
        textBox.textContent = `Arraving at ${stopInfo.name}`
        changeBtnStatus()
    }

    return {
        depart,
        arrive
    };

    function changeBtnStatus() {
        departBtn.disabled = !departBtn.disabled
        arriveBtn.disabled = !arriveBtn.disabled
    }
}

let result = solve();