<?php
    parse_str($_SERVER['QUERY_STRING'], $params);
    echo "Hello" . $params['name'] . '!';
?>
