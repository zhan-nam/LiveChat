<!DOCTYPE html>
<html>
<head>
	<title>delete livechat data</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width , initial-scale=1">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			$("#submit").click(function(){
				var password = $("#pass").val();
				$.post("delete.php",{password:password},function(data){
					if(data=="success"){
						alert("delete success");
						$("#pass").val("");
					}else if(data=="fail"){
						alert("wrong password");
						$("#pass").val("");
					}else{
						alert("something when wrong");
						$("#pass").val("");
					}
				});
			});
		});
	</script>
</head>
<body>
<h1>Enter Password</h1><br>
<input type="password" id="pass"><button id="submit">submit</button>
</body>
</html>