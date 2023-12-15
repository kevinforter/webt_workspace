<?php
parse_str($_SERVER['QUERY_STRING'], $params);

function validateParameters($params)
{
    // TODO: Add validations for all there parameters (R1, R2, WIRING)
    //       Validate both existance and contents of the parameters.
    if (!isset($params['wiring'])) {
        $error = ['error ' => "Parameter 'wiring' not set"];
    } else if ($params['wiring'] != "serial" && $params['wiring'] != "parallel") {
        $error = ['error' => "Invalid value for parameter 'wiring'"];
    } else if (!isset($params['r1'])) {
        $error = ['error ' => "Parameter 'r1' not set"];
    } else if ($params['r1'] <= 0) {
        $error = ['error' => "Invalid value for parameter 'r1'"];
    } else if (!isset($params['r2'])) {
        $error = ['error ' => "Parameter 'r2' not set"];
    } else if ($params['r2'] <= 0) {
        $error = ['error' => "Invalid value for parameter 'r2'"];
    }

    if (isset($error)) {
        echo json_encode($error);
        http_response_code(400);
        exit;
    }
}

// TODO: Adopt the function calculateResistance of exercise 3a from 
// "Einführung in JavaScript" and convert the function from JavaScript to PHP.
function calculateResistance($r1, $r2, $wiring)
{
    // TODO: calculate resistance depending on the wiring
    $res = 0;
    if ($wiring == 'serial') {
        $res = $r1 + $r2;
    } else if ($wiring == 'parallel') {
        $res = $r1 * $r2 / ($r1 + $r2);
    }

    // TODO: return result
    return $res;
}

validateParameters($params);

// TODO: Replace -1 with a call to calculateResistance that uses the correct parameters
$resistance = calculateResistance($params['r1'], $params['r2'], $params['wiring']);

echo json_encode(['resistance' => $resistance]);
?>