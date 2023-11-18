function vacation(numberOfPeople, groupType, dayOfTheWeek) {
    let totalPrice;
    let discount;

    if (groupType == "Students") {
        switch (dayOfTheWeek) {
            case "Friday":
                totalPrice = numberOfPeople * 8.45;
                break;
            case "Saturday":
                totalPrice = numberOfPeople * 9.80;
                break;
            case "Sunday":
                totalPrice = numberOfPeople * 10.46;
                break;
        }
        if (numberOfPeople >= 30) {
            discount = totalPrice * 0.15;
            totalPrice = totalPrice - discount;
        }

    } else if (groupType == "Business") {
        switch (dayOfTheWeek) {
            case "Friday":
                totalPrice = numberOfPeople * 10.90;
                break;
            case "Saturday":
                totalPrice = numberOfPeople * 15.60;
                break;
            case "Sunday":
                totalPrice = numberOfPeople * 16;
                break;
        }
        if (numberOfPeople >= 100) {
            discount = (totalPrice / numberOfPeople) * 10;
            totalPrice = totalPrice - discount;
        }
    } else if (groupType == "Regular") {
        switch (dayOfTheWeek) {
            case "Friday":
                totalPrice = numberOfPeople * 15;
                break;
            case "Saturday":
                totalPrice = numberOfPeople * 20;
                break;
            case "Sunday":
                totalPrice = numberOfPeople * 22.50;
                break;
        }
        if (numberOfPeople >= 10 && numberOfPeople <= 20) {
            discount = totalPrice * 0.05;
            totalPrice = totalPrice - discount;
        }
    }
    console.log(`Total price: ${totalPrice.toFixed(2)}`);
}