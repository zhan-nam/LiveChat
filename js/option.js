$(document).ready(function(){

	$(".option_button").on("click",function(){
		$(".option_slide").slideToggle(240);
	});
});

function darkmode_on_off(){
	var mode = localStorage.getItem("live_chat_mode");

	if(mode==null || mode=="light"){
		localStorage.setItem("live_chat_mode", "dark");

		$(".main_frame").css("background-image","url(resource/marble_b.jpg)");
		$(".bottom_frame").css("background-color","black");
		$(".message_box").css({"background-color":"#3a3a3a","color":"white"});
		$(".to_msg ").css({"background-color":"#1f1f1f","border":"2px solid #05275f","color":"white"});
		$(".from_msg").css("background-color","#05275f");
		$(".option_slide_button").css({"color":"white","background-color":"#1f1f1f"});
		$(".option_slide").css("background-color","#424242c9");
		$(".dark_mode_button img").attr("src","resource/darkmode_w.png");
		$(".dark_mode_button span").html("Turn Off Dark Mode");
	}else if(mode=="dark"){
		localStorage.setItem("live_chat_mode", "light");
		
		$(".main_frame").css("background-image","url(resource/marble_w.jpg)");
		$(".bottom_frame").css("background-color","gray");
		$(".message_box").css({"background-color":"white","color":"black"});
		$(".to_msg ").css({"background-color":"white","border":"2px solid #4c80d8","color":"black"});
		$(".from_msg").css("background-color","#4c80d8");
		$(".option_slide_button").css({"color":"black","background-color":"white"});
		$(".option_slide").css("background-color","#ffffffc9");
		$(".dark_mode_button img").attr("src","resource/darkmode_b.png");
		$(".dark_mode_button span").html("Turn On Dark Mode");
	}else{
		localStorage.setItem("live_chat_mode", "light");
		darkmode_on_off();
	}
}

function check_mode(){
	var mode = localStorage.getItem("live_chat_mode");

	if(mode=="light"){

	}else if(mode=="dark"){
		$(".main_frame").css("background-image","url(resource/marble_b.jpg)");
		$(".bottom_frame").css("background-color","black");
		$(".message_box").css({"background-color":"#3a3a3a","color":"white"});
		$(".to_msg ").css({"background-color":"#1f1f1f","border":"2px solid #05275f","color":"white"});
		$(".from_msg").css("background-color","#05275f");
		$(".option_slide_button").css({"color":"white","background-color":"#1f1f1f"});
		$(".option_slide").css("background-color","#424242c9");
		$(".dark_mode_button img").attr("src","resource/darkmode_w.png");
		$(".dark_mode_button span").html("Turn Off Dark Mode");
	}else{
		localStorage.setItem("live_chat_mode", "light");
	}
}