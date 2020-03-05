var maxScore = 5;
var p1Score = 0;
var p2Score = 0;
//-----------------------------------

var maxScoreReached = false;

var input = document.querySelector("input");
var maxScoreLabel = document.getElementById("maxScoreLabel");
updateScore(maxScore, maxScoreLabel, maxScore);

input.addEventListener("input", function(){
	updateScore(maxScore, maxScoreLabel, Number(maxScoreLabel.textContent))
})

// Player 1 Button
var p1Btn = document.getElementById("p1Btn");
var p1Label = document.getElementById("p1Label");

p1Btn.addEventListener("click", function(){
	updateScore(p1Score, p1Label, p1Score+1);

	if (p1Score >= maxScore) {
		maxScoreReached = true;
		p1Label.style.color = "green";
	} else {
		p1Label.style.color = "black";
	}
})

var p2Btn = document.getElementById("p2Btn");
var p2Label = document.getElementById("p2Label");

p2Btn.addEventListener("click", function(){
	updateScore(p2Score, p2Label, p2Score+1);

	if (p2Score >= maxScore) {
		maxScoreReached = true;
		p2Label.style.color = "green";
	} else {
		p2Label.style.color = "black";
	}
})

var reset = document.getElementById("reset");

reset.addEventListener("click", function(){
	maxScoreReached = false;
	updateScore(p1Score, p1Label, 0);
	updateScore(p2Score, p2Label, 0);	
})


function updateScore(scoreVal, scoreLabel, newScore) {
	if (maxScoreReached) {
		return;
	}

	if (typeof newScore != 'number') {
		throw "New score not a number!";
	}

	scoreVal = newScore;
	scoreLabel.textContent = newScore;
}