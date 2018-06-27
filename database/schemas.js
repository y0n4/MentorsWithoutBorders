const mongoose = require('mongoose');
var Schema = mongoose.Schema;

//all schemas located here

var usersSchema = new Schema({
  id: String,
  fullName: {type: String, unique: true},
  ratings: {type: Number, default: 0},
  bio: String,
  isMentor: {type: Boolean, default: false},
  isMentee: {type: Boolean, default: true},
  mentors: [String],
  mentees: [String],
  blocked: [String],
  location: {},
  resume: String 
});

var categorySchema = new Schema({
  field: {type: String, unique: true}
});

var questionsSchema = new Schema({
  username: String,
  time: String,
  quote: String
});

var quotesSchema = new Schema({
  username: String,
  time: String,
  quote: String
});

var chatSchema = new Schema({
  username: [String],
  date: String,
  messages: [String]
});

//exporting all schemas for database/index.js
module.exports = {
  User: mongoose.model('User', usersSchema),
  Category: mongoose.model('Category', categorySchema),
  Question: mongoose.model('Question', questionsSchema),
  Quote: mongoose.model('Quote', quotesSchema),
  Chat: mongoose.model('Chat', chatSchema)
}