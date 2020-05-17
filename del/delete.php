<?php
include("../connect.php");

if(isset($_POST["password"])){
	if($_POST["password"] == "0178188966"){
		if($conn -> query("delete from message")){
			$result = $conn -> query("select count(from_user) total_val from message");
			$row = $result->fetch_assoc();

			$conn -> query("alter table message auto_increment=1");

			$myfile = fopen("../ajax/update.txt", "w");
			fwrite($myfile, $row["total_val"]);
			fclose($myfile);

			echo "success";
		}
	}else{
		echo "fail";
	}
}
?>