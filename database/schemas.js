const mongoose = require('mongoose');
var Schema = mongoose.Schema;

//all schemas located here

var usersSchema = new Schema({
  username: {type: String, unique: true},
  fullName:  {type: String, unique: true},
  email: String,
  ratings: Number,
  bio: String,
  isMentor: Boolean,
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
module.exports = mongoose.model('Users', usersSchema);
module.exports = mongoose.model('Category', categorySchema);
module.exports = mongoose.model('Question', questionsSchema);
module.exports = mongoose.model('Quote', quotesSchema);
module.exports = mongoose.model('Chat', chatSchema);