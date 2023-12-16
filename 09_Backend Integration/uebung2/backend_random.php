<?php
    // calculate random number
    $random = mt_rand() / (mt_getrandmax() / 100);

    // determine color of number (green / red)
    if ($random < 50) {
        $color = "green";
    } else {
        $color = "red";
    }

    // output information as JSON
    $result = ['random' => $random, 'color' => $color];
    echo json_encode($result);
?>