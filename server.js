const express = require('express');
require('dotenv').config();
// const cors = require("cors");
// database connection file
const dbConnect = require('./dbConnect');
// route files
const userRoutes = require('./routes/user');
const deckRoutes = require('./routes/deck');
const PokemonRoutes = require('./routes/pokemon');
// const RoomChat = require('./routes/RoomChat');
// const chatRoutes = require('./routes/chat');
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
// app.use('/api/v1/socketTest', socketTest);
// app.use('/api/v1/RoomChat', RoomChat);
// app.use('/api/v1/chat', chatRoutes);

const PORT = process.env.PORT || 6000;

server = app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
});

const io = require('socket.io')(server);
// const io = require('socket.io')(server);
io.on('connection', (socket) => {
	console.log('made socket connection'); //each individualclient will have a socket with the server
	console.log(socket.id); //everytime a diff computer connects, a new id will be added
	//when a new client connects, send position information
	// socket.emit("position", position);

	socket.on('join_room', (room) => {
		console.log(
			'allegedly joining a room identified by the passed string...' +
				room,
		);
		let tempRoom = room; //whats ultimately sent back to client based on circumstances
		let rooms = Object.keys(socket.rooms);
		let thisRoom = io.sockets.adapter.rooms[room];
		console.log(rooms); // [ <socket.id>, 'room 237' ]

		if (typeof thisRoom !== 'undefined') {
			if (thisRoom.length == 0) {
				console.log(
					'no clients in that room, or is undefined creating room now',
				);
				socket.join(room); //room that socket/user wants to join
			} else if (thisRoom.length == 1) {
				console.log('joining 2nd client');
				socket.join(room);
			} else if (thisRoom.length == 2) {
				console.log('full room');
				console.log("here's a list of the connected clients:");
				let room = io.sockets.adapter.rooms['my_room'];
				console.log(room[0]);
				console.log(room[1]);
				tempRoom = null;
			}
			// clientsSockets = clients.sockets;
			// numClients = (typeof clientsSockets !== 'undefined') ? Object.keys(clients).length: 0;
			// for (var clientId in clientsSockets ){
			//     //socket of each client in the room
			//     var clientSocket = io.sockets.connected[clientId];
			//     console.log(clientSocket);
			// }
		} else {
			console.log(
				'room was undefined, joining and creating new room' + room,
			);
			socket.join(room);
			roomMap[room] = { x: 200, y: 200 };
			//when a new client connects, send position information
			position = roomMap[room];
			console.log('position sent is ' + position);
			io.to(room).emit('position', position);
		}
		socket.emit('joinResp', tempRoom); //sends confirmation to client by returning the room name, or null if the room was full/client already in room
	});
	//TODO CHANGE THIS TO BOOKMARKED CONNECT/DISCONNECT METHO
	//     socket.on("disconnect", (room) =>{

	//         let thisRoom = io.sockets.adapter.rooms[room];
	//  // todo check if client is in that room
	//         if (typeof thisRoom !== 'undefined'){

	//             socket.leave(room);
	//             if (thisRoom.length == 0){
	//                 io.emit('lobbyUpdate', room){
	//                     //remove the roomname from all client lobby list
	//                 }
	//             }

	//         }
	//         else{
	//             console.log("an issue where the room wasn't found occured")
	//         }
	//     });

	//now listening for custom events fromc lient
	//TODO CHANGE FRONT-END TO PASS STATE RATHER THAN GLOBAL STATE OF POSITION HERE
	//TODO CHANGE THIS METHOD TO TAKE AN ADDITIONAL ARGUMENT FROM FRONT END
	socket.on('move', (data, room) => {
		//message, room
		let rooms = Object.keys(socket.rooms);
		console.log(rooms); // [ <socket.id>, 'room 237' ]
		console.log('something happening');
		console.log('direction passed is' + data);
		console.log('room passed is' + room);
		let position = roomMap[room];

		switch (data) {
			case 'left':
				console.log('found left request, emitting to room');
				position.x -= 5;
				io.to(room).emit('position', position);
				break;
			case 'right':
				position.x += 5;
				io.to(room).emit('position', position);
				break;
			case 'up':
				position.y -= 5;
				io.to(room).emit('position', position);
				break;
			case 'down':
				position.y += 5;
				io.to(room).emit('position', position);
				break;
		}
	});
});
