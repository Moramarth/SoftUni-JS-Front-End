function schoolRegister(stringsArray) {
    const newYearEntries = {};

    for (let element of stringsArray) {
        let currentStudent = element.split(", ");
        let studentName = currentStudent[0].split(": ")[1];
        let grade = Number(currentStudent[1].split(": ")[1]);
        let score = currentStudent[2].split(": ")[1];

        if (score < 3) continue;
        if (grade >= 12) continue;

        let nextGrade = grade + 1

        if (Object.keys(newYearEntries).includes(String(nextGrade))) {
            newYearEntries[nextGrade].names.push(studentName);
            newYearEntries[nextGrade].scores.push(Number(score));
        } else {
            newYearEntries[Number(grade + 1)] = { names: [studentName], scores: [Number(score)] }
        };
    };

    if (Object.keys(newYearEntries).length > 0) {
        sortedKeys = Object.keys(newYearEntries).sort((a, b) => a - b);

        sortedKeys.forEach(key => {
            console.log(`${key} Grade`);
            console.log(`List of students: ${newYearEntries[key].names.join(", ")}`);
            let average = newYearEntries[key].scores.reduce((acc, cur) => acc + cur) / newYearEntries[key].names.length;
            console.log(`Average annual score from last year: ${average.toFixed(2)}\n`);
        });
    };
}