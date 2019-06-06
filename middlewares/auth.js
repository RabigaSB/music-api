const User = require('../models/User');

const auth = async (req, res, next) => {
	const token = req.get('Authorization');
	if(!token) return res.status(401).send('No token found');

	const user = await User.findOne({token});
	if (!user) return res.status(401).send('No user found');

	next();

};

module.exports = auth;
