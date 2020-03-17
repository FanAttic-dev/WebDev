# NodeJS

* nodemon

  * `npm install -g nodemon`
* `nodemon app.js`
  
* project init

  * `npm install express ejs body-parser mongoose method-override --save`

  * ```javascript
    var express			= require("express"),
    	methodOverride 	= require("method-override"),
    	expressSanitizer= require("express-sanitizer"),
    	bodyParser 		= require("body-parser"),
    	mongoose		= require("mongoose"),
    	app				= express();
    
    
    // APP CONFIG
    app.use(bodyParser.urlencoded({extended: true})); // req.body.<form>
    app.use(express.static(__dirname + "/public"));
    app.use(expressSanitizer());
    app.set("view engine", "ejs");
    app.use(methodOverride("_method"));
    
    // MONGOOSE MODEL CONFIG
    mongoose.set('useUnifiedTopology', true);
    // Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
    // by default, you need to set it to false.
    mongoose.set('useFindAndModify', false);
    mongoose.connect("mongodb://localhost/restful_blog_app", {useNewUrlParser: true});
    ```

* file structure

  * ```
    projectFolder
    +-- node modules
    +-- public
    	+-- stylesheets
    		+-- app.css
    +-- views
    	+-- partials
    		+-- header.ejs
    		+-- footer.ejs
        +-- index.ejs
        +-- show.ejs
        +-- new.ejs
        +-- edit.ejs
    +-- app.js
    +-- package.json
    ```



# MongoDB

* create a file "mongod"

  * ```
  mongod:
    
    mongod --nojournal
    ```

* `chmod a+x mongod`

* usage:

  * 1. terminal1: `./mongod`
    2. terminal2: `node app.js`

* Model creation

  * ```javascript
    models/blog.js:
    
    var blogSchema = new mongoose.Schema({
    	title: String,
        author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: String
        },
    	image: String,
    	body: String,
    	created: {type: Date, default: Date.now},
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ]
    });
    
    module.exports = mongoose.model("Blog", blogSchema);
    ```
  
* Model methods

  * ```javascript
    var Blog = require("../models/blog");
    
    Blog.create(req.body.blog, function(err, created) {});
    
    Blog.find({title: "Title Name"}, function(err, blog){});
    
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){});
    ```
  * ```javascript
    Blog.findById(req.params.id).populate("comments").exec(function(err, blog) {})
    
  User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){...});
    ```
    
  * ```javascript
    Blog.findByIdAndRemove(req.params.id, function(err){});
    ```

* mongo shell

  * `show dbs`
  * `use <database>`
  * `show collections`
  * `db.<collection>.find()`
  * `db.dogs.update({name: "Rusty"}, ($set: {name: "Tater", isCute: true}))`
    - does not overwrite the whole object



# RESTful routes

Route | Path | HTTP | Description | Mongoose
--- | --- | --- | --- |--- 
INDEX | /blogs | GET | List all blogs | `Blog.findById()` 
NEW | /blogs/new | GET | Show create form | `N/A` 
CREATE | /blogs | POST | Create and redirect | `Blog.create()` 
SHOW | /blogs/:id | GET | Show detail | `Blog.findById()` 
EDIT | /blogs/:id/edit | GET | Show edit page | `Blog.findById()` 
UPDATE | /blogs/:id | PUT | Update and redirect | `Blog.findByIdAndUpdate()` 
DESTROY | /blogs/:id | DELETE | Delete and redirect | `Blog.findByIdAndRemove()` 

* `method-override` required for update
  * `npm install method-override`
  * app.js: 
    * `methodOverride = require("method-override");`
    * `app.use(methodOverride("_method"));`
  *  edit.ejs
    * `<form action="/<%= object._id %>?_method=PUT" method="POST">`



# Authentication

* init

  * `npm install passport passport-local passport-local-mongoose`

  * ```js
    var passport = require("passport"),
    	LocalStrategy = require("passport-local");
    
    app.use(require("express-session")({
    	secret: "Rusty is the best and cutest dog in the world",
    	resave: false,
    	saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    ```
    
  * user.js
  
    ```js
    var mongoose = require("mongoose");
    var passportLocalMongoose = require("passport-local-mongoose");
    
    var UserSchema = new mongoose.Schema({
        username: String,
        password: String
    });
    
    UserSchema.plugin(passportLocalMongoose);
    
    module.exports = mongoose.model("User", UserSchema);
    ```
  
    


* register

  * ```js
    app.post("/register", function(req, res){
    	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    		if (err) {
    			console.log(err);
    			return res.render("register");
    		}
    		
    		passport.authenticate("local")(req, res, function(){
    			res.redirect("/secret");
    		})
    	});
    })
    ```
  
* login

  * ```js
    app.post("/login", passport.authenticate("local", {
    	successRedirect: "/secret",
    	failureRedirect: "/login"
    }), function(req, res){ });
    ```

  * Authenticate

    ```js
    function isLoggedIn(req, res, next) { // out middleware
    	if (req.isAuthenticated()) {
    		return next();
    	}
    	res.redirect("/login");
    }
    
    app.get("/secret", isLoggedIn, function(req, res){
    	res.render("secret");
    });
    ```

* logout

  * ```js
    app.get("/logout", function(req, res){
    	req.logout();
    	res.redirect("/");
    });
    ```

* send `currentUser` to all ejs files


  * ```js
    app.use(function(req, res, next) {
        res.locals.currentUser = req.user;
        next();
    });
    ```



# Separate files

* app.js

  * ```js
    var indexRoutes = require("./routes/index"),
    	commentRoutes = require("./routes/comments");
    
    app.use("/", indexRoutes);
    app.use("/campgrounds/:id/comments", commentRoutes);
    ```

* index.js

  * ```js
    var express = require("express"),
        router = express.Router();
    
    ...
    router.get("/", function(req, res){});
    ...
    
    module.exports = router;
    ```

* comments.js

  * ```js
    var express = require("express"),
        router = express.Router({ mergeParams: true });
    
    ...
    router.get("/new", isLoggedIn, function(req, res) { })
    ...
    
    module.exports = router;
    ```

    * `mergeParams` is due to `/:id/commnets`