function convertToObject(jsonString) {
    let obj = JSON.parse(jsonString);

    Object.entries(obj).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
    })
}