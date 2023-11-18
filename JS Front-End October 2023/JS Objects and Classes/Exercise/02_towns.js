function townInfo(stringsArr) {
    stringsArr.map((string => {
        let [townName, latitude, longitude] = string.split(" | ")
        console.log({
            town: townName,
            latitude: Number(latitude).toFixed(2),
            longitude: Number(longitude).toFixed(2),
        })
    }))
}