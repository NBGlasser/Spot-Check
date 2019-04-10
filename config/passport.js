// import passport packages 
var passport = require('passport');
var LocalStrategy = require("passport-local").Strategy;

// Need models to check passport
var db =  require("../models");

// Telling passport we want to use a local strategy.  
// In other words, we want login with username/phonenumber and password

passport.use(new LocalStrategy(

    {
        usernameField: "phoneNumber"
    },
    function(phone, password, done){
        db.users.findOne({
            where: {
                phoneNumber: phoneNumber
            }
        }).then(function(dbUser){
            if(!dbUser){
                return
            }
        })
    }
))