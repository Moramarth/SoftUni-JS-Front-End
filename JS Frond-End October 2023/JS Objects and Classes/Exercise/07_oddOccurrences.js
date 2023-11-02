function oddOccurrences(stringInput) {
    const words = stringInput.split(" ").reduce((acc, curr) => {

        if (acc.hasOwnProperty(curr.toLowerCase())) acc[curr.toLowerCase()]++;
        else acc[curr.toLowerCase()] = 1;

        return acc;
    }, {});

    console.log(Object.entries(words)
        .filter(([key, value]) => value % 2 == 1)
        .map((element) => element[0])
        .join(" ")
    );
}