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
                req.flash("error", err.message);
                return res.redirect("/register");
            }
            passport.authenticate("local")(req, res, function() {
                req.flash("success", "Registration successful");
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
        failureRedirect: "/login",
        failureFlash: "Invalid username or password",
        successFlash: "Welcome!"
    })
);

// LOGOUT
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/campgrounds");
});

module.exports = router;
