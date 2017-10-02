var	sequence = [];
var chooseSequence = [];
var simonOn = false;
var gameStarted = false;

$(document).ready(function() {	
	
	
	$("#switch-slot").click(function() {
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

	$("#button-start").click(function() {
		if(simonOn){
			startGame();
		} else {
			console.log("Please start the Simon!");
		}
	});

	$("#button-strict").click(function() {
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

function startGame() {
	sequence = [];
	chooseSequence = [];

	gameStarted = true;
	runningGame();
	
}

function chooseOption(value) {
	if(simonOn && gameStarted) {
		console.log("The button of color", value, "was clicked!");
	} else {
		console.log("Please turn on the Simon and start the game!");
	}
}

function chooseNextColor() {
	var colors = ["Yellow", "Blue", "Red", "Green"];
	var option =  Math.floor((Math.random() * 3) +1);
	var randomOption = colors[option];
	
	sequence.push(randomOption);
}

function runningGame() {
	chooseNextColor();
	console.log("Sequence now is: " + sequence);
}

