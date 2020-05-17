<?php
$range = 20;

include("../connect.php");
$msg = array();

if(isset($_POST["current_id"])){
	$id = $_POST["current_id"];

	$result = $conn->query("select * from message where id > $id");
	// while($row = $result->fetch_assoc()){
	// 	array_push($msg, $row);
	// }

	// echo json_encode($msg);
	echo json_encode($result -> fetch_all(MYSQLI_ASSOC));
}
else if(isset($_POST["min_id"])){
	$id = $_POST["min_id"];

	$result = $conn->query("select * from message where id < $id order by id desc limit $range");
	echo json_encode($result -> fetch_all(MYSQLI_ASSOC));
}
?>