function showRandomNumber(min, max) {
    let x = (Math.random() * (max - min)) + min;

    // TODO: complete code according to task description
    let randomNr = document.getElementById("zufallszahl");
    randomNr.innerText = x.toFixed(0);

    randomNr.classList.remove('green')
    if (x < 50) {
        randomNr.classList.add('green');
    }
}