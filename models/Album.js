const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlbumSchema = Schema({
	name: {
		type: String,
		required: true
	},
	artist: {
		type: Schema.Types.ObjectId,
		ref: 'Artist',
		required: true
	},
	year: Number,
	image: String
});

const Album = mongoose.model('Album', AlbumSchema);
module.exports = Album;
