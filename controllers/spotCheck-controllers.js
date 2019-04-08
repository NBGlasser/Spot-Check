// ---------------------------------------------------
// Dependencies
// ---------------------------------------------------

// load the Express node package
var express = require("express");

// load our models
// var thing = require("../models/name-model");


// ---------------------------------------------------
// Define the routes
// ---------------------------------------------------

// create an object to perform the routing functions
var router = express.Router();

// define the route to display the main page
router.get("/", function(req, res) {
    res.render("index");
});


// Export the router to make it available for other files (i. e., the server.js)
module.exports = router;
