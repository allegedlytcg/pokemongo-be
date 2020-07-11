const router = require('express').Router();
const auth = require('../middleware/auth');
const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http);

Http.listen(3005, () => {
    console.log("Listening at :3005...");
});


Socketio.on("connection", socket => {
    //when a new client connects, send position information
    socket.emit("position", position);
    //now listening for custom events fromc lient
    socket.on("move", data => {
        switch(data) {
            case "left":
                position.x -= 5;
                Socketio.emit("position", position);
                break;
            case "right":
                position.x += 5;
                Socketio.emit("position", position);
                break;
            case "up":
                position.y -= 5;
                Socketio.emit("position", position);
                break;
            case "down":
                position.y += 5;
                Socketio.emit("position", position);
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