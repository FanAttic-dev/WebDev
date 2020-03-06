var messageDisplay = document.getElementById("message");
var squares = document.getElementsByClassName("square");
var pickedDisplay = document.getElementById("pickedColor");
var resetButton = document.querySelector("#reset");
var difficultyButtons = document.querySelectorAll(".difficulty");
var h1 = document.querySelector("h1");

var backgroundColor = "#232323";
var colors = [];
var pickedColor;
var colorsCount = 6;

initCallbacks();
resetGrid();

function initCallbacks() {
	resetButton.addEventListener("click", function() { resetGrid(); });
	
	// difficulties
	for (var i = 0; i < difficultyButtons.length; i++) {
		difficultyButtons[i].addEventListener("click", function() {
			for (var j = 0; j < difficultyButtons.length; j++)
				difficultyButtons[j].classList.remove("selected");
			this.classList.add("selected");

			colorsCount = this.textContent === "Easy" ? 3 : 6;

			resetGrid();
		});
	}

	// squares
	for (var i = 0; i < squares.length; i++) {
		squares[i].addEventListener("click", function() {
			var clickedColor = this.style.backgroundColor;

			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				setAllColors(clickedColor)
			} else {
				this.style.backgroundColor = backgroundColor;
				messageDisplay.textContent = "TryAgain";
			}
		});
	};
}

function resetGrid() {
	colors = generateColors(colorsCount);
	pickedColor = pickColor();
	
	h1.style.backgroundColor = "steelblue";
	messageDisplay.textContent = "";
	resetButton.textContent = "New Colors";
	pickedDisplay.textContent = pickedColor;

	for (var i = 0; i < squares.length; i++) {
		if (i < colorsCount) {
			squares[i].style.display = "initial";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
}

function setAllColors(color) {
	h1.style.backgroundColor = color;
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function generateColors(count) {
	var colors = new Array(count);
	for (var i = 0; i < count; i++) {
		colors[i] = randomColor();
	}
	return colors;
}

function randomColor() {
	return "rgb(" 
	+ Math.floor((Math.random() * 256)) + ", " 
	+ Math.floor((Math.random() * 256)) + ", " 
	+ Math.floor((Math.random() * 256)) + ")";
}

function pickColor() {
	return colors[Math.floor(Math.random() * colors.length)];
}
