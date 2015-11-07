var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/', function(req, res){
   dir = req.params.dir,  
   res.sendFile('app/index.html', {'root': '../'});
   
  });

io.on('connection', function(socket){
    console.log('a user connected');
//socket.emit('message', {'message': 'hello world'});
 	setInterval(function() {
	    socket.emit('newTweets', (new Date()).getTime());
	    console.log('foooo');
	        }, 5000);
	io.emit('message', { for: 'everyone' });
	
 });
http.listen(3000, function(){
    console.log('listening on *:3000');
  });
