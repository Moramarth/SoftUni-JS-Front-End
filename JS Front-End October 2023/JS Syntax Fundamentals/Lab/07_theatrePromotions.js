function theatrePromotions(dayType, age) {
    let output
    if (age >= 0 && age <= 18) {
        switch (dayType) {
            case "Weekday":
                output = "12$"
                break;
            case "Weekend":
                output = "15$"
                break;
            case "Holiday":
                output = "5$"
                break;
        }
        console.log(output)
    }
    else if (age > 18 && age <= 64) {
        switch (dayType) {
            case "Weekday":
                output = "18$"
                break;
            case "Weekend":
                output = "20$"
                break;
            case "Holiday":
                output = "12$"
                break;
        }
        console.log(output)
     }
    else if (age > 64 && age <= 122) {
        switch (dayType) {
            case "Weekday":
                output = "12$"
                break;
            case "Weekend":
                output = "15$"
                break;
            case "Holiday":
                output = "10$"
                break;
        }
        console.log(output)
     }
    else {
        console.log("Error!")
    }
}