function armies(stringsArray) {
    const leaderArrives = (string) => string.includes("arrives");
    const leaderDefeated = (string) => string.includes("defeated");

    const armiesInfo = {}

    actions = {
        listLeader: (string) => {
            leaderName = string.slice(0, string.indexOf("arrives") - 1);
            armiesInfo[leaderName] = { totalArmy: 0 }
        },

        deleteLeader: (string) => {
            leaderName = string.slice(0, string.indexOf("defeated") - 1);
            if (Object.keys(armiesInfo).includes(leaderName)) delete armiesInfo[leaderName];
        },

        addArmyToLeader: (string) => {
            let [leaderName, rest] = string.split(": ")
            let [army, count] = rest.split(", ")

            if (Object.keys(armiesInfo).includes(leaderName)) {
                armiesInfo[leaderName][army] = Number(count);
                armiesInfo[leaderName].totalArmy += Number(count);
            }
        },

        increaseArmyCount: (string) => {
            let [army, count] = string.split(" + ")

            Object.values(armiesInfo).map((value) => {
                if (Object.keys(value).includes(army)) {
                    value[army] += Number(count);
                    value.totalArmy += Number(count);
                };

            })
        }
    }

    for (let string of stringsArray) {
        if (leaderArrives(string)) actions.listLeader(string);
        else if (leaderDefeated(string)) actions.deleteLeader(string);
        else if (string.includes("+")) actions.increaseArmyCount(string);
        else if (string.includes(":")) actions.addArmyToLeader(string);
    }

    let leaders = Object.keys(armiesInfo).sort((a, b) => armiesInfo[b].totalArmy - armiesInfo[a].totalArmy);

    for (let leader of leaders) {
        console.log(`${leader}: ${armiesInfo[leader].totalArmy}`);
        Object.entries(armiesInfo[leader]).sort((a, b) => b[1] - a[1]).forEach(([key, value]) => {
            if (key != "totalArmy") console.log(`>>> ${key} - ${value}`);
        })
    }
}