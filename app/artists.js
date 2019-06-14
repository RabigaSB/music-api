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

module.exports = router;
