function bookShelf(stringsArray) {
    const shelfs = {};

    function organiseShelfs(element) {
        [shelfId, shelfGenre] = element.split(" -> ");
        if (!shelfs.hasOwnProperty(shelfId)) {
            shelfs[shelfId] = {
                genre: shelfGenre,
                books: []
            };
        };
    };

    function arrangeBooks(element) {
        [bookTitle, bookData] = element.split(": ");
        [bookauthor, bookGenre] = bookData.split(", ");

        let currentShelf = Object.keys(shelfs).find((key) => shelfs[key].genre === bookGenre);
        if (currentShelf) {
            shelfs[currentShelf].books.push({
                title: bookTitle,
                author: bookauthor,
            });
        };
    };

    function logOutput() {
        let sortedKeys = Object.keys(shelfs).sort((a, b) => shelfs[b].books.length - shelfs[a].books.length)

        for (let key of sortedKeys) {
            console.log(`${key} ${shelfs[key].genre}: ${shelfs[key].books.length} `);
            shelfs[key].books.sort((a, b) => a.title.localeCompare(b.title)).forEach(element => {
                console.log(`--> ${element.title}: ${element.author}`);
            });
        };
    };

    stringsArray.map((element) => {
        if (element.includes("->")) organiseShelfs(element);
        else if (element.includes(":")) arrangeBooks(element);
    });
    logOutput();
}