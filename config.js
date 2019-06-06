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
	}
};
