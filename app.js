const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const morgan = require("morgan");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const expressSession = require("express-session");
const flash = require("connect-flash");

//Config Imports
let config;
try{
	config = require("./config");
} catch (e){
	console.log("Could not import config");
	console.log(e);
}

const Movie = require("./models/movie");
const Comment = require("./models/comment");
const User = require("./models/user");

const movieRoutes = require("./routes/movies");
const commentRoutes = require("./routes/comments");
const mainRoutes = require("./routes/main");
const authRoutes = require("./routes/auth");


try{
	mongoose.connect(config.db.connection, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});	
} catch (e){
	console.log("Could not connect config, this probably means you are not working locally");
	mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
}


mongoose.Promise = global.Promise;


app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(expressSession({
	secret: process.env.ES_SECRET || config.expressSession.secret,
	resave: false,
	saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended: true}));

// Connect Flash
app.use(flash());

app.use(methodOverride("_method"));

app.use(passport.initialize());
app.use(passport.session()); //Allows persistent sessions.
passport.serializeUser(User.serializeUser()); // What data shoudl be stored in session
passport.deserializeUser(User.deserializeUser()); // Get the user data from the stored session
passport.use(new LocalStrategy(User.authenticate())); // Use the local strategy

app.use(morgan("tiny"));

// const seed = require("./utils/seed");
// seed();

//Current user state config
app.use((req, res, next) => {
	res.locals.user = req.user;
	res.locals.errorMessage = req.flash("error");
	res.locals.successMessage = req.flash("success");
	next();
})

app.use(mainRoutes);
app.use(authRoutes);
app.use("/movies/:id/comments", commentRoutes);
app.use("/movies", movieRoutes);


app.listen(process.env.PORT || 3000, () => {
	console.log("Running on port 3000");
});

