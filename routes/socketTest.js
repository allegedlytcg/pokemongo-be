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
    // socket.emit("position", position);


    socket.on("join_room", room =>{
        console.log("allegedly joining a room identified by the passed string..." + room);
        let tempRoom = room; //whats ultimately sent back to client based on circumstances
        let rooms = Object.keys(socket.rooms);
        let thisRoom = Socketio.sockets.adapter.rooms[room];
        console.log(rooms); // [ <socket.id>, 'room 237' ]


        if (typeof thisRoom !== 'undefined'){
            

            if(thisRoom.length == 0){
                console.log("no clients in that room, or is undefined creating room now");
                socket.join(room);//room that socket/user wants to join
            }

            else if(thisRoom.length == 1){
                console.log("joining 2nd client");
                socket.join(room)
            }
            else if(thisRoom.length ==2){
                console.log("full room");
                console.log("here's a list of the connected clients:")
                let room = io.sockets.adapter.rooms['my_room'];
                console.log(room[0]);
                console.log(room[1]);
                tempRoom = null;
            }
            // clientsSockets = clients.sockets;
            // numClients = (typeof clientsSockets !== 'undefined') ? Object.keys(clients).length: 0;
            // for (var clientId in clientsSockets ){
            //     //socket of each client in the room    
            //     var clientSocket = Socketio.sockets.connected[clientId];
            //     console.log(clientSocket);
            // }
            
        }
        else{
            console.log("room was undefined, joining and creating new room" + room);
            socket.join(room);
            roomMap[room] =  {x: 200, y:200};
            //when a new client connects, send position information
            position = roomMap[room];
            console.log("position sent is " + position);
            Socketio.to(room).emit("position", position);
        }
        socket.emit('joinResp',tempRoom);  //sends confirmation to client by returning the room name, or null if the room was full/client already in room
    });
//TODO CHANGE THIS TO BOOKMARKED CONNECT/DISCONNECT METHO
//     socket.on("disconnect", (room) =>{


//         let thisRoom = Socketio.sockets.adapter.rooms[room];
//  // todo check if client is in that room
//         if (typeof thisRoom !== 'undefined'){

//             socket.leave(room);
//             if (thisRoom.length == 0){
//                 Socketio.emit('lobbyUpdate', room){
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
    socket.on("move", (data, room) =>{
        //message, room
        let rooms = Object.keys(socket.rooms);
        console.log(rooms); // [ <socket.id>, 'room 237' ]
        console.log("something happening");
        console.log("direction passed is" + data);
        console.log("room passed is" + room);
        let position = roomMap[room];

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


var roomMap = {};



module.exports = router;