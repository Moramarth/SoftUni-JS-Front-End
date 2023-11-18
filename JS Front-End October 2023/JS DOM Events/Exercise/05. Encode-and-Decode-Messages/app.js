function encodeAndDecodeMessages() {
    let [encodeBox, decodeBox] = Array.from(document.querySelectorAll("textarea"));
    const [encodeBtn, decodeBtn] = Array.from(document.querySelectorAll("button"));

    encodeBtn.addEventListener("click", encodeMsg);
    decodeBtn.addEventListener("click", decodeMsg);

    function encodeMsg() {
        let currentMessage = encodeBox.value;
        let encodedMessage = "";
        for (let char of currentMessage) {
            encodedMessage += String.fromCharCode(char.charCodeAt(0) + 1);
        };

        decodeBox.value = encodedMessage;
        encodeBox.value = "";
    };

    function decodeMsg() {
        let currentMessage = decodeBox.value;
        let decodedMessage = "";

        for (let char of currentMessage) {
            decodedMessage += String.fromCharCode(char.charCodeAt(0) - 1);
        };

        decodeBox.value = decodedMessage;
    };
}