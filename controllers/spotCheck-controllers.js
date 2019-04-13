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

var Sequelize = require("sequelize");
var Op = Sequelize.Op

// define the route to display the "register" page
router.get("/", function (req, res) {
    res.render("index");
});

// define the route to display the "login" page
router.get("/login", function (req, res) {
    res.render("login");
});

// define the route to display the page with the map and the spots
router.get("/home", function (req, res) {
    res.render("home");
});

// =================== Sophie ================================

// define the route to display the spot info once the user has claimed the spot
router.get("/spot-claimed", function (req, res) {
    res.render("spot-claimed");
});

// ===========================================================


// ===================Louis===================================

router.get("/api/spots", function (req, res) {
    db.spots.findAll({
    }).then(function (dbSpots) {
        res.json(dbSpots);
    });
})

// ==============================================================

// Louis
// define route to pull the spots to display on the map and the spots
router.get("/api/spots/:lat1/:lat2/:long1/:long2", function (req, res) {
    var lat1 = req.params.lat1;
    var lat2 = req.params.lat2;
    var long1  = req.params.long1;
    var long2  = req.params.long2;

    var where ={
         where: {
            latitude: {[Op.between]: [lat2, lat1] },
            longitude: {[Op.between]: [long2, long1]}
         }
    }
    
    console.log("this is the param 1 " + where)
    db.spots.findAll(where).then(function (dbSearchSpots) {
        console.log("this is dbsearchspots " + dbSearchSpots);
        res.json(dbSearchSpots);
     
    });
});
// Louis

// Louis
// store the phone number and password into the users model 
// store the phone number, the coordinates and timestamp into the history model
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
    console.log(historyInfo);


    db.users.create(userInfo).then(function(dbUser) {
        db.history.create(historyInfo).then(function(dbHist) {
            res.json(dbUser);
            console.log("user data");
            console.log("hist data");

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
// Need to fix the userID
    router.post("/api/3p/spots", function (req, res) {

        var newSpot = {
            latitude: req.body.lat,
            longitude: req.body.long,
            occupied: false,
            userId: "1"
        };
        console.log(req.body.lat)
        console.log("this is new spot" + newSpot);
    
        db.spots.create(newSpot).then(function() {
                res.end();
    
        });
             
    });
    
// Louis

// ================ Sophie ===================

// define the route to update the status of the spot once it
// has been claimed by a user
router.put("/api/spots/:id", function(req, res) {
    // call the update method to update the status of the spot
    db.spots.update({
        occupied: req.body.occupied,
    },
    {
        where: {
            id: req.params.id,
        }
    }).then(function() {
        res.end();      
    });
});

// define the route to update the status of the spot once it
// has been freed by a user
router.put("/api/spot-freed", function(req, res) {
    // call the update method to update the status of the spot
    db.spots.update({
        occupied: req.body.occupied,
    },
    {
        where: {
            id: req.body.spotId,
        }
    }).then(function() {
        res.end();      
    });
})

// ===========================================



// Export the router to make it available for other files (i. e., the server.js)
module.exports = router;
