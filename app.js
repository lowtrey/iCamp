//jshint esversion:6
const express          = require("express"),
        app            = express(),
        bodyParser     = require("body-parser"),
        mongoose       = require("mongoose"),
        flash          = require("connect-flash"),
        passport       = require("passport"),
        LocalStrategy  = require("passport-local"),
        methodOverride = require("method-override"),
        Campground     = require("./models/campground"),
        Comment        = require("./models/comment"),
        User           = require("./models/user"),
        seedDB         = require("./seeds");

// Requiring Routes
const commentRoutes    = require("./routes/comments"),
      campgroundRoutes = require("./routes/campgrounds"),
      indexRoutes      = require("./routes/index");

mongoose.connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("Connected to DB!");
}).catch(err => {
    console.log("ERROR:", err.message);
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// P A S S P O R T
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
});
