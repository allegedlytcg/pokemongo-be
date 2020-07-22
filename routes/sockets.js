const socketio = require('socket.io')
let io, clients = {};

module.exports = {

    startSocketServer: (app) => {
        io = socketio.listen(app);

        io.sockets.on('connect', (socket) => {
            console.log("new connection: " + socket.id);
        })
    },
    // other socket methods go here
    sendData: () => {
        
        io.sockets.emit('users', (user) => {
            console.log(user.name)
        })
    }
}