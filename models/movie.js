const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
	title: String,
	description: String,
	director: String,
	producer: String,
	date: Date,
	genre: String,
	image: String,
	owner: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

movieSchema.index({
	'$**': 'text'
});

module.exports = mongoose.model("movie", movieSchema);