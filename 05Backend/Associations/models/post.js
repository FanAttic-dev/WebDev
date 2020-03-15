var mongoose = require("mongoose");

// MONGOOSE MODEL CONFIG
//mongoose.set('useUnifiedTopology', true);
//mongoose.connect("mongodb://localhost/blog_demo", {useNewUrlParser: true});
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
//mongoose.set('useFindAndModify', false);

// POST
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});

module.exports = mongoose.model("Post", postSchema);