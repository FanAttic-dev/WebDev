var express = require("express");
var app = express();

app.get("/", function(req, res) {
	res.send("Hi there, welcome to the assignment!");
});

app.get("/speak/:animal", function(req, res) {
	var animal = req.params.animal;
	var sound = "undefined sound";
	if (animal == "pig") {
		sound = "Oink";
	} else if (animal == "cow") {
		sound = "Moo";
	}
	
	res.send(sound);
});

app.get("/repeat/:word/:times", function(req, res) {
	var word = req.params.word;
	var times = Number(req.params.times);
	
	var message = "";
	for (var i = 0; i < times; i++) {
		message += word;
		if (i < times - 1) {
			message += " ";
		}
	}
	
	res.send(message);
});

app.get("*", function(req, res) {
	res.send("ERROR 404");
});

app.listen(3000, function() {
	console.log("Server listening to port 3000");
})