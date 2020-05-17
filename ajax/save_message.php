<?php
if(isset($_POST['from']) && isset($_POST['message'])){
	$message = str_replace('"', '\"', $_POST['message']);
	$from = $_POST['from'];
	$time = $_POST['time'];

	include("../connect.php");
	$conn->query('insert into message (from_user, message_val, send_time) values("'.$from.'","'.$message.'","'.$time.'")');


	$result = $conn -> query("select count(from_user) total_val from message");
	$row = $result->fetch_assoc();

	$myfile = fopen("update.txt", "w");
	fwrite($myfile, $row["total_val"]);
	fclose($myfile);
}
?>