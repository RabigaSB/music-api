const express =require('express');
const router = express.Router();
const TrackHistory = require('../models/TrackHistory');
const User = require('../models/User');


const createRouter = () => {
	router.post('/', async (req, res) => {
		console.log(req.get('Token'));

		if (!req.get('Token')) return res.status(401).send("Unauthorized");

		const user = await User.findOne({token: req.get('Token')});

		if (!user) return res.status(401).send("User not authorized!");

		const trackHistoryData = req.body;
		trackHistoryData.userId = user;
		trackHistoryData.datetime = new Date();

		const trackHistory = new TrackHistory(trackHistoryData);

		trackHistory.save()
			.then(result => res.send(result))
			.catch(error => res.status(400).send(error));
	});



	return router;
};

module.exports = createRouter;
