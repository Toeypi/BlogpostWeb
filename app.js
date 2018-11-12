var express = require('express'),
    app = express(),
    port = 3000 || process.env.IP;

var mongoose = require('mongoose'),
    config = require("./configDB/connectMlabDB");
mongoose.connect(config.getDBconnectionString());

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

var bodyparser = require('body-parser');
app.use(bodyparser({ extended: true }));

var flash = require('connect-flash');
app.use(flash());

var User = require('./models/User');
var passport = require('passport');
var LocalStragety = require('passport-local');
app.use(require('express-session')({
    secret: "Let's me think of it",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStragety(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

var frontpageRoute = require('./routes/frontpagePost'),
    authenticationRoute = require('./routes/index'),
    methodOverride = require('method-override');
app.use(methodOverride("_method"));
app.use(frontpageRoute);
app.use(authenticationRoute);





app.listen(port, function () {
    console.log("Server Start!!");
})