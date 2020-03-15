var express = require("express");
var app = express();

app.get("/", (req, res) => {
	res.send("Hi there!");
});

app.get("/call/:thing", (req, res) => {
	thing = req.params.thing;
	res.render("call.ejs", {THING: thing});
})

app.listen(3000, () => {
	console.log("Server listening to port 3000");
})