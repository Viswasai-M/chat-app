const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {Messages, generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
//var messages = new Messages();
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

 
    
  socket.on('join',(params, callback)=>{
      if(!isRealString(params.name) || !isRealString(params.room)){
          callback('name and room name are requried');
      } 
      
    //  var room = params.room;
      // var name = params.name;
  
      socket.join(params.room);
  
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);
     io.to(params.room).emit('updateUserList', users.getUserList(params.room));
      
 //socket.emit('newMessage', generateMessage('Admin',  `${params.room}`,'Welcome to the chat app'));
// socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.room}`,`new user ${params.name} joined` ));  
        
     var msg = generateMessage(`ADMIN`,`${params.room}`,
                   `\tHello, ${params.name}! \n\tWelcome to the ${params.room}! chat app  `);
    var msg2 =  generateMessage('ADMIN', `${params.room}`,`${params.name} has joined`);
    msg.then((docs)=>{
      socket.emit('newMessage', docs);
    });
    msg2.then((docs)=>{
      socket.broadcast.to(params.room).emit('newMessage', docs);
      callback(); //no arg because we set up the first arg to be an error arg in chat.js
    });
callback();
      
  });

  socket.on('createMessage', (message, callback) => {
      var user = users.getUser(socket.id);
    //console.log(user);
      if(user && isRealString(message.text)) callback();
//      {
//          io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
//      }
      var msg = generateMessage(user.name, user.room, message.text);
    msg.then((m)=>{
     // .pushMessage(user.room, m);
      io.to(user.room).emit('newMessage', m);
      
    console.log('createMessage', message);
  //moved following  io.emit('newMessage', generateMessage(message.from, //message.text)) to inside if loop and same for create location below;
    callback();
  });
 });
  socket.on('createLocationMessage', (coords) => {
      
    var user = users.getUser(socket.id);
      
      if(user){
           io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
      }
   // io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
      var user = users.removeUser(socket.id);
      
      if(user){
          io.to(user.room).emit('updateUserList', users.getUserList(user.room));
           
          var msg = generateMessage('Admin', `${user.room}`, `${user.name} has left`);
          msg.then((docs)=>{
                io.to(user.room).emit('newMessage', docs);
              });
          // below io.to has changed to above msg.then(()=>{ given io.to here});
          //io.to(user.room).emit('newMessage', generateMessage('Admin' , `${user.room}`,`${user.name} has left `));
      }
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
