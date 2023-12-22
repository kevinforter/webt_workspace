<?php
$method = $_SERVER['REQUEST_METHOD'];
parse_str($_SERVER['QUERY_STRING'], $params);
$body = file_get_contents("php://input");

function validate($request) {
    if ($request == null) {
        $error = ['error' => "Cannot parse JSON input"];
    } else if (!isset($request['weight'])) {
        $error = ['error' => "Parameter 'weight' not set"];
    } else if (!isset($request['soleLength'])) {
        $error = ['error' => "Parameter 'soleLength' not set"];
    } else if (!isset($request['age'])) {
        $error = ['error' => "Parameter 'age' not set"];
    } else if (!isset($request['ability'])) {
        $error = ['error' => "Parameter 'ability' not set"];
    } else if (!is_numeric($request['weight']) || intval($request['weight']) < 0) {
        $error = ['error' => "Invalid value for parameter 'weight'"];
    } else if (!is_numeric($request['soleLength']) || intval($request['soleLength']) < 0) {
        $error = ['error' => "Invalid value for parameter 'soleLength'"];
    } else if (!is_numeric($request['age']) || intval($request['age']) < 0) {
        $error = ['error' => "Invalid value for parameter 'age'"];
    } else if ($request['ability'] != 'beginner' && $request['ability'] != 'intermediate' && $request['ability'] != 'advanced') {
        $error = ['error' => "Invalid value for parameter 'ability'"];
    }

    if (isset($error)) {
        echo json_encode($error);
        http_response_code(400);
        exit;
    }
}

function roundToHalf($number) {
    return round($number * 2) / 2;
}

function calcZValue($weight, $soleLength, $age, $ability) {
    $corr_1 = $ability === 'intermediate' ? 1.5 : ($ability === 'advanced' ? 2.5 : 0);
    $corr_2 = $age < 10 || $age > 50 ? 1 : 0;
    $z = 1.6762 * ($weight / 10) - 0.3364 * ($soleLength / 100) - 0.2767 * ($weight / 10 * $soleLength / 100) + 0.26;
    $result = $z + $corr_1 - $corr_2;
    return roundToHalf($result);
}

if ($method == "POST") {
    $request = json_decode($body, true);

    validate($request);
    $zValue = calcZValue($request['weight'], $request['soleLength'], $request['age'], $request['ability']);
    echo json_encode(['zValue' => $zValue]);
} else {
    echo json_encode(['error' => "HTTP method '" . $method . "' is not supported"]);
    http_response_code(400);
    exit;
}
?>