function passwordValidator(password) {
    const alphanumericValidation = /^[a-z0-9]+$/i;
    const extractDigitsFromString = /\D/g;

    let output = "";

    if (password.length < 6 || password.length > 10) {
        output += "Password must be between 6 and 10 characters\n";
    }

    if (!alphanumericValidation.test(password)) {
        output += "Password must consist only of letters and digits\n";
    }

    if (password.replace(extractDigitsFromString, "").length < 2) {
        output += "Password must have at least 2 digits\n";
    }

    if (output) console.log(output.trim());
    else console.log("Password is valid");
}