function movies(stringsArray) {

    let movieObjs = [];

    function movieNameExists(string) {
        let movieNames = movieObjs.map(element => element.name);
        return (movieNames.some((name) => string.includes(name)));
    }

    function createMovie(string) {
        return {
            name: string.slice(9),
        };
    }

    function addDirector(string) {
        const commandIndex = string.indexOf("directedBy");
        let director = string.slice(commandIndex + 11);
        let movieName = string.slice(0, commandIndex - 1);
        movieObjs.map((movie) => {
            if (movie.name === movieName) movie.director = director;
        });
    }

    function addDate(string) {
        const commandIndex = string.indexOf("onDate");
        let date = string.slice(commandIndex + 7);
        let movieName = string.slice(0, commandIndex - 1);
        movieObjs.map((movie) => {
            if (movie.name === movieName) movie.date = date;
        });
    }

    function printMovie() {
        movieObjs.map((movie) => {
            if (Object.keys(movie).length === 3) console.log(JSON.stringify(movie));
        })
    }

    for (let string of stringsArray) {

        if (string.startsWith("addMovie")) movieObjs.push(createMovie(string));
        else if (movieNameExists(string)) {
            if (string.includes("directedBy")) addDirector(string);
            else if (string.includes("onDate")) addDate(string);
        }
    }
    printMovie()
}