var mongoose = require("mongoose");
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/cat_app", {useNewUrlParser: true});

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

/*
var george = new Cat({
	name: "Mrs. Norris",
	age: 7,
	temperament: "Grumpy"
});

george.save(function(err, cat){
	if(err) {
		console.log("Error occured!");
		console.log(err);
	} else {
		console.log("A cat was saved into the database!");
		console.log(cat);
	}
});
*/

Cat.find({}, function(err, cats){
	if (err) {
		console.log("Error occured!");
	} else {
		console.log(cats);
	}
});

Cat.create({
	name: "Snow White",
	age: 15,
	temperament: "Wise"
}, function(err, cats){
	if (err) {
		console.log("Error occured!");
	} else {
		console.log(cats);
	}
});