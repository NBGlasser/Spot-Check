// ---------------------------------------------------
// Dependencies
// ---------------------------------------------------

// load the Express node package
var express = require("express");

// load our models
var db = require("../models");


// ---------------------------------------------------
// Define the routes
// ---------------------------------------------------

// create an object to perform the routing functions
var router = express.Router();

// define the route to display the "login" page
router.get("/", function (req, res) {
    res.render("index");
});

// define the route to display the page with the map and the spots
router.get("/home", function (req, res) {
    res.render("home");
});

// Louis
// define route to pull the spots to display on the map and the spots
router.get("/api/spots/:lat1/:lat2/:long1/:long2", function (req, res) {
    db.spots.findAll({
        where: {
            [Op.and]: [
                {lat: { [Op.between]: [req.params.lat1, req.params.lat2] }},
                {long: {[Op.between]: [req.params.long1, req.params.long2]}}
            ]
        }
    });
})
// Louis

// Louis
// edited to store to store the phone number into the users model
router.post("/api/new-user", function (req, res) {
    console.log("hello post worked ")
    var userInfo = {
        phoneNumber: req.body.phoneNum,
        password: req.body.password
    }

    var historyInfo = {
        phoneNumber: req.body.phoneNum,
        lat: req.body.lat,
        long: req.body.long,
        timeStamp: req.body.timeStamp
    }

    db.users.create(userInfo).then(function(dbUser) {
        db.history.create(historyInfo).then(function(dbHist) {
            res.json(dbUser);
            console.log(dbUser);
            console.log(dbHist);

        });
         
    });
});

// Louis, adding user searches to the history table
router.post("/api/history", function (req, res) {



    var historyInfo = {
        phoneNumber: req.body.phoneNum,
        lat: req.body.lat,
        long: req.body.long,
        timeStamp: req.body.timeStamp
    }

    db.history.create(historyInfo).then(function(dbHist) {
            res.json(dbHist);

        });
         
    });





// Louis



// Export the router to make it available for other files (i. e., the server.js)
module.exports = router;
