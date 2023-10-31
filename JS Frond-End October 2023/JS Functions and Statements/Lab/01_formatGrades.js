function formatGrade(grade) {
    let namedGrade = ""
    if (grade < 3) namedGrade = "Fail";
    else if (grade < 3.5) namedGrade = "Poor";
    else if (grade < 4.5) namedGrade = "Good";
    else if (grade < 5.5) namedGrade = "Very good";
    else namedGrade = "Excellent";

    if (namedGrade === "Fail") console.log(` Fail (2)`);
    else console.log(` ${namedGrade} (${grade.toFixed(2)})`);
}