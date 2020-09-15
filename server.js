const express = require('express');
require('dotenv').config();
// const cors = require("cors");
// database connection file
const dbConnect = require('./dbConnect');
// route files
const userRoutes = require('./routes/user');
const deckRoutes = require('./routes/deck');
const PokemonRoutes = require('./routes/pokemon');
const RoomChat = require('./routes/RoomChat');
const chatRoutes = require('./routes/chat');
// initalize express
const app = express();
const socketTest = require('./routes/socketTest');

// console.log(cors);
// init middleware
const corsOptions = {};

let cors = function (req, res, next) {
	var whitelist = ['http://localhost', 'http://allegedlytcg.com'];
	let origin = req.headers.origin;
	if (whitelist.indexOf(origin) > -1) {
		res.setHeader('Access-Control-Allow-Origin', origin);
	}
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
	next();
};
app.use(cors);

app.use(express.json({ extended: false }));

// connect database
dbConnect();

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/deck', deckRoutes);
app.use('/api/v1/pokemon', PokemonRoutes);
app.use('/api/v1/socketTest', socketTest);
app.use('/api/v1/RoomChat', RoomChat);
app.use('/api/v1/chat', chatRoutes);

const PORT = process.env.PORT || 6000;

server = app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
});

const io = require('socket.io')(
	server,

	// 	{
	//   transports: ["websocket", "polling"],
	// }
);
app.set('io', io);
