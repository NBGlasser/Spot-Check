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
// router.get("/spot-claimed", function (req, res) {
//     res.render("spot-claimed");
// });

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

// ================ Sophie ===================

// define the route to update the data in oneDay_db
router.put("/api/spots/:id", function(req, res) {
    // call the update method from sequelize to change the state of a bucket-list item
    db.spots.update({
        occupied: req.body.occupied,
    },
    {
        where: {
            id: req.params.id,
        }
    }).then(function() {
        db.spots.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(data) {
            res.json(data);
            // console.log(data);

            // var dataSpot = [];
            // dataSpot.push(data.dataValues)

            // console.log(dataSpot);

            // res.redirect("/spot-claimed");

            // var hbsObject = {
            //     object: dataSpot[0],
            // }

            // console.log(hbsObject);

            // res.render("spot-claimed", hbsObject);

        })

            
    });
});

// ===========================================



// Export the router to make it available for other files (i. e., the server.js)
module.exports = router;
