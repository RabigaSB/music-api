const mongoose = require('mongoose');

const Schema = new mongoose.Schema;

const TrackSchema = Schema({
	name: {
		type: String,
		required: true
	},
	album: {
		type: Schema.Types.ObjectId,
		ref: 'Album',
		required: true
	},
	length: String
});

const Track = mongoose.model('Track', TrackSchema);
module.exports = Track;
