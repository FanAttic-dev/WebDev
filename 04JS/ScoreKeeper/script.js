var maxScore = 5;
var p1Score = 0;
var p2Score = 0;
//-----------------------------------

var maxScoreReached = false;

var input = document.querySelector("input");
var maxScoreLabel = document.getElementById("maxScoreLabel");
maxScoreLabel.textContent = maxScore;

input.addEventListener("change", function(){
	var newMaxScore = Number(input.value);
	
	if (newMaxScore <= Math.max(p1Score, p2Score)) {
		reset();
	}

	maxScore = newMaxScore;
	maxScoreLabel.textContent = maxScore;
})

// Player 1 Button
var p1Btn = document.getElementById("p1Btn");
var p1Label = document.getElementById("p1Label");

p1Btn.addEventListener("click", function(){
	if (maxScoreReached) {
		return;
	}

	++p1Score;
	p1Label.textContent = p1Score;

	if (p1Score >= maxScore) {
		p1Label.style.color = "green";
		maxScoreReached = true;
	}
})

var p2Btn = document.getElementById("p2Btn");
var p2Label = document.getElementById("p2Label");

p2Btn.addEventListener("click", function(){
	if (maxScoreReached) {
		return;
	}

	++p2Score;
	p2Label.textContent = p2Score;

	if (p2Score >= maxScore) {
		p2Label.style.color = "green";
		maxScoreReached = true;
	}
})

var resetBtn = document.getElementById("reset");

resetBtn.addEventListener("click", function(){
	reset();
})

function reset() {
	maxScoreReached = false;
	
	p1Score = 0;
	p2Score = 0;

	p1Label.textContent = 0;
	p1Label.style.color = "black";
	p2Label.textContent = 0;
	p2Label.style.color = "black";
}