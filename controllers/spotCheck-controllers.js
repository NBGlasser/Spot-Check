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

// define the route to display the "login" page
router.get("/", function(req, res) {
    res.render("index");
});

// define the route to display the page with the map and the spots
router.get("/home", function(req, res) {
    res.render("home");
});

// to store the phone number into the users model
router.post("/api/users", function(req, res) {

    res.end();
});



// Export the router to make it available for other files (i. e., the server.js)
module.exports = router;
