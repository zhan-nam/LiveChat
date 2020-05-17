<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

$myfile = fopen("update.txt", "r");
$temp = intval(fgets($myfile));

fclose($myfile);

echo "data:  $temp\n\n";
flush();
?>