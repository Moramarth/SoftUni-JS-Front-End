function convertToJSON(firstName, lastName, hairColor) {
    console.log(JSON.stringify({
        name: firstName,
        lastName,
        hairColor,
    }));
}