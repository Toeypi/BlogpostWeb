var express = require('express'),
    router = express.Router({ mergeParams: true });

var Travel = require('../models/Travel');
var Info = require('../models/Info');

var middleware = require('../middleware/index');



router.get('/blogpost', function (req, res) {
    res.render("frontpagePost");
});

router.get('/blogpost/travel', function (req, res) {
    Travel.find({}, function (err, foundTravels) {
        if (err) {
            console.log(err);
        }
        res.render("menu/travelPage/travel", { foundTravels: foundTravels });
    })
});

router.get('/blogpost/travel/:id', function (req, res) {
    Travel.findById(req.params.id, function (err, foundTravelUser) {
        if (err) {
            console.log(err);
        }
        res.render("menu/travelPage/travelBlog", { foundTravelUser: foundTravelUser });
    });
});

router.get('/profile/travel/:id/new',middleware.isLoggedin, function (req, res) {
    //use currentUser(logged in) id 
    Info.findOne({ "user.id": req.params.id }, function (err, foundInfo) {
        if (err) {
            console.log(err);
        }
        res.render("menu/travelPage/newTravelBlog", { foundInfo: foundInfo });
    });
});

router.put('/blogpost/travel/:id',middleware.isLoggedin, function (req, res) {
    //use currentUser(logged in) id 
    Info.findOne({ "user.id": req.params.id }, function (err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            Travel.create(req.body.travel, function (err, newtravel) {
                if (err) {
                    console.log(err);
                }
                newtravel.author.id = req.user._id;
                newtravel.author.name = req.user.username;
                newtravel.date.currentDate = Date.now();
                newtravel.save();
                foundUser.travelBlog.push(newtravel);
                foundUser.save();
                res.redirect("/blogpost/travel/" + newtravel._id);
            });
        }
    })

})

module.exports = router;