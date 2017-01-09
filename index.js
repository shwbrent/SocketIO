var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var userList=[];

app.get('/',function(req, res){
	res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
  var newUser='匿名';

  userList.push(newUser);
   
  //io.sockets.emit('Comming message',newUser+'進來了，在線名單:'+userList);
  io.sockets.emit('Comming message','這裡是快樂聊天室 ~~ \ ^０^ / !!現在人數:'+userList.length);

  socket.on('chat message', function(msg){
	    var time=new Date();
	    var	nowTime=time.getHours()+"時"+time.getMinutes() +"分"+time.getSeconds()+"秒";
	    io.emit('chat message', newUser+':'+msg);
	  });

  socket.on('disconnect',function(){
	var time=new Date();
	var nowTime=time.getHours()+"時"+time.getMinutes() +"分"+time.getSeconds()+"秒";
	userList.splice(userList.indexOf(newUser),1);
	//io.sockets.emit('Comming message',newUser+'離線了，在線名單:'+userList);
	io.sockets.emit('Comming message',newUser+'離線了，在線名單:'+userList+'，現在人數:'+userList.length);
   });

});

http.listen(5000, function(){
	console.log('listening on *:5000');
});
