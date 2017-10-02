var	sequence = [];
var chooseSequence = [];
var simonOn = false;
var gameStarted = false;
var alreadyOptions = 0;

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
			gameStarted = false;
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
	alreadyOptions = 0;
	gameStarted = true;

	runningGame();
}

function chooseOption(value) {
	if(simonOn && gameStarted) {
		chooseSequence.push(value);
		runningGame();
		console.log("The button of color", value, "was clicked!");
	} else {
		console.log("Please turn on the Simon and start the game!");
	}
}

function chooseNextColor() {
	var colors = ["Yellow", "Blue", "Red", "Green"];
	var option =  Math.floor((Math.random() * 3) +1);
	var randomOption = colors[option];

	alreadyOptions += 1;

	if(alreadyOptions < 10){
		$("#screen-info").text("0"+alreadyOptions);
	} else {
		$("#screen-info").text(alreadyOptions);
	}
	
	sequence.push(randomOption);
}

function runningGame() {
	chooseNextColor();
	setTimeout(showSequence, 1000);
}


var count = 0;

function showSequence() {
	setTimeout(function () {
		var color = sequence[count].toLowerCase();
		createEffect(color);
		count++;
		if(count < sequence.length) {
			showSequence();
		}
	}, 1000)
}

function checkCorrectAnswer() {

}

function createEffect(element) {
	$("#"+element).addClass("hovered");
	setTimeout(removeEffect, 1000);
}

function removeEffect() {
	$(".button-option").removeClass("hovered");
}