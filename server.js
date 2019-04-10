// ---------------------------------------------------
// Dependencies
// ---------------------------------------------------
// load the Express node package
var env = require('dotenv').config();
var express = require("express");
// var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
// var passport = require("passport");
// var cookieParser = require('cookie-parser');
// var session = require("express-session");
var app = express();
var passport   = require('passport')
var session    = require('express-session')
var bodyParser = require('body-parser')

var PORT = process.env.PORT || 3000;
// require("./config/passport");
// --------------------------------------------------- 
// set up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// For Passport
app.use(session({ secret: process.env.passport_secret,resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
// ---------------------------------------------------
// Set handlebars as the default templating engine
// ---------------------------------------------------
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// set up the Express app so it will be able to use my css stylesheet, the images and the js file
app.use(express.static("public"));

// app.use(session({ secret: 'ourpasswordissophie', resave: true, saveUninitialized: true }));
// Other express libraries
// app.use(express.bodyParser());
// app.use(cookieParser());
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(app.router)

// ---------------------------------------------------
// Routes
// --------------------------------------------------- 
var routes = require("./routes/html-routes")
app.use(routes)

// ---------------------------------------------------
// Start the server
// --------------------------------------------------- 

var db = require("./models");
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });