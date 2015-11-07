var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
   dir = req.params.dir,  
   res.sendfile('app/index.html', {'root': '../'});
  });

io.on('connection', function(socket){
    console.log('a user connected');
  });

http.listen(3000, function(){
    console.log('listening on *:3000');
  });
