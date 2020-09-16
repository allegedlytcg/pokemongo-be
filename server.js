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
let cors = function (req, res, next) {
	var whitelist = [
		'http://localhost:4200',
		'http://localhost:3000',
		'https://allegedlytcg.com',
		'http://allegedlytcg.com',
		'http://allegedlytcg.s3-website.us-east-2.amazonaws.com',
	];
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

// const app = require('express')();
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);
// io.on('connection', () => { /* … */ });
// server.listen(3000);

server = app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
});
// const io = require('socket.io')(server);
// io.on('connection', (socket) => {
// 	// console.log('Client connected');
// 	socket.on('disconnect', () => console.log('Client disconnected'));
// });

module.exports = server;
// app.set('io', io);
