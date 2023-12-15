function calculateResistance(r1, r2, wiring) {
    // TODO: reuse function from week 5
    let res;
    if (wiring == 'serial') {
        res = r1 + r2;
    } else if (wiring == "parallel") {
        res = r1 * r2 / (r1 + r2);
    }
    return res;
}

function calculate() {
    // TODO: query information from form (r1, r2 und wiring)
    let r1 = parseFloat(document.getElementById("r1").value);
    let r2 = parseFloat(document.getElementById("r2").value);
    let wiring = document.querySelector('input[name="wiring"]:checked').value;

    // TODO: call function calculateResistance with information of form
    let result = calculateResistance(r1, r2, wiring);

    // TODO: output the total resistance in span with id output
    let output = document.getElementById('output');
    output.innerText = result;
}

// TODO: implement validation functions for R1, R2, Wiring

function validateR1() {
    let r1 = document.getElementById("r1");
    let errorR1 = document.getElementById("errorR1");
    if (!r1.checkValidity()) {
        errorR1.innerText = r1.validationMessage;
    }
    if (r1.value < 0) {
        errorR1.innerText = "Wiederstand darf nicht minus sein"
    }
}

function validateR2() {
    let r2 = document.getElementById("r2");
    let errorR2 = document.getElementById("errorR2");
    if (!r2.checkValidity()) {
        errorR2.innerText = r2.validationMessage;
    }

    if (r2.value < 0) {
        errorR2.innerText = "Wiederstand darf nicht minus sein"
    }
}

function validateWiring() {
    let wiring = document.querySelector('[name="wiring"]');
    let errorWiring = document.getElementById("errorWiring");
    if (!wiring.checkValidity()) {
        errorWiring.innerText = wiring.validationMessage;
    }
}

function clearValidationErrors() {
    document.getElementById('errorR1').innerText = '';
    document.getElementById('errorR2').innerText = '';
    document.getElementById('errorWiring').innerText = '';
}

function hasValidationErrors() {
    return document.getElementById('errorR1').innerText != ''
        || document.getElementById('errorR2').innerText != ''
        || document.getElementById('errorWiring').innerText != '';
}

function validateAndCalculate() {
    clearValidationErrors();
    // TODO: call validation functions for R1, R2, Wiring
    validateR1();
    validateR2();
    validateWiring();
    if (!hasValidationErrors()) {
        calculate();
    }
}