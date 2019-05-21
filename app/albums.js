const express = require('express');
const router = express.Router();
const Album = require('../models/Album');
const nanoid = require('nanoid');

const multer = require('multer');
const path = require('path');
const config = require('../config');

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
	let query = null;
	if (req.query.artist) {
		query = {
			artist: req.query.artist
		};
	}
	Album.find(query).populate('artist')
		.then(results => {
			res.send(results);
		})
		.catch(() => res.sendStatus(500));
});

router.get('/:id', (req, res) => {

	Album.find({_id: req.params.id}).populate('artist')
		.then(result => {
			res.send(result);
		})
		.catch(() => res.sendStatus(500));
});

router.post('/',upload.single('image'), (req, res) => {
	if (req.file) {
		req.body.image = req.file.filename;
	}
	else req.body.image = null;

	const album = new Album(req.body);
	album.save()
		.then(result => res.send(result))
		.catch(error => res.status(400).send(error));


});

module.exports = router;
