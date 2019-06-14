const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	image: String,
	information: String,
	published: {
		type: Boolean,
		default: false,
		required: true
	}

});

const Artist = mongoose.model('Artist', ArtistSchema);
module.exports = Artist;
