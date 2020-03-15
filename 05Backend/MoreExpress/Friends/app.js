var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var friendsList = ["Sihel", "Lubo", "Bendi"];

app.get("/", (req, res) => {
	res.render("friends", {friends: friendsList});
});

app.post("/addFriend", (req, res) => {
	var newFriend = req.body.newFriend;
	friendsList.push(newFriend);
	res.redirect("/");
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server running on port 3000...");
});