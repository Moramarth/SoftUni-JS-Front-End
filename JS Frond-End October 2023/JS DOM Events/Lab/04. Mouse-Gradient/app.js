function attachGradientEvents() {
    document.getElementById("gradient").addEventListener("mousemove", showPercentage);
    document.getElementById("gradient").addEventListener("mouseout", mouseIsOut);

    function showPercentage(event) {
        let percentage = event.offsetX / (event.target.clientWidth - 1);
        percentage = Math.trunc(percentage * 100);
        document.getElementById('result').textContent = percentage + "%";
    }

    function mouseIsOut() {
        document.getElementById('result').textContent = "";
    }
}