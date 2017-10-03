var	sequence = [];
var chosenSequence = [];
var simonOn = false;
var gameStarted = false;
var alreadyOptions = 0;
var alreadyChosenOptions = 0;
var count = 0;
var showingSequence = false;

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
	chosenSequence = [];
	alreadyOptions = 0;
	alreadyChosenOptions = 0;
	count = 0;
	gameStarted = true;
	showingSequence = false;

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

			chosenSequence.push(value);
			
			alreadyChosenOptions += 1;

			count = 0;

			console.log("The button of color", value, "was clicked!");
			console.log("User sequence: ", chosenSequence);

			if(alreadyOptions <= alreadyChosenOptions) {
				if(checkCorrectAnswer()) {
					console.log("Congratulations! Go to the next turn!");
					
					alreadyChosenOptions = 0;
					chosenSequence = [];

					setTimeout(runningGame, 1000);
				} else {
					console.log("Wrong answer try again");
					startGame();
				}
			} else {
				console.log("Continue the turn...");
			}
		}
	} else {
		console.log("Please turn on the Simon and start the game!");
	}
}

function chooseNextColor() {
	var colors = ["yellow", "blue", "red", "green"];
	var option =  Math.floor((Math.random() * 3) +1);
	var randomOption = colors[option];

	alreadyOptions += 1;

	if(alreadyOptions < 10){
		$("#screen-info").text("0"+alreadyOptions);
	} else {
		$("#screen-info").text(alreadyOptions);
	}
	
	sequence.push(randomOption);

	console.log("Random sequence: ", sequence);
}

function runningGame() {
	chooseNextColor();
	showSequence();
}

function showSequence() {
	setTimeout(function () {
		var color = sequence[count];
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

	var check = false;

	for(var i = 0; i < sequence.length; i++) {
		if(sequence[i] == chosenSequence[i])
			check = true;
		else
			check = false;
	}

	return check;
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