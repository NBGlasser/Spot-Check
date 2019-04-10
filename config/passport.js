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
    function(phoneNumber, password, done){
        db.users.findOne({
            where: {
                phoneNumber: phoneNumber
            }
        }).then(function(dbUser){
            if(!dbUser){
                return done(null, false,{
                    message: "Incorrect phone number."
                });
            }
            else if (!dbUser.validPassword(password)) {
                return done(null, false, {
                  message: "Incorrect password."
                });
              }

            return done(null, dbUser);
        });
    }
    
));

passport.serializeUser(function(user, cb){
    cb(null, user);
});

passport.deserializeUser(function(obj, cb){
    cb(null, obj);
});

module.exports = passport;