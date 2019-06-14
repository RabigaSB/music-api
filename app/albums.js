const express = require('express');
const router = express.Router();
const Album = require('../models/Album');
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
	let query = {
		published: true
	};
	if (req.query.artist) {
		query = {
			artist: req.query.artist,
			published: true
		};
	}
	Album.find(query).sort({year: 1}).populate('artist')
		.then(results => {
			res.send(results);
		})
		.catch(() => res.sendStatus(500));
});

router.post('/',[auth, upload.single('image')] , (req, res) => {
	if (req.file) {
		req.body.image = req.file.filename;
	}
	else req.body.image = null;

	const album = new Album({
		name: req.body.name,
		artist: req.body.artist,
		year: req.body.year,
		image: req.body.image,
	});
	console.log(album);
	album.save()
		.then(result => res.send(result))
		.catch(error => res.status(400).send(error));
});





//with permit("admin")

router.get('/:id', [auth, permit('admin')], (req, res) => {

	Album.find({_id: req.params.id}).populate('artist')
		.then(result => {
			res.send(result);
		})
		.catch(() => res.sendStatus(500));
});


router.put('/:id/publish', [auth, permit('admin')], (req, res) => {
	Album.findByIdAndUpdate(
		req.params.id,
		req.body,
		{new: true},
		(err, album) => {
			if (err) return res.status(500).send(err);
			return res.send(album);
		}
	)


});

module.exports = router;
