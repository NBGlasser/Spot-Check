// ---------------------------------------------------
// Dependencies
// --------------------------------------------------- 

// load the Express node package
var express = require("express");
// var bodyParser = require("body-parser");
// var session = require("express-session");
// load the handlebars node package for Express
var exphbs = require("express-handlebars");

// set the port of the application
var PORT = process.env.PORT || 3000;
var db = require("./models");
var http = require("http");
var passport = require("passport");
var passportConfig = require("./config/passport");
// var cookieParser = require("cookie-parser");
// ---------------------------------------------------
// Configuration of the Express app
// --------------------------------------------------- 
var app = express();

// set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set up the Express app so it will be able to use my css stylesheet, the images and the js file
app.use(express.static("public"));

// ---------------------------------------------------
// Set handlebars as the default templating engine
// ---------------------------------------------------
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// ---------------------------------------------------
// Routes
// --------------------------------------------------- 

// link the "spotCheck_controllers.js" file
var routes = require("./controllers/spotCheck-controllers.js");

app.use(routes);

// Other express libraries
// app.use(express.bodyParser());
// app.use(express.cookieParser());
// app.use(express.session({ secret: 'ourpasswordissophie' }));
app.use(passport.initialize());
// app.use(passport.session());
// app.use(app.router);

// ---------------------------------------------------
// Start the server
// --------------------------------------------------- 

// so that it can begin listening to client requests.

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("App listening on: http://localhost:" + PORT);
    });
});