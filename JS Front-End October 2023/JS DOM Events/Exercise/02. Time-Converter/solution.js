function attachEventsListeners() {
    const converter = {
        days: (value, type) => {
            if (type === "days") return value;
            if (type === "hours") return value / 24;
            if (type === "minutes") return value / 1440;
            if (type === "seconds") return value / 86400;
        },

        hours: (value, type) => {
            if (type === "days") return value * 24;
            if (type === "hours") return value;
            if (type === "minutes") return value / 60;
            if (type === "seconds") return value / 3600;
        },

        minutes: (value, type) => {
            if (type === "days") return value * 1440;
            if (type === "hours") return value * 60;
            if (type === "minutes") return value;
            if (type === "seconds") return value / 60;
        },

        seconds: (value, type) => {
            if (type === "days") return value * 86400;
            if (type === "hours") return value * 3600;
            if (type === "minutes") return value * 60;
            if (type === "seconds") return value;
        },
    }
    
    let buttons = Array.from(document.querySelectorAll("input[type=button]"));

    for (let button of buttons) {
        button.addEventListener("click", handleButtonClick);
    };


    function handleButtonClick(event) {
        let currentButton = event.target;
        let dataField = currentButton.parentElement.children[1];

        let inputValue = Number(dataField.value);
        let timeUnit = dataField.id;

        converTimeUnits(inputValue, timeUnit);
    }

    function converTimeUnits(value, type) {
        document.getElementById("days").value = converter.days(value, type);
        document.getElementById("hours").value = converter.hours(value, type);
        document.getElementById("minutes").value = converter.minutes(value, type);
        document.getElementById("seconds").value = converter.seconds(value, type);
    }
}