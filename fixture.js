const mongoose =require('mongoose');
const config = require('./config');

const Album = require('./models/Album');
const Artist = require('./models/Artist');
const Track = require('./models/Track');
const TrackHistory = require('./models/TrackHistory');
const User = require('./models/User');

mongoose.connect(config.getDbPath());
const db = mongoose.connection;

db.once('open', async () => {
	try {
		await db.dropCollection('albums');
		await db.dropCollection('artists');
		await db.dropCollection('tracks');
		await db.dropCollection('trackhistories');
		await db.dropCollection('users');
	} catch (e) {
		console.log('no collection, skipping drop...')
	}

	const [ImagineDragons, JamesBlunt] = await Artist.create(
		{
			name: 'Imagine Dragons',
			image: 'imagine_dragons.jpeg',
			information: 'Imagine Dragons is an American pop rock band from Las Vegas, Nevada, consisting of lead vocalist Dan Reynolds, lead guitarist Wayne Sermon, bassist Ben McKee, and drummer Daniel Platzman.'
		},
		{
			name: 'James Blunt',
			image: 'james_blunt.png',
			information: 'James Hillier Blount (born 22 February 1974),[2] better known by his stage name James Blunt, is an English singer-songwriter, record producer and former British Army Officer.'
		}
	);

	const [
		Natural,
		Origins,
		LesSessionsLostSouls,
		MoonLanding,
		TheBestLove
	] = await Album.create(
		{
			name: 'Natural',
			artist: ImagineDragons._id,
			image: 'natural_id.jpg',
			year: 2018,
		},
		{
			name: 'Origins',
			artist: ImagineDragons._id,
			image: 'origins_id.jpg',
			year: 2018,
		},
		{
			name: 'Les Sessions Lost Souls',
			artist: JamesBlunt._id,
			image: 'les_sessions_lost_souls_jb.jpeg',
			year: 2008,
		},
		{
			name: 'Moon Landing',
			artist: JamesBlunt._id,
			image: 'moon_landing_jb.jpeg',
			year: 2013,
		},
		{
			name: 'The Best Love... Ever ! Vol. 2',
			artist: JamesBlunt._id,
			image: 'the_best_love_jb.jpeg',
			year: 2014,
		}
	);
	const [
		NaturalTrack,
		WestCoast,
		RealLife,
		Song_1973,
		IReallyWantYou,
		BonfireHeart,
		AlwaysHateMe,
		BadDay
	] = await Track.create(
		{
			name: 'Natural',
			album: Natural._id,
			length: '2.3',
			trackNumber: 1,
		},
		{
			name: 'West Coast',
			album: Origins._id,
			length: '3.4',
			trackNumber: 9,
		},
		{
			name: 'Real Life',
			album: Origins._id,
			length: '2.22',
			trackNumber: 12,
		},
		{
			name: '1973',
			album: LesSessionsLostSouls._id,
			length: '5.53',
			trackNumber: 1,
		},
		{
			name: 'I Really Want You',
			album: LesSessionsLostSouls._id,
			length: '3.29',
			trackNumber: 2,
		},
		{
			name: 'Bonfire Heart',
			album: MoonLanding._id,
			length: '3.49',
			trackNumber: 1,
		},
		{
			name: 'Always Hate Me',
			album: MoonLanding._id,
			length: '3.38',
			trackNumber: 2,
		},
		{
			name: 'Bad Day',
			album: TheBestLove._id,
			length: '3.54',
			trackNumber: 1,
		}
	);
	const [UserCom, Admin] = await User.create(
		{
			username: 'user',
			password: '12',
			role: 'user'
		},
		{
			username: 'admin',
			password: '12',
			role: 'admin'
		}
	);
	await TrackHistory.create(
		{
			userId: UserCom._id,
			trackId: IReallyWantYou._id,
			datetime: '2019-05-21T21:16:58.406+00:00'
		},
		{
			userId: Admin._id,
			trackId: BadDay._id,
			datetime: '2019-05-21T21:20:59.885+00:00'
		}
	);
	db.close();
});
