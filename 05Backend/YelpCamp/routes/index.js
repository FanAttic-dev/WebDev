var express = require("express"),
    router = express.Router();

var passport = require("passport");
var User = require("../models/user");

// ROOT
router.get("/", function(req, res) {
    res.render("landing");
});

// REGISTER SHOW
router.get("/register", function(req, res) {
    res.render("register");
});

// REGISTER CREATE
router.post("/register", function(req, res) {
    User.register(
        new User({ username: req.body.username }),
        req.body.password,
        function(err, user) {
            if (err) {
                console.log(err);
                return res.render("register");
            }
            passport.authenticate("local")(req, res, function() {
                res.redirect("/campgrounds");
            });
        }
    );
});

// SHOW LOGIN
router.get("/login", function(req, res) {
    res.render("login");
});

// HANDLE LOGIN
router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    })
);

// LOGOUT
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

module.exports = router;
