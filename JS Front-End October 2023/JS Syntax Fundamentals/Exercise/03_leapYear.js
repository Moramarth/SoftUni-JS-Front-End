function leapYearValidator(leapYear) {
    if (((leapYear % 4 == 0) && (leapYear % 100 !== 0)) || (leapYear % 400 == 0)) console.log("yes")
    else console.log("no")
}