const mongoose = require('mongoose');

const Schema = new mongoose.Schema;

const UserSchema = Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	token: String
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
