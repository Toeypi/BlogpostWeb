var express = require('express'),
    router = express.Router({ mergeParams: true });

var middlewareOBJ = require('../middleware/index');

var passport = require('passport');
var User = require('../models/User');
var Info = require('../models/Info');
var Travel = require('../models/Travel');



router.get('/register', function (req, res) {
    res.render("authentication/subscribePage");
});

router.get('/signup', function (req, res) {
    res.render("authentication/signupPage");
});

router.post('/signup', function (req, res) {
    var newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect('/signup');
        }
        passport.authenticate('local')(req, res, function () {
            Info.create(req.body.info, function (err, newInfo) {
                if (err) {
                    console.log(err);
                }
                // pass authenticated user id and username to info model
                newInfo.user.id = req.user._id;
                newInfo.user.username = req.user.username;
                newInfo.save();
            });
            req.flash("success", "Welcome new member " + user.username);
            res.redirect('/blogpost');
        });
    });
});

router.get('/signin', function (req, res) {
    res.render("authentication/signinPage");
});

router.post('/signin', passport.authenticate('local',
    {
        successRedirect: '/blogpost',
        failureFlash: "invalid username or password",
        failureRedirect: '/signin',
    })
);

router.get('/profile/:id', middlewareOBJ.isLoggedin, function (req, res) {
    Info.find({}, function (err, Info) {
        if (err) {
            console.log(err);
        }
        res.render("authentication/profile", { Info: Info });
    });
});

router.get('/profile/:id/edit', middlewareOBJ.isLoggedin, function (req, res) {
    Info.findOne({ "user.id": req.params.id }, function (err, foundInfo) {
        if (err) {
            console.log(err);
        }
        res.render("authentication/profileEdit", { foundInfo: foundInfo });
    });
});

router.put('/profile/:id', middlewareOBJ.isLoggedin, function (req, res) {
    Info.findOneAndUpdate({ "user.id": req.params.id }, req.body.info, function (err, Info) {
        if (err) {
            console.log(err);
        }
        res.redirect("/profile/" + req.params.id);
    });
});

router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/signin");
});

module.exports = router;