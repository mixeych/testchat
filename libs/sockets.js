module.exports = function(server){
    var io = require('socket.io')(server);
    io.on('connection', function (socket) {
        socket.on('message', function (data, cb) {
            console.log(data);
            cb("123"); // данные в колбэк функцию на клиенте
            socket.broadcast.emit("chat", data); // всем подключенным, кроме отправителя
        });
        console.log(socket.handshake);
    });

    io.set('origins', 'localhost:*') // домены c которых могут подсоединятся к сокетам
}
