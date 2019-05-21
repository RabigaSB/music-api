const express = require('express');
const app = express();
const PORT = 8000;
const cors = require('cors');
const mongoose = require('mongoose');

const artists = require('./app/artists');
const albums = require('./app/albums');
const tracks = require('./app/tracks');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/music', {useNewUrlParser: true})
	.then(() => {
		app.use('/artists', artists);
		app.use('/albums', albums);
		app.use('/tracks', tracks);


		app.listen(PORT, () => {
			console.log(`Server is running at ${PORT} port`)
		});
	});
