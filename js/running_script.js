var from=null;
var max_result = 0;
var min_result = 0;
var first_time = true;
var done_prepend = true;
var sound = new Audio();
sound.src = "resource/juntos.mp3";

$(document).ready(function(){
	$(".send_button, .option_button, .option_slide_button").click(function(){
	    $(".message_box").focus();
	});

	check_mode();

	window.addEventListener("load", function(){
        $(".loading").fadeOut(650);
    });

    update_txt_val();
	insert_name();
	enter_button();	
	first_get_msg();
	setTimeout(function(){new_message_alert();},1000);

	$(".chat_frame").scroll(function(){
		if($(".chat_frame").scrollTop()<50 && done_prepend){
			done_prepend = false;
			get_msg_old();
		}
	});

});

function update_txt_val(){
	$.post("ajax/update_txt.php");
}

function insert_name(){
    var temp = prompt("enter name :");
	from = temp==null ? null:temp.trim();
	if(from==="" || from==null){
		alert("please fill in the space");
		insert_name();
	}
}

function enter_button(){
	var input = document.getElementById("message_box");

	input.addEventListener("keyup", function(event) {
	  if (event.keyCode === 13) {
	  	save_msg();
	  }
	});
}

function save_msg(){
	

	var message = $(".message_box").val();

	if($(".message_box").val().trim() !== ""){
	    
		$.post("ajax/save_message.php",{from:from,message:message,time:get_time()},function(){
			get_msg_new();
		});
		$(".message_box").val("");
		

	}else if(from==null){
		insert_name();
	}
}

function get_time(){
    var d = new Date();
    
    var return_val = "";
    var hours = d.getHours();
    var minutes = add_zero(d.getMinutes());
    var apm = "";
    
    if(hours>12){
        return_val+=add_zero(hours-12)+":";
        apm="pm";
    }else{
        return_val+=add_zero(hours)+":";
        apm="am";
    }
    
    return_val+=minutes+apm;
    
    return return_val;
}

function add_zero(data){
    if(data.toString().length==1){
        return "0"+data;
    }else{
        return data;
    }
}

function new_message_alert(){

    if(typeof(EventSource) !== "undefined") {

		  var source = new EventSource("ajax/latest_data.php");
		  source.onmessage = function(event) {
		    if(max_result<parseInt(event.data) || first_time){
                get_msg_new();
                first_time = false;
            }else if(max_result>parseInt(event.data) && first_time==false){
            	$(".chat_box").html("");
            	first_time = true;
            	max_result=parseInt(event.data);
            }
		  };
	  
	} else {
	  alert("your browser is not supported");
	}
}

function first_get_msg(){
	$.post("ajax/first_load.php",function(data){
		if(data){
			var message;

			try{
				message = JSON.parse(data);
			}catch(e){
				first_get_msg();
			}

			var size = parseInt(message.length);
			var msg_type = null;

			if(size==0){
				first_time = false;
				max_result = min_result = 0;
			}else{
				min_result = parseInt(message[0].id);
			}

			for(var x=0 ; x<size ; x++){
				if(message[x].from_user==from){
					msg_type="to_msg";
				}else{
					msg_type = "from_msg";
				}

				var mode = localStorage.getItem("live_chat_mode");
				$(".chat_box").append(`<div class="newline">
											<div class="${msg_type}">
												<b>${message[x].from_user}</b><span>${message[x].send_time}</span>
												<div>${message[x].message_val}</div>
											</div>
										<div class="newline">`);
				if(mode=="dark"){
					$(".to_msg ").css({"background-color":"#1f1f1f","border":"2px solid #05275f","color":"white"});
					$(".from_msg").css("background-color","#05275f");
				}

				max_result=parseInt(message[x].id);
				first_time = false;
			}

			var myDiv = $(".chat_frame");
			myDiv.animate({ scrollTop: myDiv.prop("scrollHeight") - myDiv.height() }, 0);

		}else{
			console.log("first_get_msg error");
			setTimeout(function(){
				first_get_msg();
			},3000);
		}
	});


	return;
}

function get_msg_new(){
	
	$.post("ajax/load.php",{current_id:max_result},function(data){
		if(data){
			var message;

			try{
				message = JSON.parse(data);
			}catch(e){
				get_msg_new();
			}

			var size = message.length;
			var msg_type = null;

			for(var x=0 ; x<size ; x++){					
				if(message[x].from_user==from){
					msg_type="to_msg";
				}else{
					msg_type = "from_msg";
					sound.play();
				}

				var mode = localStorage.getItem("live_chat_mode");
				$(".chat_box").append(`<div class="newline">
											<div class="${msg_type}">
												<b>${message[x].from_user}</b><span>${message[x].send_time}</span>
												<div>${message[x].message_val}</div>
											</div>
										<div class="newline">`);

				if(mode=="dark"){
					$(".to_msg ").css({"background-color":"#1f1f1f","border":"2px solid #05275f","color":"white"});
					$(".from_msg").css("background-color","#05275f");
				}

				max_result=parseInt(message[x].id);			
			}

			var myDiv = $(".chat_frame");
			myDiv.animate({ scrollTop: myDiv.prop("scrollHeight") - myDiv.height() }, 300);

		}
	});
    return;
}

function get_msg_old(){
	
	$.post("ajax/load.php",{min_id:min_result},function(data){
		if(data){
			var message;

			try{
				message = JSON.parse(data);
			}catch(e){
				get_msg_old();
			}

			var size = message.length;
			var msg_type = null;

			for(var x=0 ; x<size ; x++){					
				if(message[x].from_user==from){
					msg_type="to_msg";
				}else{
					msg_type = "from_msg";
				}

				var mode = localStorage.getItem("live_chat_mode");
				$(".chat_box").prepend(`<div class="newline">
											<div class="${msg_type}">
												<b>${message[x].from_user}</b><span>${message[x].send_time}</span>
												<div>${message[x].message_val}</div>
											</div>
										<div class="newline">`);

				if(mode=="dark"){
					$(".to_msg ").css({"background-color":"#1f1f1f","border":"2px solid #05275f","color":"white"});
					$(".from_msg").css("background-color","#05275f");
				}
				min_result=parseInt(message[x].id);
			}

			done_prepend = true;
		}
	});
	return;
}