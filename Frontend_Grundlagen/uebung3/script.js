function calculateResistance(r1, r2, wiring) {
    // TODO: reuse function from week 5
}

function calculate() {
    // TODO: query information from form (r1, r2 und wiring)

    // TODO: call function calculateResistance with information of form

    // TODO: output the total resistance in span with id output
}

// TODO: implement validation functions for R1, R2, Wiring

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
    if (!hasValidationErrors()) {
        calculate();
    }
}