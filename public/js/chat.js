var socket = io();

function scrollToBottom(){
   //selectors 
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    
   //Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight =messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    
   
    
    if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
        
}

socket.on('connect', function () {
 var params = jQuery.deparam(window.location.search);
    
    socket.emit('join', params, function(error){
        if(error){
            alert(error);
            window.location.href ='/';
        }else{
            console.log('no error');
        }
    })
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('updateUserList', function(users){
    var ol =jQuery('<ol></ol>');
    
    users.forEach(function (user){
        ol.append(jQuery('<li></li>').text(user));
    })
    
    jQuery('#users').html(ol);
    console.log('Users List', users);
})

socket.on('newMessage', function (message) {
      console.log('New Message received from SERVER', message);
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template,{
       from:message.from,
      room: message.room,
        text:message.text,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
console.log('newMessage', message);
//  var li = jQuery('<li></li>');
//  li.text(`${formattedTime}  ${message.from}: ${message.text}`);
//
//  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template,{
       from:message.from,
        url:message.url,
        createdAt: formattedTime
    });
    
    jQuery('#messages').append(html);
    // following code is reduced using mustache and re written above
    //var li = jQuery('<li></li>');
//  var a = jQuery('<a target="_blank">My current location</a>');
//
//  li.text(`${formattedTime}  ${message.from}: `);
//  a.attr('href', message.url);
//  li.append(a);
//  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    // when we send an message add the current username to message following from: user is //removed and we need to add current user name in server.js to message
      //from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {
     jQuery('[name=message]').val('')
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

    locationButton.attr('disabled','disabled').text('sending location...');
    
  navigator.geolocation.getCurrentPosition(function (position) {
      locationButton.removeAttr('disabled').text('send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
      locationButton.removeAttr('disabled').text('send location');
    alert('Unable to fetch location.');
  });
});
