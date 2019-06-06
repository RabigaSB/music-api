const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	album: {
		type: Schema.Types.ObjectId,
		ref: 'Album',
		required: true
	},
	length: String,
	trackNumber: Number
});

const Track = mongoose.model('Track', TrackSchema);
module.exports = Track;
