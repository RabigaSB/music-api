const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');
const nanoid = require('nanoid');
const multer = require('multer');
const path = require('path');
const config = require('../config');
const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, config.uploadPath)
	},
	filename: (req, file, cb) => {
		cb(null, nanoid() + path.extname(file.originalname))
	}
});
const upload = multer({storage});

router.get('/', (req, res) => {
	Artist.find({published: true})
		.then(results => {
			res.send(results);
		})
		.catch(() => res.sendStatus(500));
});

router.post('/', [auth, upload.single('image')], (req, res) => {
	if (req.file) {
		req.body.image = req.file.filename;
	}
	else req.body.image = null;

	const artist = new Artist({
		name: req.body.name,
		information: req.body.information,
		image: req.body.image
	});
	artist.save()
		.then(result => res.send(result))
		.catch(error => res.status(400).send(error));
});

//for admin role
router.get('/admin', [auth, permit('admin')], (req, res) => {
	Artist.find()
		.then(results => {
			res.send(results);
		})
		.catch(() => res.sendStatus(500));
});

router.post('/admin', [auth, permit('admin'),  upload.single('image')], (req, res) => {
	if (req.file) {
		req.body.image = req.file.filename;
	}
	else req.body.image = null;

	const artist = new Artist(req.body);
	artist.save()
		.then(result => res.send(result))
		.catch(error => res.status(400).send(error));
});

router.put('/:id/publish', [auth, permit('admin')], (req, res) => {
	Artist.findByIdAndUpdate(
		req.params.id,
		req.body,
		{new: true},
		(err, artist) => {
			if (err) return res.status(500).send(err);
			return res.send(artist);
		}
	)
});

router.delete('/:id/admin', [auth, permit('admin')], async (req, res) => {
	Artist.findByIdAndRemove(req.params.id, (err, artist) => {
		if (err) return res.status(500).send(err);
		const response = {
			message: "Artist successfully deleted",
			id: artist._id
		};
		return res.status(200).send(response);
	});
});

module.exports = router;
