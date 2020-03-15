var mongoose = require("mongoose");

// MONGOOSE MODEL CONFIG
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/blog_demo_ref", {useNewUrlParser: true});
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

var Post = require("./models/post");

var User = require("./models/user");

// User.create({
// 	email: "bob@gmail.com",
// 	name: "Bob Belcher"
// });

Post.create({
	title: "How to cook the best burger",
	content: "fdsafdsaf"
}, function(err, newPost){
	if (err) {
		console.log(err);
	} else {
		User.findOne({email: "bob@gmail.com"}, function(err, user){
			if (err) {
				console.log(err);
			} else {
				user.posts.push(newPost);
				user.save(function(err, updatedUser){
					if (err) {
						console.log(err);
					} else {
						console.log(updatedUser);
					}
				});
			}
		});
	}
});


// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(user.posts);
// 	}
// });