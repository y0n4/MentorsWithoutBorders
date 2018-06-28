const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// all schemas located here

const usersSchema = new Schema({
  id: String,
  googleId: String,
  fullName: { type: String, unique: true },
  gender: String,
  ratings: { type: Number, default: 0 },
  bio: String,
  isMentor: { type: Boolean, default: false },
  isMentee: { type: Boolean, default: true },
  mentors: [String],
  mentees: [String],
  blocked: [String],
  location: {},
  resume: String,
});

const categorySchema = new Schema({
  field: { type: String, unique: true },
});

const questionsSchema = new Schema({
  time: String,
  quote: String,
});

const quotesSchema = new Schema({
  time: String,
  quote: String,
});

const chatSchema = new Schema({
  date: String,
  messages: [String],
});

// exporting all schemas for database/index.js
module.exports = {
  User: mongoose.model('User', usersSchema),
  Category: mongoose.model('Category', categorySchema),
  Question: mongoose.model('Question', questionsSchema),
  Quote: mongoose.model('Quote', quotesSchema),
  Chat: mongoose.model('Chat', chatSchema),
};
