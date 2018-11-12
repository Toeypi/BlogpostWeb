var middlewareOBJ = {};
middlewareOBJ.isLoggedin = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please login first");
    res.redirect("/signin");
}
module.exports = middlewareOBJ;