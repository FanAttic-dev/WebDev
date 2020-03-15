var express = require("express");
var app = express();

app.get("/", function(req, res) {
	res.send("Landing page!");
});

app.get("/r/:section", function(req, res) {
	var section = req.params.section;
	res.send("Welcome to the " + section + " section!");
})

app.get("*", function(req, res) {
	res.send("<h1>ERROR 404</h1>");
});

app.listen(3000, function() {
	console.log("Server listening to port 3000");
});