var express			= require("express"),
	methodOverride 	= require("method-override"),
	expressSanitizer= require("express-sanitizer"),
	bodyParser 		= require("body-parser"),
	mongoose		= require("mongoose"),
	app				= express();

// APP CONFIG
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

// MONGOOSE MODEL CONFIG
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/restful_blog_app", {useNewUrlParser: true});
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
// 	title: "TestBlog",
// 	image: "https://images.pexels.com/photos/261577/pexels-photo-261577.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
// 	body: "This is a blog post..."
// })

// RESTful routes
app.get("/", function(req, res){
	res.redirect("/blogs");
});

// INDEX
app.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if (err) {
			console.log(err);
		} else {
			res.render("index", {blogs: blogs});
		}
	});
});

// NEW
app.get("/blogs/new", function(req, res){
	res.render("new");
});

// CREATE
app.post("/blogs", function(req, res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, function(err, newBlog){
		if (err) {
			res.redirect("/blogs/new");
		} else {
			res.redirect("/blogs");
		}
	})
});

// SHOW
app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if (err) {
			res.redirect("/blogs");
		} else {
			res.render("show", {blog: foundBlog});
		}
	})
});

// EDIT
app.get("/blogs/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if (err) {
			res.redirect("/blogs");
		} else {
			res.render("edit", {blog: foundBlog});
		}
	});
});

// UPDATE
app.put("/blogs/:id", function(req, res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if (err) {
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

// DESTROY
app.delete("/blogs/:id", function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if (err) {
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	})
});


var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server running on port 3000...");
});