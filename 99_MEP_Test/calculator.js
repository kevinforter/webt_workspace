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