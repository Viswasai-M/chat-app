var moment = require('moment');
const {ModeledMessage} = require('./../models/messageModel.js');

class Messages{
  constructor(){
    this.messages = [];
  }
}

var generateMessage = function(from, room, text){

  var m = new ModeledMessage({
    from,
    text,
    room,
    createdAt: moment().valueOf()  
   // createdAt: new Date().getTime()
  });
  return m.save().then((doc)=>{
    console.log('Message Saved in DB: ', doc);
    return doc;
    return {
      from,
      text,
      room,
      createdAt: moment().valueOf()
    };
  
  });
};



var generateLocationMessage = function(from, latitude, longitude){
  return{
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    // createdAt: new Date().getTime()
    createdAt: moment().valueOf()
  };
};



module.exports = {Messages, generateMessage, generateLocationMessage};










//var moment = require('moment');
//
//var generateMessage = (from, text) => {
//  return {
//    from,
//    text,
//    createdAt: moment().valueOf()
//  };
//};
//
//var generateLocationMessage = (from, latitude, longitude)=>{
//    return{
//        from,
//        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
//        
//    createdAt: moment().valueOf()
//       // createdAt: new Date().getTime()
//    };
//};
//
//module.exports = {generateMessage, generateLocationMessage};
