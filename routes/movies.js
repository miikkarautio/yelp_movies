const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");
const Comment = require("../models/comment");
const isLoggedIn = require("../utils/isLoggedIn");
const checkMovieOwner = require("../utils/checkMovieOwner");

router.get("/",  async (req, res) => {
	console.log("here is the user" + req.user);
	try{
		const movies = await Movie.find().exec();
		res.render("movies", {movies});
	} catch(err){
		res.send("You broke it... /index");
	}
	
})

router.post("/", isLoggedIn, async (req, res) => {
	const genre = req.body.genre.toLowerCase();
	const newMovie = {
		title: req.body.title,
		description: req.body.description,
		director: req.body.director,
		producer: req.body.producer,
		date: req.body.date,
		genre,
		image: req.body.image,
		owner: {
			id: req.user._id,
			username: req.user.username	
		}
	}
	try{
		const movie = await Movie.create(newMovie)
		console.log(movie)
		res.redirect("/movies/" + movie._id);
	} catch(err){
		res.send("error at /index");
	}

})

router.get("/new", isLoggedIn, (req, res) => {
	res.render("movies_new");
})

router.get("/search", async (req, res) => {
	try{
		const movies = await Movie.find({
			$text:{
				$search: req.query.term
			}
		});
		res.render("movies", {movies});
	}catch(err){
		console.log(err);
		res.send("error at movies/search");
	}
})

router.get("/:id", async (req, res) => {
	try{
		const movie = await Movie.findById(req.params.id).exec();
		const comments = await Comment.find({movieId: req.params.id});
		res.render("movies_show", {movie, comments})
	} catch(err){
		res.send("Error at /:id");
	}
	
})

router.get("/:id/edit", checkMovieOwner, async (req, res) => {
		const movie = await Movie.findById(req.params.id).exec()
		res.render("movies_edit", {movie});	
});

router.put("/:id", checkMovieOwner, async (req,res) => {
	const genre = req.body.genre.toLowerCase();
	const movieBody = {
		title: req.body.title,
		description: req.body.description,
		director: req.body.director,
		producer: req.body.producer,
		date: req.body.date,
		genre,
		image: req.body.image
	}
	
	try{
		const movie = await Movie.findByIdAndUpdate(req.params.id, movieBody, {new: true}).exec();
		res.redirect(`/movies/${req.params.id}`);
		
	} catch(err){
		console.log(err);
		res.send("Error at /:id");
	}
})

router.delete("/:id", checkMovieOwner, async (req, res) => {
	try{
		const deletedMovie = await Movie.findByIdAndDelete(req.params.id).exec();
		console.log("Deleted:", deletedMovie);
		res.redirect("/movies");
	} catch(err){
		console.log(err)
		res.send("Error at /:id");
	}
});

module.exports = router;