var middlewareOBJ = {};

var Travelmodel = require('../models/Travel');
middlewareOBJ.isLoggedin = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please login first");
    res.redirect("/signin");
}

middlewareOBJ.checkTravelBlogOwnerShip = function(req,res,next){
    if(req.isAuthenticated()){
        Travelmodel.findOne({ "author.id": req.params.id },function(err,foundTravelBlog){
            if(err){
                req.flash("error","travelBlog not found.")
                res.redirect("back");
             } else {
                 if(foundTravelBlog.author.id.equals(req.user._id)){
                     next();
                 } else {
                     req.flash("error","you have permission to do that");
                     res.redirect("back");
                 }
            }
        }); 
    } else {
        req.flash("error", "you need to be logged in");
        res.redirect("back");
    }
}
module.exports = middlewareOBJ;