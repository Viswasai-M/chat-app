const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const {mongoConnect} = require('./../mongodbConnect');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

 
    
  socket.on('join',(params, callback)=>{
      if(!isRealString(params.name) || !isRealString(params.room)){
          callback('name and room name are requried');
      } 
  
      socket.join(params.room);
  
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);
     io.to(params.room).emit('updateUserList', users.getUserList(params.room));
   socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
   socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `new user ${params.name} joined` ));  
      
  callback();
      
  });

  socket.on('createMessage', (message, callback) => {
      var user = users.getUser(socket.id);
    //console.log(user);
      if(user && isRealString(message.text)){
          io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
      }
    console.log('createMessage', message);
  //moved following to inside if loop  io.emit('newMessage', generateMessage(message.from, //message.text)) and same for create location below;
    callback();
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
          io.to(user.room).emit('newMessage', generateMessage('Admin' , `${user.name} has left `));
      }
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
