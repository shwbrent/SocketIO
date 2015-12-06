var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var userList=[];
var i=1;
app.get('/',function(req, res){
	res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
  var newUser='匿名';
  var time=new Date();
 
  var nowTime=time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();
  //io.sockets.emit('chat message',{data:'New',time:nowTime,user:''});
  userList.push(newUser);
   
  io.sockets.emit('chat message',userList);
io.emit('chat message','現在人數:'+i);
  socket.on('chat message', function(msg){
    io.emit('chat message', newUser+':'+msg);
  });
  i++;
  socket.on('disconnect',function(){
	userList.splice(userList.indexOf(newUser),1);
	var time=new Date();
        var nowTime=time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();
     //io.sockets.emit('chat message',{data:newUser+'out',time:nowTime,user:''});
        io.sockets.emit('newUser',userList);
	--i;
	});

});

http.listen(5000, function(){
	console.log('listening on *:5000');
});

