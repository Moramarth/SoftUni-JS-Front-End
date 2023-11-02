function cityInfo(city) {
    Object.keys(city).forEach((key) => {
        console.log(`${key} -> ${city[key]}`)
    })
}