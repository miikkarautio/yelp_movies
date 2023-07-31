const express = require("express");
const router = express.Router({mergeParams: true});
const Comment = require("../models/comment");
const Movie = require("../models/movie");
const isLoggedIn = require("../utils/isLoggedIn");
const checkCommentOwner = require("../utils/checkCommentOwner")

router.get("/new", (req, res) => {
	res.render("comments_new", {movieId: req.params.id})
})

router.post("/", isLoggedIn, async (req, res) => {
	

	const comment = await Comment.create({
		user: {
			id: req.user._id,
			username: req.user.username	
		},
		text: req.body.text,
		movieId: req.body.movieId
	});
	
	try{
		console.log(comment);
		res.redirect(`/movies/${req.body.movieId}`)
	}catch(err){
		console.log(err);
		res.send("Broken POST comments")
	}
	

})

router.get("/:commentId/edit", checkCommentOwner, async (req, res) => {
	try{
		const movie = await Movie.findById(req.params.id).exec();
		const comment = await Comment.findById(req.params.commentId).exec();
		console.log("Movie: ", movie);
		console.log("Comment: ", comment)
		res.render("comments_edit", {movie, comment});
	}catch(err){
		console.log(err)
		res.send("Error at commentId/edit");
	}
})

router.put("/:commentId", checkCommentOwner, async (req, res) => {
	try{
		const comment = await Comment.findByIdAndUpdate(req.params.commentId, {text: req.body.text}, {new: true}).exec();
		console.log(comment);
		res.redirect(`/movies/${req.params.id}`);
	}catch(err){
		console.log(err);
		res.send("error at update comment");
	}
})

router.delete("/:commentId", checkCommentOwner, async (req, res) => {
	try{
		const comment = await Comment.findByIdAndDelete(req.params.commentId);
		console.log(comment);
		res.redirect(`/movies/${req.params.id}`);
	}catch(err){
		console.log(err);
		res.send("Broken again comment delete")
	}
})



module.exports = router;