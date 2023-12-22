function parseJsonHelper(text) {
    try {
        return JSON.parse(text);
    } catch (e) {
        return null;
    }
}

function calculate() {
    let weight = document.getElementById('weight').value;
    let soleLength = document.getElementById('soleLength').value;
    let age = document.getElementById('age').value;

    let beginner = document.getElementById('beginner');
    let intermediate = document.getElementById('intermediate');
    let advanced = document.getElementById('advanced');

    let ability;
    if (beginner.checked) {
        ability = beginner.value;
    } else if (intermediate.checked) {
        ability = intermediate.value;
    } else {
        ability = advanced.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/var/index.php', true);

    let request = {weight: weight, soleLength: soleLength, age: age, ability: ability};
    xhr.send(JSON.stringify(request));

    xhr.onerror = function () {
        alert('application error: cannot send request');
    }
    xhr.timeout = function () {
        alert('application error: timeout');
    }
    xhr.onload = function () {
        let response = parseJsonHelper(xhr.responseText);
        if (xhr.status === 200 && validate(response)) {
            update(response);
        } else {
            alert('application error: cannot validate backend reply' + xhr.status);
        }
    }
}

function validate(response) {
    return response != null
        && Object.hasOwn(response, 'zValue')
        && !Number.isNaN(Number.parseFloat(response.zValue));
}

function update(response) {
    let output = document.getElementById('output');
    output.innerText = Number.parseFloat(response.zValue);
}

function validateInputElement(inputElementId, errorElementId) {
    let inputElement = document.getElementById(inputElementId);
    let errorElement = document.getElementById(errorElementId);
    if (!inputElement.checkValidity()) {
        errorElement.innerText = inputElement.validationMessage;
    }
}

function clearValidationErrors() {
    document.getElementById('errorWeight').innerText = '';
    document.getElementById('errorSoleLength').innerText = '';
    document.getElementById('errorAge').innerText = '';
    document.getElementById('errorAbility').innerText = '';
}

function hasValidationErrors() {
    return document.getElementById('errorWeight').innerText !== ''
        || document.getElementById('errorSoleLength').innerText !== ''
        || document.getElementById('errorAge').innerText !== ''
        || document.getElementById('errorAbility').innerText !== '';
}

function validateAndCalculate() {
    clearValidationErrors();
    // call validation functions for R1, R2, Wiring
    validateInputElement('weight', 'errorWeight');
    validateInputElement('soleLength', 'errorSoleLength');
    validateInputElement('age', 'errorAge');
    validateInputElement('beginner', 'errorWiring');
    validateInputElement('intermediate', 'errorWiring');
    validateInputElement('advanced', 'errorWiring');
    if (!hasValidationErrors()) {
        calculate();
    }
}

window.onload = function () {
    //canvas init
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    //canvas dimensions
    var W = window.innerWidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    //snowflake particles
    var mp = 50; //max particles
    var particles = [];
    for (var i = 0; i < mp; i++) {
        particles.push({
            x: Math.random() * W, //x-coordinate
            y: Math.random() * H, //y-coordinate
            r: Math.random() * 4 + 1, //radius
            d: Math.random() * mp //density
        })
    }

    //flakes
    function draw() {
        ctx.clearRect(0, 0, W, H);

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        for (var i = 0; i < mp; i++) {
            var p = particles[i];
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        }
        ctx.fill();
        update();
    }

    //Function to move the snowflakes
    //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
    var angle = 0;

    function update() {
        angle += 0.01;
        for (var i = 0; i < mp; i++) {
            var p = particles[i];
            p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
            p.x += Math.sin(angle) * 2;

            if (p.x > W + 5 || p.x < -5 || p.y > H) {
                if (i % 3 > 0) //66.67% of the flakes
                {
                    particles[i] = {x: Math.random() * W, y: -10, r: p.r, d: p.d};
                } else {
                    //If the flake is exitting from the right
                    if (Math.sin(angle) > 0) {
                        //Enter from the left
                        particles[i] = {x: -5, y: Math.random() * H, r: p.r, d: p.d};
                    } else {
                        //Enter from the right
                        particles[i] = {x: W + 5, y: Math.random() * H, r: p.r, d: p.d};
                    }
                }
            }
        }
    }

    //animation loop
    setInterval(draw, 33);
}