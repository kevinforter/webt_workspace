<?php
$method = $_SERVER['REQUEST_METHOD'];
parse_str($_SERVER['QUERY_STRING'], $params);
$body = file_get_contents("php://input");

function validate($request) {
    if ($request == null) {
        $error = ['error' => "Cannot parse JSON input"];
    } else if (!isset($request['r1'])) {
        $error = ['error' => "Parameter 'r1' not set"];
    } else if (!isset($request['r2'])) {
        $error = ['error' => "Parameter 'r2' not set"];
    } else if (!isset($request['wiring'])) {
        $error = ['error' => "Parameter 'wiring' not set"];
    } else if (!is_numeric($request['r1']) || intval($request['r1']) < 0) {
        $error = ['error' => "Invalid value for parameter 'r1'"];
    } else if (!is_numeric($request['r2']) || intval($request['r2']) < 0) {
        $error = ['error' => "Invalid value for parameter 'r2'"];
    } else if ($request['r1'] == 0 && $request['r2'] == 0) {
        $error = ['error' => "r1 and r2 can not both be 0"];
    } else if ($request['wiring'] != 'serial' && $request['wiring'] != 'parallel') {
        $error = ['error' => "Invalid value for parameter 'wiring'"];
    }

    if (isset($error)) {
        echo json_encode($error);
        http_response_code(400);
        exit;
    }
}

//  calculates total resistance corresponing to wiring
function calculateResistance($r1, $r2, $wiring) {
    // calculate resistance depending on the wiring
    if ($wiring == 'serial') {
        $totalResistance = $r1 + $r2;
    } else if ($wiring == 'parallel') {
        $totalResistance = $r1 * $r2 / ($r1 + $r2);
    }

    // return result
    return $totalResistance;
}

// handle request
// DONE: Change to POST
if ($method == "POST") {
    // DONE: Parse body to JSON document
    $request = json_decode($body, true);

    // DONE: Validate JSON document
    validate($request);
    $resistance = calculateResistance($request['r1'], $request['r2'], $request['wiring']);
    echo json_encode(['resistance' => $resistance]);
} else {
    echo json_encode(['error' => "HTTP method '" . $method . "' is not supported"]);
    http_response_code(400);
    exit;
}
?>