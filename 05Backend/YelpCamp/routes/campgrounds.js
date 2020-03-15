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
router.get("/new", function(req, res) {
    res.render("campgrounds/new");
});

// CREATE
router.post("/", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    Campground.create(
        { name: name, image: image, description: description },
        function(err, newCampground) {
            if (err) {
                // TODO error message in a form
                console.log(err);
            } else {
                res.redirect("/");
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

module.exports = router;
