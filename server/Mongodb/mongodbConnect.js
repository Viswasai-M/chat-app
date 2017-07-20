var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chatApp');

module.exports ={mongoose};















































// var express = require("express");
//
// var app = express();
//
// var bodyParser = require('body-parser');
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
//
//
// var mongoose =require('mongoose');
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/chatApp');
// console.log('connected');
//var nameSchema = new mongoose.Schema({
//  // name: {type: String, unique: true},
//  // room:{type: String},
//     message:{type: String}
// });
//
// var User = mongoose.model("User", nameSchema);
//
//
//app.get('/', (req, res)=>{
//   res.sendFile(__dirname+'/public/chat.html');
//    console.log('file fetched');
//     if (err) {
//      next(err);
//    } else {
//      console.log('Sent:', __dirname);
//    }
// });
//
//app.post('/add', function (req, res){
//
// // var name = req.body.name;
// // var room = req.body.room;
//    
//    var message = req.body.message;
//    
// console.log(message);
//    
//  var myData = new User();
//   // myData.name = username;
//   // myData.room = room;
//   myData.message = message;
//
//  myData.save().then((item)=>{
//    res.send('item saved');
//  },(err)=>{
//    res.status(400).send('unable to save');
//  });
//});





















//var bodyParser = require('body-parser');

 //app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));


//const MongoClient = require('mongodb').MongoClient;
//
//MongoClient.connect('mongodb://localhost:27017/chatApp',(err, db)=>{
//    if(err){
//       return console.log('unable to connect to MongoDB server')
//    }
//    
//    console.log('connected to MongoDB server');
//    
//   // db.collection('Users').innerHTML();
//    db.close();
//    
//});
//var express = require('express');
//var path = require('path');
//var bodyParser = require('body-parser');
//var mongodb = require('mongodb');
//
//var dbConn = mongodb.MongoClient.connect('mongodb://localhost:27017');
//console.log('connected to MongoDB server');
//var app = express();
//
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.static(path.resolve(__dirname, 'public')));
//
//app.post('/post-feedback', function (req, res) {
//    dbConn.then(function(db) {
//        delete req.body._id; // for safety reasons
//        db.collection('feedbacks').insertMany(req.body);
//    });    
//    res.send('Data received:\n' + JSON.stringify(req.body));
//});




