var mongoose = require('mongoose');
var ModeledMessage = mongoose.model('Message', {
  from: {
    type: String,
    required: true
  },
  text:{
    type: String,
   //required: true
  },
    room: {
    type: String,
    required: true
  },
  completedAt: {
    type: Number,
    default: new Date().getTime()
  }
});

module.exports = {ModeledMessage};












































//var mongoose = require('mongoose');
//
//var mesModel = mongoose.model('Message', {
//    from:'string', 
//    text: 'string',
//    completedAt: {
//          type: Number,
//    default: new Date().getTime()
//    },
//    room: 'string' });
//
//
//module.exports = {mesModel};
