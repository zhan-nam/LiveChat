<?php
include("../connect.php");
$result = $conn -> query("select count(from_user) total_val from message");
$row = $result->fetch_assoc();

$myfile = fopen("update.txt", "w");
fwrite($myfile, $row["total_val"]);
fclose($myfile);
?>