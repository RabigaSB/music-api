const express = require('express');
const router = express.Router();
const Track = require('../models/Track');
const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');



router.get('/', auth, (req, res) => {
	let query = {
		published: true
	};
	if (req.query.album) {
		query = {
			album: req.query.album,
			published: true
		};
	}
	Track.find(query).sort({trackNumber: 1})
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

router.post('/', auth, (req, res) => {
	const track = new Track({
		name: req.body.name,
		album: req.body.album,
		length: req.body.length,
		trackNumber: req.body.trackNumber,
	});
	track.save()
		.then(result => res.send(result))
		.catch(error => res.status(400).send(error));
});


//for admin role
router.get('/admin', auth, (req, res) => {
	let query = null;
	if (req.query.album) {
		query = {
			album: req.query.album
		};
	}
	Track.find(query).sort({trackNumber: 1})
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

router.post('/admin', auth, (req, res) => {
	const track = new Track({
		name: req.body.name,
		album: req.body.album,
		length: req.body.length,
		trackNumber: req.body.trackNumber,
	});
	track.save()
		.then(result => res.send(result))
		.catch(error => res.status(400).send(error));
});

router.put('/:id/publish', [auth, permit('admin')], (req, res) => {
	Track.findByIdAndUpdate(
		req.params.id,
		req.body,
		{new: true},
		(err, track) => {
			if (err) return res.status(500).send(err);
			return res.send(track);
		}
	)
});

router.delete('/:id/admin', [auth, permit('admin')], async (req, res) => {
	Track.findByIdAndRemove(req.params.id, (err, track) => {
		if (err) return res.status(500).send(err);
		const response = {
			message: "Track successfully deleted",
			id: track._id
		};
		return res.status(200).send(response);
	});
});


module.exports = router;
