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

// define the route to display the "register" page
router.get("/", function(req, res) {
    res.render("index");
});

// ------------------- Sophie ----------------------

// define the route to display the "login" page
router.get("/login", function(req, res) {
    res.render("login");
});

// -------------------------------------------------

// define the route to display the page with the map and the spots
router.get("/home", function(req, res) {
    res.render("home");
});


// ------------------- Sophie ----------------------

// to store the new user info into the users model
router.post("/api/new-user", function(req, res) {
    // NEED CODE TO CREATE DATA ROW INTO THE DATABASE
    res.end();
});

// -------------------------------------------------

// to authenticate user when they log in
router.post("/api/users", function(req, res) {
    // NEED CODE 
    res.end();
});


// Export the router to make it available for other files (i. e., the server.js)
module.exports = router;
