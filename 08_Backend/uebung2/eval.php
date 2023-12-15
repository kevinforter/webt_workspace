<?php
// obtain http method, query parameters, body
$requestMethod = $_SERVER['REQUEST_METHOD'];
$requestParameters = $_SERVER['QUERY_STRING'];
$requestBody = file_get_contents("php://input");

echo json_encode(['method' => $requestMethod,
                  'query' => $requestParameters,
                  'body' => $requestBody]);
?>