<?php
$conn = mysqli_connect("localhost", "root",
    ""
    , "webt");
if (!$conn) { echo json_encode(['error' => "Connection failed"]); exit; }

$stmt = mysqli_prepare($conn, "select name, day from birthdays");
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if ($result) {
    $o = [];
    while($row = mysqli_fetch_assoc($result)) {
        $o[count($o)] = $row['name']. " hat am " . $row['day'] . " Geburtstag.";
    }
    json_encode($o);
}
mysqli_close($conn);
?>