var express = require('express');
var path = require('path');
var app = express();


app.use(express.static(path.resolve('public')));



//当客户端访问/的时候，返回一个index.html文件
app.get('/',function(req,res){
    res.sendFile(path.resolve('index.html'));
    //res.sendFile('./index.html',{root:__dirname});
});

//创建一个http服务器，把app传进去作为监听函数，当有请求到来到时候执行此函数
var server = require('http').createServer(app);

//因为websocket服务器依赖http服务器，所以需要把server传进去
var io = require('socket.io')(server);

/**
 * 一、匿名聊天
 * 1. 监听按钮的点击事件
 * 2. 当点击事件发生后，执行回调函数，在回调函数里获得输入框的内容，然后把此内容发送给服务器
 * 3. 服务器收到此内容之后广播给所有的客户端  io.emit('message','聊天内容');
 * 4.客户端 监听 服务器的消息，向ul里添加一个新的li.
 *
 * 二、具名聊天
 * 三、私聊
 * 四、实现私人房间功能
 * 五、聊天信息存入mongodb持久化
 * 六、显示房间在线人员
 */
var messages = [];

//搞一个对象存所有的用户名
var sockets = {};

//websocket服务器监听客户端青丘，当有请求到来的时候
io.on('connection', function (socket) {

    var username; //此用户的用户名
    var currentRoom;//当前socket对应的当前房间


    //进入此函数就表示客户端已经连接成功了
    //监听客户端发过来的消息
    socket.on('message', function (message) {

        //console.log('server',message);

        //username设置过了
        if(username){
            var reg = /^@([^ ]+) (.+)/; //非空格的字符

            var result =  message.match(reg);

            if(result){ //如果有值是私聊
                var toUser = result[1]; //想私聊的对方的用户名找到对方的socket
                var content = result[2]; //私聊内容

                sockets[toUser].send({
                    username : `<span class="user">${username}</span> 对你说：`,
                    content ,
                    createAt: new Date()
                });

                socket.send({
                    username : `你对 <span class="user">${toUser}</span> 说：`,
                    content ,
                    createAt: new Date()
                });

            }else{
                //服务器把消息放在消息数组里
                messages.push({username:`<span class="user">${username}</span>`, content: message, createAt: new Date()});

                console.log('currentRoom',currentRoom);

                if(currentRoom){
                    //向所有连接的客户端发送消息 用户名、内容、时间
                    io.in(currentRoom).emit('message',{username:`<span class="user">${username}</span>`, content: message, createAt: new Date()});
                }else{
                    //向所有连接的客户端发送消息 用户名、内容、时间
                    io.emit('message',{username:`<span class="user">${username}</span>`, content: message, createAt: new Date()});
                }
            }

        }else{

            //第一次没有username进行设置
            username = message;

            //将此用户和此socket的对应关系存起来
            sockets[username] = socket;

            io.emit('message',{username:'<span class="user">系统</span>', content: `欢迎<span class="user">${username}</span>进入聊天室`, createAt: new Date()});
        }
    });

    //在服务器监听客户端发过来要求获得所有的消息事件,发回所有消息数组
    socket.on('getAllMessages', function () {

        //服务器上客户端发射一件allMessages事件,
        socket.emit('allMessages',messages);

        socket.send({username:'<span class="user">系统</span>', content: '请输入昵称', createAt: new Date()});
    });

    //监听客户端，让服务器进入某个房间的事件
    socket.on('join', function (room) {
        //把当前的房间名缓存在currentRoom中
        currentRoom = room;

        //让socket进入某个房间
        socket.join(room);
    })
});

//当监听一个端口的时候服务器才算真正启动成功
server.listen(8080);