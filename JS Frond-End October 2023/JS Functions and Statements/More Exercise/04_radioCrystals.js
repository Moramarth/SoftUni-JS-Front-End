function radioCrystals(infoArray) {

    const canCut = (crystalChunk) => crystalChunk / 4 >= target - 1;
    const canLap = (crystalChunk) => crystalChunk * 0.8 >= target - 1;
    const canGrind = (crystalChunk) => crystalChunk - 20 >= target - 1;
    const canEtch = (crystalChunk) => crystalChunk - 2 >= target - 1;

    const cut = (crystal) => crystal / 4;
    const lap = (crystal) => crystal * 0.8;
    const grind = (crystal) => crystal - 20;
    const etch = (crystal) => crystal - 2;

    function transportAndWash(crystal) {
        console.log("Transporting and washing")
        return Math.floor(crystal)
    };


    [target, ...rawCrystals] = infoArray

    for (let crystal of rawCrystals) {

        console.log(`Processing chunk ${crystal} microns`)

        while (crystal > target) {
            if (canCut(crystal)) {
                let counter = 0
                while (canCut(crystal)) {
                    crystal = cut(crystal)
                    counter++
                }
                console.log(`Cut x${counter}`);
                crystal = transportAndWash(crystal);
            }

            if (canLap(crystal)) {
                let counter = 0
                while (canLap(crystal)) {
                    crystal = lap(crystal)
                    counter++
                }
                console.log(`Lap x${counter}`);
                crystal = transportAndWash(crystal)
            }

            if (canGrind(crystal)) {
                let counter = 0
                while (canGrind(crystal)) {
                    crystal = grind(crystal)
                    counter++
                }
                console.log(`Grind x${counter}`);
                crystal = transportAndWash(crystal)
            }

            if (canEtch(crystal)) {
                let counter = 0
                while (canEtch(crystal)) {
                    crystal = etch(crystal)
                    counter++
                }
                console.log(`Etch x${counter}`);
                crystal = transportAndWash(crystal)
            }
        }

        if (crystal < target) {
            crystal++
            console.log("X-ray x1")
        }

        console.log(`Finished crystal ${crystal} microns`)
    }

}