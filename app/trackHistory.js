const express =require('express');
const router = express.Router();
const TrackHistory = require('../models/TrackHistory');
const User = require('../models/User');
const auth = require('../middlewares/auth');


const createRouter = () => {
	router.get('/', auth, async (req, res) => {
		const token = req.get('Authorization');
		const user = await User.findOne({token});

		TrackHistory.find({userId: user}).sort({datetime: -1})
			.populate({
				path: 'userId',
				model: 'User'
			})
			.populate({
				path: 'trackId',
				populate: {
					path: 'album',
					populate: {
						path: 'artist',
						model: 'Artist'
					}
				}
			})
			.then(results => {
				res.send(results);
			})
			.catch(() => res.sendStatus(500));
	});

	router.post('/', auth, async (req, res) => {
		const token = req.get('Authorization');
		const user = await User.findOne({token});

		const trackHistoryData = req.body;
		trackHistoryData.userId = user._id;
		trackHistoryData.datetime = new Date();

		const trackHistory = new TrackHistory(trackHistoryData);

		trackHistory.save()
			.then(result => res.send(result))
			.catch(error => res.status(400).send(error));
	});

	return router;
};

module.exports = createRouter;
