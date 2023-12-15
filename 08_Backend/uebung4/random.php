<?php
// calculate random number
$random = mt_rand() / (mt_getrandmax() / 100);

// TODO: Determine color of number (green / red)
$style = '';
if ($random < 50) {
    $style = "green";
} else {
    $style = "red";
}

// TODO: Output information as JSON
$result = ['random' => $random, 'style' => $style];
echo json_encode($result);
?>