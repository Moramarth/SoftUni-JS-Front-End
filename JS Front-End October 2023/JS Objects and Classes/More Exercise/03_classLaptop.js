class Laptop {
    constructor({ producer, age, brand }, quality) {
        this.info = {
            producer,
            age,
            brand,
        }
        this.quality = quality
        this.isOn = false


    };

    turnOn() {
        this.isOn = true;
        this.quality--;
    };

    turnOff() {
        this.isOn = false;
        this.quality--;
    };

    showInfo() {
        return JSON.stringify(this.info);
    };

    get price() {
        return 800 - (this.info.age * 2) + (this.quality * 0.5);
    }

}