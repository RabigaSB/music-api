const path = require('path');
const rootPath = __dirname;


module.exports = {
	rootPath,
	uploadPath: path.join(rootPath, 'public/uploads'),
	db: {
		url: "mongodb://localhost/",
		name: "music"
	},
	getDbPath: function() {
		return this.db.url + this.db.name;
	},
	facebook: {
		appId: '446633256121485',
		secretKey: '6a9dbf8739388bd18c0e192749e59208'
	}
};
