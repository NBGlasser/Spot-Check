module.exports = function(req, res, next){
    // If user is logged inm, continue with request on reuqested route
    if(req.user){
        return next();
    }

    return res.redirect("/");
    
}