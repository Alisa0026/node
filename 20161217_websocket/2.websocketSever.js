var Server = require('ws').Server;
var EventEmitter = require('events');


//创建一个websocket服务器的实例，并指定端口号
var server = new Server({port:8080});

//监听客户端的连接，当客户端连接上来之后执行对应的回调函数
//这个socket是每个客户端特有的，每个客户端连接之后给他建一个socket
server.on('connection', function (socket) {

    //监听客户端发过来的消息
    //eventemitter on emit
    //在node中只要能on的都是EventEmitter的子类
    socket.on('message', function (message) {
        console.log(222,message);

        //服务器向这个客户端发送消息
        socket.send('服务器说：' + message);
        //socket.emit('message','服务器你好');
    });
});
