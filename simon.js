$(document).ready(function(){

	var simonOn = false;
	
	$("#switch-slot").click(function(){
		var switchValue = $("#switch")[0].className;
		var countValue = $("#screen-info");

		if(switchValue == "") {
			simonOn = true;
			$("#switch").addClass("switch-on");
			countValue.text("--");
		} else {
			simonOn = false;
			$("#switch").removeClass("switch-on");
			countValue.text("");
		}
	});

	$("#button-start").click(function(){
		
		if(simonOn){
			console.log("Starting the game...");
		} else {
			console.log("Please start the Simon!");
		}

	});

	$("#button-strict").click(function(){
		var ledStrict = $("#led-strict")[0].className;

		if(simonOn){
			if(ledStrict == "") {
				$("#led-strict").addClass("led-on");
			} else {
				$("#led-strict").removeClass("led-on");
			}
		} else {
			console.log("Please start the Simon!");
		}
			
	});
});

function startGame(){
	var sequence = [];
	var choose
}

function chooseOption(){

}

