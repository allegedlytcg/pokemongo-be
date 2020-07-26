const router = require('express').Router();
const auth = require('../middleware/auth');
const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http);

Http.listen(3005, () => {
    console.log("Listening at :3005...");
});


Socketio.on("connection", socket => {
    console.log('made socket connection');//each individualclient will have a socket with the server
    console.log(socket.id);//everytime a diff computer connects, a new id will be added
    //when a new client connects, send position information
    socket.emit("position", position);


    socket.on("join_room", room =>{
        console.log("allegedly joining a room identified by the passed string..." + room);
        let allRooms = Socketio.sockets.adapter.rooms.sockets;
        console.log("logging all rooms")
        console.log(allRooms);
         
        // let rooms = Object.keys(socket.rooms);
        // console.log(rooms); // [ <socket.id>, 'room 237' ]

        console.log("now logging clients rooms..." + Object.keys(socket.rooms));
        let potentialExistingRoom = Socketio.sockets.adapter.rooms[room];
        if (potentialExistingRoom == undefined){
            console.log("room doesn't exist");
            socket.join(room);

        }


        else if(potentialExistingRoom.sockets.length == 0){
            socket.join(room);//room that socket/user wants to join
        }
        else if(potentialExistingRoom.sockets.length ==1){
            socket.join(room);
            console.log("1 client already in room");
            let random = "testController " + Math.random()*100%3;
            Socketio.to(room).emit('controller', random);
        }
        else{
            console.log("max clients in room");
        }
    
    });
    

    //now listening for custom events fromc lient
    socket.on("move", (data, room) =>{
        //message, room
        let rooms = Object.keys(socket.rooms);
        console.log(rooms); // [ <socket.id>, 'room 237' ]
        console.log("something happening");
        console.log("direction passed is" + data);
        console.log("room passed is" + room);
        //TODO figure out why its not emitting position to particular room
        switch(data) {
            case "left":
                console.log("found left request, emitting to room")
                position.x -= 5;
                Socketio.to(room).emit("position", position);
                break;
            case "right":
                position.x += 5;
                Socketio.to(room).emit("position", position);
                break;
            case "up":
                position.y -= 5;
                Socketio.to(room).emit("position", position);
                break;
            case "down":
                position.y += 5;
                Socketio.to(room).emit("position", position);
                break;
        }
    });

    
});




router.get('/jesus', auth, (req, res) => {
   
    console.log(req);
    res.send("Hello World");

})
var position = {
    x: 200,
    y: 200
};


module.exports = router;