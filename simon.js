var	sequence = [];
var chosenSequence = [];
var simonOn = false;
var gameStarted = false;
var alreadyOptions = 0;
var alreadyChosenOptions = 0;
var count = 0;
var showingSequence = false;
var strictMode = false;

var yellowAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var blueAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var redAudio =  new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var greenAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

var audioBuzzer = new Audio('https://s3-us-west-2.amazonaws.com/guylemon/Buzzer.mp3');

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
				strictMode = true;
			} else {
				strictMode = false;
				$("#led-strict").removeClass("led-on");
			}
		} else {
			console.log("Please start the Simon!");
		}
	});

	$("#button-instructions").click(function() {
		$("#instructions").fadeToggle("slow");
	});

});

function gameOver() {
	sequence = [];
	chosenSequence = [];
	alreadyOptions = 0;
	alreadyChosenOptions = 0;
	count = 0;
	gameStarted = false;
	showingSequence = false;

	audioBuzzer.play();

	var countValue = $("#screen-info");
	$("#switch").addClass("switch-on");
	countValue.text("--");
}

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
			$("#user-feedback").text("Please wait the sequence finish to click another option.");
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

			if(alreadyOptions <= alreadyChosenOptions) {
				if(checkCorrectAnswer()) {
					$("#user-feedback").text("Congratulations! Go to the next turn!");

					if(alreadyOptions == 20) {
						$("#user-feedback").text("Congratulations! You won the game!");
						gameOver();
					} else {
						alreadyChosenOptions = 0;
						chosenSequence = [];
						setTimeout(runningGame, 1000);	
					}
				} else {
					if(strictMode) {
						$("#user-feedback").text("Wrong answer! Game over.");
						gameOver();	
					} else {
						alreadyChosenOptions = 0;
						chosenSequence = [];
						audioBuzzer.play();
						$("#user-feedback").text("Wrong answer! Showing the right sequence...");
						setTimeout(showSequence, 2000);
					}
				}
			} else {
				if(checkCorrectAnswer()) {
					$("#user-feedback").text("Continue the turn...");
				} else {
					if(strictMode) {
						$("#user-feedback").text("Wrong answer! Game over.");
						gameOver();	
					} else {
						alreadyChosenOptions = 0;
						chosenSequence = [];
						audioBuzzer.play();
						$("#user-feedback").text("Wrong answer! Showing the right sequence...");	
						setTimeout(showSequence, 2000);
					}
				}
			}
		}
	} else {
		$("#user-feedback").text("Please turn on the Simon and start the game!");
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
}

function runningGame() {
	$("#user-feedback").text("Turn #"+ (alreadyOptions+1));
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

	for(var i = 0; i < alreadyChosenOptions; i++) {
		if(sequence[i] == chosenSequence[i]){
			check = true;
		} else {
			return false;
			console.log("Wrong answer! Try again!");
			gameOver();
		}
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