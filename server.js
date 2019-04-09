// ---------------------------------------------------
// Dependencies
// --------------------------------------------------- 

// load the Express node package
var express = require("express");

// load the handlebars node package for Express
var exphbs = require("express-handlebars");


// ---------------------------------------------------
// Configuration of the Express app
// --------------------------------------------------- 

// create an Express app
var app = express();

// set the port of the application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 3000;

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


// ---------------------------------------------------
// Start the server
// --------------------------------------------------- 

// so that it can begin listening to client requests.
app.listen(PORT, function() {
    console.log("App listening on: http://localhost:" + PORT);
});