const SocketIO = require('socket.io');
const axios = require('axios');
const UserService = require('./UserService');

const usersService = new UserService();

module.exports = (server) => {
    const io = SocketIO(server);

    io.on('connection', (socket) => {
        console.log('connection');
        socket.on('join', (userName) => {
            for(let i; i <= usersService.getAllUsers.length; i++) {
                if(userName === usersService.getAllUsers.name) {
                    alert('이미 접속하셨습니다.');
                    
                }
            }
            console.log('join');
            usersService.addUser({
                id:socket.id,
                name: userName
            });

            io.emit('update', {
                users: usersService.getAllUsers()
            });
        });
        socket.on('message', (message) => {
            const { name } = usersService.getUserById(socket.id);
            socket.broadcast.emit('message', {
                text: message.text+'+',
                from: name
            });
        });

        socket.on('disconnect', () => {
            console.log('disconnected..');
            usersService.removeUesrs(socket.id);
            socket.broadcast.emit('update', {
                users: usersService.getAllUsers()
            });           
        });
    });


}