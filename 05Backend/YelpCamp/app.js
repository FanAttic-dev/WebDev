var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose	= require("mongoose"),
	Campground 	= require("./models/campground"),
	Comment 	= require("./models/comment"),
	seedDB		= require("./seeds");

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

seedDB();

app.get("/", function(req, res){
	res.render("landing");
});

// INDEX
app.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, campgrounds){
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: campgrounds});
		}
	});
});

// NEW
app.get("/campgrounds/new", function(req,res){
	res.render("campgrounds/new");
});

// CREATE
app.post("/campgrounds", function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	Campground.create({name: name, image: image, description: description}, function(err, newCampground){
		if (err) {
			// TODO error message in a form
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
});

// SHOW
app.get("/campgrounds/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/show", {campground: campground});
		}
	});
});

// ===============================================
// COMMENTS ROUTES
// ===============================================

app.get("/campgrounds/:id/comments/new", function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	})
})

app.post("/campgrounds/:id/comments", function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if (err) {
					console.log(err);
				} else {
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	})
});


var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server running on port 3000...");
});