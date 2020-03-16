var express = require("express"),
    router = express.Router();

var Campground = require("../models/campground");

// INDEX
router.get("/", function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: campgrounds });
        }
    });
});

// NEW
router.get("/new", isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// CREATE
router.post("/", isLoggedIn, function(req, res) {
    var name = req.body.name;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var image = req.body.image;
    var description = req.body.description;
    Campground.create(
        { name: name, author: author, image: image, description: description },
        function(err) {
            if (err) {
                // TODO error message in a form
                console.log(err);
            } else {
                res.redirect("/campgrounds");
            }
        }
    );
});

// SHOW
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id)
        .populate("comments")
        .exec(function(err, campground) {
            if (err) {
                console.log(err);
            } else {
                res.render("campgrounds/show", { campground: campground });
            }
        });
});

// MIDDLEWARE
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
