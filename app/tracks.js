const express = require('express');
const router = express.Router();
const Track = require('../models/Track');


router.get('/', (req, res) => {
	let query = null;
	if (req.query.album) {
		query = {
			album: req.query.album
		};
	} else if (req.query.artist) {
		query = {
			"album.artist._id": req.query.artist
		};
	}
	Track.find(query)
		.populate({
		path: 'album',
		populate: {
			path: 'artist',
			model: 'Artist'
		}
	})
		.then(results => {
			res.send(results);
		})
		.catch(() => res.sendStatus(500));
});


module.exports = router;
