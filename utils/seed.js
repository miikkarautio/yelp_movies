
const Movie = require("../models/movie");
const Comment = require("../models/comment");

const movie_seeds = [
	{
		title: "Star Wars: Episode I – The Phantom Menace",
		description: "Kun Kauppaliitto piirittää pienen Naboon planeetan mielenosoituksena Ulkoreunan planeettojen kauppaverojen takia, Galaktinen tasavalta lähettää kaksi jediritaria, Qui-Gon Jinnin ja tämän oppipojan Obi-Wan Kenobin, neuvottelemaan heidän kanssaan. Sith-lordi Darth Sidious, Kauppaliiton liittolainen, komentaa varakuningas Nute Gunrayta tappamaan jedit ja valtaamaan Naboon taisteludroideilla. Jedit onnistuvat pakenemaan Naboohon, missä he tapaavat gunganin nimeltä Jar Jar Binks, joka vie heidät gunganien vedenalaiseen kaupunkiin. He yrittävät saada gunganien johtajan, Boss Nassin, varoittamaan Naboon ihmisiä Kauppaliiton hyökkäyksestä. Tämä kieltäytyy, mutta antaa heille gunganien sukellusveneen, jolla he matkustavat Theediin, Naboon pääkaupunkiin.",
		director: "George Lucas",
		producer: "Rick McCallum",
		date: "Wed May 19 1999 00:00:00 GMT+0000 (Coordinated Universal Time)",
		genre: "sci-fi",
		image: "https://upload.wikimedia.org/wikipedia/fi/thumb/b/b2/%22T%C3%A4htien_sota-_Episodi_I_%E2%80%93_Pime%C3%A4_uhka%22_-juliste.jpg/250px-%22T%C3%A4htien_sota-_Episodi_I_%E2%80%93_Pime%C3%A4_uhka%22_-juliste.jpg"
	},
	{
		title: "Bullet Train",
		description: "Yuichi Kimura, The Father, boards a bullet train in Tokyo in search of the attacker of his son Wataru. Meanwhile, guided by his handler Maria Beetle, assassin Ladybug is assigned to retrieve a briefcase full of cash from the same train, replacing a sick colleague, Carver. Ladybug is reluctant, as his recent string of bad luck during his jobs resulted in accidental deaths. Also on the train are two British assassin brothers codenamed Lemon and Tngerine, who just rescued a man The Son from kidnappers and are taking him and the briefcase to his father, a Russian-born Yakuza crime lord called The White Death",
		director: "David Leitch",
		producer: "Kelly McCormick",
		date: "Mon Jul 18 2022 00:00:00 GMT+0000 (Coordinated Universal Time)",
		genre: "action",
		image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Bullet_Train_%28poster%29.jpeg/220px-Bullet_Train_%28poster%29.jpeg"
	},
	{
		title: "Puss in Boots: The Last Wish",
		description: "While hosting a party in the town of Del Mar, legendary hero and outlaw Puss in Boots accidentally awakens a sleeping giant. He subdues the creature but is crushed by a bell. Waking up in a hospital, Puss is informed by the town doctor that he has lost eight of his nine lives. The doctor suggests to Puss that he should retire, but he refuses. That night in a bar, Puss meets a black-hooded wolf, who disarms and wounds him in a swordfight. Traumatized, Puss flees to the house of cat lady Mama Luna, burying his clothes in her yard. Later, Puss meets an optimistic Chihuahua disguised as a cat, whom he calls Perrito.[a] Goldilocks and her Three Bears Crime Family soon arrive at Luna's home, looking to hire Puss to help them steal a map bearing the Wishing Star's location. However, they fail to recognize him, and leave after finding his grave. Puss decides to use the Star to restore his lost lives.",
		director: "Joel Crawford",
		producer: "Mark Swift",
		date: "Tue Dec 13 2022 00:00:00 GMT+0000 (Coordinated Universal Time)",
		genre: "adventure",
		image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/78/Puss_in_Boots_The_Last_Wish_poster.jpg/220px-Puss_in_Boots_The_Last_Wish_poster.jpg"
	}
]

const seed = async () => {
	await Movie.deleteMany();
	console.log("Deleted all comics");
	
	await Comment.deleteMany();
	console.log("Deleted all the comments");
	
	// for(const movie_seed of movie_seeds){
	// 	let movie = await Movie.create(movie_seed);
	// 	console.log("Created new movie:" + movie.title);
	// 	await Comment.create({
	// 		text: "I ruved this Movie",
	// 		user: "an_idiot",
	// 		movieId: movie.id
	// 	})
	// 	console.log("created a new comment");
	// }
}

module.exports = seed;