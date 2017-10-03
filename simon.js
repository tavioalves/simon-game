var	sequence = [];
var chooseSequence = [];
var simonOn = false;
var gameStarted = false;
var alreadyOptions = 0;
var count = 0;
var showingSequence = false;

// Audio colors

var yellowAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var blueAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var redAudio =  new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var greenAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

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
	count = 0;
	gameStarted = true;

	runningGame();
}

function chooseOption(value) {
	if(simonOn && gameStarted) {
		if (showingSequence) {
			console.log("Please wait the sequence finish to click another option.");
		} else { 	
			value = value.toLowerCase();

			if(value == 'yellow')
				yellowAudio.play();
			if(value == 'blue')
				blueAudio.play();
			if(value == 'red')
				redAudio.play();
			if(value == 'green')
				greenAudio.play();

			chooseSequence.push(value);
			count = 0;
			runningGame();
			console.log("The button of color", value, "was clicked!");
		}
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
	showSequence();
}

function showSequence() {
	setTimeout(function () {
		var color = sequence[count].toLowerCase();
		createEffect(color);
		count++;
		showingSequence = false;
		if(count < sequence.length) {
			showingSequence = true;
			showSequence();
		}
	}, 1000)
}

function checkCorrectAnswer() {

}

function createEffect(element) {

	if(element == 'yellow')
		yellowAudio.play();
	if(element == 'blue')
		blueAudio.play();
	if(element == 'red')
		redAudio.play();
	if(element == 'green')
		greenAudio.play();

	$("#"+element).addClass("hovered");
	setTimeout(removeEffect, 750);
}

function removeEffect() {
	$(".button-option").removeClass("hovered");
}