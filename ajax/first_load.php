<?php

$range = 20;

include("../connect.php");
$myfile = fopen("update.txt", "r");
$size = intval(fgets($myfile));

fclose($myfile);
$start_id = $size-intval($range);

if($start_id >= 0 ){
	$result = $conn->query("select * from message where id > $start_id");
	echo json_encode($result -> fetch_all(MYSQLI_ASSOC));
}else if($start_id < 0){
	$result = $conn->query("select * from message");
	echo json_encode($result -> fetch_all(MYSQLI_ASSOC));
}

?>