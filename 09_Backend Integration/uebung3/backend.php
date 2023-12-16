<?php
$method = $_SERVER['REQUEST_METHOD'];
parse_str($_SERVER['QUERY_STRING'], $params);
$body = file_get_contents("php://input");

function validate($params) {
    if (!isset($params['r1'])) {
        $error = ['error' => "Parameter 'r1' not set"];
    } else if (!isset($params['r2'])) {
        $error = ['error' => "Parameter 'r2' not set"];
    } else if (!isset($params['wiring'])) {
        $error = ['error' => "Parameter 'wiring' not set"];
    } else if (!is_numeric($params['r1']) || intval($params['r1']) < 0) {
         $error = ['error' => "Invalid value for parameter 'r1'"];
    } else if (!is_numeric($params['r2']) || intval($params['r2']) < 0) {
         $error = ['error' => "Invalid value for parameter 'r2'"];
    } else if ($params['r1'] == 0 && $params['r2'] == 0) {
         $error = ['error' => "r1 and r2 can not both be 0"];
    } else if ($params['wiring'] != 'serial' && $params['wiring'] != 'parallel') {
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
// TODO: Change to POST
if ($method == "GET") {
    // TODO: Parse body to JSON document
    
    // TODO: Validate JSON document
    validate($params);
    $resistance = calculateResistance($params['r1'], $params['r2'], $params['wiring']); 
    echo json_encode(['resistance' => $resistance]);
} else {
    echo json_encode(['error' => "HTTP method '" . $method . "' is not supported"]);
    http_response_code(400);
    exit;
}
?>