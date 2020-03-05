var colors = generateColors(6);

var pickedColor = pickColor();
displayPickedColor();

var messageDisplay = document.getElementById("message");
var squares = document.getElementsByClassName("square");

for (var i = 0; i < squares.length; i++) {
	// add initial colors to squares
	squares[i].style.backgroundColor = colors[i];

	// add click listeners
	squares[i].addEventListener("click", function() {
		var clickedColor = this.style.backgroundColor;

		if (clickedColor === pickedColor) {
			messageDisplay.textContent = "Correct!";
			setAllColors(clickedColor)
		} else {
			this.style.visibility = "hidden";
			messageDisplay.textContent = "TryAgain";
		}
	});
};

function displayPickedColor() {
	var pickedDisplay = document.getElementById("pickedColor");
	pickedDisplay.textContent = pickedColor;
}

function setAllColors(color) {
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
