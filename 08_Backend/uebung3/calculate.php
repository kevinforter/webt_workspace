<?php
parse_str($_SERVER['QUERY_STRING'], $params);

function validateParameters($params) {
    // TODO: Add validations for all there parameters (R1, R2, WIRING)
    //       Validate both existance and contents of the parameters.
}

// TODO: Adopt the function calculateResistance of exercise 3a from 
// "Einführung in JavaScript" and convert the function from JavaScript to PHP.


validateParameters($params);

// TODO: Replace -1 with a call to calculateResistance that uses the correct parameters
$resistance = -1; 

echo json_encode(['resistance' => $resistance]);  
}
?>