function attachEventsListeners() {
    document.querySelector("#convert")
        .addEventListener("click", convertValues);

    const unitsToMeters = {
        km: (value) => value * 1000,
        m: (value) => value,
        cm: (value) => value * 0.01,
        mm: (value) => value * 0.001,
        mi: (value) => value * 1609.34,
        yrd: (value) => value * 0.9144,
        ft: (value) => value * 0.3048,
        in: (value) => value * 0.0254,
    };
    const metersToOtherUnits = {
        km: (value) => value / 1000,
        m: (value) => value,
        cm: (value) => value / 0.01,
        mm: (value) => value / 0.001,
        mi: (value) => value / 1609.34,
        yrd: (value) => value / 0.9144,
        ft: (value) => value / 0.3048,
        in: (value) => value / 0.0254,
    };

    function convertValues() {
        let inputDistance = document.querySelector("#inputDistance").value;
        let inputUnits = document.querySelector("#inputUnits").value;
        let outputUnits = document.querySelector("#outputUnits").value;

        let convertedToMeters = unitsToMeters[inputUnits](Number(inputDistance));
        let result = metersToOtherUnits[outputUnits](convertedToMeters);

        document.querySelector("#outputDistance").value = result;
    }
}