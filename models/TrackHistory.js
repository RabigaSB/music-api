const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const TrackHistorySchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	trackId: {
		type: Schema.Types.ObjectId,
		ref: 'Track',
		required: true
	},
	datetime: Date
});


const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);
module.exports = TrackHistory;
