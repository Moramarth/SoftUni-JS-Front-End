function heroesInfo(stringsArray) {
    const heroes = [];

    stringsArray.map((string) => {
        let [heroName, level, items] = string.split(" / ");

        heroes.push({
            heroName,
            level: Number(level),
            items,
        });
    });

    heroes
        .sort((a, b) => (a.level - b.level))
        .map((hero) => {
            console.log(`Hero: ${hero.heroName}`);
            console.log(`level => ${hero.level}`);
            console.log(`items => ${hero.items}`);
        })
}