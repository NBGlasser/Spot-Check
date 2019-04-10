var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json("/home");
    });

    app.post("/api/signup", function(req, res){
        console.log(req.body);
        db.users.create({
            phoneNumber: req.body.phoneNumber,
            password: req.body.password
        }).then(function(){
            res.redirect(307, "/api/login");
        }).catch(function(err){
            console.log(err);
            res.json(err);
        });
    });

    app.get("/logout", function(req, res){
        if(!req.user){
            res.json({});
        }
        else{
            res.json({
                phoneNumber: req.user.phoneNumber,
                id: req.user.id
            })
        }
    })
}