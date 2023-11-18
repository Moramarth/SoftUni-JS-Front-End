function roadRadar(speed, area) {
    let speedLimit;
    let status;

    if (area == "motorway") speedLimit = 130;
    else if (area == "interstate") speedLimit = 90;
    else if (area == "city") speedLimit = 50;
    else if (area == "residential") speedLimit = 20;

    let difference = Number(speed) - speedLimit;

    if (difference > 40) status = "reckless driving";
    else if (difference > 20) status = "excessive speeding";
    else if (difference > 0) status = "speeding";


    if (status) console.log(`The speed is ${difference} km/h faster than the allowed speed of ${speedLimit} - ${status}`);
    else console.log(`Driving ${speed} km/h in a ${speedLimit} zone`);
}