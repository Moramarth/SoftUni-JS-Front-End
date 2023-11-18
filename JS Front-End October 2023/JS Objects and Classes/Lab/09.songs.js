function printSongs(arr) {
    class Song {
        constructor(typeList, name, time) {
            this.typeList = typeList;
            this.name = name;
            this.time = time;
        }
    }

    const targetType = arr.pop();
    let [_, ...songs] = arr;

    songs.map((string) => {
        let [typeList, name, time] = string.split("_");
        let current_song = new Song(typeList, name, time);
        return current_song;
    }).filter((song) => {
        if (targetType === "all") console.log(song.name);
        else if (song.typeList === targetType) console.log(song.name);
    });
}